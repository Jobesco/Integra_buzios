import React from 'react';

const TabelaDeContas = ({ contas }) => {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="w-full max-w-9xl bg-white rounded shadow overflow-auto">
        <table className="w-full border-collapse text-sm md:text-base">
          <thead>
            <tr className="text-left text-gray-600 font-semibold border-b">
              <th className="py-2 px-4">Nome</th>
              <th className="py-2 px-4">E-mail</th>
              <th className="py-2 px-4">Telefone</th>
              <th className="py-2 px-4">Gerência</th>
              <th className="py-2 px-4">Gênero</th>
              <th className="py-2 px-4">PCD</th>
            </tr>
          </thead>
          <tbody>
            {contas.map((conta, index) => (
              <tr
                key={index}
                className="bg-gray-50 odd:bg-white hover:bg-gray-100 transition-all">
                <td className="py-2 px-4 border-t whitespace-nowrap">{conta.nome}</td>
                <td className="py-2 px-4 border-t whitespace-nowrap">{conta.email}</td>
                <td className="py-2 px-4 border-t whitespace-nowrap">{conta.telefone}</td>
                <td className="py-2 px-4 border-t whitespace-nowrap">{conta.gerencia}</td>
                <td className="py-2 px-4 border-t whitespace-nowrap">{conta.genero}</td>
                <td className="py-2 px-4 border-t whitespace-nowrap">{conta.PDC}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TabelaDeContas;
