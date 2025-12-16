import TiltEffect from "@/components/TiltEffect"
import ListaTech from "@/components/ListaTech";

import Image from "next/image";
import Avatar from "@/public/avatar.jpeg";
import Particulas from "@/components/Particulas";
import { FaArrowCircleDown } from "react-icons/fa";

export default function HomeHeader() {
    return (
        <div className="bg-gray-800 relative seguir-header">
            <Particulas>
            <div className="container flex flex-col items-center justify-center select-none min-h-dvh py-10">
                <div className="flex flex-col items-center text-center">
                    <TiltEffect globalTrackingSelector={".seguir-header"} resetOnInactivityMs={600}>
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
                        <span className="block sm:inline">{"< "}Hello World!{" />"}</span> Meu nome é Henrique <span className="hidden sm:inline">Marques</span>
                    </h1>
                    <h2 className="mt-2 font-extrabold text-7xl sm:text-8xl">
                        <span className="hidden md:inline">Dev.</span> Fullstack
                    </h2>
                </div>
                <ListaTech className="w-full mt-10 flex flex-row flex-wrap gap-8 justify-center" />
            </div>
            </Particulas>
            <a href="#vermais" className="hidden md:block"><FaArrowCircleDown className="absolute bottom-2 left-1/2 -translate-x-1/2 text-4xl animate-bounce opacity-40" /></a>
        </div>
    )
}