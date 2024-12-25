import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "How do I share my promo codes with customers?",
    answer: "You can share your promo codes through WhatsApp or SMS using the share buttons in the 'My Referrals' section. Make sure to include your unique agent ID when sharing codes to track your referrals."
  },
  {
    question: "How do I track my redemptions?",
    answer: "Your redemptions are tracked automatically in the dashboard. You can view your daily, weekly, and monthly performance metrics, including the number of codes redeemed and total revenue generated."
  },
  {
    question: "What happens when a customer uses my promo code?",
    answer: "When a customer uses your promo code, you'll receive credit for the redemption. The transaction will be recorded in your dashboard, and you'll be able to track the status (completed, cancelled, or expired) in real-time."
  },
  {
    question: "How is my performance ranking calculated?",
    answer: "Your performance ranking is based on several factors including the number of successful redemptions, total revenue generated, and customer satisfaction ratings. The leaderboard is updated in real-time."
  },
  {
    question: "What should I do if a customer has trouble using a code?",
    answer: "If a customer has trouble using a code, first verify that the code hasn't expired. You can check the status in your dashboard. If the code is valid but still not working, use the Support Center to raise a ticket for immediate assistance."
  },
  {
    question: "How do I earn bonuses and rewards?",
    answer: "You can earn bonuses by achieving monthly targets, maintaining high customer satisfaction ratings, and ranking high on the leaderboard. Special incentives are also offered during promotional periods."
  },
  {
    question: "Can I view my historical performance data?",
    answer: "Yes, you can access your historical performance data in the dashboard. This includes past redemptions, revenue generated, and performance trends over time."
  },
  {
    question: "What happens to expired or unused codes?",
    answer: "Expired or unused codes are automatically archived after their validity period. You can view these in the Archived Data section, but they can no longer be used for redemptions."
  },
  {
    question: "How do I update my agent profile?",
    answer: "You can update your profile information including contact details and notification preferences through the Profile Settings section. Keep your information up to date to ensure you receive important updates."
  },
  {
    question: "What should I do if I notice suspicious activity?",
    answer: "If you notice any suspicious activity such as unauthorized redemptions or unusual patterns, immediately report it through the Support Center. Our security team will investigate and take necessary action."
  }
];

export function AgentFAQ() {
  return (
    <Card className="w-full animate-fadeIn">
      <CardHeader className="flex flex-row items-center gap-2">
        <HelpCircle className="h-5 w-5" />
        <CardTitle>Frequently Asked Questions</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}