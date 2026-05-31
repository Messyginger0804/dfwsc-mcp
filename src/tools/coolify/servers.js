import { api } from "./client.js";

export const serverTools = [
  {
    name: "coolify_servers_list",
    description: "List all servers managed by Coolify",
    schema: {},
    handler: () => api("/servers"),
  },
  {
    name: "coolify_server_get",
    description: "Get full details of a server by UUID including system info and configuration",
    schema: { uuid: { type: "string", description: "Server UUID" } },
    handler: ({ uuid }) => api(`/servers/${uuid}`),
  },
  {
    name: "coolify_server_create",
    description: "Add a new server to Coolify",
    schema: {
      name: { type: "string", description: "Server name" },
      description: { type: "string", description: "Optional server description" },
      ip: { type: "string", description: "Server IP address" },
      port: { type: "string", description: "SSH port (default 22)" },
      user: { type: "string", description: "SSH user (default root)" },
      private_key_uuid: { type: "string", description: "UUID of the SSH private key to use" },
    },
    handler: (args) => api("/servers", "POST", args),
  },
  {
    name: "coolify_server_update",
    description: "Update a server's configuration by UUID",
    schema: {
      uuid: { type: "string", description: "Server UUID" },
      name: { type: "string", description: "New server name" },
      description: { type: "string", description: "New server description" },
    },
    handler: ({ uuid, ...rest }) => api(`/servers/${uuid}`, "PATCH", rest),
  },
  {
    name: "coolify_server_domains",
    description: "Get all domains associated with a server",
    schema: { uuid: { type: "string", description: "Server UUID" } },
    handler: ({ uuid }) => api(`/servers/${uuid}/domains`),
  },
  {
    name: "coolify_server_resources",
    description: "Get resource usage (CPU, memory, disk) for a server",
    schema: { uuid: { type: "string", description: "Server UUID" } },
    handler: ({ uuid }) => api(`/servers/${uuid}/resources`),
  },
  {
    name: "coolify_server_validate",
    description: "Validate connectivity and prerequisites for a server",
    schema: { uuid: { type: "string", description: "Server UUID" } },
    handler: ({ uuid }) => api(`/servers/${uuid}/validate`, "POST"),
  },
  {
    name: "coolify_resources_list",
    description: "List all resources (apps, databases, services) across all servers",
    schema: {},
    handler: () => api("/resources"),
  },
];
