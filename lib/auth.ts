import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import db from "./db";
import { magicLink } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import { Resend } from "resend";
import MagicLinkEmail from "@/emails/magic-link";
import { polar, checkout, portal, usage } from "@polar-sh/better-auth";
import { polarClient } from "./polar-client";
import { admin as adminPlugin } from "better-auth/plugins";
import { admin, user, ac } from "@/components/permissions";

const resend = new Resend(process.env.RESEND_API_KEY as string);

export const auth = betterAuth({
  appName: "starter-kit",
  database: prismaAdapter(db, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  //uncomment this to send welcome email to user for first signup if wanted
  // hooks: {
  //   before: createAuthMiddleware(async (ctx) => {
  //     const session = ctx.context.newSession?.user ?? {
  //       name: ctx.body.name,
  //       email: ctx.body.email,
  //     };

  //     if (session != null) {
  //       console.log("send welcome email to user for first signup if wanted");
  //     }
  //   }),
  // },
  plugins: [
    magicLink({
      sendMagicLink: async ({ email, token, url }, ctx) => {
        // send email to user
        console.log("Send magic link to user", email, token, url);

        const { data, error } = await resend.emails.send({
          from: "Acme <onboarding@resend.dev>",
          to: [email],
          subject: "Your magic link",
          react: MagicLinkEmail({ magicLink: url }),
        });

        if (error) {
          throw new Error("Failed to send magic link email");
        }
      },
    }),
    nextCookies(),
    polar({
      client: polarClient,
      createCustomerOnSignUp: true,
      use: [
        checkout({
          products: [
            {
              productId: "7546b407-594b-4f9e-b308-e986b9b47eae", // ID of Product from Polar Dashboard
              slug: "pro", // Custom slug for easy reference in Checkout URL, e.g. /checkout/pro
            },
            {
              productId: "981f9322-220b-4d3c-ab79-9cbb639f3dff",
              slug: "creator",
            },
            {
              productId: "4cdba19a-f7ba-4bd8-b0d0-1ecc3b82ac69",
              slug: "power",
            },
          ],
          successUrl: "/success?checkout_id={CHECKOUT_ID}",
          authenticatedUsersOnly: true,
        }),
        portal(),
        usage(),
      ],
    }),
    adminPlugin({
      ac,
      admin,
      user,
    }),
  ],

  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "user",
        input: false,
      },
    },

    deleteUser: {
      enabled: true,
      async sendDeleteAccountVerification(data, request) {
        console.log("Account delete link", data.url);
      },
    },
  },

  rateLimit: {
    enabled: true,
    storage: "database",
  },
  advanced: {
    cookiePrefix: "ba_starter_kit",
  },
});
