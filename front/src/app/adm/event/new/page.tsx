'use client'
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {useRouter} from "next/navigation"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { addDays, format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
import { PlusIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

// export function NewEventForm() {
//   const [activities, setActivities] = useState<string[]>(["Activity 1", "Activity 2", "Activity 3"])
//   const [selectedActivities, setSelectedActivities] = useState<string[]>([])

//   const handleSelectAll = () => {
//     setSelectedActivities(activities)
//   }

//   const handleAddNew = () => {
//     const newActivity = prompt("Enter new activity:")
//     if (newActivity) {
//       setActivities([...activities, newActivity])
//     }
//   }

//   const handleSelectActivity = (activity: string) => {
//     setSelectedActivities(prev => 
//       prev.includes(activity) ? prev.filter(a => a !== activity) : [...prev, activity]
//     )
//   }

//   return (
//     <div className="container bg-background h-full mt-32
//       flex flex-col items-start justify-start gap-8 text-4xl">
//       <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight 
//         lg:text-5xl text-left mb-4">
//         Criar Novo Evento
//       </h1>

//         <div className="flex flex-col gap-2">
//           <label className="text-lg">Atividades</label>
//           <div className="flex gap-2">
//             <Button className="bg-primary900 text-background px-4 py-2 rounded-full" onClick={handleSelectAll}>
//               Selecionar Todas
//             </Button>
//             <Button className="bg-primary900 text-background px-4 py-2 rounded-full" onClick={handleAddNew}>
//               Adicionar Nova
//             </Button>
//           </div>
//           <ScrollArea className="overflow-y-auto max-h-[264px] mt-2">
//             <div className="pr-4 flex flex-col gap-2">
//               {activities.map((activity, index) => (
//                 <div key={index} className="flex justify-between 
//                   items-center px-2 py-3 bg-surface rounded-xl text-sm">
//                   <span className="px-3 flex flex-col justify-between gap">
//                     <span>{activity}</span>
//                   </span>
//                   <input type="checkbox" checked={selectedActivities.includes(activity)} onChange={() => handleSelectActivity(activity)} />
//                 </div>
//               ))}
//             </div>
//           </ScrollArea>
//         </div>

//         <Button className="bg-primary900 text-background px-14 py-2 rounded-full mt-4">
//           Criar Evento
//         </Button>
//       </form>
//     </div>
//   )
// }
 
export function InputWithLabel( { inputID, type, placeholder, label, ...props }: { 
  inputID: string 
  type?: string
  placeholder?: string
  label: string
} ) {
  return (
    <div className="grid items-center gap-2">
      <Label htmlFor={inputID} className="text-base">{label}</Label>
      <Input type={type} id={inputID} placeholder={placeholder} {...props} />
    </div>
  )
}

export function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  })

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <div className="grid gap-2">
            <Label htmlFor="date" className="text-base">Data de início e término:</Label>
            <Button
              id="date"
              variant="outline"              
              className={cn(
                "w-[300px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="text-primary900" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export function Activities() {


  return (
    <div className="grid gap-2 w-[368px]">
      <Label htmlFor="activities" className="text-base">Atividades:</Label>
      <div className="flex items-center justify-between h-10">
        <Checkbox id="selectAllId" className="p-2 mr-10"/>
        <label
          htmlFor="selectAllId"
          className="grow leading-none text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Selecionar todas
        </label>
      <Button className={cn("hover:bg-secondary300 hover:text-surface w-1/2 rounded-full py-2",
        "px-12 bg-primary text-onSurface",
      )}>
        <PlusIcon />Adicionar nova
      </Button>
      </div>
    </div>
  )
}


export default function PageNewEvent() {
  const {push} = useRouter()

  // TODO histórico!!!!!
  

  return (
    <div className="container bg-background h-full mt-32
      flex flex-col items-start justify-start gap-8 text-4xl">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight 
        lg:text-5xl text-left mb-4 w-full">
        Criar novo evento
      </h1>

      <div className="grid min-w-[368px] grid-cols-1 gap-7">
        prolly form ere
        <InputWithLabel inputID="title" label="Título:" type="text" placeholder="Ex: IntegraBuzios 2025.1" />
        <DatePickerWithRange />

        <Activities />



      </div>

      
    
    </div>
  )
}