import { setup } from "xstate";

export const tollsStateMachine = setup({
  types: {
    context: {} as { tolls: unknown[]; selectedToll: string },
    events: {} as
      | { type: "fail" }
      | { type: "success" }
      | { type: "onCreate" }
      | { type: "onEdit" }
      | { type: "onDelete" }
      | { type: "onClose" }
      | { type: "retry" },
  },
  schemas: {
    events: {
      fail: {
        type: "object",
        properties: {},
      },
      success: {
        type: "object",
        properties: {},
      },
      onCreate: {
        type: "object",
        properties: {},
      },
      onEdit: {
        type: "object",
        properties: {},
      },
      onDelete: {
        type: "object",
        properties: {},
      },
      onClose: {
        type: "object",
        properties: {},
      },
      retry: {
        type: "object",
        properties: {},
      },
    },
    context: {
      tolls: {
        type: "array",
        items: {
          type: "string",
        },
      },
      selectedToll: {
        type: "string",
      },
    },
  },
}).createMachine({
  context: {
    tolls: [],
    selectedToll: {},
  },
  id: "Tolls",
  initial: "Loading",
  states: {
    Loading: {
      on: {
        success: {
          target: "Ready",
        },
        fail: {
          target: "Error",
        },
      },
    },
    Ready: {
      on: {
        onCreate: {
          target: "Create",
        },
        onEdit: {
          target: "Edit",
        },
        onDelete: {
          target: "Delete",
        },
      },
    },
    Error: {
      on: {
        retry: {
          target: "Loading",
        },
      },
    },
    Create: {
      on: {
        onClose: {
          target: "Loading",
        },
      },
    },
    Edit: {
      on: {
        onClose: {
          target: "Loading",
        },
      },
    },
    Delete: {
      on: {
        onClose: {
          target: "Loading",
        },
      },
    },
  },
});