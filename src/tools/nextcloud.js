import { execSync } from "child_process";

const BASE = () => process.env.NEXTCLOUD_URL;
const auth = () =>
  Buffer.from(`${process.env.NEXTCLOUD_USER}:${process.env.NEXTCLOUD_PASSWORD}`).toString("base64");

async function ocs(path, method = "GET", body) {
  const res = await fetch(`${BASE()}/ocs/v1.php${path}`, {
    method,
    headers: {
      Authorization: `Basic ${auth()}`,
      "OCS-APIRequest": "true",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body ? new URLSearchParams(body).toString() : undefined,
  });
  return res.text();
}

function occ(cmd) {
  const occPath = process.env.NEXTCLOUD_OCC_PATH || "php /var/www/html/occ";
  try {
    return execSync(`${occPath} ${cmd}`, { encoding: "utf8" });
  } catch (e) {
    return e.stderr || e.message;
  }
}

export const nextcloudTools = [
  {
    name: "nextcloud_list_users",
    description: "List all Nextcloud users",
    schema: {},
    handler: () => ocs("/cloud/users"),
  },
  {
    name: "nextcloud_create_user",
    description: "Create a new Nextcloud user",
    schema: {
      userid: { type: "string" },
      password: { type: "string" },
      displayName: { type: "string", description: "Optional display name" },
    },
    handler: ({ userid, password, displayName }) =>
      ocs("/cloud/users", "POST", { userid, password, ...(displayName ? { displayName } : {}) }),
  },
  {
    name: "nextcloud_delete_user",
    description: "Delete a Nextcloud user",
    schema: { userid: { type: "string" } },
    handler: ({ userid }) => ocs(`/cloud/users/${userid}`, "DELETE"),
  },
  {
    name: "nextcloud_list_groups",
    description: "List all Nextcloud groups",
    schema: {},
    handler: () => ocs("/cloud/groups"),
  },
  {
    name: "nextcloud_create_group",
    description: "Create a new Nextcloud group",
    schema: { groupid: { type: "string" } },
    handler: ({ groupid }) => ocs("/cloud/groups", "POST", { groupid }),
  },
  {
    name: "nextcloud_add_user_to_group",
    description: "Add a user to a group",
    schema: { userid: { type: "string" }, groupid: { type: "string" } },
    handler: ({ userid, groupid }) => ocs(`/cloud/users/${userid}/groups`, "POST", { groupid }),
  },
  {
    name: "nextcloud_occ",
    description: "Run any occ CLI command on the Nextcloud server",
    schema: { command: { type: "string", description: "occ subcommand, e.g. 'status' or 'app:list'" } },
    handler: ({ command }) => occ(command),
  },
  {
    name: "nextcloud_app_list",
    description: "List installed Nextcloud apps",
    schema: {},
    handler: () => occ("app:list"),
  },
  {
    name: "nextcloud_enable_app",
    description: "Enable a Nextcloud app",
    schema: { app: { type: "string" } },
    handler: ({ app }) => occ(`app:enable ${app}`),
  },
  {
    name: "nextcloud_disable_app",
    description: "Disable a Nextcloud app",
    schema: { app: { type: "string" } },
    handler: ({ app }) => occ(`app:disable ${app}`),
  },
];
