import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { Montserrat } from 'next/font/google';


const montserrat = Montserrat({
  weight: ['400', '700', '800'],
  subsets: ['latin'],
});

export default function AddMemberModal({ isOpen, onClose, eventData, setEventData }) {
  const [role, setRole] = useState("voluntario");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  
  const handleAddMember = async () => {
    if (!email.trim()) return;

    setLoading(true);

    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventId: eventData.id, // Enviar ID do evento
          role,
          email,
        }),
      });

      if (response.ok) {
        const newMember = await response.json();

        // Atualiza o estado com o novo participante
        setEventData((prevData) => ({
          ...prevData,
          participants: [
            ...prevData.participants,
            { name: email, highlighted: false },
          ],
        }));

        onClose(); // Fecha o modal
      } else {
        alert("Erro ao adicionar membro");
      }
    } catch (error) {
      console.error("Erro na requisição", error);
      alert("Erro de conexão");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`${montserrat.className}  max-w-md p-6 rounded-lg`}>
        <DialogHeader>
        {eventData.iconType === "atividades" ? (<>
        <div className="flex flex-col items-center justify-center p-6 space-y-6">
          <DialogTitle className="text-4xl font-bold text-center">Adicionar nova Gerência</DialogTitle>
          
          <div className="flex flex-col items-start w-full max-w-sm space-y-2">
            <label className="text-gray-700 font-medium">Nome da nova Gerência</label>
            <Input
              type="text"
              placeholder="Digite o nome"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setRole("gerencia");
              }}
              disabled={loading}
              className="w-full"
            />
          </div>

          <Button
            onClick={handleAddMember}
            className="rounded-full bg-[#0E39F7] mt-10 text-white-important px-6 py-2 hover:bg-[#0C34D4] transition-colors"
            disabled={loading}
          >
            {loading ? "Adicionando..." : <><Plus className="mr-2 h-4 w-4" /> Adicionar membro</>}
          </Button>
        </div>
      </>

        ) : eventData.iconType === "administradores" ? (<>
          <div className="flex flex-col items-center justify-center p-6 space-y-6">
            <DialogTitle className="text-4xl font-bold text-center">Adicionar novo administrador</DialogTitle>
            
            <div className="flex flex-col items-start w-full max-w-sm space-y-2">
              <label className="text-gray-700 font-medium">E-mail do novo membro</label>
              <Input
                type="email"
                placeholder="E-mail do novo membro"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setRole("administrador");
                }}
                disabled={loading}
                className="w-full"
              />
            </div>
  
            <Button
              onClick={handleAddMember}
              className="rounded-full bg-[#0E39F7] mt-10 text-white-important px-6 py-2 hover:bg-[#0C34D4] transition-colors"
              disabled={loading}
            >
              {loading ? "Adicionando..." : <><Plus className="mr-2 h-4 w-4" /> Adicionar membro</>}
            </Button>
          </div>
        </>
  
            
          ): 
        (
          <>
          <DialogTitle className="text-4xl font-bold">Adicionar membro</DialogTitle>
          <div className="mt-4">
              <p className="text-gray-700 font-medium">Qual a função do membro?</p>
              <div className="mt-2 flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="voluntario"
                    checked={role === "voluntario"}
                    onChange={() => setRole("voluntario")}
                    className="w-4 h-4"
                  />
                  Guia voluntário
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="participante"
                    checked={role === "participante"}
                    onChange={() => setRole("participante")}
                    className="w-4 h-4"
                  />
                  Participante
                </label>
              </div>
            </div>
            <div className="mt-4">
              <label className="text-gray-700 font-medium">E-mail do novo membro:</label>
              <Input
                type="email"
                placeholder="exemplo@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>

            <Button
              onClick={handleAddMember}
              className="rounded-full bg-[#0E39F7] text-white-important"
              disabled={loading}
            >
              {loading ? "Adicionando..." : <><Plus className="mr-2 h-4 w-4" /> Adicionar membro</>}
            </Button>
          </>
        )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
