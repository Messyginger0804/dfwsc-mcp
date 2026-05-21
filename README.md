# coolify-nextcloud-mcp

MCP server that lets any MCP-compatible AI agent manage **Coolify** and **Nextcloud**.

## Tools

### Coolify
| Tool | Description |
|------|-------------|
| `coolify_list_projects` | List all projects |
| `coolify_list_applications` | List all applications |
| `coolify_get_application` | Get app details by UUID |
| `coolify_deploy_application` | Trigger a deployment |
| `coolify_restart_application` | Restart an app |
| `coolify_start_application` | Start a stopped app |
| `coolify_stop_application` | Stop an app |
| `coolify_list_services` | List services (DBs, etc.) |
| `coolify_list_servers` | List servers |
| `coolify_get_deployments` | Get deployment history |

### Nextcloud
| Tool | Description |
|------|-------------|
| `nextcloud_list_users` | List all users |
| `nextcloud_create_user` | Create a user |
| `nextcloud_delete_user` | Delete a user |
| `nextcloud_list_groups` | List all groups |
| `nextcloud_create_group` | Create a group |
| `nextcloud_add_user_to_group` | Add user to group |
| `nextcloud_occ` | Run any `occ` CLI command |
| `nextcloud_app_list` | List installed apps |
| `nextcloud_enable_app` | Enable an app |
| `nextcloud_disable_app` | Disable an app |

## Setup

```bash
cp .env.example .env
# fill in your values
npm install
```

## Run

```bash
npm start
```

## Use with an MCP client (e.g. Claude Desktop)

Add to your MCP config:

```json
{
  "mcpServers": {
    "coolify-nextcloud": {
      "command": "node",
      "args": ["/absolute/path/to/coolify-nextcloud-mcp/src/index.js"],
      "env": {
        "COOLIFY_URL": "https://your-coolify.com",
        "COOLIFY_TOKEN": "...",
        "NEXTCLOUD_URL": "https://your-nextcloud.com",
        "NEXTCLOUD_USER": "admin",
        "NEXTCLOUD_PASSWORD": "..."
      }
    }
  }
}
```
