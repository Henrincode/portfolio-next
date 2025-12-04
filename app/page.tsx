import Image from "next/image";
import Avatar from "@/public/avatar.jpeg";

export default function Home() {
  return (
    <>
      <div className="container flex flex-col items-center justify-center gap-3 md:gap-12 select-none font-beba md:flex-row h-dvh">
        <div className="flex flex-col items-center order-2 text-center md:order-1">
          <p className="self-end text-xl md:text-2xl font-indie">
            {'< Hello, world! />'}
          </p>
          <h1 className="-mt-4 md:-mt-6 text-4xl leading-normal md:text-5xl">
            Henrique Marques
          </h1>
          <h2 className="text-3xl md:text-4xl">
            Dev. Fullstack
          </h2>
        </div>
        <div className="bg-gray-200 p-0.5 rounded-full order-1 md:order-2">
          <Image
            src={Avatar}
            alt="Imagem de avatar"
            width={250}
            className="rounded-full"
            draggable="false"
          />
        </div>
      </div>
    </>
  );
}
