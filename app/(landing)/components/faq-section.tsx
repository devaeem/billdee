import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FAQSection() {
  const faqs = [
    {
      question: "What is BillDee?",
      answer:
        "BillDee is an online store management and billing platform that helps streamline your business operations with an easy-to-use, fast, and efficient system.",
    },
    {
      question: "How much does it cost?",
      answer:
        "We offer various packages starting from a free tier for small businesses to premium packages for larger enterprises that need additional features. All plans come with core functionalities to help manage your business effectively.",
    },
    {
      question: "Which devices can I use BillDee on?",
      answer:
        "BillDee is accessible on all devices through web browsers, including computers, tablets, and smartphones. Our responsive design ensures a seamless experience across all platforms, allowing you to work efficiently anywhere, anytime.",
    },
    {
      question: "Do you have reporting and analytics features?",
      answer:
        "Yes, we provide comprehensive reporting including sales reports, best-selling products, regular customers, and trend analysis. These insights help you make better business decisions and track your growth effectively.",
    },
    {
      question: "How secure is my data?",
      answer:
        "We implement high-security standards with encrypted data storage and transmission. Your business data is protected with automatic backups and industry-standard security protocols to ensure complete peace of mind.",
    },
  ];

  return (
    <section className="py-16 bg-slate-100">
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground">
              Common questions about BillDee answered
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
