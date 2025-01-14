"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash2 } from "lucide-react";
import { useState } from "react";

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
    setFaqs(
      faqs.map((faq) => (faq.id === id ? { ...faq, [field]: value } : faq)),
    );
  };

  const deleteFAQ = (id: string) => {
    setFaqs(faqs.filter((faq) => faq.id !== id));
  };

  return (
    <div className="flex  max-w-6xl flex-col items-center space-y-6">
      {faqs.map((faq) => (
        <Card key={faq.id} className="w-full bg-white shadow-sm">
          <CardContent className="w-full space-y-4 p-4">
            <div className="space-y-2">
              <label
                htmlFor={`question-${faq.id}`}
                className="text-sm font-medium"
              >
                Question
              </label>
              <Input
                id={`question-${faq.id}`}
                value={faq.question}
                onChange={(e) => updateFAQ(faq.id, "question", e.target.value)}
                placeholder="Enter your question"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor={`answer-${faq.id}`}
                className="text-sm font-medium"
              >
                Answer
              </label>
              <Textarea
                id={`answer-${faq.id}`}
                value={faq.answer}
                onChange={(e) => updateFAQ(faq.id, "answer", e.target.value)}
                placeholder="Enter your answer"
                className="min-h-[100px]"
              />
            </div>
            <div className="flex justify-end">
              <Button
                variant="destructive"
                size="lg"
                onClick={() => deleteFAQ(faq.id)}
                className="bg-muted hover:bg-muted/90 text-red-600 hover:text-red-700"
              >
                <Trash2 className="mr-1 h-4 w-4" />
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      <Button
        onClick={addFAQ}
        className="bg-black text-white hover:bg-black/90"
      >
        Add another FAQ
      </Button>
    </div>
  );
}
