import { systemTools } from "./system.js";
import { teamTools } from "./teams.js";
import { projectTools } from "./projects.js";
import { sshKeyTools } from "./ssh-keys.js";
import { cloudProviderTools } from "./cloud-providers.js";
import { deploymentTools } from "./deployments.js";
import { serverTools } from "./servers.js";
import { applicationTools } from "./applications.js";
import { databaseTools } from "./databases.js";
import { serviceTools } from "./services.js";
import { githubAppTools } from "./github-apps.js";
import { scheduledTaskTools } from "./scheduled-tasks.js";

export const coolifyTools = [
  ...systemTools,
  ...teamTools,
  ...projectTools,
  ...sshKeyTools,
  ...cloudProviderTools,
  ...deploymentTools,
  ...serverTools,
  ...applicationTools,
  ...databaseTools,
  ...serviceTools,
  ...githubAppTools,
  ...scheduledTaskTools,
];
