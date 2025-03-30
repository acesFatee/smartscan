"use client";

import React, { useEffect, useRef, useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { Button } from "./ui/button";
import { Trash2, UploadCloud } from "lucide-react";
import { createReceipt } from "@/api-calls/createReceipt";
import { useRouter } from "next/navigation";

export default function FileInput() {
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Default values shown

  useEffect(() => {
    const uploadingState = window.localStorage.getItem("uploading");
    if (uploadingState === "on") {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, []);

  const handleFileUpload = (file) => {
    setFiles(file);
    console.log(file);
  };

  const handleClearFiles = () => {
    setFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    window.localStorage.setItem("uploading", "on");

    if (files.length === 0) {
      alert("Select a receipt");
      setLoading(false);
      window.localStorage.setItem("uploading", "off");
      return;
    }

    try {
      const image = files[0];

      const formData = new FormData();
      formData.append("image", image);

      await createReceipt(formData).then((result) => {
        window.localStorage.setItem("uploading", "off");
        handleClearFiles();
        router.push(`/receipts/${result.receipt.id}`);
      });
    } catch (error) {
      console.error("Error uploading receipt:", error);
      setLoading(false);
      window.localStorage.setItem("uploading", "off");
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
