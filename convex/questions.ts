// @ts-nocheck
import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const getQuestionsByCategory = query({
  args: { 
    category: v.union(v.literal('panneaux'), v.literal('priorites'), v.literal('securite')),
    limit: v.optional(v.number()),
    difficulty: v.optional(v.union(v.literal('easy'), v.literal('medium'), v.literal('hard')))
  },
  handler: async (ctx, { category, limit = 10, difficulty }) => {
    let query = ctx.db.query('questions').withIndex('by_category', q => q.eq('category', category));
    
    if (difficulty) {
      query = query.filter(q => q.eq(q.field('difficulty'), difficulty));
    }
    
    const questions = await query.take(limit);
    return questions;
  }
});

export const getRandomQuestions = query({
  args: { 
    category: v.union(v.literal('panneaux'), v.literal('priorites'), v.literal('securite')),
    count: v.optional(v.number())
  },
  handler: async (ctx, { category, count = 10 }) => {
    const allQuestions = await ctx.db.query('questions')
      .withIndex('by_category', q => q.eq('category', category))
      .collect();
    
    // Simple shuffle and take
    const shuffled = allQuestions.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, shuffled.length));
  }
});

export const addQuestion = mutation({
  args: {
    category: v.union(v.literal('panneaux'), v.literal('priorites'), v.literal('securite')),
    question: v.string(),
    choices: v.array(v.string()),
    correctAnswer: v.number(),
    explanation: v.optional(v.string()),
    lcrReference: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    difficulty: v.union(v.literal('easy'), v.literal('medium'), v.literal('hard')),
    tags: v.optional(v.array(v.string())),
    isAiGenerated: v.optional(v.boolean())
  },
  handler: async (ctx, args) => {
    const questionData = {
      ...args,
      tags: args.tags || [],
      isAiGenerated: args.isAiGenerated || false,
      createdAt: Date.now()
    };
    
    const id = await ctx.db.insert('questions', questionData);
    return id;
  }
});

export const bulkAddQuestions = mutation({
  args: {
    questions: v.array(v.object({
      category: v.union(v.literal('panneaux'), v.literal('priorites'), v.literal('securite')),
      question: v.string(),
      choices: v.array(v.string()),
      correctAnswer: v.number(),
      explanation: v.optional(v.string()),
      lcrReference: v.optional(v.string()),
      imageUrl: v.optional(v.string()),
      difficulty: v.union(v.literal('easy'), v.literal('medium'), v.literal('hard')),
      tags: v.optional(v.array(v.string())),
      isAiGenerated: v.optional(v.boolean())
    }))
  },
  handler: async (ctx, { questions }) => {
    const ids = [];
    for (const question of questions) {
      const questionData = {
        ...question,
        tags: question.tags || [],
        isAiGenerated: question.isAiGenerated || false,
        createdAt: Date.now()
      };
      const id = await ctx.db.insert('questions', questionData);
      ids.push(id);
    }
    return ids;
  }
});

export const generateQuestionsWithAI = mutation({
  args: {
    category: v.union(v.literal('panneaux'), v.literal('priorites'), v.literal('securite')),
    count: v.number(),
    difficulty: v.union(v.literal('easy'), v.literal('medium'), v.literal('hard')),
    prompt: v.optional(v.string())
  },
  handler: async (ctx, { category, count, difficulty, prompt }) => {
    const basePrompt = prompt || `Generate ${count} Swiss road law questions for category "${category}" with difficulty "${difficulty}". Include LCR references where applicable.`;
    
    // Create generation request
    const requestId = await ctx.db.insert('questionGeneration', {
      prompt: basePrompt,
      category,
      count,
      difficulty,
      status: 'pending',
      createdAt: Date.now()
    });
    
    // Schedule AI generation (this would be handled by a background action/cron)
    await ctx.scheduler.runAfter(0, "processQuestionGeneration", { requestId });
    
    return requestId;
  }
});
