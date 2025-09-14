// @ts-nocheck
import { defineSchema, defineTable } from "./_generated/server";
import { v } from "convex/values";

export default defineSchema({
  results: defineTable({
    userId: v.string(),
    displayName: v.optional(v.string()),
    category: v.union(v.literal('panneaux'), v.literal('priorites'), v.literal('securite')),
    correct: v.number(),
    total: v.number(),
    answers: v.record(v.string(), v.string()),
    createdAt: v.number(),
  }).index('by_user', ['userId']).index('by_user_time', ['userId', 'createdAt']),
  
  questions: defineTable({
    category: v.union(v.literal('panneaux'), v.literal('priorites'), v.literal('securite')),
    question: v.string(),
    choices: v.array(v.string()),
    correctAnswer: v.number(),
    explanation: v.optional(v.string()),
    lcrReference: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    difficulty: v.union(v.literal('easy'), v.literal('medium'), v.literal('hard')),
    tags: v.array(v.string()),
    isAiGenerated: v.boolean(),
    createdAt: v.number(),
  }).index('by_category', ['category']).index('by_difficulty', ['difficulty']).index('by_tags', ['tags']),
  
  questionGeneration: defineTable({
    prompt: v.string(),
    category: v.union(v.literal('panneaux'), v.literal('priorites'), v.literal('securite')),
    count: v.number(),
    difficulty: v.union(v.literal('easy'), v.literal('medium'), v.literal('hard')),
    status: v.union(v.literal('pending'), v.literal('processing'), v.literal('completed'), v.literal('failed')),
    generatedQuestions: v.optional(v.array(v.id('questions'))),
    errorMessage: v.optional(v.string()),
    createdAt: v.number(),
  }).index('by_status', ['status'])
});
