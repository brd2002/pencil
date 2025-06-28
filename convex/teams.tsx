import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
export const getTeam = query({
  args: {
    email: v.optional( v.string()),
  },
  handler: async (ctx, args) => {
    if(args.email){
       const result = await ctx.db
      .query("teams")
      .filter((q) => q.eq(q.field("createdBy"), args.email))
      .collect();
      return result;
    }
    // do something with `task`
  },
});
export const createTeam = mutation({
  args: { teamName: v.string(), createdBy: v.string() },
  handler: async (ctx, args) => {
    const team = await ctx.db.insert("teams", args);
    return team;
    // do something with `taskId`
  },
});
