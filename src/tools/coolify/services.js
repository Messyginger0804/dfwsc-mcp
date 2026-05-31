import { api } from "./client.js";
import {
  createResourceTools,
  createCrudTools,
  createEnvTools,
  createStorageTools,
  createLifecycleTools,
} from "./factories.js";

export const serviceTools = [
  ...createResourceTools({
    resource: "services",
    label: "Service",
    description: "one-click services in Coolify",
    api,
  }),
  ...createCrudTools({
    resource: "services",
    label: "Service",
    createFields: {
      project_uuid: { type: "string", description: "Project UUID" },
      server_uuid: { type: "string", description: "Server UUID" },
      environment_name: { type: "string", description: "Environment name (default: production)" },
      name: { type: "string", description: "Service name" },
      description: { type: "string", description: "Optional description" },
      service_type: { type: "string", description: "Service type (e.g. 'wordpress', 'plausible', 'grafana')" },
      instant_deploy: { type: "string", description: "Optional — 'true' to deploy immediately" },
    },
    updateFields: {
      name: { type: "string", description: "New service name" },
      description: { type: "string", description: "New description" },
    },
    api,
  }),
  ...createEnvTools({ resource: "services", api }),
  ...createStorageTools({ resource: "services", api }),
  ...createLifecycleTools({ resource: "services", api }),
];
