import { Montserrat } from "next/font/google";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import ptBR from "date-fns/locale/pt-BR";

const montserrat = Montserrat({
  weight: ["400", "700", "800"],
  subsets: ["latin"],
});

const activitiesList = [
  "Escalada",
  "Tour histórico - Centro",
  "Surf",
  "Tour histórico - África",
  "Canoa havaiana",
];

export default function CreateEvent() {
    const [title, setTitle] = useState("");
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>(new Date());
  const [endDate, setEndDate] = useState<Date | undefined>(new Date());
  const [error, setError] = useState("");



  const toggleActivity = (activity: string) => {
    setSelectedActivities((prev) =>
      prev.includes(activity)
        ? prev.filter((a) => a !== activity)
        : [...prev, activity]
    );
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedActivities([]);
    } else {
      setSelectedActivities([...activitiesList]);
    }
    setSelectAll(!selectAll);
  };

  const handleCreateEvent = async () => {
    setError("");
    // Validação dos campos obrigatórios
    if (!title.trim() || !startDate || !endDate || selectedActivities.length === 0) {
      setError("Todos os campos são obrigatórios.");
      return;
    }
    
    // Criando o objeto do evento
    const eventData = {
        title,
        startDate: format(startDate, "yyyy-MM-dd"),
        endDate: format(endDate, "yyyy-MM-dd"),
        activities: selectedActivities,
    };

  console.log(eventData.title);

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });

    if (!response.ok) throw new Error("Erro ao criar evento");

    console.log("Evento criado com sucesso!");
  } catch (error) {
    console.log("Erro ao enviar dados para o servidor.");
    setError("Erro ao enviar dados para o servidor.");
  }
};

  return (
    <>

      <p className="text-sm text-gray-600 mt-10">
        <span>Página Inicial</span>{" "}
        <span className="text-blue-600 font-semibold"> &gt; Painel de controle</span>
      </p>

      <h1 className="text-3xl font-bold mt-8">Criar novo evento</h1>

      {/* Título */}
      <div className="mt-6">
        <label className="block font-semibold mb-2">Título:</label>
        <Input placeholder="Ex: IntegraBuzios 2025.1"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
         />
      </div>

      {/* Datas */}
      <div className="mt-6 flex gap-4">
        <div className="flex-1">
          <label className="block font-semibold mb-2">Data de início:</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full flex justify-between bg-white border border-gray-300 px-4 py-2 rounded-lg"
              >
                {startDate ? format(startDate, "dd/MM/yyyy", { locale: ptBR }) : "Selecionar data"}
                <CalendarIcon size={18} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={startDate} onSelect={setStartDate} />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex-1">
          <label className="block font-semibold mb-2">Data de término:</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full flex justify-between bg-white border border-gray-300 px-4 py-2 rounded-lg"
              >
                {endDate ? format(endDate, "dd/MM/yyyy", { locale: ptBR }) : "Selecionar data"}
                <CalendarIcon size={18} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={endDate} onSelect={setEndDate} />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Atividades */}
      <div className="mt-6">
        <label className="block font-semibold mb-2">Atividades:</label>
        <div className="flex items-center gap-4">
          <Checkbox checked={selectAll} onCheckedChange={toggleSelectAll} />
          <span>Selecionar todas</span>
          <Button className="bg-[#0E39F7] !text-white hover:!bg-transparent rounded-full px-6 py-2 transition-colors duration-300 flex items-center gap-2">
            <Plus size={16} /> Adicionar nova
          </Button>
        </div>

        <div className="border rounded-lg p-4 mt-4 max-h-40 overflow-y-auto">
          {activitiesList.map((activity) => (
            <div key={activity} className="flex items-center gap-3 mb-2">
              <Checkbox
                checked={selectedActivities.includes(activity)}
                onCheckedChange={() => toggleActivity(activity)}
              />
              <span>{activity}</span>
            </div>
          ))}
        </div>
      </div>


      {/* Erro */}
      {error && <p className="text-error mt-9">{error}</p>}

      {/* Botão Criar Evento */}
      <div className="mt-6">
        <Button
          onClick={handleCreateEvent}
          className="bg-[#FF9F1C] !text-white hover:!bg-transparent rounded-full px-6 py-2 transition-colors duration-300"
          >
          Criar evento
        </Button>
      </div>
    </>
  );
}
