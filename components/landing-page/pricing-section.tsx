import { Button } from "@/components/ui/button";

const plans = [
  {
    id: "starter",
    title: "Starter",
    description: "For hobby projects and personal websites",
    price: 12,
    features: [
      "Basic components",
      "Use in 1 project",
      "Access to community forum",
      "Detailed documentation",
      "Regular updates",
    ],
    href: "#",
  },
  {
    id: "pro",
    title: "Professional",
    description: "For freelancers and individual developers",
    price: 24,
    features: [
      "Everything in Starter plan",
      "All components + future updates",
      "Use in unlimited projects",
      "Email support",
      "Figma design files",
    ],
    href: "#",
  },
  {
    id: "enterprise",
    title: "Enterprise",
    description: "For growing teams and businesses",
    price: 99,
    features: [
      "Everything in Pro plan",
      "5 team seats included",
      "Team management dashboard",
      "Advanced analytics",
      "Priority email support",
    ],
    href: "#",
  },
];

export default function PricingSection() {
  return (
    <section className="">
      <div className="mx-auto w-full max-w-2xl px-4 sm:px-6 lg:max-w-7xl">
        <div className="mx-auto max-w-2xl text-center [&>p]:mx-auto [&>p]:max-w-xl">
          <h2 className="text-4xl/tight font-bold tracking-tight">
            Choose your plan
          </h2>
          <p className="text-muted-foreground mt-4 text-lg/8">
            Sed eu quam id quam tristique pharetra a at tortor veil dolarto.
            Suspendisse lorem odio sit amet libero facilisis.
          </p>
        </div>
        <div className="mx-auto mt-12 grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div key={plan.id} className="bg-card rounded-2xl border shadow-xs">
              <div className="p-8 sm:p-12">
                <div className="space-y-2">
                  <h3 className="text-xl/snug font-semibold tracking-tight">
                    {plan.title}
                  </h3>
                  <p className="text-muted-foreground text-sm/6">
                    {plan.description}
                  </p>
                </div>
                <div className="mt-8">
                  <span className="text-4xl font-bold sm:text-5xl">
                    ${plan.price}
                  </span>
                  <span className="text-muted-foreground ml-1">/ month</span>
                </div>
                <ul className="mt-8 space-y-4 text-sm">
                  {plan.features.map((feature, i) => (
                    <li
                      key={i}
                      className="text-muted-foreground flex items-center"
                    >
                      <svg
                        className="mr-4 h-4 w-4 text-green-700"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button size="lg" className="mt-8 w-full" asChild>
                  <a href={plan.href}>Purchase {plan.title}</a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
