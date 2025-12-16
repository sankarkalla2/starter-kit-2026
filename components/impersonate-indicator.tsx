"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { UserX } from "lucide-react";
import { useRouter } from "next/navigation";

export function ImpersonationIndicatator() {
  const router = useRouter();
  const { data: session, refetch } = authClient.useSession();

  if (session?.session.impersonatedBy == null) return null;

  return (
    <div className="flex items-center justify-center w-full fixed bottom-4 left-0">
      <Button
        variant={"destructive"}
        onClick={() => {
          authClient.admin.stopImpersonating(undefined, {
            onSuccess: () => {
              router.push("/admin");
              refetch();
            },
          });
        }}
      >
        <UserX />
        stop impersonating
      </Button>
    </div>
  );
}
