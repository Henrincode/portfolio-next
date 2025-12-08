import NeonE from "@/components/TiltEffect"

import Image from "next/image";
import Avatar from "@/public/avatar.jpeg";

export default function Home() {
  return (
    <>
      <div className="container flex flex-col items-center justify-center gap-3 select-none md:gap-12 h-dvh">
        <div className="flex flex-col items-center text-center">
          <NeonE className="rounded-full">
            <div className="bg-gray-200 p-0.5 rounded-full">
              <Image
                src={Avatar}
                alt="Imagem de avatar"
                width={250}
                className="rounded-full"
                draggable="false"
              />
            </div>
          </NeonE>
          {/* <p className="self-start pl-8 text-xl leading-normal md:text-2xl font-indie">
            {'< Hello, world! />'}
          </p> */}
          <h1 className="mt-10 text-2xl font-delius">
            Hello World! Meu nome é Henrique Marques
          </h1>
          <h2 className="mt-2 text-6xl font-extrabold">
            Desenvolvedor Fullstack
          </h2>
          <h3 className="mt-5 font-light">
            Transformo ideias em soluções digitais enquanto me especializo no Curso Técnico em Informática para Internet no SENAC, buscando oportunidades para expandir minhas habilidades e contribuir com projetos inovadores.
          </h3>
        </div>
      </div>
    </>
  );
}
