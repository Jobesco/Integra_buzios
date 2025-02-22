"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import DatePicker from "react-date-picker"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePicker2() {
  const [date, setDate] = React.useState<Date>(new Date())

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            " justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "yyyy") : <span>Selecione uma data</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto h-full p-0">
        <DatePicker value={date} maxDetail="year" autoFocus
          onChange={(v) => setDate(v as Date)} className="w-40 h-40" />
      </PopoverContent>
    </Popover>
  )
}
