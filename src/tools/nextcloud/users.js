import { ocs } from "./client.js";

export const userTools = [
  {
    name: "nextcloud_users_list",
    description: "List all Nextcloud users",
    schema: {},
    handler: () => ocs("/cloud/users"),
  },
  {
    name: "nextcloud_user_create",
    description: "Create a new Nextcloud user",
    schema: {
      userid: { type: "string", description: "Username" },
      password: { type: "string", description: "Password" },
      displayName: { type: "string", description: "Optional display name" },
      email: { type: "string", description: "Optional email address" },
    },
    handler: ({ userid, password, displayName, email }) =>
      ocs("/cloud/users", "POST", {
        userid,
        password,
        ...(displayName ? { displayName } : {}),
        ...(email ? { email } : {}),
      }),
  },
  {
    name: "nextcloud_user_delete",
    description: "Delete a Nextcloud user",
    schema: { userid: { type: "string", description: "Username to delete" } },
    handler: ({ userid }) => ocs(`/cloud/users/${userid}`, "DELETE"),
  },
  {
    name: "nextcloud_user_info",
    description: "Get detailed info about a specific Nextcloud user",
    schema: { userid: { type: "string", description: "Username" } },
    handler: ({ userid }) => ocs(`/cloud/users/${userid}`),
  },
  {
    name: "nextcloud_user_enable",
    description: "Enable a Nextcloud user account",
    schema: { userid: { type: "string", description: "Username" } },
    handler: ({ userid }) => ocs(`/cloud/users/${userid}/enable`, "PUT"),
  },
  {
    name: "nextcloud_user_disable",
    description: "Disable a Nextcloud user account",
    schema: { userid: { type: "string", description: "Username" } },
    handler: ({ userid }) => ocs(`/cloud/users/${userid}/disable`, "PUT"),
  },
];
