// @ts-nocheck
import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const listByUser = query({
  args: { userId: v.string() },
  handler: async (ctx, { userId }) => {
    return await ctx.db.query('results').withIndex('by_user_time', q => q.eq('userId', userId)).order('desc').take(50)
  }
});

export const save = mutation({
  args: {
    userId: v.string(),
    displayName: v.optional(v.string()),
    category: v.union(v.literal('panneaux'), v.literal('priorites'), v.literal('securite')),
    correct: v.number(),
    total: v.number(),
    answers: v.record(v.string(), v.string()),
  },
  handler: async (ctx, args) => {
    const doc = { ...args, createdAt: Date.now() }
    const id = await ctx.db.insert('results', doc)
    return id
  }
});
