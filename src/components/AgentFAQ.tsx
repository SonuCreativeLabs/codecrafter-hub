import { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const faqs = [
  {
    question: "How do I generate new promo codes?",
    answer: "Navigate to the 'Promo Codes' section and click on 'Generate New Code'. Follow the prompts to set the code parameters and validity period."
  },
  {
    question: "What happens when a code expires?",
    answer: "Expired codes automatically become inactive and can't be redeemed. You'll receive a notification when codes are about to expire."
  },
  {
    question: "How is the performance score calculated?",
    answer: "Your performance score is based on several factors including successful redemptions, customer feedback, and response time to support queries."
  },
  {
    question: "How do I track my referrals?",
    answer: "Check the 'Referrals' section on your dashboard. It shows all your referred agents and their status."
  },
  {
    question: "What should I do if I notice suspicious activity?",
    answer: "Immediately report it through the Support Center. Select 'Security' as the category and provide all relevant details."
  }
];

export function AgentFAQ() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card className="p-6 space-y-6 animate-in slide-in">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
        <p className="text-muted-foreground">
          Find quick answers to common questions.
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search FAQs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <Accordion type="single" collapsible className="w-full">
        {filteredFaqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent>
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Card>
  );
}