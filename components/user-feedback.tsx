"use client";

import { useTransition } from "react";
import { MessageSquare } from "lucide-react";
import { SidebarMenuButton } from "./ui/sidebar";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { DialogClose, DialogFooter } from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import z from "zod";
import { toast } from "sonner";
import { Alert, AlertTitle } from "./ui/alert";
import { Input } from "./ui/input";

import { ModalProvider } from "./modal-provider";
import { storeUserFeedBack } from "@/server/feedback";
import { UserFeedbackSchema } from "@/schemas/user-feeback-schema";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";

interface UserFeedbackProps {
  email?: string;
}
const UserFeedback = ({ email }: UserFeedbackProps) => {
  const [isLoading, startTransition] = useTransition();
  const form = useForm<z.infer<typeof UserFeedbackSchema>>({
    resolver: zodResolver(UserFeedbackSchema),
    defaultValues: { message: "", email: email },
    mode: "onSubmit",
  });

  function onSubmit(values: z.infer<typeof UserFeedbackSchema>) {
    startTransition(async () => {
      const res = await storeUserFeedBack(values);
      if (res.status) {
        toast.custom((t) => (
          <Alert variant="success">
            <AlertTitle>Your feedback successfully submitted</AlertTitle>
          </Alert>
        ));
        form.reset();
      } else {
        toast.custom((t) => (
          <Alert variant="destructive">
            <AlertTitle>{res.message}</AlertTitle>
          </Alert>
        ));
      }
    });
  }
  return (
    <ModalProvider
      trigger={
        <SidebarMenuButton tooltip={"Feedback"}>
          <MessageSquare /> Feedback
        </SidebarMenuButton>
      }
      title="Feedback"
      description="We would love to hear your feedback!"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} id="form-feedback">
          <div className="">
            <FieldGroup>
              <Controller
                control={form.control}
                name="email"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Email?</FieldLabel>
                    <Input
                      placeholder="email..."
                      {...field}
                      id="form-email-input"
                      type="email"
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                      readOnly={email ? true : false}
                    />
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name="message"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-feedback-message">
                      Message
                    </FieldLabel>
                    <Textarea
                      placeholder="Tell us how can we imporove our product"
                      {...field}
                      id="form-feedback-message"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.error && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </div>
          <DialogFooter className="pt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Close
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading}>
              Submit
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </ModalProvider>
  );
};

export default UserFeedback;
