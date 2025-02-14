"use client";

import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {toast} from "@/components/ui/sonner";
import {zodResolver} from "@hookform/resolvers/zod";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {FormContainer} from "../../new/_components/form";
import {Section} from "../../new/_components/section";
import TextWithTitle from "../../new/_components/text-with-title";

const documentSchema = z.object({
  documents: z
    .array(z.instanceof(File))
    .min(1, "Please select at least one file")
    .refine((files) => files.every((file) => file.size <= 5000000), `Max file size is 5MB.`)
    .refine(
      (files) =>
        files.every((file) =>
          [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          ].includes(file.type),
        ),
      "Only .pdf, .doc and .docx formats are supported.",
    ),
});

type DocumentFormValues = z.infer<typeof documentSchema>;

export default function DocumentsClient() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const form = useForm<DocumentFormValues>({
    resolver: zodResolver(documentSchema),
    defaultValues: {
      documents: [],
    },
  });

  const handleFileSelect = (files: File[]) => {
    const validFiles = files.filter(
      (file) =>
        file.size <= 5000000 &&
        [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ].includes(file.type),
    );

    if (validFiles.length !== files.length) {
      toast.error("Some files were skipped due to invalid format or size");
    }

    setSelectedFiles((prev) => [...prev, ...validFiles]);
    form.setValue("documents", [...selectedFiles, ...validFiles]);
  };

  const removeFile = (fileIndex: number) => {
    setSelectedFiles((prev) => {
      const newFiles = prev.filter((_, index) => index !== fileIndex);
      form.setValue("documents", newFiles);
      return newFiles;
    });
  };

  const onSubmit = async () => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append("documents", file);
      });

      const response = await fetch("/api/projects/documents", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      toast.success("Documents uploaded successfully");
      setSelectedFiles([]);
      form.reset();
    } catch (error) {
      toast.error("An error occurred while uploading the documents");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-muted min-h-screen w-full">
      <section className="mx-auto w-full max-w-7xl p-4 md:p-8">
        <TextWithTitle
          classNames={{
            container: "mb-8",
            title: "text-2xl font-medium",
            text: "text-lg",
          }}
          text="Projenize ait belgeleri yükleyin."
          title="Proje Belgeleri"
        />

        <Form {...form}>
          <form className="space-y-4" onSubmit={() => void form.handleSubmit(onSubmit)}>
            <Section text="Upload documents to your project" title="Upload Documents">
              <FormContainer>
                <FormField
                  control={form.control}
                  name="documents"
                  render={({field: {...field}}) => (
                    <FormItem>
                      <FormLabel>Upload Documents</FormLabel>
                      <FormControl>
                        <Input
                          accept=".pdf,.doc,.docx"
                          disabled={isLoading}
                          multiple
                          name={field.name}
                          onBlur={field.onBlur}
                          onChange={(e) => {
                            handleFileSelect(Array.from(e.target.files || []));
                          }}
                          ref={field.ref}
                          type="file"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {selectedFiles.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <h3 className="text-sm font-medium">Selected Files:</h3>
                    <ul className="space-y-2">
                      {selectedFiles.map((file, index) => (
                        <li className="flex items-center justify-between rounded-md border p-2" key={index}>
                          <span className="text-sm">{file.name}</span>
                          <Button
                            onClick={() => {
                              removeFile(index);
                            }}
                            size="sm"
                            type="button"
                            variant="destructive">
                            Remove
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </FormContainer>
            </Section>
            <Button disabled={isLoading} type="submit">
              {isLoading ? "Uploading..." : "Upload Documents"}
            </Button>
          </form>
        </Form>
      </section>
    </div>
  );
}
