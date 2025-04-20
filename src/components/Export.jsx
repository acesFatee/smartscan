"use client";

import React, { useState, useContext } from "react";
import { Button } from "./ui/button";
import { Upload, UploadIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Context } from "../../Context/Context";
import { useToast } from "@/hooks/use-toast";
import { exportCSV } from "@/api-calls/exportCSV";

export default function Export() {
  const { receipts, from, to, searchQuery } = useContext(Context);
  const [fileType, setFileType] = useState("");
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();

  const handleExport = async () => {
    try {
      setIsExporting(true);

      if (fileType === "csv") {
        const { csvText, filename } = await exportCSV({
          from,
          to,
          searchQuery,
          selectedFields: Object.keys(receipts[0]).filter(
            (field) => !["objectID", "_highlightResult", "user", "error", "orderId", "imagePath"].includes(field)
          ),
        });

        const blob = new Blob([csvText], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        link.remove();
        URL.revokeObjectURL(url);

        toast({
          title: "Export Successful",
          description: "Your receipts have been exported successfully.",
        });
      } else if (fileType === "excel") {
        toast({
          title: "Coming Soon",
          description: "Excel export will be available soon.",
          variant: "default",
        });
      }
    } catch (error) {
      console.log("Export error:", error);
      toast({
        title: "Export Failed",
        description: "There was an error exporting your receipts. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const hasFilters = from || to || searchQuery;

  if (!receipts || receipts.length === 0) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">
          <UploadIcon className="w-4 h-4 mr-2" />
          Export
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Export</DialogTitle>
          <div className="text-sm text-muted-foreground">
            <p>Export your receipts to a file.</p>
            {hasFilters && (
              <div className="mt-2 flex flex-wrap gap-2">
                {searchQuery && <Badge variant="default">{searchQuery}</Badge>}
                {from && to && (
                  <Badge variant="default">
                    {new Date(from).toDateString()} - {new Date(to).toDateString()}
                  </Badge>
                )}
              </div>
            )}
          </div>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => setFileType("csv")}
            className={`p-4 rounded-lg border-2 transition-all ${
              fileType === "csv"
                ? "border-primary bg-primary/10"
                : "border-border hover:border-primary/50"
            }`}
          >
            <div className="flex flex-col items-center justify-center space-y-2">
              <Upload className={`w-8 h-8 ${fileType === "csv" ? "text-primary" : "text-muted-foreground"}`} />
              <span className={`font-medium ${fileType === "csv" ? "text-primary" : "text-muted-foreground"}`}>
                CSV
              </span>
            </div>
          </button>

          <button
            onClick={() => setFileType("excel")}
            className={`p-4 rounded-lg border-2 transition-all ${
              fileType === "excel"
                ? "border-primary bg-primary/10"
                : "border-border hover:border-primary/50"
            }`}
          >
            <div className="flex flex-col items-center justify-center space-y-2">
              <Upload className={`w-8 h-8 ${fileType === "excel" ? "text-primary" : "text-muted-foreground"}`} />
              <span className={`font-medium ${fileType === "excel" ? "text-primary" : "text-muted-foreground"}`}>
                Excel
              </span>
            </div>
          </button>
        </div>

        <DialogFooter>
          {fileType && (
            <Button type="submit" onClick={handleExport} disabled={isExporting}>
              {isExporting ? (
                <>
                  <UploadIcon className="w-4 h-4 mr-2 animate-spin" />
                  Exporting...
                </>
              ) : (
                <>Export as {fileType.toUpperCase()}</>
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
