import { api } from "./client.js";
import {
  createResourceTools,
  createCrudTools,
  createEnvTools,
  createStorageTools,
  createLifecycleTools,
} from "./factories.js";

const databaseTypes = [
  { name: "postgresql", label: "PostgreSQL", extraFields: { postgres_user: { type: "string" }, postgres_password: { type: "string" }, postgres_db: { type: "string" } } },
  { name: "mysql", label: "MySQL", extraFields: { mysql_root_password: { type: "string" }, mysql_database: { type: "string" }, mysql_user: { type: "string" }, mysql_password: { type: "string" } } },
  { name: "mariadb", label: "MariaDB", extraFields: { mariadb_root_password: { type: "string" }, mariadb_database: { type: "string" }, mariadb_user: { type: "string" }, mariadb_password: { type: "string" } } },
  { name: "mongodb", label: "MongoDB", extraFields: { mongo_initdb_root_username: { type: "string" }, mongo_initdb_root_password: { type: "string" }, mongo_initdb_database: { type: "string" } } },
  { name: "redis", label: "Redis", extraFields: {} },
  { name: "clickhouse", label: "ClickHouse", extraFields: { clickhouse_user: { type: "string" }, clickhouse_password: { type: "string" }, clickhouse_database: { type: "string" } } },
  { name: "dragonfly", label: "DragonFly", extraFields: {} },
  { name: "keydb", label: "KeyDB", extraFields: {} },
];

const baseCreateFields = {
  project_uuid: { type: "string", description: "Project UUID" },
  server_uuid: { type: "string", description: "Server UUID" },
  environment_name: { type: "string", description: "Environment name (default: production)" },
  name: { type: "string", description: "Database name" },
  description: { type: "string", description: "Optional description" },
  image: { type: "string", description: "Docker image (optional, uses default)" },
  is_public: { type: "string", description: "Optional — 'true' to expose publicly" },
  public_port: { type: "string", description: "Public port if is_public is true" },
  instant_deploy: { type: "string", description: "Optional — 'true' to deploy immediately" },
};

export const databaseTools = [
  ...createResourceTools({
    resource: "databases",
    label: "Database",
    description: "databases in Coolify",
    api,
  }),
  ...createCrudTools({
    resource: "databases",
    label: "Database",
    createFields: baseCreateFields,
    updateFields: {
      name: { type: "string", description: "New database name" },
      description: { type: "string", description: "New description" },
    },
    api,
  }),
  ...createEnvTools({ resource: "databases", api }),
  ...createStorageTools({ resource: "databases", api }),
  ...createLifecycleTools({ resource: "databases", api }),
  ...databaseTypes.map((db) => ({
    name: `coolify_database_create_${db.name}`,
    description: `Create a new ${db.label} database in Coolify`,
    schema: {
      ...baseCreateFields,
      ...db.extraFields,
    },
    handler: (args) => api(`/databases/${db.name}`, "POST", args),
  })),
  {
    name: "coolify_database_backups_list",
    description: "List all scheduled backups for a database",
    schema: { uuid: { type: "string", description: "Database UUID" } },
    handler: ({ uuid }) => api(`/databases/${uuid}/backups`),
  },
  {
    name: "coolify_database_backup_create",
    description: "Trigger a manual backup for a database",
    schema: {
      uuid: { type: "string", description: "Database UUID" },
      enabled: { type: "string", description: "Optional — 'true' to enable scheduled backups" },
      frequency: { type: "string", description: "Optional — backup frequency (e.g. 'daily', 'weekly')" },
      keep_number: { type: "string", description: "Optional — number of backups to retain" },
      destination: { type: "string", description: "Optional — backup destination UUID" },
    },
    handler: ({ uuid, ...rest }) => api(`/databases/${uuid}/backups`, "POST", rest),
  },
  {
    name: "coolify_database_backup_update",
    description: "Update a scheduled backup configuration",
    schema: {
      uuid: { type: "string", description: "Database UUID" },
      backup_uuid: { type: "string", description: "Scheduled backup UUID" },
      enabled: { type: "string", description: "Optional — 'true' or 'false'" },
      frequency: { type: "string", description: "Optional — new frequency" },
      keep_number: { type: "string", description: "Optional — new retention count" },
    },
    handler: ({ uuid, backup_uuid, ...rest }) =>
      api(`/databases/${uuid}/backups/${backup_uuid}`, "PATCH", rest),
  },
  {
    name: "coolify_database_backup_executions",
    description: "List execution history for a scheduled backup",
    schema: {
      uuid: { type: "string", description: "Database UUID" },
      backup_uuid: { type: "string", description: "Scheduled backup UUID" },
    },
    handler: ({ uuid, backup_uuid }) =>
      api(`/databases/${uuid}/backups/${backup_uuid}/executions`),
  },
];
