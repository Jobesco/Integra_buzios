import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { parse, isValid , format} from "date-fns";


export default function EditEventModal({ isOpen, onClose, onSuccess, event }) {
  const [title, setTitle] = useState(event?.title || "");
  const [startDate, setStartDate] = useState(event?.startDate);
    const [endDate, setEndDate] = useState(event?.endDate);
  const [showStartCalendar, setShowStartCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);

  const handleConfirm = () => {
    onSuccess({ title, startDate, endDate });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Alterar evento</DialogTitle>
        </DialogHeader>

        <div>
          <label className="block text-sm font-medium">Título:</label>
          <Input
            className="mt-1"
            placeholder="Ex: IntegraBuzios 2025.1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-4 mt-4">
          <div className="flex flex-col">
            <label className="block mb-2 text-sm font-medium">Data de início:</label>
            <div className="relative">
              <CalendarIcon className="absolute left-2 top-2.5" />
              <Input
                className="pl-8 cursor-pointer"
                value={startDate}
                readOnly
                onClick={() => setShowStartCalendar(!showStartCalendar)}
              />
            </div>
            {showStartCalendar && (
              <Calendar
                mode="single"
                selected={startDate}
                onSelect={(date) => {
                  setStartDate(format(date, "dd-MM-yyyy"));
                  setShowStartCalendar(false);
                }}
                className="mt-2"
              />
            )}
          </div>

          <span className="text-xl">&gt;</span>

          <div className="flex flex-col">
            <label className="block mb-2 text-sm font-medium">Data de término:</label>
            <div className="relative">
              <CalendarIcon className="absolute left-2 top-2.5" />
              <Input
                className="pl-8 cursor-pointer"
                value={endDate}
                readOnly
                onClick={() => setShowEndCalendar(!showEndCalendar)}
              />
            </div>
            {showEndCalendar && (
              <Calendar
                mode="single"
                selected={endDate}
                onSelect={(date) => {
                  setEndDate(format(date, "dd-MM-yyyy"));
                  setShowEndCalendar(false);
                }}
                className="mt-2"
              />
            )}
          </div>
        </div>

        <Button 
            className="bg-[#0E39F7] mt-7 !text-white  hover:!bg-transparent rounded-full px-6 py-2 transition-colors duration-300"
            onClick={handleConfirm}>
          Confirmar alterações
        </Button>
      </DialogContent>
    </Dialog>
  );
}
