import { api } from "./client.js";

export const cloudProviderTools = [
  {
    name: "coolify_cloud_tokens_list",
    description: "List all cloud provider tokens (Hetzner, etc.)",
    schema: {},
    handler: () => api("/cloud-tokens"),
  },
  {
    name: "coolify_cloud_token_get",
    description: "Get details of a cloud provider token by UUID",
    schema: { uuid: { type: "string", description: "Cloud token UUID" } },
    handler: ({ uuid }) => api(`/cloud-tokens/${uuid}`),
  },
  {
    name: "coolify_cloud_token_create",
    description: "Add a new cloud provider token",
    schema: {
      name: { type: "string", description: "Token name" },
      provider: { type: "string", description: "Provider name (e.g. 'hetzner')" },
      api_token: { type: "string", description: "API token value" },
    },
    handler: (args) => api("/cloud-tokens", "POST", args),
  },
  {
    name: "coolify_cloud_token_update",
    description: "Update a cloud provider token by UUID",
    schema: {
      uuid: { type: "string", description: "Cloud token UUID" },
      name: { type: "string", description: "New token name" },
      api_token: { type: "string", description: "New API token value" },
    },
    handler: ({ uuid, ...rest }) => api(`/cloud-tokens/${uuid}`, "PATCH", rest),
  },
  {
    name: "coolify_cloud_token_validate",
    description: "Validate a cloud provider token",
    schema: { uuid: { type: "string", description: "Cloud token UUID" } },
    handler: ({ uuid }) => api(`/cloud-tokens/${uuid}/validate`, "POST"),
  },
  {
    name: "coolify_hetzner_locations",
    description: "List available Hetzner data center locations",
    schema: {},
    handler: () => api("/hetzner/locations"),
  },
  {
    name: "coolify_hetzner_server_types",
    description: "List available Hetzner server types",
    schema: {},
    handler: () => api("/hetzner/server-types"),
  },
  {
    name: "coolify_hetzner_images",
    description: "List available Hetzner images",
    schema: {},
    handler: () => api("/hetzner/images"),
  },
  {
    name: "coolify_hetzner_ssh_keys",
    description: "List Hetzner SSH keys associated with the account",
    schema: {},
    handler: () => api("/hetzner/ssh-keys"),
  },
  {
    name: "coolify_hetzner_create_server",
    description: "Create a new Hetzner server and add it to Coolify",
    schema: {
      name: { type: "string", description: "Server name" },
      cloud_token_uuid: { type: "string", description: "Hetzner cloud token UUID" },
      server_type: { type: "string", description: "Server type (e.g. 'cx22')" },
      location: { type: "string", description: "Location (e.g. 'fsn1')" },
      image: { type: "string", description: "Image (e.g. 'ubuntu-22.04')" },
      ssh_keys: { type: "string", description: "JSON array of SSH key IDs" },
    },
    handler: (args) => {
      const payload = { ...args };
      if (payload.ssh_keys) payload.ssh_keys = JSON.parse(payload.ssh_keys);
      return api("/servers/hetzner", "POST", payload);
    },
  },
];
