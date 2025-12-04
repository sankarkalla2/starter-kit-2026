"use server";

import { auth } from "@/lib/auth";
import { polarClient } from "@/lib/polar-client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const getUserActiveSubscription = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) return null;

  const customer = await polarClient.customers.getStateExternal({
    externalId: session.user.id,
  });

  const subscription = customer.activeSubscriptions[0];
  return subscription ?? null;
};

export const redirectUnauthrizedUser = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return redirect("/sign-in");
  }
};

export const redirectAuthrizedUser = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session) {
    return redirect("/dashboard");
  }
};
