"use client";

import { Button } from "@/components/ui/button";
import { CalendarIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { sendUpdateReceipt } from "@/api-calls/sendUpdateReceipt";

export default function EditDateModal({ id, dateTime }) {
  const router = useRouter();
  const [date, setDate] = useState(new Date(dateTime));
  const [open, setOpen] = useState(false); // 🔄 control popover visibility

  const handleDateChange = async (selectedDate) => {
    if (!selectedDate) return;

    setDate(selectedDate);
    setOpen(false); // ✅ close the popover
    await sendUpdateReceipt(id, { dateTime: selectedDate.getTime() });
    router.refresh();
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
