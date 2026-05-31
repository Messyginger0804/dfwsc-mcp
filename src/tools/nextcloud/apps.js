import { occ } from "./client.js";

export const appTools = [
  {
    name: "nextcloud_occ",
    description: "Run any occ CLI command on the Nextcloud server",
    schema: {
      command: { type: "string", description: "occ subcommand (e.g. 'status', 'app:list', 'maintenance:repair')" },
    },
    handler: ({ command }) => occ(command),
  },
  {
    name: "nextcloud_app_list",
    description: "List all installed Nextcloud apps and their status",
    schema: {},
    handler: () => occ("app:list"),
  },
  {
    name: "nextcloud_app_enable",
    description: "Enable a Nextcloud app",
    schema: { app: { type: "string", description: "App ID to enable" } },
    handler: ({ app }) => occ(`app:enable ${app}`),
  },
  {
    name: "nextcloud_app_disable",
    description: "Disable a Nextcloud app",
    schema: { app: { type: "string", description: "App ID to disable" } },
    handler: ({ app }) => occ(`app:disable ${app}`),
  },
  {
    name: "nextcloud_status",
    description: "Get Nextcloud server status (version, maintenance mode, etc.)",
    schema: {},
    handler: () => occ("status"),
  },
  {
    name: "nextcloud_maintenance_mode",
    description: "Toggle maintenance mode on or off",
    schema: {
      mode: { type: "string", description: "'on' or 'off'" },
    },
    handler: ({ mode }) => occ(`maintenance:mode --${mode}`),
  },
];
