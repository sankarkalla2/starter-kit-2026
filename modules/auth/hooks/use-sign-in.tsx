import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { toast } from "sonner";

import { Alert, AlertTitle, AlertIcon } from "@/components/ui/alert";
import { AlertCircle, CheckCheck, CheckIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema } from "../login-form-schema";
import z from "zod";

export const useSignIn = () => {
  const [loading, setLoading] = useState(false);

  type LoginFormSchemaType = z.infer<typeof loginFormSchema>;
  const form = useForm<LoginFormSchemaType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const handleMagicLinkLogin = async (values: LoginFormSchemaType) => {
    await authClient.signIn.magicLink(
      {
        email: values.email,
        name: values.email.split("@")[0],
        callbackURL: "/dashboard",
      },
      {
        onRequest: (ctx) => {
          setLoading(true);
        },
        onResponse: (ctx) => {
          setLoading(false);
        },
        onSuccess: (ctx) => {
          toast.custom(
            (t) => (
              <Alert
                variant="mono"
                icon="success"
                onClose={() => toast.dismiss(t)}
              >
                <AlertIcon>
                  <CheckIcon />
                </AlertIcon>
                <AlertTitle>Magic link sent to your email</AlertTitle>
              </Alert>
            ),
            { duration: 4000 }
          );
        },
        onError: (ctx) => {
          console.log(ctx);
          toast.custom(
            (t) => (
              <Alert
                variant="mono"
                icon="destructive"
                onClose={() => toast.dismiss(t)}
              >
                <AlertIcon>
                  <AlertCircle />
                </AlertIcon>
                <AlertTitle>
                  {ctx.error.message ?? "Failed to send magic link"}
                </AlertTitle>
              </Alert>
            ),
            { duration: 5000 }
          );
        },
      }
    );
  };

  const handleSocialLogin = async (provider: "google" | "github") => {
    await authClient.signIn.social(
      {
        provider,
        callbackURL: "/dashboard",
      },
      {
        onRequest: (ctx) => {
          setLoading(true);
        },
        onResponse: (ctx) => {
          setLoading(false);
        },
        onError: (ctx) => {
          toast.custom(
            (t) => (
              <Alert
                variant="mono"
                icon="destructive"
                onClose={() => toast.dismiss(t)}
              >
                <AlertIcon>
                  <AlertCircle />
                </AlertIcon>
                <AlertTitle>{ctx.error.message}</AlertTitle>
              </Alert>
            ),
            { duration: 5000 }
          );
        },
      }
    );
  };

  return { loading, handleMagicLinkLogin, handleSocialLogin, form };
};
