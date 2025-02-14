"use client";

import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Trash2} from "lucide-react";
import {useState} from "react";

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export default function FAQBuilder() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);

  const addFAQ = () => {
    const newFAQ: FAQ = {
      id: crypto.randomUUID(),
      question: "",
      answer: "",
    };
    setFaqs([...faqs, newFAQ]);
  };

  const updateFAQ = (id: string, field: keyof FAQ, value: string) => {
    setFaqs(faqs.map((faq) => (faq.id === id ? {...faq, [field]: value} : faq)));
  };

  const deleteFAQ = (id: string) => {
    setFaqs(faqs.filter((faq) => faq.id !== id));
  };

  return (
    <div className="flex  max-w-6xl flex-col items-center space-y-6">
      {faqs.map((faq) => (
        <Card className="w-full bg-white shadow-sm" key={faq.id}>
          <CardContent className="w-full space-y-4 p-4">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor={`question-${faq.id}`}>
                Question
              </label>
              <Input
                id={`question-${faq.id}`}
                onChange={(e) => { updateFAQ(faq.id, "question", e.target.value); }}
                placeholder="Enter your question"
                value={faq.question}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor={`answer-${faq.id}`}>
                Answer
              </label>
              <Textarea
                className="min-h-[100px]"
                id={`answer-${faq.id}`}
                onChange={(e) => { updateFAQ(faq.id, "answer", e.target.value); }}
                placeholder="Enter your answer"
                value={faq.answer}
              />
            </div>
            <div className="flex justify-end">
              <Button
                className="bg-muted hover:bg-muted/90 text-red-600 hover:text-red-700"
                onClick={() => { deleteFAQ(faq.id); }}
                size="lg"
                variant="destructive">
                <Trash2 className="mr-1 h-4 w-4" />
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      <Button className="bg-black text-white hover:bg-black/90" onClick={addFAQ}>
        Add another FAQ
      </Button>
    </div>
  );
}
