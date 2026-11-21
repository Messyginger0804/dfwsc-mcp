# Local setup, run and environment

Basics are in `README.md` (Setup, Run, client config examples). Additional facts:

## Commands
- `npm install` then `npm start` (runs `node src/index.js`). There is no build step, test script, linter or CI workflow in the repo.
- The server speaks MCP over stdio, so running it in a terminal just waits for input. Use it through an MCP client (README shows OpenCode and Claude Desktop configs with an absolute path to `src/index.js`).
- Dependencies: `@modelcontextprotocol/sdk` and `zod` only. `package.json` sets `"type": "module"`.

## Environment variables (names only; copy `.env.example` to `.env`, which is gitignored)
- `COOLIFY_URL`, `COOLIFY_TOKEN`: Coolify API base and bearer token.
- `NEXTCLOUD_URL`, `NEXTCLOUD_USER`, `NEXTCLOUD_PASSWORD`: Nextcloud base and basic-auth credentials.
- `NEXTCLOUD_OCC_PATH` (optional): command used to invoke `occ`.
- `NEXTLEDGER_API_PREFIX` (optional, read in `src/tools/nextcloud/nextledger.js`, not listed in `.env.example`).

Note: the server does not load `.env` itself (no dotenv). Variables must be in the process environment, either exported or passed by the MCP client config's `env` / `environment` block.

## Adding a tool
1. Add the object to the right file under `src/tools/coolify/` or `src/tools/nextcloud/`, or create a file and register it in that area's `index.js`.
2. Remember that all params are strings and described params are required (see `mcp-architecture.md`).
3. Update the tool tables in `README.md` if you want them to stay accurate; they are hand-maintained.
