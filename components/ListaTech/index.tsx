import TiltEffect from "@/components/TiltEffect"

import { IoLogoFigma, IoLogoGithub, IoLogoVercel } from "react-icons/io5";
import { FaBootstrap, FaCss3Alt, FaDatabase, FaGitAlt, FaHtml5, FaNodeJs, FaNpm, FaReact, FaWordpress } from "react-icons/fa";
import { RiJavascriptFill, RiNextjsFill, RiSupabaseFill, RiTailwindCssFill } from "react-icons/ri";
import { GrMysql } from "react-icons/gr";
import { BiLogoPostgresql } from "react-icons/bi";
import { SiMongodb } from "react-icons/si";



const iconesTamanho = 30
const techs = [
    { nome: "Figma", icone: IoLogoFigma },
    { nome: "Git", icone: FaGitAlt },
    { nome: "Github", icone: IoLogoGithub },
    { nome: "HTML5", icone: FaHtml5 },
    { nome: "CSS", icone: FaCss3Alt },
    { nome: "JavaScript", icone: RiJavascriptFill },
    { nome: "Bootstrap", icone: FaBootstrap },
    { nome: "Wordpress", icone: FaWordpress },
    { nome: "NodeJS", icone: FaNodeJs },
    { nome: "NPM", icone: FaNpm },
    { nome: "React", icone: FaReact },
    { nome: "Vercel", icone: IoLogoVercel },
    { nome: "Supabase", icone: RiSupabaseFill },
    { nome: "SQL", icone: FaDatabase },
    { nome: "NoSQL", icone: FaDatabase },
    { nome: "MySQL", icone: GrMysql },
    { nome: "PostgreSQL", icone: BiLogoPostgresql },
    { nome: "MongoDB", icone: SiMongodb },
    { nome: "NextJS", icone: RiNextjsFill },
    { nome: "Tailwind", icone: RiTailwindCssFill },
]

type props = {
    className?: string
}

export default function ListaTech({ className }: props) {
    return (
        <div className={className}>
            {techs.map(({ nome, icone: Icone }, idx) => (
                <TiltEffect key={idx} tiltScope="global" tiltStrength={30} resetOnInactivityMs={600}>
                    <div className="flex flex-col items-center justify-center bg-gray-950/30 w-20 h-20 rounded-lg select-none lg:backdrop-blur">
                        <Icone size={iconesTamanho} />
                        <p className="text-white text-[12px] mt-2">{nome}</p>
                    </div>
                </TiltEffect>
            ))}
        </div>
    )
}