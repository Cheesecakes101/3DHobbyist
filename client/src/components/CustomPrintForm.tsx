import { useState, useCallback } from "react";
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

interface UploadedFile {
  name: string;
  size: number;
  type: string;
  preview?: string;
}

export default function CustomPrintForm() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);

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

    setFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (fileName: string) => {
    setFiles((prev) => prev.filter((file) => file.name !== fileName));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Quote request submitted", { files });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="project-name">Project Name</Label>
        <Input
          id="project-name"
          placeholder="Enter your project name"
          className="mt-2"
          data-testid="input-project-name"
        />
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

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <Label htmlFor="material">Material Preference</Label>
          <Select>
            <SelectTrigger id="material" className="mt-2" data-testid="select-material">
              <SelectValue placeholder="Select material" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pla">PLA</SelectItem>
              <SelectItem value="abs">ABS</SelectItem>
              <SelectItem value="petg">PETG</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="quantity">Quantity</Label>
          <Input
            id="quantity"
            type="number"
            min="1"
            defaultValue="1"
            className="mt-2"
            data-testid="input-quantity"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="description">Project Description</Label>
        <Textarea
          id="description"
          placeholder="Describe your project requirements, dimensions, color preferences, etc."
          className="mt-2 min-h-32"
          data-testid="textarea-description"
        />
      </div>

      <Button type="submit" size="lg" className="w-full" data-testid="button-submit-quote">
        Request Quote
      </Button>
    </form>
  );
}
