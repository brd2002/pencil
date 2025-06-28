import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
export const getFile = query({
  args: {
    teamId: v.optional( v.string()),
  },
  handler: async (ctx, args) => {
    if(args.teamId){
       const result = await ctx.db
      .query("files")
      .filter((q) => q.eq(q.field("teamId"), args.teamId))
      .order("desc")
      .collect();
      return result;
    }
  },
});
export const createFile = mutation({
  args: {
    fileName: v.string(),
    teamId: v.optional( v.string()),
    createdBy: v.string(),
    archive: v.boolean(),
    document: v.string(),
    whiteboard: v.string(),
  },
  handler: async (ctx, args) => {
    const file = await ctx.db.insert("files", args);
    return file;
    // do something with `taskId`
  },
});

export const updateFile = mutation({
  args:{
    _id:v.id('files'),
    document:v.string()
  },
  handler: async (ctx, args) => {
      const result = await ctx.db.patch(args._id , {document : args.document});
      return result;
  },
})
export const updateCanvas = mutation({
  args:{
    _id:v.id('files'),
    whiteboard:v.string()
  },
  handler: async (ctx, args) => {
      const result = await ctx.db.patch(args._id , {whiteboard : args.whiteboard});
      return result;
  },
})
export const getFileById = query({
  args: {
    _id:v.id('files'),
  },
  handler: async (ctx, args) => {
    const file = await ctx.db.get(args._id);
    return file;
  },
});