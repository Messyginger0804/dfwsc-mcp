import { api } from "./client.js";

export const sshKeyTools = [
  {
    name: "coolify_ssh_keys_list",
    description: "List all SSH private keys configured in Coolify",
    schema: {},
    handler: () => api("/security/keys"),
  },
  {
    name: "coolify_ssh_key_get",
    description: "Get details of a specific SSH key by UUID",
    schema: { uuid: { type: "string", description: "SSH key UUID" } },
    handler: ({ uuid }) => api(`/security/keys/${uuid}`),
  },
  {
    name: "coolify_ssh_key_create",
    description: "Create a new SSH private key in Coolify",
    schema: {
      name: { type: "string", description: "Key name" },
      private_key: { type: "string", description: "Private key content (PEM format)" },
      is_git_related: { type: "string", description: "Optional — 'true' if used for Git" },
    },
    handler: (args) => api("/security/keys", "POST", args),
  },
  {
    name: "coolify_ssh_key_update",
    description: "Update an SSH key by UUID",
    schema: {
      uuid: { type: "string", description: "SSH key UUID" },
      name: { type: "string", description: "New key name" },
      private_key: { type: "string", description: "New private key content" },
    },
    handler: ({ uuid, ...rest }) => api(`/security/keys/${uuid}`, "PATCH", rest),
  },
];
