import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { UploadIcon, XIcon } from "lucide-react";
import { uplaodFile } from "@/api";
import { useRouter } from "@tanstack/react-router";
import { usePrivateAxios } from "@/hooks";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function FileUploadDialog() {
  const router = useRouter();
  const axios = usePrivateAxios();
  const [format, setFormat] = useState<string>("plain");

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback((newFile: File | null) => {
    if (newFile) {
      if (newFile.size > 5 * 1024 * 1024) {
        setError("File size should not exceed 5MB");
        return;
      }
      setFile(newFile);
      setError(null);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const droppedFile = e.dataTransfer.files[0];
      handleFile(droppedFile);
    },
    [handleFile],
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        handleFile(e.target.files[0]);
      }
    },
    [handleFile],
  );

  const uploadFile = async () => {
    if (file) {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);
      try {
        await uplaodFile({ client: axios, file, format });
      } catch (e) {
        console.error(e);
        setError("Failed to upload file");
        setLoading(false);
        return;
      }
      router.invalidate();
      setOpen(false);
      setLoading(false);
      setFile(null);
    }
  };

  const removeFile = () => {
    setFile(null);
    setError(null);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <UploadIcon className="mr-2 h-4 w-4" /> Upload File
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>File Upload</DialogTitle>
        </DialogHeader>
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => document.getElementById("fileInput")?.click()}
          className="cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-8 text-center transition-colors duration-200 hover:border-primary"
        >
          <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            {file
              ? "Replace the file by dropping a new one here"
              : "Drag and drop a file here, or click to select. Max 5MB.\nSupported formats: .xlsx, .xls, .doc, .docx, .txt"}
          </p>
          <input
            type="file"
            onChange={handleFileInput}
            className="hidden"
            id="fileInput"
            aria-label="File input"
            accept=".xlsx,.xls,.doc,.docx,.txt"
          />
          <Button variant="outline" className="mt-4">
            Select File
          </Button>
        </div>
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        {file && (
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-900">
              Selected file:
            </h3>
            <div className="mt-2 flex items-center justify-between rounded-md bg-gray-50 px-3 py-2">
              <span className="text-sm text-gray-500">{file.name}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={removeFile}
                aria-label={`Remove ${file.name}`}
              >
                <XIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
        <DialogFooter>
          <Select value={format} onValueChange={setFormat}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="File format" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Formats</SelectLabel>
                <SelectItem value="plain">Plain</SelectItem>
                <SelectItem value="interview-2">Interview-2</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button
            className="w-full"
            disabled={!file || loading}
            onClick={uploadFile}
          >
            {loading ? "Uploading..." : "Upload File"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
