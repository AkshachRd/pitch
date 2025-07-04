import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { SearchTask, Source } from './types';

export interface TaskStore {
    id: string;
    question: string;
    questions: string;
    finalReport: string;
    query: string;
    title: string;
    suggestion: string;
    requirement: string;
    tasks: SearchTask[];
    sources: Source[];
    feedback: string;
}

type TaskFunction = {
    update: (tasks: SearchTask[]) => void;
    setId: (id: string) => void;
    setTitle: (title: string) => void;
    setSuggestion: (suggestion: string) => void;
    setRequirement: (requirement: string) => void;
    setQuery: (query: string) => void;
    updateTask: (query: string, task: Partial<SearchTask>) => void;
    removeTask: (query: string) => boolean;
    setQuestion: (question: string) => void;
    updateQuestions: (questions: string) => void;
    updateFinalReport: (report: string) => void;
    setSources: (sources: Source[]) => void;
    setFeedback: (feedback: string) => void;
    clear: () => void;
    reset: () => void;
    backup: () => TaskStore;
    restore: (taskStore: TaskStore) => void;
};

const defaultValues: TaskStore = {
    id: '',
    question: '',
    questions: '',
    finalReport: '',
    query: '',
    title: '',
    suggestion: '',
    requirement: '',
    tasks: [],
    sources: [],
    feedback: '',
};

export const useTaskStore = create(
    persist<TaskStore & TaskFunction>(
        (set, get) => ({
            ...defaultValues,
            update: (tasks) => set(() => ({ tasks: [...tasks] })),
            setId: (id) => set(() => ({ id })),
            setTitle: (title) => set(() => ({ title })),
            setSuggestion: (suggestion) => set(() => ({ suggestion })),
            setRequirement: (requirement) => set(() => ({ requirement })),
            setQuery: (query) => set(() => ({ query })),
            updateTask: (query, task) => {
                const newTasks = get().tasks.map((item) => {
                    return item.query === query ? { ...item, ...task } : item;
                });

                set(() => ({ tasks: [...newTasks] }));
            },
            removeTask: (query) => {
                set((state) => ({
                    tasks: state.tasks.filter((task) => task.query !== query),
                }));

                return true;
            },
            setQuestion: (question) => set(() => ({ question })),
            updateQuestions: (questions) => set(() => ({ questions })),
            updateFinalReport: (report) => set(() => ({ finalReport: report })),
            setSources: (sources) => set(() => ({ sources })),
            setFeedback: (feedback) => set(() => ({ feedback })),
            clear: () => set(() => ({ tasks: [] })),
            reset: () => set(() => ({ ...defaultValues })),
            backup: () => {
                const state = get();
                const backupState = Object.fromEntries(
                    Object.keys(defaultValues).map((key) => [key, state[key as keyof TaskStore]]),
                );

                return { ...defaultValues, ...backupState } as TaskStore;
            },
            restore: (taskStore) => set(() => ({ ...taskStore })),
        }),
        { name: 'research' },
    ),
);
