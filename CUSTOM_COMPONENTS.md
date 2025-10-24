# Custom Components Implementation

This project now includes custom C1 components following the [Thesys documentation](https://docs.thesys.dev/guides/custom-components#implementing-custom-components).

## TaskList Component

An interactive task management component that demonstrates the full capabilities of custom C1 components.

### Features

- **Visual Task Cards**: Each task displays with title, description, and priority badge
- **Status Indicators**: Color-coded status (pending, in_progress, completed)
- **Interactive Actions**: Click tasks to select them, use quick action buttons to change status
- **State Management**: Uses `useC1State` to track selected task
- **Action Callbacks**: Uses `useOnAction` to communicate user interactions back to the LLM

### Usage Example

Ask the agent to create a task list:

```
"Create a task list for my weekend project with 3 tasks"
```

Or be more specific:

```
"Show me a task list with the following tasks:
1. Setup development environment (high priority, pending)
2. Write documentation (medium priority, in progress)
3. Deploy to production (low priority, pending)"
```

## Architecture

### 1. React Component (`frontend/src/components/TaskList.tsx`)

The React component uses Thesys SDK hooks:
- `useOnAction()` - Handles user interactions (clicking tasks, changing status)
- `useC1State()` - Maintains component state (selected task)

### 2. Zod Schema (`backend/src/schemas/customComponents.ts`)

Defines the TypeScript/Zod schema for the component props:
- Task schema with id, title, description, status, priority
- TaskList schema with tasks array and optional title
- Converted to JSON Schema for C1 API

### 3. Backend Integration (`backend/src/tools/thesys.ts`)

Passes custom component schemas to C1 API via metadata:
```typescript
metadata: {
  thesys: JSON.stringify({
    c1_custom_components: CUSTOM_COMPONENT_SCHEMAS,
  }),
}
```

### 4. Frontend Integration (`frontend/src/components/ThesysRenderer.tsx`)

Provides custom components to the C1Component renderer:
```typescript
<C1Component 
  c1Response={data} 
  isStreaming={false}
  customComponents={{ TaskList }}
/>
```

## Adding More Custom Components

To add additional custom components:

1. **Create React Component**
   - Add to `frontend/src/components/`
   - Use `useOnAction` and `useC1State` hooks
   - Export component

2. **Define Zod Schema**
   - Add to `backend/src/schemas/customComponents.ts`
   - Convert to JSON Schema
   - Add to `CUSTOM_COMPONENT_SCHEMAS` object

3. **Update ThesysRenderer**
   - Import component
   - Add to `customComponents` prop

4. **Update Tool Description** (optional)
   - Mention the new component in `thesys.ts` tool definition

## Requirements

- `@thesysai/genui-sdk` >= 0.6.34
- `@crayonai/react-ui` >= 0.8.31
- C1 API version: v-20250915
- `zod` >= 3.24.1
- `zod-to-json-schema` >= 3.24.1

## References

- [Thesys Custom Components Guide](https://docs.thesys.dev/guides/custom-components#implementing-custom-components)
- [Thesys Rendering UI Guide](https://docs.thesys.dev/guides/rendering-ui)
- [GitHub Examples](https://github.com/thesysai/c1-examples)

