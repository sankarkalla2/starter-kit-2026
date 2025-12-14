import PricingView from "@/modules/pricing/ui/views/pricing-vew";
import { getAllPlans } from "@/server/plans";
import { getUserActiveSubscription } from "@/server/user";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

const PricingPage = () => {
  const queryClient = new QueryClient();
  void queryClient.prefetchQuery({
    queryKey: ["get-all-plans"],
    queryFn: async () => await getAllPlans(),
  });

  void queryClient.prefetchQuery({
    queryKey: ["get-user-subscription"],
    queryFn: async () => await getUserActiveSubscription(),
  });

  return (
    <div className="h-full py-14">
      <div className="mx-auto max-w-xl text-center">
        <h2 className="text-3xl/tight font-semibold tracking-tight sm:text-4xl/tight">
          Choose your plan
        </h2>
        <p className="text-muted-foreground mt-4 text-base/7 sm:text-lg/8">
          Aliquet adipiscing lectus praesent cras sed quis lectus egestas.
        </p>
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PricingView />;
      </HydrationBoundary>
    </div>
  );
};

export default PricingPage;
