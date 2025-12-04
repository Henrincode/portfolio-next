import Image from "next/image";
import Avatar from "@/public/avatar.jpeg"

export default function Home() {
  return (
    <>
      <div className="container flex flex-row justify-center gap-12 items-center h-dvh bg-[#ff]">
        <div className="flex flex-col items-center bg-[#f0]">
          <p className="text-2xl">Hello, world!</p>
          <h1 className="text-6xl font-bold">Henrique Marques</h1>
          <h2 className="text-4xl mt-8 font-bold">Dev. Fullstack</h2>
        </div>
        <div className="hidden md:block bg-gray-200 p-0.5 rounded-full">
          <Image
            src={Avatar}
            alt="Imagem de avatar"
            width={250}
            className="rounded-full"
          />
        </div>
      </div>
    </>
  );
}
