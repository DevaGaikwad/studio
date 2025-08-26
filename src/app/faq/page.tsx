
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


const faqItems = [
    {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards (VISA, Mastercard, American Express), UPI, Net Banking, and popular wallets through our secure Razorpay payment gateway. We also offer Cash on Delivery (COD) for most locations in India."
    },
    {
        question: "How can I track my order?",
        answer: "Once your order is shipped, you will receive an email with the tracking number and a link to the courier's website. You can also find your order details and tracking information in the 'My Orders' section of your account."
    },
    {
        question: "What is your return policy?",
        answer: "We offer a 15-day return policy for unused and unworn items with original tags attached. To initiate a return, please visit the 'My Orders' page and select the item you wish to return. For more details, please see our Shipping & Returns page."
    },
    {
        question: "How long does shipping take?",
        answer: "Standard shipping usually takes 3-5 business days for metro cities and 5-7 business days for other locations. You will receive a more precise delivery estimate at checkout."
    },
    {
        question: "Do you ship internationally?",
        answer: "Currently, we only ship within India. We are working on expanding our services to international locations soon. Stay tuned for updates!"
    },
    {
        question: "How do I know what size to order?",
        answer: "Each product page has a size guide with detailed measurements. We recommend comparing these measurements to a similar garment you own to find the perfect fit."
    }
];

export default function FAQPage() {
  return (
    <div className="bg-secondary">
      <Header />
      <main className="container mx-auto px-4 py-16">
         <div className="text-center mb-12">
            <h1 className="text-5xl font-bold font-headline">Frequently Asked Questions</h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about orders, shipping, returns, and more.
            </p>
        </div>

        <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-lg text-left">{item.question}</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground text-base">
                           {item.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>

      </main>
      <Footer />
    </div>
  );
}
