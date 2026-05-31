import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { allTools } from "./tools/index.js";
import { toZodShape } from "./utils.js";

const server = new McpServer({
  name: "dfwsc-mcp",
  version: "2.0.0",
});

for (const tool of allTools) {
  const hasParams = Object.keys(tool.schema).length > 0;
  server.tool(
    tool.name,
    tool.description,
    hasParams ? toZodShape(tool.schema) : {},
    async (args) => {
      try {
        const result = await tool.handler(args);
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      } catch (err) {
        return {
          content: [{ type: "text", text: `Error: ${err.message}` }],
          isError: true,
        };
      }
    }
  );
}

const transport = new StdioServerTransport();
await server.connect(transport);
