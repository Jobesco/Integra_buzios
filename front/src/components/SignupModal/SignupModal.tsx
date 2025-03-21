"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<number>(1);
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [confirmEmail, setConfirmEmail] = useState<string>("");
  const [management, setManagement] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [disability, setDisability] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleNext = () => setStep(step + 1);
  const handleBack = () => setStep(step - 1);

  const handleSubmit = async () => {
    const data = { fullName, email, management, phone, gender, disability, password };
    const response = await fetch("http://localhost:8080/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      setStep(step + 1)
    }else{
      alert("Verifique seus dados");
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
         <>
         <p>Nome completo*</p>
          <Input placeholder="Nome completo" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </>
        );
      case 2:
        return (
          <>
            <Input placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Input placeholder="Confirmar e-mail" value={confirmEmail} onChange={(e) => setConfirmEmail(e.target.value)} />
            <Input placeholder="Gerencia" value={management} onChange={(e) => setManagement(e.target.value)} />
          </>
        );
      case 3:
        return (
          <>
            <Input placeholder="Número de celular" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <Input placeholder="Gênero (opcional)" value={gender} onChange={(e) => setGender(e.target.value)} />
            <Input placeholder="Deficiência (opcional)" value={disability} onChange={(e) => setDisability(e.target.value)} />
          </>
        );
      case 4:
        return (
          <>
            <Input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Input type="password" placeholder="Confirmar senha" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </>
        );
      case 5:
        case 4:
        return (
          <>
            <p><strong>Parabéns!</strong></p>
            <p>Sua conta foi criada</p>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="space-y-4">
        <DialogHeader>
          <DialogTitle>Criar sua conta</DialogTitle>
          <div className="flex justify-center gap-2">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className={`w-4 h-4 rounded-full ${step >= item ? "bg-blue-500" : "bg-gray-300"}`}
              />
            ))}
          </div>
        </DialogHeader>

        {renderStep()}

        <DialogFooter className="flex justify-between">
          {step > 1 && <Button className="bg-[#0e39f7] !text-white rounded-full px-6 py-2 transition-colors duration-300"
 onClick={handleBack}>Voltar</Button>}
          {step < 4 && <Button className="bg-[#0e39f7] !text-white rounded-full px-6 py-2 transition-colors duration-300"
 onClick={handleNext}>Avançar</Button>}
          {step === 4 && <Button className="bg-[#0e39f7] !text-white rounded-full px-6 py-2 transition-colors duration-300"
 onClick={handleSubmit}>Confirmar</Button>}
          {step === 5 && <Button className="bg-[#0e39f7] !text-white rounded-full px-6 py-2 transition-colors duration-300"
 onClick={onClose}>Entrar</Button>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SignupModal;
