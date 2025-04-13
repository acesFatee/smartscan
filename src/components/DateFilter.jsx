"use client";

import * as React from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format, isSameDay } from "date-fns";
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
import { useRouter } from "next/navigation";

export function DateFilter({ className }) {
  const { searchQuery, setReceipts, currentPage, createUrl, from, to, setTotalPages } =
    React.useContext(Context);

  const router = useRouter();

  const [date, setDate] = React.useState({
    from: from ? new Date(Number(from)) : undefined,
    to: to ? new Date(Number(to)) : undefined
  });

  const showRemoveFilter = from || to;

  const applyFilters = async (newDate) => {
    setDate(newDate);

    const getDateTimestamp = (date) => {
      if (!date || isNaN(new Date(date).getTime())) return null;
      return new Date(date).getTime();
    };

    let fromTimestamp = getDateTimestamp(newDate?.from);
    let toTimestamp = getDateTimestamp(newDate?.to);

    if (fromTimestamp && toTimestamp && isSameDay(new Date(fromTimestamp), new Date(toTimestamp))) {
      toTimestamp = fromTimestamp;
    } else if (fromTimestamp && !toTimestamp) {
      toTimestamp = fromTimestamp;
    } else if (!fromTimestamp && toTimestamp) {
      fromTimestamp = toTimestamp;
    }

    router.push(
      createUrl({
        from: fromTimestamp,
        to: toTimestamp,
        page: 1,
      })
    );

    const updatedReceipts = await getReceipts({
      searchQuery,
      from: fromTimestamp,
      to: toTimestamp,
      currentPage,
    });
    setReceipts(updatedReceipts.data);
    setTotalPages(updatedReceipts.pagination.totalPages);
  };

  const removeFilters = async () => {
    setDate({ from: undefined, to: undefined });
    
    router.push(createUrl({ from: null, to: null, page: 1 }));
    const updatedReceipts = await getReceipts({
      searchQuery,
      from: undefined,
      to: undefined,
      currentPage,
    });
    setReceipts(updatedReceipts.data);
    setTotalPages(updatedReceipts.pagination.totalPages);
  };

  const getDateRangeText = ({from, to}) => {
    if (!from && !to) return "All time";
    if(from && !to) return `${format(from, "LLL dd, y")}`;
    if (!from && to) return `${format(to, "LLL dd, y")}`;
    return `${format(from, "LLL dd, y")} - ${format(to, "LLL dd, y")}`;
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
            {getDateRangeText({
              from: date?.from,
              to: date?.to
            })}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from || new Date()}
            selected={date}
            onSelect={applyFilters}
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
