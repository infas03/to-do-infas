import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue,
} from "@heroui/table";
import { useEffect, useState } from "react";
import { Pagination } from "@heroui/react";

import { EmployeesAddForm } from "./employeeAddForm";
import { EmployerTableSkeleton } from "./skeleton/employerTableSkeleton";

import { Employee } from "@/types";
import { employeesTableColumns } from "@/config/staticValue";
import api from "@/services/api";

export const EmployeesTable = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const fetchEmployees = async (page: number = 1) => {
    setIsLoading(true);

    try {
      const response = await api.get("/v1/employees", {
        params: {
          page,
          limit: 3,
        },
      });
      console.log("response", response);
      setEmployees(response.data.data);
      setTotalPages(response.data.pagination.totalPages);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Error fetching employees:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-4 w-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">Employees</h1>
        <EmployeesAddForm
          onEmployeeCreated={() => fetchEmployees(currentPage)}
        />
      </div>

      {isLoading ? (
        <EmployerTableSkeleton />
      ) : (
        <>
          <Table aria-label="Example table with dynamic content">
            <TableHeader columns={employeesTableColumns}>
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
          <Pagination
            className="flex justify-end mt-0.5"
            page={currentPage}
            total={totalPages}
            onChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};
