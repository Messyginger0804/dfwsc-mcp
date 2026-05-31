import { appJson } from "./client.js";

const APP_ID = "nextledger";
const API_PREFIX = process.env.NEXTLEDGER_API_PREFIX || "/api/v1";

const withPrefix = (path) => {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${API_PREFIX}${clean}`;
};

export const nextledgerTools = [
  {
    name: "nextcloud_nextledger_request",
    description: "Call any NextLedger endpoint in the Nextcloud app",
    schema: {
      method: { type: "string", description: "HTTP method (GET, POST, PUT, PATCH, DELETE)" },
      path: { type: "string", description: "App-relative path, e.g. /api/v1/ledgers" },
      body: { type: "string", description: "Optional JSON string body" },
    },
    handler: ({ method, path, body }) =>
      appJson(APP_ID, path, method.toUpperCase(), body ? JSON.parse(body) : undefined),
  },
  {
    name: "nextcloud_nextledger_health",
    description: "Check NextLedger API health/ping endpoint",
    schema: {},
    handler: () => appJson(APP_ID, withPrefix("/health")),
  },
  {
    name: "nextcloud_nextledger_ledgers_list",
    description: "List ledgers from NextLedger",
    schema: {},
    handler: () => appJson(APP_ID, withPrefix("/ledgers")),
  },
  {
    name: "nextcloud_nextledger_ledger_get",
    description: "Get a single ledger by ID",
    schema: {
      ledgerId: { type: "string", description: "Ledger ID" },
    },
    handler: ({ ledgerId }) => appJson(APP_ID, withPrefix(`/ledgers/${ledgerId}`)),
  },
  {
    name: "nextcloud_nextledger_ledger_create",
    description: "Create a ledger in NextLedger",
    schema: {
      payload: { type: "string", description: "Ledger payload as JSON string" },
    },
    handler: ({ payload }) => appJson(APP_ID, withPrefix("/ledgers"), "POST", JSON.parse(payload)),
  },
  {
    name: "nextcloud_nextledger_ledger_update",
    description: "Update a ledger in NextLedger",
    schema: {
      ledgerId: { type: "string", description: "Ledger ID" },
      payload: { type: "string", description: "Ledger patch payload as JSON string" },
    },
    handler: ({ ledgerId, payload }) =>
      appJson(APP_ID, withPrefix(`/ledgers/${ledgerId}`), "PUT", JSON.parse(payload)),
  },
  {
    name: "nextcloud_nextledger_ledger_delete",
    description: "Delete a ledger in NextLedger",
    schema: {
      ledgerId: { type: "string", description: "Ledger ID" },
    },
    handler: ({ ledgerId }) => appJson(APP_ID, withPrefix(`/ledgers/${ledgerId}`), "DELETE"),
  },
  {
    name: "nextcloud_nextledger_entries_list",
    description: "List entries for a ledger",
    schema: {
      ledgerId: { type: "string", description: "Ledger ID" },
    },
    handler: ({ ledgerId }) => appJson(APP_ID, withPrefix(`/ledgers/${ledgerId}/entries`)),
  },
  {
    name: "nextcloud_nextledger_entry_create",
    description: "Create an entry in a ledger",
    schema: {
      ledgerId: { type: "string", description: "Ledger ID" },
      payload: { type: "string", description: "Entry payload as JSON string" },
    },
    handler: ({ ledgerId, payload }) =>
      appJson(APP_ID, withPrefix(`/ledgers/${ledgerId}/entries`), "POST", JSON.parse(payload)),
  },
  {
    name: "nextcloud_nextledger_entry_update",
    description: "Update an entry in a ledger",
    schema: {
      ledgerId: { type: "string", description: "Ledger ID" },
      entryId: { type: "string", description: "Entry ID" },
      payload: { type: "string", description: "Entry patch payload as JSON string" },
    },
    handler: ({ ledgerId, entryId, payload }) =>
      appJson(APP_ID, withPrefix(`/ledgers/${ledgerId}/entries/${entryId}`), "PUT", JSON.parse(payload)),
  },
  {
    name: "nextcloud_nextledger_entry_delete",
    description: "Delete an entry from a ledger",
    schema: {
      ledgerId: { type: "string", description: "Ledger ID" },
      entryId: { type: "string", description: "Entry ID" },
    },
    handler: ({ ledgerId, entryId }) =>
      appJson(APP_ID, withPrefix(`/ledgers/${ledgerId}/entries/${entryId}`), "DELETE"),
  },
];
