import {IBase} from "@/types/root.types";

export enum EnumTaskPriority {
    Low = 'low',
    Medium = 'medium',
    High = 'high'
}

export interface ITaskResponse extends IBase {
    name: string;
    priority?: EnumTaskPriority;
    isCompleted: boolean
}

export type TypeTaskFormState = Partial<Omit<ITaskResponse, 'id' | 'updatedAt'>>