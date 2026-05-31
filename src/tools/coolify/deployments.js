import { api } from "./client.js";

export const deploymentTools = [
  {
    name: "coolify_deploy",
    description: "Deploy an application or service by tag or UUID",
    schema: {
      uuid: { type: "string", description: "Resource UUID to deploy" },
      tag: { type: "string", description: "Optional tag to deploy" },
    },
    handler: (args) => api("/deploy", "POST", args),
  },
  {
    name: "coolify_deployments_list",
    description: "List currently running or recent deployments",
    schema: {},
    handler: () => api("/deployments"),
  },
  {
    name: "coolify_deployment_get",
    description: "Get details of a specific deployment by UUID",
    schema: { uuid: { type: "string", description: "Deployment UUID" } },
    handler: ({ uuid }) => api(`/deployments/${uuid}`),
  },
  {
    name: "coolify_deployment_cancel",
    description: "Cancel a running deployment",
    schema: { uuid: { type: "string", description: "Deployment UUID to cancel" } },
    handler: ({ uuid }) => api(`/deployments/${uuid}/cancel`, "POST"),
  },
];
