"use client";

import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import {
  endOfMonth,
  format,
  isFirstDayOfMonth,
  isLastDayOfMonth,
  isThisMonth,
  isToday,
  startOfMonth,
} from "date-fns";
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
  const { setDate, date, searchQuery, setReceipts, setSearchQuery } = React.useContext(Context);

  const from = new Date(date.from);
  const to = new Date(date.to);

  const showRemoveFilter =
    (!isFirstDayOfMonth(from) || !isLastDayOfMonth(to)) ||
    (!isThisMonth(from) || !isThisMonth(to));

  const applyFilters = async (newDate) => {
    setDate(newDate);
    const updatedReceipts = await getReceipts(
      searchQuery,
      new Date(newDate.from).getTime(),
      new Date(newDate.to).getTime()
    );
    setReceipts(updatedReceipts.data);
  };

  const removeFilters = async () => {
    const from = startOfMonth(new Date()).getTime();
    const to = endOfMonth(new Date()).getTime();
    setDate({ from, to });
    setSearchQuery("")
    const updatedReceipts = await getReceipts("", from, to);
    setReceipts(updatedReceipts.data);
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

      {showRemoveFilter && (
        <Button variant="destructive" onClick={removeFilters}>
          Remove Filter
        </Button>
      )}
    </div>
  );
}
