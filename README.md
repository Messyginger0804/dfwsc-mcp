# dfwsc-mcp

MCP server for managing **Coolify** and **Nextcloud**. Lets any MCP-compatible AI agent (OpenCode, Claude Desktop, Cursor, etc.) control your infrastructure through natural language.

## Tools (100+)

### System
| Tool | Description |
|------|-------------|
| `coolify_healthcheck` | Check Coolify API health |
| `coolify_version` | Get Coolify version |

### Teams
| Tool | Description |
|------|-------------|
| `coolify_teams_list` | List all teams |
| `coolify_team_current` | Get current team |
| `coolify_team_members` | Get current team members |

### Projects
| Tool | Description |
|------|-------------|
| `coolify_projects_list` | List all projects |
| `coolify_projects_get` | Get project by UUID |
| `coolify_project_create` | Create a project |
| `coolify_project_update` | Update a project |
| `coolify_project_environments` | List environments |
| `coolify_project_environment_create` | Create an environment |
| `coolify_project_environment_details` | Get environment details |

### SSH Keys
| Tool | Description |
|------|-------------|
| `coolify_ssh_keys_list` | List SSH keys |
| `coolify_ssh_key_get` | Get key by UUID |
| `coolify_ssh_key_create` | Create SSH key |
| `coolify_ssh_key_update` | Update SSH key |

### Cloud Providers
| Tool | Description |
|------|-------------|
| `coolify_cloud_tokens_list` | List cloud tokens |
| `coolify_cloud_token_get` | Get token by UUID |
| `coolify_cloud_token_create` | Add cloud token |
| `coolify_cloud_token_update` | Update cloud token |
| `coolify_cloud_token_validate` | Validate cloud token |
| `coolify_hetzner_locations` | List Hetzner locations |
| `coolify_hetzner_server_types` | List Hetzner server types |
| `coolify_hetzner_images` | List Hetzner images |
| `coolify_hetzner_ssh_keys` | List Hetzner SSH keys |
| `coolify_hetzner_create_server` | Create Hetzner server |

### Deployments
| Tool | Description |
|------|-------------|
| `coolify_deploy` | Deploy by tag or UUID |
| `coolify_deployments_list` | List running deployments |
| `coolify_deployment_get` | Get deployment by UUID |
| `coolify_deployment_cancel` | Cancel a deployment |

### Servers
| Tool | Description |
|------|-------------|
| `coolify_servers_list` | List all servers |
| `coolify_server_get` | Get server by UUID |
| `coolify_server_create` | Add a server |
| `coolify_server_update` | Update server config |
| `coolify_server_domains` | Get server domains |
| `coolify_server_resources` | Get resource usage |
| `coolify_server_validate` | Validate server connectivity |
| `coolify_resources_list` | List all resources across servers |

### Applications
| Tool | Description |
|------|-------------|
| `coolify_applications_list` | List all applications |
| `coolify_applications_get` | Get application details |
| `coolify_applications_create` | Create application |
| `coolify_applications_update` | Update application |
| `coolify_application_create_public` | Create from public Git repo |
| `coolify_application_create_dockerfile` | Create from Dockerfile |
| `coolify_application_create_dockerimage` | Create from Docker image |
| `coolify_application_create_docker_compose` | Create from Docker Compose |
| `coolify_application_create_private_gh_app` | Create via GitHub App |
| `coolify_application_create_private_deploy_key` | Create via deploy key |
| `coolify_application_env_list` | List env vars |
| `coolify_application_env_create` | Add env var |
| `coolify_application_env_update` | Update env var |
| `coolify_application_env_bulk_update` | Bulk update env vars |
| `coolify_application_storage_list` | List storages |
| `coolify_application_storage_create` | Attach storage |
| `coolify_application_storage_update` | Update storage |
| `coolify_application_deploy` | Trigger deployment |
| `coolify_application_restart` | Restart app |
| `coolify_application_stop` | Stop app |
| `coolify_application_start` | Start app |
| `coolify_application_logs` | Get recent logs |
| `coolify_application_deployments` | Get deployment history |

### Databases
| Tool | Description |
|------|-------------|
| `coolify_databases_list` | List all databases |
| `coolify_databases_get` | Get database details |
| `coolify_databases_create` | Create database |
| `coolify_databases_update` | Update database |
| `coolify_database_create_postgresql` | Create PostgreSQL |
| `coolify_database_create_mysql` | Create MySQL |
| `coolify_database_create_mariadb` | Create MariaDB |
| `coolify_database_create_mongodb` | Create MongoDB |
| `coolify_database_create_redis` | Create Redis |
| `coolify_database_create_clickhouse` | Create ClickHouse |
| `coolify_database_create_dragonfly` | Create DragonFly |
| `coolify_database_create_keydb` | Create KeyDB |
| `coolify_database_env_list` | List env vars |
| `coolify_database_env_create` | Add env var |
| `coolify_database_env_update` | Update env var |
| `coolify_database_env_bulk_update` | Bulk update env vars |
| `coolify_database_storage_list` | List storages |
| `coolify_database_storage_create` | Attach storage |
| `coolify_database_storage_update` | Update storage |
| `coolify_database_deploy` | Start database |
| `coolify_database_restart` | Restart database |
| `coolify_database_stop` | Stop database |
| `coolify_database_start` | Start database |
| `coolify_database_backups_list` | List backups |
| `coolify_database_backup_create` | Create backup |
| `coolify_database_backup_update` | Update backup |
| `coolify_database_backup_executions` | List backup executions |

### Services
| Tool | Description |
|------|-------------|
| `coolify_services_list` | List all services |
| `coolify_services_get` | Get service details |
| `coolify_services_create` | Create service |
| `coolify_services_update` | Update service |
| `coolify_service_env_list` | List env vars |
| `coolify_service_env_create` | Add env var |
| `coolify_service_env_update` | Update env var |
| `coolify_service_env_bulk_update` | Bulk update env vars |
| `coolify_service_storage_list` | List storages |
| `coolify_service_storage_create` | Attach storage |
| `coolify_service_storage_update` | Update storage |
| `coolify_service_deploy` | Start service |
| `coolify_service_restart` | Restart service |
| `coolify_service_stop` | Stop service |
| `coolify_service_start` | Start service |

### GitHub Apps
| Tool | Description |
|------|-------------|
| `coolify_github_apps_list` | List GitHub App integrations |
| `coolify_github_app_create` | Register GitHub App |
| `coolify_github_app_update` | Update GitHub App |
| `coolify_github_app_repositories` | List accessible repos |
| `coolify_github_app_branches` | List repo branches |

### Scheduled Tasks
| Tool | Description |
|------|-------------|
| `coolify_app_scheduled_tasks_list` | List app cron tasks |
| `coolify_app_scheduled_task_create` | Create app cron task |
| `coolify_app_scheduled_task_update` | Update app cron task |
| `coolify_app_scheduled_task_executions` | List app task history |
| `coolify_service_scheduled_tasks_list` | List service cron tasks |
| `coolify_service_scheduled_task_create` | Create service cron task |
| `coolify_service_scheduled_task_update` | Update service cron task |
| `coolify_service_scheduled_task_executions` | List service task history |

### Nextcloud — Users
| Tool | Description |
|------|-------------|
| `nextcloud_users_list` | List all users |
| `nextcloud_user_create` | Create a user |
| `nextcloud_user_delete` | Delete a user |
| `nextcloud_user_info` | Get user info |
| `nextcloud_user_enable` | Enable a user |
| `nextcloud_user_disable` | Disable a user |

### Nextcloud — Groups
| Tool | Description |
|------|-------------|
| `nextcloud_groups_list` | List all groups |
| `nextcloud_group_create` | Create a group |
| `nextcloud_group_delete` | Delete a group |
| `nextcloud_group_add_user` | Add user to group |
| `nextcloud_group_remove_user` | Remove user from group |

### Nextcloud — Apps & System
| Tool | Description |
|------|-------------|
| `nextcloud_occ` | Run any occ CLI command |
| `nextcloud_app_list` | List installed apps |
| `nextcloud_app_enable` | Enable an app |
| `nextcloud_app_disable` | Disable an app |
| `nextcloud_status` | Get server status |
| `nextcloud_maintenance_mode` | Toggle maintenance mode |

## Setup

```bash
cp .env.example .env
# Fill in your Coolify and Nextcloud credentials
npm install
```

## Run

```bash
npm start
```

## Use with OpenCode

Add to your `opencode.json`:

```json
{
  "mcp": {
    "dfwsc": {
      "type": "local",
      "command": ["node", "/absolute/path/to/dfwsc-mcp/src/index.js"],
      "environment": {
        "COOLIFY_URL": "{env:COOLIFY_URL}",
        "COOLIFY_TOKEN": "{env:COOLIFY_TOKEN}",
        "NEXTCLOUD_URL": "{env:NEXTCLOUD_URL}",
        "NEXTCLOUD_USER": "{env:NEXTCLOUD_USER}",
        "NEXTCLOUD_PASSWORD": "{env:NEXTCLOUD_PASSWORD}"
      },
      "enabled": true
    }
  }
}
```

## Use with Claude Desktop

Add to your MCP config:

```json
{
  "mcpServers": {
    "dfwsc": {
      "command": "node",
      "args": ["/absolute/path/to/dfwsc-mcp/src/index.js"],
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

## Architecture

```
src/
├── index.js                    # MCP server entry point
├── utils.js                    # toZodShape helper
└── tools/
    ├── index.js                # Combines all tools
    ├── coolify/
    │   ├── client.js           # Shared API client (auth, timeout, error handling)
    │   ├── factories.js        # Tool generators for repeated patterns
    │   ├── index.js            # Re-exports all Coolify tools
    │   ├── system.js           # healthcheck, version
    │   ├── teams.js            # team management
    │   ├── projects.js         # projects + environments
    │   ├── ssh-keys.js         # SSH key management
    │   ├── cloud-providers.js  # cloud tokens + Hetzner
    │   ├── deployments.js      # deployment management
    │   ├── servers.js          # server management
    │   ├── applications.js     # app CRUD + envs + lifecycle
    │   ├── databases.js        # db CRUD + envs + backups + lifecycle
    │   ├── services.js         # service CRUD + envs + lifecycle
    │   ├── github-apps.js      # GitHub App integration
    │   └── scheduled-tasks.js  # cron tasks
    └── nextcloud/
        ├── client.js           # OCS + OCC helpers
        ├── index.js            # Re-exports all Nextcloud tools
        ├── users.js            # user management
        ├── groups.js           # group management
        └── apps.js             # app management + occ
```
