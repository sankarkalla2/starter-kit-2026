"use server";

import { polarClient } from "@/lib/polar-client";

export const getAllPlans = async () => {
  const plans = await polarClient.products.list({
    isRecurring: true,
    sorting: ["price_amount"],
    isArchived: false,
  });

  return plans.result.items;
};
