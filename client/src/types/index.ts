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
