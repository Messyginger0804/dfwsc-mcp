# Nextcloud integration

Code lives in `src/tools/nextcloud/`. Each file exports a tool array that `index.js` spreads together: users, groups, apps (including occ), status, deck, contacts, nextledger.

## Clients (`src/tools/nextcloud/client.js`)
The HTTP clients (all but `occ`) use basic auth from `NEXTCLOUD_USER` / `NEXTCLOUD_PASSWORD`, base `NEXTCLOUD_URL`, and a 30 s abort timeout. `occ` has neither: it uses no HTTP auth and `execSync` has no timeout, so a hanging command can run past 30 s. Pick by the API being called:
- `ocs(path)`: OCS v1 (`/ocs/v1.php`), used by users and groups. Returns the raw response text (XML), not parsed JSON.
- `ocsApps(path)`: OCS v2 apps endpoints (`/ocs/v2.php/apps`).
- `appJson(appId, path)`: JSON calls to an app route under `/index.php/apps/<appId>`. Empty bodies return `{ ok: true }`.
- `deck(path)`: Deck REST API (`/index.php/apps/deck/api/v1`).
- `carddav(path, method, body, headers)`: CardDAV under `/remote.php/dav`; treats HTTP 207 as success and returns raw XML.
- `occ(cmd)`: runs `occ` locally with `execSync`. The command is `NEXTCLOUD_OCC_PATH` or the default `php /var/www/html/occ`.

## Gotchas
- `occ` runs on the machine where this MCP server runs, not remotely. It only works if that machine has Nextcloud's `occ` at the configured path. On failure it returns stderr as a normal string instead of throwing, so a failed occ call does not set `isError`.
- `nextcloud_occ` accepts any subcommand and is interpolated into a shell command. It runs through a shell as the MCP server's OS user, so it reaches beyond Nextcloud administration: that user's files and environment, including credentials. Treat it as full host-level access.
- `src/tools/nextcloud/nextledger.js` targets the NextLedger Nextcloud app (`APP_ID = "nextledger"`). The API prefix defaults to `/api/v1` and can be overridden with `NEXTLEDGER_API_PREFIX`, read once at import time. `nextcloud_nextledger_request` is a generic escape hatch for endpoints without a dedicated tool; it does not apply `NEXTLEDGER_API_PREFIX`, so callers must include the prefix in `path` (for example `/custom/ledgers` when the prefix is `/custom`).
- `src/tools/nextcloud/contacts.js` builds address book paths from `NEXTCLOUD_USER`; the default book is `contacts`.
- OCS responses from users/groups are XML text; callers must read them as such.
