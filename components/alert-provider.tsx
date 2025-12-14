"use client";

import { Alert, AlertIcon, AlertTitle, AlertToolbar } from "./ui/alert";
import { Button } from "./ui/button";
import { toast } from "sonner";


interface AlertProviderProps {
  title: string;
  actionLabel: string;
  action: () => void;
  icon: React.ReactNode;
}
export default function AlertProvider({ title, actionLabel, action, icon }: AlertProviderProps) {
  return (
    <Alert variant="primary" onClose={() => toast.dismiss()}>
      <AlertIcon>
        {icon}
      </AlertIcon>
      <AlertTitle>{title}</AlertTitle>
      <AlertToolbar>
        <Button
          variant="inverse"
          mode="link"
          underlined="solid"
          size="sm"
          className="flex mt-0.5"
          onClick={() => action()}
        >
          {actionLabel}
        </Button>
      </AlertToolbar>
    </Alert>
  );
}
