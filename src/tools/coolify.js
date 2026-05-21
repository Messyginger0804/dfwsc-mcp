const BASE = () => process.env.COOLIFY_URL;
const headers = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.COOLIFY_TOKEN}`,
});

async function api(path, method = "GET", body) {
  const res = await fetch(`${BASE()}/api/v1${path}`, {
    method,
    headers: headers(),
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  try { return JSON.parse(text); } catch { return text; }
}

export const coolifyTools = [
  {
    name: "coolify_list_projects",
    description: "List all Coolify projects",
    schema: {},
    handler: () => api("/projects"),
  },
  {
    name: "coolify_list_applications",
    description: "List all applications in Coolify",
    schema: {},
    handler: () => api("/applications"),
  },
  {
    name: "coolify_get_application",
    description: "Get details of a specific application",
    schema: { uuid: { type: "string", description: "Application UUID" } },
    handler: ({ uuid }) => api(`/applications/${uuid}`),
  },
  {
    name: "coolify_deploy_application",
    description: "Trigger a deployment for an application",
    schema: { uuid: { type: "string", description: "Application UUID" } },
    handler: ({ uuid }) => api(`/applications/${uuid}/deploy`, "POST"),
  },
  {
    name: "coolify_restart_application",
    description: "Restart an application",
    schema: { uuid: { type: "string", description: "Application UUID" } },
    handler: ({ uuid }) => api(`/applications/${uuid}/restart`, "POST"),
  },
  {
    name: "coolify_stop_application",
    description: "Stop an application",
    schema: { uuid: { type: "string", description: "Application UUID" } },
    handler: ({ uuid }) => api(`/applications/${uuid}/stop`, "POST"),
  },
  {
    name: "coolify_start_application",
    description: "Start a stopped application",
    schema: { uuid: { type: "string", description: "Application UUID" } },
    handler: ({ uuid }) => api(`/applications/${uuid}/start`, "POST"),
  },
  {
    name: "coolify_list_services",
    description: "List all services (databases, etc.) in Coolify",
    schema: {},
    handler: () => api("/services"),
  },
  {
    name: "coolify_list_servers",
    description: "List all servers managed by Coolify",
    schema: {},
    handler: () => api("/servers"),
  },
  {
    name: "coolify_get_deployments",
    description: "Get deployment history for an application",
    schema: { uuid: { type: "string", description: "Application UUID" } },
    handler: ({ uuid }) => api(`/applications/${uuid}/deployments`),
  },
];
