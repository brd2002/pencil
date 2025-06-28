import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
export const getUser = query({
  args: {
    email: v.optional( v.string()),
  },
  handler: async (ctx, args) => {
    if(args.email){
       const result = await ctx.db
      .query("user")
      .filter((q) => q.eq(q.field("email"), args.email))
      .collect();
      return result;
    }
    // do something with `task`
  },
});
export const createUser = mutation({
  args: { name: v.string(), email: v.string(), image: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db.insert("user", args);
    return user;
    // do something with `taskId`
  },
});
