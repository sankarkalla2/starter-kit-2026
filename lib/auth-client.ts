import { createAuthClient } from "better-auth/react";
import { magicLinkClient } from "better-auth/client/plugins";
import { polarClient } from "@polar-sh/better-auth";
import { adminClient } from "better-auth/client/plugins";
import { admin, user, ac } from "@/components/permissions";

export const authClient = createAuthClient({
  plugins: [
    magicLinkClient(),
    polarClient(),
    adminClient({
      ac,
      roles: {
        admin,
        user,
      },
    }),
  ],
});
