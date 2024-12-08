"use client";

import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format, isToday, previousMonday } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Context } from "../../Context/Context";
import { getReceipts } from "@/api-calls/getReceipts";

export function DateFilter({ className }) {
  const { setDate, date, searchQuery, setReceipts } = React.useContext(Context);
  const [isFilterApplied, setIsFilterApplied] = React.useState(false);

  const applyFilters = async (newDate) => {
    console.log('applying filters')
    setDate(newDate);
    setIsFilterApplied(true);
    console.log({
      from: new Date(newDate.from).getTime(),
      to: new Date(newDate.to).getTime()
    })
    const updatedReceipts = await getReceipts(searchQuery, new Date(newDate.from).getTime(), new Date(newDate.to).getTime())
    setReceipts(updatedReceipts.data)
  };

  const removeFilters = async () => {
    const from = previousMonday(new Date()).getTime()
    const to = Date.now()
    setDate({ from, to });
    setIsFilterApplied(false);
    const updatedReceipts = await getReceipts(searchQuery, from, to)
    setReceipts(updatedReceipts.data)
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "max-w-[300px] justify-start text-left font-normal text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2" />
            {date?.from ? (
              date.to ? (
                isToday(date.from) && isToday(date.to) ? (
                  <span>All time</span>
                ) : (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                )
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Choose a time span</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={async (newDate) => {
              if (newDate?.from && newDate?.to) {
                await applyFilters(newDate);
              }
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>

      {isFilterApplied && (
        <Button variant="destructive" onClick={removeFilters}>
          Remove Filters
        </Button>
      )}
    </div>
  );
}
