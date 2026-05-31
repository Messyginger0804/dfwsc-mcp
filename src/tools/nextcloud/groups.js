import { ocs } from "./client.js";

export const groupTools = [
  {
    name: "nextcloud_groups_list",
    description: "List all Nextcloud groups",
    schema: {},
    handler: () => ocs("/cloud/groups"),
  },
  {
    name: "nextcloud_group_create",
    description: "Create a new Nextcloud group",
    schema: { groupid: { type: "string", description: "Group name" } },
    handler: ({ groupid }) => ocs("/cloud/groups", "POST", { groupid }),
  },
  {
    name: "nextcloud_group_delete",
    description: "Delete a Nextcloud group",
    schema: { groupid: { type: "string", description: "Group name to delete" } },
    handler: ({ groupid }) => ocs(`/cloud/groups/${groupid}`, "DELETE"),
  },
  {
    name: "nextcloud_group_add_user",
    description: "Add a user to a group",
    schema: {
      userid: { type: "string", description: "Username" },
      groupid: { type: "string", description: "Group name" },
    },
    handler: ({ userid, groupid }) =>
      ocs(`/cloud/users/${userid}/groups`, "POST", { groupid }),
  },
  {
    name: "nextcloud_group_remove_user",
    description: "Remove a user from a group",
    schema: {
      userid: { type: "string", description: "Username" },
      groupid: { type: "string", description: "Group name" },
    },
    handler: ({ userid, groupid }) =>
      ocs(`/cloud/users/${userid}/groups/${groupid}`, "DELETE"),
  },
];
