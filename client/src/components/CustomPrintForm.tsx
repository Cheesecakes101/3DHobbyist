import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { insertCustomPrintRequestSchema } from "@shared/schema";
import { z } from "zod";
import { Upload, X, FileImage, Box } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface UploadedFile {
  name: string;
  size: number;
  type: string;
  preview?: string;
}

const formSchema = insertCustomPrintRequestSchema.extend({
  quantity: z.coerce.number().int().positive("Quantity must be at least 1"),
});

type FormData = z.infer<typeof formSchema>;

export default function CustomPrintForm() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      material: "PLA",
      quantity: 1,
      hasFile: "no",
    },
  });

  const material = watch("material");

  const submitRequestMutation = useMutation({
    mutationFn: async (data: FormData) => {
      return await apiRequest("/api/custom-print-requests", "POST", data);
    },
    onSuccess: () => {
      toast({
        title: "Request submitted successfully!",
        description: "We'll get back to you with a quote within 24 hours.",
      });
      reset();
      setFiles([]);
    },
    onError: () => {
      toast({
        title: "Submission failed",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (fileList: FileList) => {
    const newFiles = Array.from(fileList).map((file) => {
      const uploadedFile: UploadedFile = {
        name: file.name,
        size: file.size,
        type: file.type,
      };

      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const preview = e.target?.result as string;
          setFiles((prev) =>
            prev.map((f) => (f.name === file.name ? { ...f, preview } : f))
          );
        };
        reader.readAsDataURL(file);
      }

      return uploadedFile;
    });

    setFiles((prev) => {
      const updated = [...prev, ...newFiles];
      setValue("hasFile", updated.length > 0 ? "yes" : "no");
      return updated;
    });
  };

  const removeFile = (fileName: string) => {
    setFiles((prev) => {
      const updated = prev.filter((file) => file.name !== fileName);
      setValue("hasFile", updated.length > 0 ? "yes" : "no");
      return updated;
    });
  };

  const onSubmit = async (data: FormData) => {
    await submitRequestMutation.mutateAsync(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Label htmlFor="name">Your Name</Label>
        <Input
          id="name"
          placeholder="Enter your name"
          className="mt-2"
          {...register("name")}
          data-testid="input-name"
        />
        {errors.name && (
          <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="your@email.com"
          className="mt-2"
          {...register("email")}
          data-testid="input-email"
        />
        {errors.email && (
          <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="+91 98765 43210"
          className="mt-2"
          {...register("phone")}
          data-testid="input-phone"
        />
        {errors.phone && (
          <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>
        )}
      </div>

      <div>
        <Label>Upload Files</Label>
        <Card
          className={`mt-2 transition-colors ${
            dragActive ? "border-primary bg-primary/5" : ""
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <CardContent className="p-8">
            <div className="flex flex-col items-center justify-center gap-4 text-center">
              <Upload className="h-10 w-10 text-muted-foreground" />
              <div>
                <p className="font-medium">
                  Drag and drop your files here, or click to browse
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Accepts 3D files (.STL, .OBJ) and images (.JPEG, .PNG, .JPG)
                </p>
              </div>
              <input
                type="file"
                multiple
                onChange={handleChange}
                accept=".stl,.obj,.jpeg,.jpg,.png"
                className="hidden"
                id="file-upload"
                data-testid="input-file-upload"
              />
              <Button type="button" variant="outline" asChild data-testid="button-browse-files">
                <label htmlFor="file-upload" className="cursor-pointer">
                  Browse Files
                </label>
              </Button>
            </div>
          </CardContent>
        </Card>

        {files.length > 0 && (
          <div className="mt-4 space-y-2">
            {files.map((file, index) => (
              <Card key={index} data-testid={`uploaded-file-${index}`}>
                <CardContent className="flex items-center gap-3 p-3">
                  {file.preview ? (
                    <img
                      src={file.preview}
                      alt={file.name}
                      className="h-12 w-12 rounded object-cover"
                    />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded bg-muted">
                      {file.type.startsWith("image/") ? (
                        <FileImage className="h-6 w-6 text-muted-foreground" />
                      ) : (
                        <Box className="h-6 w-6 text-muted-foreground" />
                      )}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFile(file.name)}
                    data-testid={`button-remove-file-${index}`}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <div>
          <Label htmlFor="material">Material</Label>
          <Select value={material} onValueChange={(value) => setValue("material", value)}>
            <SelectTrigger id="material" className="mt-2" data-testid="select-material">
              <SelectValue placeholder="Select material" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="PLA">PLA</SelectItem>
              <SelectItem value="ABS">ABS</SelectItem>
              <SelectItem value="PETG">PETG</SelectItem>
              <SelectItem value="Resin">Resin</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="quantity">Quantity</Label>
          <Input
            id="quantity"
            type="number"
            min="1"
            className="mt-2"
            {...register("quantity")}
            data-testid="input-quantity"
          />
          {errors.quantity && (
            <p className="text-sm text-destructive mt-1">{errors.quantity.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="size">Size</Label>
          <Input
            id="size"
            placeholder="e.g., 10x10x10 cm"
            className="mt-2"
            {...register("size")}
            data-testid="input-size"
          />
          {errors.size && (
            <p className="text-sm text-destructive mt-1">{errors.size.message}</p>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="color">Color Preference</Label>
        <Input
          id="color"
          placeholder="e.g., Black, White, Red"
          className="mt-2"
          {...register("color")}
          data-testid="input-color"
        />
        {errors.color && (
          <p className="text-sm text-destructive mt-1">{errors.color.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="projectDescription">Project Description</Label>
        <Textarea
          id="projectDescription"
          placeholder="Describe your project requirements, dimensions, color preferences, etc."
          className="mt-2 min-h-32"
          {...register("projectDescription")}
          data-testid="textarea-description"
        />
        {errors.projectDescription && (
          <p className="text-sm text-destructive mt-1">{errors.projectDescription.message}</p>
        )}
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={submitRequestMutation.isPending}
        data-testid="button-submit-quote"
      >
        {submitRequestMutation.isPending ? "Submitting..." : "Request Quote"}
      </Button>
    </form>
  );
}
