"use client";
import { useQuery } from "@tanstack/react-query";

import PricingCard from "../components/pricing-card";
import { Spinner } from "@/components/ui/spinner";
import { usePricingPlan } from "../../hooks/use-pricing";
import { getAllPlans } from "@/server/plans";
import { getUserActiveSubscription } from "@/server/user";
import { authClient } from "@/lib/auth-client";

export default function PricingView() {
  const session = authClient.useSession();
  const { data: allPlans, isLoading: isGetPlansLoading } = useQuery({
    queryKey: ["get-all-plans"],
    queryFn: () => getAllPlans(),
  });
  const { data: userSubscription, isLoading: isGetSubscriptionLoading } =
    useQuery({
      queryKey: ["get-user-subscription"],
      queryFn: () => getUserActiveSubscription(),
    });

  if (isGetPlansLoading || isGetSubscriptionLoading || session.isPending) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner />
      </div>
    );
  }

  return (
    <section className="">
      <div className="mx-auto w-full max-w-2xl px-6 lg:max-w-7xl">
        <div className="mx-auto mt-12 grid gap-8 lg:max-w-5xl lg:grid-cols-3">
          {allPlans &&
            allPlans.map((plan) => {
              const { checkout, checkoutLabel } = usePricingPlan(
                plan,
                userSubscription
              );
              return (
                <PricingCard
                  key={plan.id}
                  checkout={checkout}
                  checkoutLabel={checkoutLabel}
                  plan={plan}
                  isLoggedIn={!!session.data?.user.id}
                />
              );
            })}
        </div>
      </div>
    </section>
  );
}
