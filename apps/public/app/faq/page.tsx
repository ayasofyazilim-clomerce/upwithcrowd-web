import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqItems = [
  {
    question: "What is crowdfunding?",
    answer: "Crowdfunding is a method of raising capital through the collective effort of friends, family, customers, and individual investors. This approach taps into the collective efforts of a large pool of individuals—primarily online via social media and crowdfunding platforms—and leverages their networks for greater reach and exposure."
  },
  {
    question: "How does CrowdFund work?",
    answer: "CrowdFund provides a platform for project creators to showcase their ideas and for backers to support projects they believe in. Creators set a funding goal and deadline. If the project reaches its funding goal, backers' credit cards are charged when the campaign ends. If the project doesn't reach its funding goal, no one is charged."
  },
  {
    question: "What types of projects can I fund on CrowdFund?",
    answer: "CrowdFund supports a wide variety of projects across different categories including technology, arts, film, music, publishing, games, and more. We encourage innovative and creative projects that have a clear goal and can make a positive impact."
  },
  {
    question: "How do I start a project on CrowdFund?",
    answer: "To start a project, you need to create an account, then click on the 'Start a Project' button. You'll be guided through a process where you'll provide details about your project, set your funding goal, create rewards for backers, and submit your project for review."
  },
  {
    question: "Is my donation tax-deductible?",
    answer: "In most cases, contributions to CrowdFund projects are not tax-deductible. CrowdFund is not a 501(c)(3) organization. That said, some projects might be run by nonprofit organizations. In those cases, you should contact the project creator directly to determine if your contribution is tax-deductible."
  },
  {
    question: "What happens if a project doesn't reach its funding goal?",
    answer: "If a project doesn't reach its funding goal by the deadline, no money is collected from backers and the project creator receives nothing. This is part of our all-or-nothing funding model, which protects both creators and backers."
  },
  {
    question: "How does CrowdFund make money?",
    answer: "CrowdFund applies a 5% fee to the funds collected for creators. Our payments processor also charges a fee of 3% + $0.20 per pledge. These fees only apply to successfully funded projects."
  }
]

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">Frequently Asked Questions</h1>
        <p className="text-lg md:text-xl mb-8 text-center max-w-2xl mx-auto">
          Find answers to common questions about CrowdFund, how it works, and how you can get involved.
        </p>

        <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </main>
    </div>
  )
}

