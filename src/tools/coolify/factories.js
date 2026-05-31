export function createResourceTools({ resource, label, description, api }) {
  return [
    {
      name: `coolify_${resource}_list`,
      description: `List all ${description}`,
      schema: {},
      handler: () => api(`/${resource}`),
    },
    {
      name: `coolify_${resource}_get`,
      description: `Get full configuration of a ${label.toLowerCase()}`,
      schema: { uuid: { type: "string", description: `${label} UUID` } },
      handler: ({ uuid }) => api(`/${resource}/${uuid}`),
    },
  ];
}

export function createCrudTools({ resource, label, createFields, updateFields, api }) {
  return [
    {
      name: `coolify_${resource}_create`,
      description: `Create a new ${label.toLowerCase()}`,
      schema: createFields,
      handler: (args) => api(`/${resource}`, "POST", args),
    },
    {
      name: `coolify_${resource}_update`,
      description: `Update a ${label.toLowerCase()} by UUID`,
      schema: { uuid: { type: "string", description: `${label} UUID` }, ...updateFields },
      handler: ({ uuid, ...rest }) => api(`/${resource}/${uuid}`, "PATCH", rest),
    },
  ];
}

export function createEnvTools({ resource, api }) {
  const singular = resource.replace(/s$/, "");
  return [
    {
      name: `coolify_${singular}_env_list`,
      description: `List environment variables for a ${singular}`,
      schema: { uuid: { type: "string", description: `${singular} UUID` } },
      handler: ({ uuid }) => api(`/${resource}/${uuid}/envs`),
    },
    {
      name: `coolify_${singular}_env_create`,
      description: `Add an environment variable to a ${singular}`,
      schema: {
        uuid: { type: "string", description: `${singular} UUID` },
        key: { type: "string", description: "Variable name" },
        value: { type: "string", description: "Variable value" },
        is_literal: { type: "string", description: "Optional — 'true' or 'false'" },
      },
      handler: ({ uuid, ...rest }) => api(`/${resource}/${uuid}/envs`, "POST", rest),
    },
    {
      name: `coolify_${singular}_env_update`,
      description: `Update an environment variable on a ${singular}`,
      schema: {
        uuid: { type: "string", description: `${singular} UUID` },
        env_uuid: { type: "string", description: "Environment variable UUID" },
        key: { type: "string", description: "Variable name" },
        value: { type: "string", description: "Variable value" },
        is_literal: { type: "string", description: "Optional — 'true' or 'false'" },
      },
      handler: ({ uuid, env_uuid, ...rest }) =>
        api(`/${resource}/${uuid}/envs/${env_uuid}`, "PATCH", rest),
    },
    {
      name: `coolify_${singular}_env_bulk_update`,
      description: `Bulk update multiple environment variables on a ${singular}`,
      schema: {
        uuid: { type: "string", description: `${singular} UUID` },
        envs: { type: "string", description: "JSON array of env objects with key/value" },
      },
      handler: ({ uuid, envs }) =>
        api(`/${resource}/${uuid}/envs/bulk`, "PATCH", { envs: JSON.parse(envs) }),
    },
  ];
}

export function createStorageTools({ resource, api }) {
  const singular = resource.replace(/s$/, "");
  return [
    {
      name: `coolify_${singular}_storage_list`,
      description: `List persistent storages attached to a ${singular}`,
      schema: { uuid: { type: "string", description: `${singular} UUID` } },
      handler: ({ uuid }) => api(`/${resource}/${uuid}/storages`),
    },
    {
      name: `coolify_${singular}_storage_create`,
      description: `Attach a persistent storage to a ${singular}`,
      schema: {
        uuid: { type: "string", description: `${singular} UUID` },
        name: { type: "string", description: "Storage name" },
        mount_path: { type: "string", description: "Container mount path" },
        host_path: { type: "string", description: "Host path (optional for NFS)" },
      },
      handler: ({ uuid, ...rest }) =>
        api(`/${resource}/${uuid}/storages`, "POST", rest),
    },
    {
      name: `coolify_${singular}_storage_update`,
      description: `Update a persistent storage on a ${singular}`,
      schema: {
        uuid: { type: "string", description: `${singular} UUID` },
        storage_uuid: { type: "string", description: "Storage UUID" },
        name: { type: "string", description: "Storage name" },
        mount_path: { type: "string", description: "Container mount path" },
      },
      handler: ({ uuid, storage_uuid, ...rest }) =>
        api(`/${resource}/${uuid}/storages/${storage_uuid}`, "PATCH", rest),
    },
  ];
}

export function createLifecycleTools({ resource, api, actions = ["deploy", "restart", "stop", "start"] }) {
  const verbs = {
    deploy: "Trigger a deployment for",
    restart: "Restart",
    stop: "Stop",
    start: "Start a stopped",
  };

  return actions.map((action) => ({
    name: `coolify_${resource.replace(/s$/, "")}_${action}`,
    description: `${verbs[action] || action} a ${resource.replace(/s$/, "")}`,
    schema: { uuid: { type: "string", description: `${resource.replace(/s$/, "")} UUID` } },
    handler: ({ uuid }) => api(`/${resource}/${uuid}/${action}`, "POST"),
  }));
}
