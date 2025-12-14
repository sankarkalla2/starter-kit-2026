"use server";

import { auth } from "@/lib/auth";
import { polarClient } from "@/lib/polar-client";
import { headers } from "next/headers";

export const updateSubscription = async (
  subscriptionId: string,
  newProductId: string
) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const customer = await polarClient.customers.getStateExternal({
    externalId: session.user.id,
  });

  if (!customer) {
    throw new Error("Customer not found");
  }

  const sessionResult = await polarClient.customerSessions.create({
    customerId: customer.id,
  });

  const customerSessionToken = sessionResult.token;

  await polarClient.customerPortal.subscriptions.update(
    {
      customerSession: customerSessionToken,
    },
    {
      id: subscriptionId,
      customerSubscriptionUpdate: { productId: newProductId },
    }
  );
};
