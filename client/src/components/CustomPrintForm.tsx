import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertCustomPrintRequestSchema } from "@shared/types";
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
import { useToast } from "@/hooks/use-toast";

interface UploadedFile {
  name: string;
  size: number;
  type: string;
  file?: File;
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

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (fileList: FileList) => {
    const newFiles = Array.from(fileList).map((file) => ({
      name: file.name,
      size: file.size,
      type: file.type,
      file,
    }));

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

  // ✅ FIXED onSubmit: uses FormData for S3 upload
  const onSubmit = async (data: FormData) => {
    try {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value?.toString() || "");
      });

      if (files.length > 0) {
        formData.append("file", files[0].file!);
      }

      const response = await fetch("/api/custom-print-requests", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      toast({
        title: "✅ Request submitted successfully!",
        description: "We'll get back to you with a quote within 24 hours.",
      });
      reset();
      setFiles([]);
    } catch (error) {
      console.error("❌ Failed to submit request:", error);
      toast({
        title: "Submission failed",
        description: "There was an error submitting your request. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* --- Name, Email, Phone --- */}
      <div>
        <Label htmlFor="name">Your Name</Label>
        <Input id="name" placeholder="Enter your name" className="mt-2" {...register("name")} />
        {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="your@email.com" className="mt-2" {...register("email")} />
        {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" type="tel" placeholder="+91 98765 43210" className="mt-2" {...register("phone")} />
        {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>}
      </div>

      {/* --- File Upload --- */}
      <div>
        <Label>Upload Files</Label>
        <Card
          className={`mt-2 transition-colors ${dragActive ? "border-primary bg-primary/5" : ""}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <CardContent className="p-8">
            <div className="flex flex-col items-center justify-center gap-4 text-center">
              <Upload className="h-10 w-10 text-muted-foreground" />
              <div>
                <p className="font-medium">Drag and drop your files here, or click to browse</p>
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
              />
              <Button type="button" variant="outline" asChild>
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
              <Card key={index}>
                <CardContent className="flex items-center gap-3 p-3">
                  {file.type.startsWith("image/") ? (
                    <img src={URL.createObjectURL(file.file!)} alt={file.name} className="h-12 w-12 rounded object-cover" />
                  ) : (
                    <div className="flex h-12 w-12 items-center justify-center rounded bg-muted">
                      <Box className="h-6 w-6 text-muted-foreground" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(2)} KB</p>
                  </div>
                  <Button type="button" variant="ghost" size="icon" onClick={() => removeFile(file.name)}>
                    <X className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* --- Material / Quantity / Size --- */}
      <div className="grid gap-6 sm:grid-cols-3">
        <div>
          <Label htmlFor="material">Material</Label>
          <Select value={material} onValueChange={(value) => setValue("material", value)}>
            <SelectTrigger id="material" className="mt-2">
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
          <Input id="quantity" type="number" min="1" className="mt-2" {...register("quantity")} />
          {errors.quantity && <p className="text-sm text-destructive mt-1">{errors.quantity.message}</p>}
        </div>

        <div>
          <Label htmlFor="size">Size</Label>
          <Input id="size" placeholder="e.g., 10x10x10 cm" className="mt-2" {...register("size")} />
          {errors.size && <p className="text-sm text-destructive mt-1">{errors.size.message}</p>}
        </div>
      </div>

      {/* --- Color + Description --- */}
      <div>
        <Label htmlFor="color">Color Preference</Label>
        <Input id="color" placeholder="e.g., Black, White, Red" className="mt-2" {...register("color")} />
        {errors.color && <p className="text-sm text-destructive mt-1">{errors.color.message}</p>}
      </div>

      <div>
        <Label htmlFor="projectDescription">Project Description</Label>
        <Textarea
          id="projectDescription"
          placeholder="Describe your project requirements, dimensions, color preferences, etc."
          className="mt-2 min-h-32"
          {...register("projectDescription")}
        />
        {errors.projectDescription && (
          <p className="text-sm text-destructive mt-1">{errors.projectDescription.message}</p>
        )}
      </div>

      <Button type="submit" size="lg" className="w-full">
        Request Quote
      </Button>
    </form>
  );
}
