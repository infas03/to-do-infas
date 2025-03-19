import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Form,
} from "@heroui/react";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";

import { LockIcon } from "./icons";

import { departments } from "@/config/staticValue";
import { EmployeeFormData } from "@/types";

export const EmployeesAddForm = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = Object.fromEntries(
      new FormData(e.currentTarget)
    ) as unknown as EmployeeFormData;

    console.log("Submitted data:", data);
  };

  return (
    <>
      <Button color="primary" onPress={onOpen}>
        Add Employee
      </Button>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <Form className="w-full max-w-xs" onSubmit={onSubmit}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Add Employee
                </ModalHeader>
                <ModalBody>
                  <Input
                    isRequired
                    errorMessage="Please enter a valid first name"
                    label="First Name"
                    name="firstName"
                    placeholder="Enter first name"
                    type="text"
                    variant="bordered"
                  />
                  <Input
                    isRequired
                    errorMessage="Please enter a valid last name"
                    label="Last Name"
                    name="lastName"
                    placeholder="Enter last name"
                    type="text"
                    variant="bordered"
                  />
                  <Input
                    isRequired
                    errorMessage="Please enter a valid username"
                    label="Username"
                    name="username"
                    placeholder="Enter username"
                    type="text"
                    variant="bordered"
                  />
                  <Input
                    isRequired
                    endContent={
                      <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    errorMessage="Please enter a valid password"
                    label="Password"
                    name="password"
                    placeholder="Enter your password"
                    type="password"
                    variant="bordered"
                  />
                  <Autocomplete
                    isRequired
                    // aria-hidden="false"
                    className="w-full"
                    defaultItems={departments}
                    label="Department"
                    name="department"
                    placeholder="Select department"
                    variant="bordered"
                  >
                    {(item) => (
                      <AutocompleteItem key={item.key}>
                        {item.label}
                      </AutocompleteItem>
                    )}
                  </Autocomplete>
                </ModalBody>
                <ModalFooter>
                  <Button
                    color="danger"
                    type="button"
                    variant="flat"
                    onPress={onClose}
                  >
                    Cancel
                  </Button>
                  <Button color="primary" type="submit">
                    Add Employee
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Form>
      </Modal>
    </>
  );
};
