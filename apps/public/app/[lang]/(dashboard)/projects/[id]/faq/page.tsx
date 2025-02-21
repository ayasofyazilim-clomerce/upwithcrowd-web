import ClientFAQ from "./client";

interface FAQItem {
  question: string;
  answer: string;
}

const mockFAQList: FAQItem[] = [];

export default function FAQ() {
  // In a real application, you would fetch the FAQ list from an API or database here
  // const faqList = await getFAQList(params.id);

  return (
    <div>
      <ClientFAQ faqList={mockFAQList} />
    </div>
  );
}
