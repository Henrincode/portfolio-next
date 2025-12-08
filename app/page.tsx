import Image from "next/image";
import Avatar from "@/public/avatar.jpeg";

export default function Home() {
  return (
    <>
      <div className="container flex flex-col items-center justify-center gap-3 md:gap-12 select-none h-dvh">
        <div className="flex flex-col items-center text-center">
          <div className="bg-gray-200 p-0.5 rounded-full">
            <Image
              src={Avatar}
              alt="Imagem de avatar"
              width={250}
              className="rounded-full"
              draggable="false"
            />
          </div>
          {/* <p className="leading-normal self-start pl-8 text-xl md:text-2xl font-indie">
            {'< Hello, world! />'}
          </p> */}
          <h1 className="text-2xl  mt-10 font-delius">
            Hello World! Meu nome é Henrique Marques
          </h1>
          <h2 className="text-6xl mt-2 font-extrabold">
            Desenvolvedor Fullstack
          </h2>
          <h3 className="mt-5 font-light w-[800px]">
            Transformo ideias em soluções modernas e funcionais enquanto me especializo no curso Técnico em Informática para Internet no SENAC. Busco oportunidades de emprego e parcerias para aplicar meus conhecimentos, crescer na área e contribuir com projetos inovadores.
          </h3>
        </div>
      </div>
    </>
  );
}
