# MCP server architecture

A stdio MCP server (Node, ES modules) exposing Coolify and Nextcloud operations as tools. See `README.md` for the full tool list and layout tree.

## Entry points
- `src/index.js`: creates the `McpServer`, registers every tool from `allTools`, connects a `StdioServerTransport`. Handler results are returned as pretty-printed JSON text; thrown errors come back as `Error: <message>` with `isError: true`.
- `src/tools/index.js`: `allTools = [...coolifyTools, ...nextcloudTools]`.
- `src/tools/coolify/index.js` and `src/tools/nextcloud/index.js`: concatenate each area's tool arrays. A new tool file must be added to its area's `index.js` or it is never registered.

## Tool shape
Every tool is a plain object: `{ name, description, schema, handler }`.
- `schema` maps param name to `{ type: "string", description }`.
- `handler(args)` returns data (usually the API response) or throws.

## Schema conversion gotcha
`src/utils.js` `toZodShape` turns every param into `z.string()`. A param that has a `description` becomes REQUIRED; only a param without one is optional. Almost all schemas carry descriptions, so params documented as "Optional ..." are still required by the MCP layer. Everything is a string: booleans, numbers and JSON bodies are passed as strings (for example `nextcloud_nextledger_request` takes `body` as a JSON string and calls `JSON.parse`).

## Coolify code
- `src/tools/coolify/client.js`: `api(path, method, body)` prefixes `/api/v1`, sends a bearer token, 30 s abort timeout, parses JSON (falls back to text), throws `Coolify API <status>: <message>` on non-2xx.
- `src/tools/coolify/factories.js`: generators for repeated patterns (list/get, create/update CRUD, env var tools, and others). Prefer these when adding a resource that follows the standard Coolify REST shape.
- One file per resource area (applications, databases, services, servers, projects, deployments, teams, ssh-keys, cloud-providers, github-apps, scheduled-tasks, system).

## Nextcloud code
See `nextcloud-integration.md`.

## Versions
`package.json` says 1.0.0 while `src/index.js` reports server version 2.0.0; the two are not kept in sync.
