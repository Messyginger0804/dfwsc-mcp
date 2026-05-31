import { userTools } from "./users.js";
import { groupTools } from "./groups.js";
import { appTools } from "./apps.js";

export const nextcloudTools = [...userTools, ...groupTools, ...appTools];
