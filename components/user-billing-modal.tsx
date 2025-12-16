"use client";

import { ModalProvider } from "./modal-provider";
import { IconBolt, IconCreditCard, IconSettings } from "@tabler/icons-react";
import { Spinner } from "./ui/spinner";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "./ui/item";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getUserActiveSubscription } from "@/server/user";

export default function UserBillingModal() {
  const { data: userSubscription, isLoading } = useQuery({
    queryKey: ["get-user-subscription"],
    queryFn: () => getUserActiveSubscription(),
  });
  return (
    <ModalProvider
      trigger={
        <div className="flex items-center gap-2 rounded-md cursor-pointer hover:bg-sidebar-accent px-2 py-1.5 text-xs">
          <IconCreditCard className="size-4" />
          Billing
        </div>
      }
      title="Billing"
      description="Manage Billing"
    >
      <div>
        <div>
          {isLoading ? (
            <div className="flex items-center justify-center">
              <Spinner />
            </div>
          ) : (
            <>
              <Item variant={"muted"}>
                <ItemMedia variant="icon">
                  <IconCreditCard />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>Subscription Status</ItemTitle>
                  <ItemDescription>Current Plan</ItemDescription>
                </ItemContent>
                <ItemActions className="flex">
                  <Badge
                    size={"sm"}
                    variant={userSubscription ? "success" : "warning"}
                    appearance={"outline"}
                  >
                    {userSubscription ? "Pro plan" : "No Subscription"}
                  </Badge>
                  {userSubscription ? (
                    <Button
                      size={"xs"}
                      onClick={() => authClient.customer.portal()}
                    >
                      <IconSettings />
                      Manage Billing
                    </Button>
                  ) : (
                    <Button asChild size={"sm"} variant={"default"}>
                      <Link href={"/pricing"} prefetch>
                        <IconBolt />
                        Pricing
                      </Link>
                    </Button>
                  )}
                </ItemActions>
              </Item>
            </>
          )}
        </div>
      </div>
    </ModalProvider>
  );
}
