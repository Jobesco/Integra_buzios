import Image from "next/image"

export default function NotFoundPage() {
  return (
    <div className="w-screen h-screen flex flex-col items-center 
      justify-start pt-24 font-normal text-xl gap-8"
    >
      <Image src="/not_found.png" height="275" width="200" alt="Erro 404" />
      <p className="text-6xl">Ops! Parece que você está desconectado.</p>
      <div className="text-left flex flex-col gap-4">
        <p>A página que você está procurando não foi encontrada.
          Talvez o link esteja incorreto ou a página não exista mais.
        </p>
        <p className="text-orange">O que você pode fazer agora?</p>

        <ul className="list-disc list-inside">
          <li>Verifique se o endereço digitado está correto.</li>
          <li>Retorne para a <a className="underline" href="/home">Página Inicial</a></li>
          <li>Use a barra de busca para encontrar o que precisa</li>
        </ul>

        <p className="font-bold">Estamos aqui para ajudar!</p>
      </div>
    </div>
  )
}