import { useState } from "react";
import { X } from "lucide-react";


export default function Modal({ isOpen, onClose, onSuccess }) {
  if (!isOpen) return null; // Não renderiza se estiver fechado

  // Estados do formulário
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [guides, setGuides] = useState(1);
  const [experience, setExperience] = useState(true);
  const [effort, setEffort] = useState("Muito baixo");
  const [participationEffort, setParticipationEffort] = useState("Muito baixo");
  const [pcd, setPcd] = useState(true);
  const [accessibility, setAccessibility] = useState("");
  const [vacancies, setVacancies] = useState(10);
  const [cost, setCost] = useState(50);
  const [error, setError] = useState("");

  // Enviar os dados para a API fake
  const handleSubmit = async () => {
    if (!title.trim() || !description.trim() || !location.trim()) {
      setError("Preencha todos os campos obrigatórios.");
      setTimeout(() => setError(""), 3000);
      return;
    }

    const newActivity = {
      title,
      description,
      location,
      guides,
      experience,
      effort,
      participationEffort,
      pcd,
      accessibility,
      vacancies,
      cost,
    };

    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newActivity),
      });

      if (!response.ok) throw new Error("Erro ao enviar os dados");

      const data = await response.json();
      onSuccess(newActivity);
      onClose(); // Fecha o modal
    } catch (err) {
      setError("Erro ao salvar atividade.");
      setTimeout(() => setError(""), 3000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
  <div className="bg-[#ffffff] p-6 rounded-lg w-[800px] shadow-lg relative">
    {/* Botão "X" no canto superior direito */}
    <button 
      onClick={onClose} 
      className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
    >
      <X size={24} />
    </button>
        <h2 className="text-2xl font-bold mb-4">Adicionar nova atividade</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold">Nome da atividade:</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
              className="w-full border p-2 rounded mb-3" placeholder="Ex: Escalada" />

            <label className="block font-semibold">Local:</label>
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)}
              className="w-full border p-2 rounded mb-3" placeholder="Onde a atividade irá acontecer?" />

            <label className="block font-semibold">Quantidade de guias:</label>
            <div className="flex items-center mb-3">
              <button onClick={() => setGuides(Math.max(1, guides - 1))} className="px-3 py-1 border rounded">-</button>
              <span className="mx-3">{guides}</span>
              <button onClick={() => setGuides(guides + 1)} className="px-3 py-1 border rounded">+</button>
            </div>

            <label className="block font-semibold">Guia precisa de experiência?</label>
            <div className="flex gap-4 mb-3">
              <label><input type="radio" checked={experience} onChange={() => setExperience(true)} /> Sim</label>
              <label><input type="radio" checked={!experience} onChange={() => setExperience(false)} /> Não</label>
            </div>

            <label className="block font-semibold">Nível de esforço do guia:</label>
            <select value={effort} onChange={(e) => setEffort(e.target.value)}
              className="w-full border p-2 rounded mb-3">
              <option>Muito baixo</option>
              <option>Baixo</option>
              <option>Médio</option>
              <option>Alto</option>
              <option>Muito alto</option>
            </select>

            <label className="block font-semibold">Quantidade de vagas:</label>
            <div className="flex items-center mb-3">
              <button onClick={() => setVacancies(Math.max(1, vacancies - 1))} className="px-3 py-1 border rounded">-</button>
              <span className="mx-3">{vacancies}</span>
              <button onClick={() => setVacancies(vacancies + 1)} className="px-3 py-1 border rounded">+</button>
            </div>
          </div>

          <div>
            <label className="block font-semibold">Descrição:</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)}
              className="w-full border p-2 rounded mb-3" placeholder="Fale um pouco sobre a atividade"></textarea>

            <label className="block font-semibold">Qual o nível de esforço para participar?</label>
            <select value={participationEffort} onChange={(e) => setParticipationEffort(e.target.value)}
              className="w-full border p-2 rounded mb-3">
              <option>Muito baixo</option>
              <option>Baixo</option>
              <option>Médio</option>
              <option>Alto</option>
              <option>Muito alto</option>
            </select>

            <label className="block font-semibold">Prioridade PCD:</label>
            <div className="flex gap-4 mb-3">
              <label><input type="radio" checked={pcd} onChange={() => setPcd(true)} /> Sim</label>
              <label><input type="radio" checked={!pcd} onChange={() => setPcd(false)} /> Não</label>
            </div>

            <label className="block font-semibold">Descrição de acessibilidade:</label>
            <textarea value={accessibility} onChange={(e) => setAccessibility(e.target.value)}
              className="w-full border p-2 rounded mb-3" placeholder="Informações para PCD"></textarea>

            <label className="block font-semibold">Custo da atividade (R$):</label>
            <div className="flex items-center mb-3">
              <button onClick={() => setCost(Math.max(0, cost - 10))} className="px-3 py-1 border rounded">-</button>
              <span className="mx-3">R${cost}</span>
              <button onClick={() => setCost(cost + 10)} className="px-3 py-1 border rounded">+</button>
            </div>
          </div>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <div className="flex justify-end gap-4 mt-4">
          <button onClick={handleSubmit} className="bg-[#0E39F7] text-white-important px-4 py-2 rounded-full px-6 py-2 transition-colors">Adicionar novas atividades</button>
        </div>
      </div>
    </div>
  );
}
