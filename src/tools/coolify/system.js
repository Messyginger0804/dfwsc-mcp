import { api } from "./client.js";

export const systemTools = [
  {
    name: "coolify_healthcheck",
    description: "Check Coolify API health status",
    schema: {},
    handler: () => api("/health"),
  },
  {
    name: "coolify_version",
    description: "Get the installed Coolify version",
    schema: {},
    handler: () => api("/version"),
  },
];
