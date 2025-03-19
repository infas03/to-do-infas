import { EmployeesTable } from "@/components/employeesTable";
import DefaultLayout from "@/layouts/default";

export default function Employees() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-5">
        <EmployeesTable />
      </section>
    </DefaultLayout>
  );
}
