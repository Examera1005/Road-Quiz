import { action, query, mutation } from "./_generated/server";
import { api } from "./_generated/api";
import { v } from "convex/values";

export const getRequest = query({
  args: { requestId: v.id("questionGeneration") },
  handler: async (ctx, { requestId }) => {
    return await ctx.db.get(requestId);
  }
});

export const updateStatus = mutation({
  args: {
    requestId: v.id("questionGeneration"),
    status: v.union(v.literal('pending'), v.literal('processing'), v.literal('completed'), v.literal('failed')),
    generatedQuestions: v.optional(v.array(v.id('questions'))),
    errorMessage: v.optional(v.string())
  },
  handler: async (ctx, { requestId, status, generatedQuestions, errorMessage }) => {
    const updates: any = { status };
    if (generatedQuestions) updates.generatedQuestions = generatedQuestions;
    if (errorMessage) updates.errorMessage = errorMessage;
    
    await ctx.db.patch(requestId, updates);
  }
});

export const listRequests = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('questionGeneration')
      .order('desc')
      .take(50);
  }
});

// This action uses a free AI API to generate questions
export const processQuestionGeneration = action({
  args: { requestId: v.id("questionGeneration") },
  handler: async (ctx, { requestId }) => {
    // Get the generation request
    const request = await ctx.runQuery(api.questionGeneration.getRequest, { requestId });
    if (!request || request.status !== 'pending') return;
    
    // Update status to processing
    await ctx.runMutation(api.questionGeneration.updateStatus, { 
      requestId, 
      status: 'processing' 
    });
    
    try {
      // Generate questions using free AI API (Ollama local or free OpenAI-compatible API)
      const questions = await generateQuestionsWithFreeAI(request);
      
      // Add questions to database
      const questionIds = await ctx.runMutation(api.questions.bulkAddQuestions, {
        questions: questions.map((q: any) => ({
          ...q,
          isAiGenerated: true
        }))
      });
      
      // Update request as completed
      await ctx.runMutation(api.questionGeneration.updateStatus, {
        requestId,
        status: 'completed',
        generatedQuestions: questionIds
      });
      
    } catch (error) {
      // Update request as failed
      await ctx.runMutation(api.questionGeneration.updateStatus, {
        requestId,
        status: 'failed',
        errorMessage: (error as Error).message
      });
    }
  }
});

async function generateQuestionsWithFreeAI(request: any) {
  const { category, count, difficulty, prompt } = request;
  
  // Option 1: Use local Ollama (free, runs on user's machine)
  const ollamaUrl = process.env.OLLAMA_URL || 'http://localhost:11434';
  
  try {
    const response = await fetch(`${ollamaUrl}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama3.2:3b', // Free local model
        prompt: buildPrompt(category, count, difficulty),
        stream: false,
        options: {
          temperature: 0.7,
          max_tokens: 4000
        }
      })
    });
    
    if (response.ok) {
      const data = await response.json();
      return parseAIResponse(data.response);
    }
  } catch (ollamaError) {
    console.log('Ollama not available, trying alternative...');
  }
  
  // Option 2: Use HuggingFace Inference API (free tier)
  try {
    const hfResponse = await fetch(
      'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inputs: buildPrompt(category, count, difficulty),
          parameters: {
            max_new_tokens: 2000,
            temperature: 0.7
          }
        })
      }
    );
    
    if (hfResponse.ok) {
      const data = await hfResponse.json();
      return parseAIResponse(data[0]?.generated_text || '');
    }
  } catch (hfError) {
    console.log('HuggingFace API error:', (hfError as Error).message);
  }
  
  // Fallback: Generate template-based questions
  return generateTemplateQuestions(category, count, difficulty);
}

function buildPrompt(category: string, count: number, difficulty: string) {
  const categoryDescriptions = {
    panneaux: 'traffic signs and road markings',
    priorites: 'right-of-way rules and traffic priorities', 
    securite: 'road safety, vehicle maintenance, and driving conditions'
  };
  
  return `Generate ${count} multiple-choice questions about Swiss road law focusing on ${categoryDescriptions[category as keyof typeof categoryDescriptions]}.

Requirements:
- Difficulty level: ${difficulty}
- Each question should have exactly 4 answer choices (A, B, C, D)
- Include the correct answer number (0-3)
- Add LCR (Swiss road law) article references when applicable
- Provide brief explanations for correct answers
- Format as JSON array

Example format:
[
  {
    "category": "${category}",
    "question": "What does a triangular red sign with white border indicate?",
    "choices": ["Mandatory stop", "Give way", "No entry", "Speed limit"],
    "correctAnswer": 1,
    "explanation": "Triangular signs with red border indicate warnings or give way situations.",
    "lcrReference": "LCR Art. 32",
    "difficulty": "${difficulty}",
    "tags": ["signs", "priority"]
  }
]

Generate ${count} questions now:`;
}

function parseAIResponse(response: string) {
  try {
    // Try to extract JSON from response
    const jsonMatch = response.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch (error) {
    console.log('Failed to parse AI response as JSON');
  }
  
  // Fallback parsing or template generation
  return [];
}

function generateTemplateQuestions(category: string, count: number, difficulty: string) {
  // Fallback template-based generation when AI is unavailable
  const templates = {
    panneaux: [
      {
        question: "Que signifie un panneau triangulaire rouge avec bordure blanche?",
        choices: ["Arrêt obligatoire", "Cédez le passage", "Interdiction d'entrer", "Limitation de vitesse"],
        correctAnswer: 1,
        explanation: "Les panneaux triangulaires avec bordure rouge indiquent un cédez le passage.",
        lcrReference: "LCR Art. 32"
      }
    ],
    priorites: [
      {
        question: "À un carrefour sans signalisation, qui a la priorité?",
        choices: ["Véhicule venant de gauche", "Véhicule venant de droite", "Le plus gros véhicule", "Le plus rapide"],
        correctAnswer: 1,
        explanation: "En Suisse, la règle de la priorité à droite s'applique aux carrefours non signalisés.",
        lcrReference: "LCR Art. 36"
      }
    ],
    securite: [
      {
        question: "Quelle est la distance de sécurité minimale sur autoroute?",
        choices: ["1 seconde", "2 secondes", "3 secondes", "4 secondes"],
        correctAnswer: 2,
        explanation: "La règle des 3 secondes est recommandée pour maintenir une distance de sécurité.",
        lcrReference: "LCR Art. 34"
      }
    ]
  };
  
  const categoryTemplates = templates[category as keyof typeof templates] || templates.panneaux;
  const questions = [];
  
  for (let i = 0; i < Math.min(count, 10); i++) {
    const template = categoryTemplates[i % categoryTemplates.length];
    questions.push({
      ...template,
      category,
      difficulty,
      tags: [category, difficulty]
    });
  }
  
  return questions;
}
