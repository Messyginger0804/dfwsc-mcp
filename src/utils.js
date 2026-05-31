import { z } from "zod";

export function toZodShape(schema) {
  const shape = {};
  for (const [key, val] of Object.entries(schema)) {
    shape[key] = val.description
      ? z.string().describe(val.description)
      : z.string().optional();
  }
  return shape;
}
