import { api } from "./client.js";
import { createResourceTools } from "./factories.js";

export const projectTools = [
  ...createResourceTools({
    resource: "projects",
    label: "Project",
    description: "projects in Coolify",
    api,
  }),
  {
    name: "coolify_project_create",
    description: "Create a new project in Coolify",
    schema: {
      name: { type: "string", description: "Project name" },
      description: { type: "string", description: "Optional project description" },
    },
    handler: (args) => api("/projects", "POST", args),
  },
  {
    name: "coolify_project_update",
    description: "Update a project by UUID",
    schema: {
      uuid: { type: "string", description: "Project UUID" },
      name: { type: "string", description: "New project name" },
      description: { type: "string", description: "New project description" },
    },
    handler: ({ uuid, ...rest }) => api(`/projects/${uuid}`, "PATCH", rest),
  },
  {
    name: "coolify_project_environments",
    description: "List all environments for a project",
    schema: { uuid: { type: "string", description: "Project UUID" } },
    handler: ({ uuid }) => api(`/projects/${uuid}/environments`),
  },
  {
    name: "coolify_project_environment_create",
    description: "Create a new environment in a project",
    schema: {
      uuid: { type: "string", description: "Project UUID" },
      name: { type: "string", description: "Environment name" },
    },
    handler: ({ uuid, ...rest }) =>
      api(`/projects/${uuid}/environments`, "POST", rest),
  },
  {
    name: "coolify_project_environment_details",
    description: "Get details of a specific environment in a project",
    schema: {
      uuid: { type: "string", description: "Project UUID" },
      environment: { type: "string", description: "Environment name or UUID" },
    },
    handler: ({ uuid, environment }) => api(`/projects/${uuid}/${environment}`),
  },
];
