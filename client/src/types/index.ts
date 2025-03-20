import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface EmployeeFormData {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  department: string;
}

export interface Employee {
  id?: number;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  department: string;
  finishedTasks?: number;
  totalTasks?: number;
}
export interface AssignFormData {
  name: string;
  description: string;
  priority: string;
  dueDate: string;
}

export interface LoginFormData {
  username: string;
  password: string;
}

export interface Task {
  id?: number;
  name: string;
  description: string;
  priority: string;
  dueDate: string;
  isCompleted: boolean;
}
