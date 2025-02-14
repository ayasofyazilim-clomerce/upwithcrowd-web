"use client";

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "@/components/ui/sonner";
import {Button} from "@/components/ui/button";
import {useEffect, useState} from "react";
import TextWithTitle from "../../new/_components/text-with-title";
import {FormContainer} from "../../new/_components/form";
import {Section} from "../../new/_components/section";

interface SelectedFileWithPreview extends File {
  preview: string;
}

const imageSchema = z.object({
  images: z
    .array(z.instanceof(File))
    .min(1, "Please select at least one image")
    .refine((files) => files.every((file) => file.size <= 5000000), `Max file size is 5MB.`)
    .refine(
      (files) => files.every((file) => ["image/jpeg", "image/png", "image/gif", "image/webp"].includes(file.type)),
      "Only .jpg, .png, .gif and .webp formats are supported.",
    ),
});

type ImageFormValues = z.infer<typeof imageSchema>;

export default function ImagesClient() {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<SelectedFileWithPreview[]>([]);

  const form = useForm<ImageFormValues>({
    resolver: zodResolver(imageSchema),
    defaultValues: {
      images: [],
    },
  });

  const handleFileSelect = (files: File[]) => {
    const validFiles = files.filter(
      (file) => file.size <= 5000000 && ["image/jpeg", "image/png", "image/gif", "image/webp"].includes(file.type),
    );

    if (validFiles.length !== files.length) {
      toast.error("Some files were skipped due to invalid format or size");
    }

    const filesWithPreviews = validFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      }),
    );

    setSelectedFiles((prev) => [...prev, ...filesWithPreviews]);
    form.setValue("images", [...selectedFiles, ...filesWithPreviews]);
  };

  const removeFile = (fileIndex: number) => {
    setSelectedFiles((prev) => {
      const newFiles = prev.filter((_, index) => index !== fileIndex);
      form.setValue("images", newFiles);
      // Clean up the preview URL
      URL.revokeObjectURL(prev[fileIndex].preview);
      return newFiles;
    });
  };

  // Clean up preview URLs when component unmounts
  useEffect(() => {
    return () => {
      selectedFiles.forEach((file) => {
        URL.revokeObjectURL(file.preview);
      });
    };
  }, []);

  const onSubmit = async () => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append("images", file);
      });

      const response = await fetch("/api/projects/images", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      toast.success("Images uploaded successfully");
      setSelectedFiles([]);
      form.reset();
    } catch (error) {
      toast.error("An error occurred while uploading the images");
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
          text="Projenize ait görselleri yükleyin."
          title="Proje Görselleri"
        />

        <Form {...form}>
          <form className="space-y-4" onSubmit={() => void form.handleSubmit(onSubmit)}>
            <Section text="Upload images to your project" title="Upload Images">
              <FormContainer>
                <FormField
                  control={form.control}
                  name="images"
                  render={({field: {...field}}) => (
                    <FormItem>
                      <FormLabel>Upload Images</FormLabel>
                      <FormControl>
                        <Input
                          accept="image/jpeg,image/png,image/gif,image/webp"
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
                    <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                      {selectedFiles.map((file, index) => (
                        <li className="group relative" key={index}>
                          <div className="aspect-square overflow-hidden rounded-lg border">
                            <img alt={file.name} className="h-full w-full object-cover" src={file.preview} />
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                            <Button
                              className="absolute right-2 top-2"
                              onClick={() => {
                                removeFile(index);
                              }}
                              size="sm"
                              type="button"
                              variant="destructive">
                              Remove
                            </Button>
                          </div>
                          <p className="mt-1 truncate text-xs">{file.name}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </FormContainer>
            </Section>
            <Button disabled={isLoading} type="submit">
              {isLoading ? "Uploading..." : "Upload Images"}
            </Button>
          </form>
        </Form>
      </section>
    </div>
  );
}
