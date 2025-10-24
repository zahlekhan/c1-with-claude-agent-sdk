import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';

// Schema for a single task
const taskSchema = z
    .object({
        id: z.string(),
        title: z.string(),
        description: z.string().optional(),
        status: z.enum(['pending', 'in_progress', 'completed']),
        priority: z.enum(['low', 'medium', 'high']).optional(),
    })
    .describe('Represents a single task with its properties');

// Schema for the TaskList component props
const TaskListSchema = z
    .object({
        tasks: z.array(taskSchema),
        title: z.string().optional(),
    })
    .describe(
        'Displays an interactive list of tasks with status indicators and action buttons. ' +
        'Each task shows title, description, priority badge, and allows users to change status. ' +
        'Supports clicking tasks to select them and quick actions to mark as in-progress or completed.',
    );

// Export the custom component schemas for C1 API
export const CUSTOM_COMPONENT_SCHEMAS = {
    TaskList: zodToJsonSchema(TaskListSchema),
};

// Export the Zod schemas for TypeScript types
export { TaskListSchema, taskSchema };

