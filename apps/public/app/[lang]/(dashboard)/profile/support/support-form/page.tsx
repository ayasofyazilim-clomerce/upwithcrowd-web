"use client";

import {useState} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Textarea} from "@/components/ui/textarea";
import {toast} from "@/components/ui/sonner";
import Link from "next/link";
import {Info} from "lucide-react";
import {postProjectApi} from "@/actions/upwithcrowd/tasks/post-action";

// API tipine uygun form şeması
const formSchema = z.object({
  tasksType: z.enum(["Issue", "Support"], {
    required_error: "Please select a task type",
  }),
  projectUrl: z
    .string()
    .optional()
    .refine((val) => {
      if (!val) return true; // Optional field
      return /\/projects\/[0-9a-f-]+$/i.exec(val) !== null;
    }, "Invalid project URL format"),
  memberId: z.string().optional(),
  summary: z
    .string()
    .min(5, "Summary must be at least 5 characters")
    .max(100, "Summary must not exceed 100 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must not exceed 500 characters"),
});

type FormValues = z.infer<typeof formSchema>;

export default function SupportFormClient() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tasksType: undefined,
      projectUrl: "",
      memberId: "",
      summary: "",
      description: "",
    },
  });

  const extractProjectId = (url: string): string | undefined => {
    const match = /\/projects\/(?:[0-9a-f-]+)$/i.exec(url);
    return match ? match[0].split("/").pop() : undefined;
  };

  async function onSubmit(values: FormValues) {
    try {
      setIsSubmitting(true);
      const projectId = values.projectUrl ? extractProjectId(values.projectUrl) : undefined;

      const response = await postProjectApi({
        requestBody: {
          tasksType: values.tasksType,
          roleType: "Tenant",
          projectId,
          memberId: values.memberId || undefined,
          summary: values.summary,
          description: values.description,
        },
      });
      if (response.type === "success") {
        toast.success(response.message);
        form.reset();
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="mx-auto w-full">
      <CardHeader className="px-4 sm:px-6">
        <div className="flex w-full items-center justify-between">
          <div>
            <CardTitle className="text-base sm:text-lg">Yeni Talep Oluştur</CardTitle>
            <CardDescription className="text-sm">
              Talebinizi oluşturun ve destek ekibimizden yardım alın.
            </CardDescription>
          </div>
          <Link href="/profile/support">
            <Button className="flex items-center gap-2" variant="default">
              Taleplerimi Görüntüle <Info className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-6" onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}>
            <FormField
              control={form.control}
              name="tasksType"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Task Type</FormLabel>
                  <Select defaultValue={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select task type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Issue">Issue</SelectItem>
                      <SelectItem value="Support">Support</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="projectUrl"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Project URL (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter project URL (e.g., http://localhost:3000/en/projects/your-project-id)"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>If this is related to a specific project, enter the project URL.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="summary"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Summary</FormLabel>
                  <FormControl>
                    <Input placeholder="Brief summary of your issue" {...field} />
                  </FormControl>
                  <FormDescription>Provide a short summary of your issue.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea className="min-h-[120px]" placeholder="Please describe your issue in detail" {...field} />
                  </FormControl>
                  <FormDescription>Provide a detailed description of your issue.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="w-full" disabled={isSubmitting} type="submit">
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
