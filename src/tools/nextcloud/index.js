import { userTools } from "./users.js";
import { groupTools } from "./groups.js";
import { appTools } from "./apps.js";
import { deckTools } from "./deck.js";
import { statusTools } from "./status.js";
import { contactTools } from "./contacts.js";
import { nextledgerTools } from "./nextledger.js";

export const nextcloudTools = [
  ...userTools,
  ...groupTools,
  ...appTools,
  ...deckTools,
  ...statusTools,
  ...contactTools,
  ...nextledgerTools,
];
