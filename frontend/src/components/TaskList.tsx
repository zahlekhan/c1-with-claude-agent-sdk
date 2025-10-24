import React from 'react';
import { useOnAction, useC1State } from '@thesysai/genui-sdk';

export interface Task {
    id: string;
    title: string;
    description?: string;
    status: 'pending' | 'in_progress' | 'completed';
    priority?: 'low' | 'medium' | 'high';
}

interface TaskListProps {
    tasks: Task[];
    title?: string;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, title = 'Tasks' }) => {
    const onAction = useOnAction();
    const { getValue, setValue } = useC1State();

    // Get current selected task ID from state
    const selectedTaskId = getValue('selectedTaskId') as string | undefined;

    const handleTaskClick = (task: Task) => {
        setValue('selectedTaskId', task.id);
        onAction(
            `Selected task: ${task.title}`,
            `User clicked on task "${task.title}" (ID: ${task.id}, Status: ${task.status})`
        );
    };

    const handleStatusChange = (task: Task, newStatus: Task['status']) => {
        onAction(
            `Changed status to ${newStatus}`,
            `User changed task "${task.title}" (ID: ${task.id}) status from ${task.status} to ${newStatus}`
        );
    };

    const getPriorityColor = (priority?: string) => {
        switch (priority) {
            case 'high':
                return 'bg-red-100 text-red-800 border-red-300';
            case 'medium':
                return 'bg-yellow-100 text-yellow-800 border-yellow-300';
            case 'low':
                return 'bg-green-100 text-green-800 border-green-300';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-300';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed':
                return 'bg-green-500';
            case 'in_progress':
                return 'bg-blue-500';
            default:
                return 'bg-gray-300';
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-md border border-gray-200">
            <div className="mb-4">
                <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                <p className="text-sm text-gray-500 mt-1">
                    {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'} total
                </p>
            </div>

            <div className="space-y-3">
                {tasks.map((task) => (
                    <div
                        key={task.id}
                        className={`p-4 rounded-lg border-2 transition-all cursor-pointer hover:shadow-md ${selectedTaskId === task.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 bg-white'
                            }`}
                        onClick={() => handleTaskClick(task)}
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {task.title}
                                    </h3>
                                    {task.priority && (
                                        <span
                                            className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(
                                                task.priority
                                            )}`}
                                        >
                                            {task.priority}
                                        </span>
                                    )}
                                </div>
                                {task.description && (
                                    <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                                )}

                                {/* Status indicator and actions */}
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-3 h-3 rounded-full ${getStatusColor(task.status)}`} />
                                        <span className="text-sm font-medium text-gray-700 capitalize">
                                            {task.status.replace('_', ' ')}
                                        </span>
                                    </div>

                                    {/* Quick status change buttons */}
                                    <div className="ml-4 flex gap-1">
                                        {task.status !== 'in_progress' && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleStatusChange(task, 'in_progress');
                                                }}
                                                className="px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded hover:bg-blue-200 transition-colors"
                                            >
                                                Start
                                            </button>
                                        )}
                                        {task.status !== 'completed' && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleStatusChange(task, 'completed');
                                                }}
                                                className="px-2 py-1 text-xs font-medium text-green-700 bg-green-100 rounded hover:bg-green-200 transition-colors"
                                            >
                                                Complete
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {tasks.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    <p className="text-sm">No tasks to display</p>
                </div>
            )}
        </div>
    );
};

