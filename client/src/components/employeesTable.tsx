import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue,
} from "@heroui/table";
import { Button } from "@heroui/button";
import { EmployeesAddForm } from "./employeeAddForm";

export const EmployeesTable = () => {
  const employees = [
    { id: 1, firstName: "John", lastName: "Doe", department: "Engineering" },
    { id: 2, firstName: "Jane", lastName: "Smith", department: "Marketing" },
    { id: 3, firstName: "Alice", lastName: "Johnson", department: "HR" },
  ];

  const columns = [
    {
      key: "id",
      label: "Employee ID",
    },
    {
      key: "firstName",
      label: "First Name",
    },
    {
      key: "lastName",
      label: "Last Name",
    },
    {
      key: "department",
      label: "Department",
    },
    {
      key: "actions",
      label: "Actions",
    },
  ];

  return (
    <div className="p-4 w-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">Employees</h1>
        <EmployeesAddForm />
      </div>

      <Table aria-label="Example table with dynamic content">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={employees}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{getKeyValue(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
