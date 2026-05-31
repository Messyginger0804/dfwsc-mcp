import { deck } from "./client.js";

export const deckTools = [
  {
    name: "nextcloud_deck_boards_list",
    description: "List all Nextcloud Deck boards visible to the current user",
    schema: {},
    handler: () => deck("/boards"),
  },
  {
    name: "nextcloud_deck_board_get",
    description: "Get details of a specific Deck board",
    schema: {
      boardId: { type: "number", description: "Deck board ID" },
    },
    handler: ({ boardId }) => deck(`/boards/${boardId}`),
  },
  {
    name: "nextcloud_deck_board_create",
    description: "Create a new Deck board",
    schema: {
      title: { type: "string", description: "Board title" },
      color: { type: "string", description: "Optional board color (e.g. FF0000)" },
    },
    handler: ({ title, color }) =>
      deck("/boards", "POST", {
        title,
        ...(color ? { color } : {}),
      }),
  },
  {
    name: "nextcloud_deck_board_delete",
    description: "Delete a Deck board",
    schema: {
      boardId: { type: "number", description: "Deck board ID" },
    },
    handler: ({ boardId }) => deck(`/boards/${boardId}`, "DELETE"),
  },
  {
    name: "nextcloud_deck_stacks_list",
    description: "List stacks (columns) in a Deck board",
    schema: {
      boardId: { type: "number", description: "Deck board ID" },
    },
    handler: ({ boardId }) => deck(`/boards/${boardId}/stacks`),
  },
  {
    name: "nextcloud_deck_stack_create",
    description: "Create a new stack (column) in a Deck board",
    schema: {
      boardId: { type: "number", description: "Deck board ID" },
      title: { type: "string", description: "Stack title" },
    },
    handler: ({ boardId, title }) => deck(`/boards/${boardId}/stacks`, "POST", { title }),
  },
  {
    name: "nextcloud_deck_stack_update",
    description: "Update a Deck stack title",
    schema: {
      boardId: { type: "number", description: "Deck board ID" },
      stackId: { type: "number", description: "Deck stack ID" },
      title: { type: "string", description: "New stack title" },
    },
    handler: ({ boardId, stackId, title }) =>
      deck(`/boards/${boardId}/stacks/${stackId}`, "PUT", { title }),
  },
  {
    name: "nextcloud_deck_stack_delete",
    description: "Delete a Deck stack",
    schema: {
      boardId: { type: "number", description: "Deck board ID" },
      stackId: { type: "number", description: "Deck stack ID" },
    },
    handler: ({ boardId, stackId }) => deck(`/boards/${boardId}/stacks/${stackId}`, "DELETE"),
  },
  {
    name: "nextcloud_deck_cards_list",
    description: "List cards in a Deck stack",
    schema: {
      boardId: { type: "number", description: "Deck board ID" },
      stackId: { type: "number", description: "Deck stack ID" },
    },
    handler: ({ boardId, stackId }) => deck(`/boards/${boardId}/stacks/${stackId}/cards`),
  },
  {
    name: "nextcloud_deck_card_create",
    description: "Create a card in a Deck stack",
    schema: {
      boardId: { type: "number", description: "Deck board ID" },
      stackId: { type: "number", description: "Deck stack ID" },
      title: { type: "string", description: "Card title" },
      description: { type: "string", description: "Optional card description" },
      duedate: { type: "string", description: "Optional due date (ISO-8601)" },
    },
    handler: ({ boardId, stackId, title, description, duedate }) =>
      deck(`/boards/${boardId}/stacks/${stackId}/cards`, "POST", {
        title,
        ...(description ? { description } : {}),
        ...(duedate ? { duedate } : {}),
      }),
  },
  {
    name: "nextcloud_deck_card_get",
    description: "Get a Deck card",
    schema: {
      boardId: { type: "number", description: "Deck board ID" },
      stackId: { type: "number", description: "Deck stack ID" },
      cardId: { type: "number", description: "Deck card ID" },
    },
    handler: ({ boardId, stackId, cardId }) => deck(`/boards/${boardId}/stacks/${stackId}/cards/${cardId}`),
  },
  {
    name: "nextcloud_deck_card_update",
    description: "Update a Deck card",
    schema: {
      boardId: { type: "number", description: "Deck board ID" },
      stackId: { type: "number", description: "Deck stack ID" },
      cardId: { type: "number", description: "Deck card ID" },
      title: { type: "string", description: "Optional new title" },
      description: { type: "string", description: "Optional new description" },
      duedate: { type: "string", description: "Optional due date (ISO-8601)" },
      archived: { type: "boolean", description: "Optional archived status" },
    },
    handler: ({ boardId, stackId, cardId, title, description, duedate, archived }) =>
      deck(`/boards/${boardId}/stacks/${stackId}/cards/${cardId}`, "PUT", {
        ...(title !== undefined ? { title } : {}),
        ...(description !== undefined ? { description } : {}),
        ...(duedate !== undefined ? { duedate } : {}),
        ...(archived !== undefined ? { archived } : {}),
      }),
  },
  {
    name: "nextcloud_deck_card_delete",
    description: "Delete a Deck card",
    schema: {
      boardId: { type: "number", description: "Deck board ID" },
      stackId: { type: "number", description: "Deck stack ID" },
      cardId: { type: "number", description: "Deck card ID" },
    },
    handler: ({ boardId, stackId, cardId }) => deck(`/boards/${boardId}/stacks/${stackId}/cards/${cardId}`, "DELETE"),
  },
  {
    name: "nextcloud_deck_labels_list",
    description: "List labels for a Deck board",
    schema: {
      boardId: { type: "number", description: "Deck board ID" },
    },
    handler: ({ boardId }) => deck(`/boards/${boardId}/labels`),
  },
  {
    name: "nextcloud_deck_label_create",
    description: "Create a label in a Deck board",
    schema: {
      boardId: { type: "number", description: "Deck board ID" },
      title: { type: "string", description: "Label title" },
      color: { type: "string", description: "Optional label color (e.g. FFCC00)" },
    },
    handler: ({ boardId, title, color }) =>
      deck(`/boards/${boardId}/labels`, "POST", {
        title,
        ...(color ? { color } : {}),
      }),
  },
  {
    name: "nextcloud_deck_label_update",
    description: "Update a Deck label",
    schema: {
      boardId: { type: "number", description: "Deck board ID" },
      labelId: { type: "number", description: "Deck label ID" },
      title: { type: "string", description: "Optional new label title" },
      color: { type: "string", description: "Optional new label color" },
    },
    handler: ({ boardId, labelId, title, color }) =>
      deck(`/boards/${boardId}/labels/${labelId}`, "PUT", {
        ...(title !== undefined ? { title } : {}),
        ...(color !== undefined ? { color } : {}),
      }),
  },
  {
    name: "nextcloud_deck_label_delete",
    description: "Delete a Deck label",
    schema: {
      boardId: { type: "number", description: "Deck board ID" },
      labelId: { type: "number", description: "Deck label ID" },
    },
    handler: ({ boardId, labelId }) => deck(`/boards/${boardId}/labels/${labelId}`, "DELETE"),
  },
  {
    name: "nextcloud_deck_card_labels_add",
    description: "Add an existing label to a Deck card",
    schema: {
      boardId: { type: "number", description: "Deck board ID" },
      stackId: { type: "number", description: "Deck stack ID" },
      cardId: { type: "number", description: "Deck card ID" },
      labelId: { type: "number", description: "Deck label ID" },
    },
    handler: ({ boardId, stackId, cardId, labelId }) =>
      deck(`/boards/${boardId}/stacks/${stackId}/cards/${cardId}/labels`, "POST", { labelId }),
  },
  {
    name: "nextcloud_deck_card_labels_remove",
    description: "Remove a label from a Deck card",
    schema: {
      boardId: { type: "number", description: "Deck board ID" },
      stackId: { type: "number", description: "Deck stack ID" },
      cardId: { type: "number", description: "Deck card ID" },
      labelId: { type: "number", description: "Deck label ID" },
    },
    handler: ({ boardId, stackId, cardId, labelId }) =>
      deck(`/boards/${boardId}/stacks/${stackId}/cards/${cardId}/labels/${labelId}`, "DELETE"),
  },
  {
    name: "nextcloud_deck_card_assignees_list",
    description: "List assignees on a Deck card",
    schema: {
      boardId: { type: "number", description: "Deck board ID" },
      stackId: { type: "number", description: "Deck stack ID" },
      cardId: { type: "number", description: "Deck card ID" },
    },
    handler: ({ boardId, stackId, cardId }) =>
      deck(`/boards/${boardId}/stacks/${stackId}/cards/${cardId}/assigned`),
  },
  {
    name: "nextcloud_deck_card_assignees_add",
    description: "Assign a user to a Deck card",
    schema: {
      boardId: { type: "number", description: "Deck board ID" },
      stackId: { type: "number", description: "Deck stack ID" },
      cardId: { type: "number", description: "Deck card ID" },
      userId: { type: "string", description: "Nextcloud user ID" },
    },
    handler: ({ boardId, stackId, cardId, userId }) =>
      deck(`/boards/${boardId}/stacks/${stackId}/cards/${cardId}/assignUser`, "POST", { userId }),
  },
  {
    name: "nextcloud_deck_card_assignees_remove",
    description: "Remove a user assignment from a Deck card",
    schema: {
      boardId: { type: "number", description: "Deck board ID" },
      stackId: { type: "number", description: "Deck stack ID" },
      cardId: { type: "number", description: "Deck card ID" },
      userId: { type: "string", description: "Nextcloud user ID" },
    },
    handler: ({ boardId, stackId, cardId, userId }) =>
      deck(`/boards/${boardId}/stacks/${stackId}/cards/${cardId}/unassignUser`, "POST", { userId }),
  },
  {
    name: "nextcloud_deck_card_comments_list",
    description: "List comments on a Deck card",
    schema: {
      boardId: { type: "number", description: "Deck board ID" },
      stackId: { type: "number", description: "Deck stack ID" },
      cardId: { type: "number", description: "Deck card ID" },
    },
    handler: ({ boardId, stackId, cardId }) =>
      deck(`/boards/${boardId}/stacks/${stackId}/cards/${cardId}/comments`),
  },
  {
    name: "nextcloud_deck_card_comment_create",
    description: "Create a comment on a Deck card",
    schema: {
      boardId: { type: "number", description: "Deck board ID" },
      stackId: { type: "number", description: "Deck stack ID" },
      cardId: { type: "number", description: "Deck card ID" },
      message: { type: "string", description: "Comment text" },
    },
    handler: ({ boardId, stackId, cardId, message }) =>
      deck(`/boards/${boardId}/stacks/${stackId}/cards/${cardId}/comments`, "POST", { message }),
  },
  {
    name: "nextcloud_deck_card_comment_update",
    description: "Update a comment on a Deck card",
    schema: {
      boardId: { type: "number", description: "Deck board ID" },
      stackId: { type: "number", description: "Deck stack ID" },
      cardId: { type: "number", description: "Deck card ID" },
      commentId: { type: "number", description: "Comment ID" },
      message: { type: "string", description: "New comment text" },
    },
    handler: ({ boardId, stackId, cardId, commentId, message }) =>
      deck(`/boards/${boardId}/stacks/${stackId}/cards/${cardId}/comments/${commentId}`, "PUT", { message }),
  },
  {
    name: "nextcloud_deck_card_comment_delete",
    description: "Delete a comment from a Deck card",
    schema: {
      boardId: { type: "number", description: "Deck board ID" },
      stackId: { type: "number", description: "Deck stack ID" },
      cardId: { type: "number", description: "Deck card ID" },
      commentId: { type: "number", description: "Comment ID" },
    },
    handler: ({ boardId, stackId, cardId, commentId }) =>
      deck(`/boards/${boardId}/stacks/${stackId}/cards/${cardId}/comments/${commentId}`, "DELETE"),
  },
  {
    name: "nextcloud_deck_card_attachments_list",
    description: "List attachments on a Deck card",
    schema: {
      boardId: { type: "number", description: "Deck board ID" },
      stackId: { type: "number", description: "Deck stack ID" },
      cardId: { type: "number", description: "Deck card ID" },
    },
    handler: ({ boardId, stackId, cardId }) =>
      deck(`/boards/${boardId}/stacks/${stackId}/cards/${cardId}/attachments`),
  },
  {
    name: "nextcloud_deck_card_attachment_create",
    description: "Create an attachment on a Deck card",
    schema: {
      boardId: { type: "number", description: "Deck board ID" },
      stackId: { type: "number", description: "Deck stack ID" },
      cardId: { type: "number", description: "Deck card ID" },
      type: { type: "string", description: "Attachment type (file, link, deck_file, etc.)" },
      data: { type: "string", description: "Attachment data payload (path, URL, or identifier)" },
      extendedData: { type: "string", description: "Optional extra metadata as JSON string" },
    },
    handler: ({ boardId, stackId, cardId, type, data, extendedData }) =>
      deck(`/boards/${boardId}/stacks/${stackId}/cards/${cardId}/attachments`, "POST", {
        type,
        data,
        ...(extendedData ? { extendedData: JSON.parse(extendedData) } : {}),
      }),
  },
  {
    name: "nextcloud_deck_card_attachment_delete",
    description: "Delete an attachment from a Deck card",
    schema: {
      boardId: { type: "number", description: "Deck board ID" },
      stackId: { type: "number", description: "Deck stack ID" },
      cardId: { type: "number", description: "Deck card ID" },
      attachmentId: { type: "number", description: "Attachment ID" },
    },
    handler: ({ boardId, stackId, cardId, attachmentId }) =>
      deck(`/boards/${boardId}/stacks/${stackId}/cards/${cardId}/attachments/${attachmentId}`, "DELETE"),
  },
];
