import { api } from "./client.js";

export const teamTools = [
  {
    name: "coolify_teams_list",
    description: "List all teams in the organization",
    schema: {},
    handler: () => api("/teams"),
  },
  {
    name: "coolify_team_current",
    description: "Get the currently authenticated team",
    schema: {},
    handler: () => api("/teams/current"),
  },
  {
    name: "coolify_team_members",
    description: "Get members of the currently authenticated team",
    schema: {},
    handler: () => api("/teams/current/members"),
  },
];
