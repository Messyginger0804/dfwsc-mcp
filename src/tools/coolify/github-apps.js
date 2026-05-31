import { api } from "./client.js";

export const githubAppTools = [
  {
    name: "coolify_github_apps_list",
    description: "List all configured GitHub App integrations",
    schema: {},
    handler: () => api("/github-apps"),
  },
  {
    name: "coolify_github_app_create",
    description: "Register a new GitHub App integration",
    schema: {
      name: { type: "string", description: "App name" },
      organization: { type: "string", description: "GitHub organization" },
      app_id: { type: "string", description: "GitHub App ID" },
      client_id: { type: "string", description: "GitHub App client ID" },
      client_secret: { type: "string", description: "GitHub App client secret" },
      webhook_secret: { type: "string", description: "Webhook secret" },
      private_key: { type: "string", description: "GitHub App private key (PEM)" },
    },
    handler: (args) => api("/github-apps", "POST", args),
  },
  {
    name: "coolify_github_app_update",
    description: "Update a GitHub App integration",
    schema: {
      github_app_id: { type: "string", description: "GitHub App UUID" },
      name: { type: "string", description: "New app name" },
    },
    handler: ({ github_app_id, ...rest }) =>
      api(`/github-apps/${github_app_id}`, "PATCH", rest),
  },
  {
    name: "coolify_github_app_repositories",
    description: "List repositories accessible by a GitHub App",
    schema: {
      github_app_id: { type: "string", description: "GitHub App UUID" },
    },
    handler: ({ github_app_id }) =>
      api(`/github-apps/${github_app_id}/repositories`),
  },
  {
    name: "coolify_github_app_branches",
    description: "List branches for a repository via GitHub App",
    schema: {
      github_app_id: { type: "string", description: "GitHub App UUID" },
      owner: { type: "string", description: "Repository owner" },
      repo: { type: "string", description: "Repository name" },
    },
    handler: ({ github_app_id, owner, repo }) =>
      api(`/github-apps/${github_app_id}/repositories/${owner}/${repo}/branches`),
  },
];
