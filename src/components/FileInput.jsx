"use client";

import React, { useRef, useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { Button } from "./ui/button";
import { Trash2, UploadCloud } from "lucide-react";
import { createReceipt } from "@/api-calls/createReceipt";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast"

export default function FileInput() {
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast()

  // Default values shown

  const handleFileUpload = (file) => {
    setFiles(file);
  };

  const handleClearFiles = () => {
    setFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    if (files.length === 0) {
      toast({
        variant: "destructive",
        title: "No file selected",
      })
      setLoading(false);
      return;
    }

    try {
      const image = files[0];

      const formData = new FormData();
      formData.append("image", image);

      await createReceipt(formData).then((result) => {
        handleClearFiles();
        if(result.error) {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: result.error,
          })
          setLoading(false);
        } else {
          router.push(`/receipts/${result.receipt.id}`);
        }
      });
    } catch (error) {
      console.error("Error uploading receipt:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error?.message,
      })
      setLoading(false);
    }
  };

  if (loading) {
    return <>Uploading...</>;
  }

  return (
    <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed rounded-lg p-6">
      <FileUpload
        onChange={handleFileUpload}
        fileInputRef={fileInputRef}
        files={files}
        setFiles={setFiles}
      />
      {files.length > 0 && !loading && (
        <div className="container mx-auto max-w-72 flex justify-between mt-4">
          <Button
            variant="outline"
            className="flex items-center gap-2 bg-red-400 text-black hover:bg-red-500 rounded-full"
            onClick={handleClearFiles}
          >
            <Trash2 className="w-4 h-4 text-black" />
            <span className="text-black">Clear</span>
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2 bg-green-300 text-black hover:bg-green-500 rounded-full"
            onClick={handleSubmit}
          >
            <UploadCloud className="w-4 h-4 text-black" />
            <span className="text-black">Upload</span>
          </Button>
        </div>
      )}
    </div>
  );
}
