import { api } from "./client.js";

export const scheduledTaskTools = [
  {
    name: "coolify_app_scheduled_tasks_list",
    description: "List scheduled tasks for an application",
    schema: { uuid: { type: "string", description: "Application UUID" } },
    handler: ({ uuid }) => api(`/applications/${uuid}/scheduled-tasks`),
  },
  {
    name: "coolify_app_scheduled_task_create",
    description: "Create a scheduled task (cron) for an application",
    schema: {
      uuid: { type: "string", description: "Application UUID" },
      name: { type: "string", description: "Task name" },
      command: { type: "string", description: "Command to run" },
      frequency: { type: "string", description: "Cron expression (e.g. '0 2 * * *' for daily at 2am)" },
      container: { type: "string", description: "Optional — container to run in" },
    },
    handler: ({ uuid, ...rest }) =>
      api(`/applications/${uuid}/scheduled-tasks`, "POST", rest),
  },
  {
    name: "coolify_app_scheduled_task_update",
    description: "Update a scheduled task for an application",
    schema: {
      uuid: { type: "string", description: "Application UUID" },
      task_uuid: { type: "string", description: "Task UUID" },
      name: { type: "string", description: "New task name" },
      command: { type: "string", description: "New command" },
      frequency: { type: "string", description: "New cron expression" },
    },
    handler: ({ uuid, task_uuid, ...rest }) =>
      api(`/applications/${uuid}/scheduled-tasks/${task_uuid}`, "PATCH", rest),
  },
  {
    name: "coolify_app_scheduled_task_executions",
    description: "List execution history for an application scheduled task",
    schema: {
      uuid: { type: "string", description: "Application UUID" },
      task_uuid: { type: "string", description: "Task UUID" },
    },
    handler: ({ uuid, task_uuid }) =>
      api(`/applications/${uuid}/scheduled-tasks/${task_uuid}/executions`),
  },
  {
    name: "coolify_service_scheduled_tasks_list",
    description: "List scheduled tasks for a service",
    schema: { uuid: { type: "string", description: "Service UUID" } },
    handler: ({ uuid }) => api(`/services/${uuid}/scheduled-tasks`),
  },
  {
    name: "coolify_service_scheduled_task_create",
    description: "Create a scheduled task (cron) for a service",
    schema: {
      uuid: { type: "string", description: "Service UUID" },
      name: { type: "string", description: "Task name" },
      command: { type: "string", description: "Command to run" },
      frequency: { type: "string", description: "Cron expression" },
      container: { type: "string", description: "Optional — container to run in" },
    },
    handler: ({ uuid, ...rest }) =>
      api(`/services/${uuid}/scheduled-tasks`, "POST", rest),
  },
  {
    name: "coolify_service_scheduled_task_update",
    description: "Update a scheduled task for a service",
    schema: {
      uuid: { type: "string", description: "Service UUID" },
      task_uuid: { type: "string", description: "Task UUID" },
      name: { type: "string", description: "New task name" },
      command: { type: "string", description: "New command" },
      frequency: { type: "string", description: "New cron expression" },
    },
    handler: ({ uuid, task_uuid, ...rest }) =>
      api(`/services/${uuid}/scheduled-tasks/${task_uuid}`, "PATCH", rest),
  },
  {
    name: "coolify_service_scheduled_task_executions",
    description: "List execution history for a service scheduled task",
    schema: {
      uuid: { type: "string", description: "Service UUID" },
      task_uuid: { type: "string", description: "Task UUID" },
    },
    handler: ({ uuid, task_uuid }) =>
      api(`/services/${uuid}/scheduled-tasks/${task_uuid}/executions`),
  },
];
