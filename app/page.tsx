"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export default function Home() {
  const session = authClient.useSession();

  return (
    <div className="">
      <Button>Hello world</Button>
      {session?.data && (
        <Button
          onClick={() =>
            authClient.signOut({
              fetchOptions: {
                onSuccess: () => {
                  console.log("Signed out");
                  redirect("/sign-in");
                },
              },
            })
          }
        >
          Sign Out
        </Button>
      )}
      <div>{JSON.stringify(session)}</div>
    </div>
  );
}
