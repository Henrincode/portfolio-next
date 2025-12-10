import TiltEffect from "@/components/TiltEffect"
import ListaTech from "@/components/ListaTech";

import Image from "next/image";
import Avatar from "@/public/avatar.jpeg";

export default function HomeHeader() {
    return (
        <div className="bg-zinc-900">
            <div className="container flex flex-col items-center justify-center gselect-none h-dvh">
                <div className="flex flex-col items-center text-center">
                    <TiltEffect className="rounded-full" tiltStrength={30} resetOnInactivityMs={600}>
                        <div className="bg-gray-200 p-0.5 rounded-full">
                            <Image
                                src={Avatar}
                                alt="Imagem de avatar"
                                width={250}
                                className="rounded-full"
                                draggable="false"
                            />
                        </div>
                    </TiltEffect>
                    {/* <p className="self-start pl-8 text-xl leading-normal md:text-2xl font-indie">
                            {'< Hello, world! />'}
                        </p> */}
                    <h1 className="mt-10 text-2xl font-delius">
                        {"< "}Hello World!{" />"} Meu nome é Henrique Marques
                    </h1>
                    <h2 className="mt-2 font-extrabold text-8xl">
                        Dev. Fullstack
                    </h2>
                </div>
                <ListaTech className="w-full mt-10 flex flex-row flex-wrap gap-8 justify-center" />
            </div>
        </div>
    )
}