import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faq = [
  {
    id: '1',
    question: 'How do I create an account?',
    answer: "To create an account, click on the 'Sign Up' button in the top right corner of our homepage. Fill in your details, verify your email address, and you're all set to go!",
  },
  {
    id: '2',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers. For enterprise customers, we also offer invoicing options.',
  },
  {
    id: '3',
    question: 'Can I cancel my subscription at any time?',
    answer: "Yes, you can cancel your subscription at any time. Go to your account settings, select 'Subscription', and click on 'Cancel Subscription'. Your access will continue until the end of your current billing period.",
  },
  {
    id: '4',
    question: 'How do I reset my password?',
    answer: "To reset your password, click on the 'Login' button, then select 'Forgot Password'. Enter your email address, and we'll send you instructions on how to create a new password.",
  },
  {
    id: '5',
    question: 'Is there a free trial available?',
    answer: "Yes, we offer a 14-day free trial for all new users. No credit card is required to start your trial. You'll get full access to all features during this period.",
  },
];

export default function FaqSection() {
  return (
    <section className="">
      <div className="mx-auto w-full max-w-2xl px-4 sm:px-6 lg:max-w-7xl">
        <div className="mx-auto max-w-2xl text-center [&>p]:mx-auto [&>p]:max-w-xl">
          <h2 className="text-4xl/tight font-bold tracking-tight">Frequent Questions</h2>
          <p className="text-muted-foreground mt-4 text-lg/8">Sed eu quam id quam tristique pharetra a at tortor veil dolarto. Suspendisse lorem odio sit amet libero facilisis.</p>
        </div>
        <div className="mx-auto mt-12 max-w-3xl lg:mt-16">
          <Accordion type="single" defaultValue="1" collapsible className="-mt-2 w-full">
            {faq.map((item) => (
              <div key={item.id} className="has-[[data-state=open]]:bg-muted/50 rounded-2xl p-8">
                <AccordionItem value={item.id} className="border-none">
                  <AccordionTrigger className="items-start gap-4 pt-0 pb-3 text-lg tracking-tight hover:no-underline hover:opacity-75 [&_svg]:mt-1">{item.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-0 text-sm/6">{item.answer}</AccordionContent>
                </AccordionItem>
              </div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
