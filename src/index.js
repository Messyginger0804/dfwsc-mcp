import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { coolifyTools } from "./tools/coolify.js";
import { nextcloudTools } from "./tools/nextcloud.js";

const server = new McpServer({
  name: "dfwsc-mcp",
  version: "1.0.0",
});

// Convert plain schema objects to zod shape for MCP SDK
function toZodShape(schema) {
  const shape = {};
  for (const [key, val] of Object.entries(schema)) {
    shape[key] = val.description
      ? z.string().describe(val.description)
      : z.string().optional();
  }
  return shape;
}

for (const tool of [...coolifyTools, ...nextcloudTools]) {
  const hasParams = Object.keys(tool.schema).length > 0;
  server.tool(
    tool.name,
    tool.description,
    hasParams ? toZodShape(tool.schema) : {},
    async (args) => {
      const result = await tool.handler(args);
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }
  );
}

const transport = new StdioServerTransport();
await server.connect(transport);
