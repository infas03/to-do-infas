import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Progress,
} from "@heroui/react";

import { Employee } from "@/types";

interface AnalyticCardProps {
  employee?: Employee;
}

export const AnalyticCard = ({ employee }: AnalyticCardProps) => {
  const taskFinished =
    employee?.totalTasks === 0 || employee?.finishedTasks === 0
      ? 0
      : ((employee?.finishedTasks ?? 0) / (employee?.totalTasks ?? 0)) * 100;

  return (
    <Card className="min-w-[250px]">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">
          <p className="text-lg font-bold">
            {employee?.firstName} {employee?.lastName}
          </p>
          <p className="text-small text-default-500 font-medium">
            {employee?.department}
          </p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="flex justify-between mb-2">
          <p>Task Completion</p>
          <p>{taskFinished}%</p>
        </div>

        <Progress
          aria-label="Loading..."
          className="w-full"
          value={taskFinished}
        />
      </CardBody>
      <Divider />
      <CardFooter>
        <div>
          {employee?.finishedTasks} of {employee?.totalTasks} tasks completed
        </div>
      </CardFooter>
    </Card>
  );
};
