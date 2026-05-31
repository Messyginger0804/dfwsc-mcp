import { ocsApps } from "./client.js";

export const statusTools = [
  {
    name: "nextcloud_user_status_get",
    description: "Get the current user's Nextcloud status",
    schema: {},
    handler: () => ocsApps("/user_status/api/v1/user_status"),
  },
  {
    name: "nextcloud_user_status_get_by_user",
    description: "Get Nextcloud status for a specific user",
    schema: {
      userId: { type: "string", description: "Nextcloud user ID" },
    },
    handler: ({ userId }) => ocsApps(`/user_status/api/v1/user_status/${userId}`),
  },
  {
    name: "nextcloud_user_status_set_type",
    description: "Set current user's Nextcloud status type",
    schema: {
      statusType: { type: "string", description: "online, away, dnd, or invisible" },
    },
    handler: ({ statusType }) =>
      ocsApps("/user_status/api/v1/user_status/status", "PUT", { statusType }),
  },
  {
    name: "nextcloud_user_status_set_message",
    description: "Set custom message for current user's Nextcloud status",
    schema: {
      message: { type: "string", description: "Custom status message" },
      icon: { type: "string", description: "Optional status icon (emoji or icon name)" },
      clearAt: { type: "string", description: "Optional Unix timestamp when status clears" },
    },
    handler: ({ message, icon, clearAt }) =>
      ocsApps("/user_status/api/v1/user_status/message", "PUT", {
        message,
        ...(icon ? { icon } : {}),
        ...(clearAt ? { clearAt } : {}),
      }),
  },
  {
    name: "nextcloud_user_status_clear_message",
    description: "Clear custom message for current user's Nextcloud status",
    schema: {},
    handler: () => ocsApps("/user_status/api/v1/user_status/message", "DELETE"),
  },
  {
    name: "nextcloud_user_status_set_predefined",
    description: "Set a predefined status with optional clear time",
    schema: {
      messageId: { type: "string", description: "dont-disturb, away, online, invisible, etc." },
      clearAt: { type: "string", description: "Optional Unix timestamp when status clears" },
    },
    handler: ({ messageId, clearAt }) =>
      ocsApps("/user_status/api/v1/user_status/predefined_message", "PUT", {
        messageId,
        ...(clearAt ? { clearAt } : {}),
      }),
  },
  {
    name: "nextcloud_user_status_clear_predefined",
    description: "Clear predefined status for current user",
    schema: {},
    handler: () => ocsApps("/user_status/api/v1/user_status/predefined_message", "DELETE"),
  },
];
