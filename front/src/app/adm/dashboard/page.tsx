

export default function Dashboard() {
  return (
    <div className="container bg-background h-full mt-32
      flex flex-col items-start justify-start gap-8 text-4xl">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight 
        lg:text-5xl text-left mb-8">
        Painel de controle
      </h1>

      <div className="flex flex-col">
        <div className="flex justify-between">
          <h2>Meus eventos</h2>
          <div>novo evento botao</div>
        </div>


        
        <div>
          <h2>Gerenciamento de projeto</h2>
          <ul>
            <li>a</li>
            <li>a</li>
            <li>b</li>
          </ul>
        </div>
      </div>

    </div>
  )
}