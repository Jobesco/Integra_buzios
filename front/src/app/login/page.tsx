import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex w-screen h-screen bg-orange justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-4 bg-white p-5 rounded-xl shadow-2xl">
        <Image src="/logo_footer.png"
          width={200} height={200}
          alt="Research Hub"
        />
        <Link href={process.env.BROWSER_BACK_ENDPOINT + "/auth/login"}>
          Continuar com minha conta do Google
        </Link>
      </div>
    </div>
  );
}