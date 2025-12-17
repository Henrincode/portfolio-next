import TiltEffect from "@/components/TiltEffect";
import TiltOrDiv from "@/components/TiltEffect/TiltOrDiv";
import TituloSecao from "@/components/Titulos/TituloSecao";
import { FaGithub } from "react-icons/fa";
import { FaEarthAmericas } from "react-icons/fa6";

const projetos = [
    {
        nome: "Rastro Urbano", techs: ["HTML", "CSS", "JavaScript"], img: "./site-rastro.png", codigo: "https://github.com/henrincode/rastro-urbano/", site: "https://henrincode.github.io/rastro-urbano/",
        descricao: "Projeto frontend de uma loja de roupas e acessórios com intuito de treianr HTML + CSS"
    },
    {
        nome: "APP Agendinha", techs: ["HTML", "CSS", "JavaScript"], img: "./site-agendinha.png", codigo: "https://github.com/Henrincode/agendinha", site: "https://henrincode.github.io/agendinha/",
        descricao: "Projeto pequeno criado para exercitar manipulação do DOM com JavaScript, seletores, innerHTML e innerTEXT"
    },
    {
        nome: "APP Listinha", techs: ["HTML", "CSS", "JavaScript"], img: "./site-listinha.png", codigo: "https://github.com/Henrincode/listinha", site: "https://henrincode.github.io/listinha/",
        descricao: "Outro projeto pequeno criado para exercitar manipulação do DOM com JavaScript, seletores, innerHTML e innerTEXT"
    },
    {
        nome: "Confeitariana", techs: ["HTML", "CSS", "JavaScript", "React"], img: "./site-confeitariana.png", codigo: "https://github.com/Henrincode/confeitariana", site: "https://confeitariana.vercel.app/",
        descricao: "Projeto frontend integrador da etapa frontend do curso T.I p/ Internet SENAC"
    },
    {
        nome: "Mural-Senac", techs: ["HTML", "CSS", "JavaScript", "Supabase"], img: "./site-mural.png", codigo: "https://github.com/Henrincode/mural-servicos", site: "https://henrincode.github.io/mural-servicos/",
        descricao: "Projeto vencedor do Hackaton do SENAC, objetivo era digitalizar um mural de ofertas e serviços do corredor do SENAC"
    },
    {
        nome: "Painel Life Long Learning", techs: ["HTML", "CSS", "JavaScript", "Supabase"], img: "./site-life.png", codigo: "https://github.com/Henrincode/trabalho-life", site: "https://senac-life.vercel.app/",
        descricao: "Projeto de apresentação sobre Life Long Learning onde falamos sobre tema e fizemos exercício prático com os alunos"
    }
].reverse()

export default function Trabalhos() {
    return (
        // seção
        <div className="pb-10 bg-gray-900 border-t-4 border-gray-700 ">
            <div id="vermais"></div>
            <div className="container">
                <TituloSecao titulo="Projetos prondos / em andamento" subTitulo="Trabalhos" />
                {/* Container lista */}
                <div className="flex flex-row justify-center flex-wrap gap-[30px]">
                    {projetos.map((p, i) => (
                        
                        <TiltEffect key={i} className="flex flex-col bg-gray-700 md:w-[calc((100%/3)-20px)] p-2 rounded-xl hover:z-10 select-none group/trabalho" disableOnTouchOrMobile resetOnInactivityMs={600} tiltStrength={3} tiltScope="local" neonBlurRadius={10}>
                            {/* img */}
                            <div className="relative">
                                <img className="block w-full rounded-xl" src={p.img} alt={`Print do projeto ${p.nome}`} />
                                {/* techs */}
                                <ul className="absolute bottom-2 w-full flex flex-row flex-wrap justify-center gap-2">
                                    {p.techs.map((te, i) => (
                                        <li key={i} className="text-[12px] p-2 bg-gray-800/70 group-hover/trabalho:opacity-0 rounded-xl duration-600">{te}</li>
                                    ))}
                                </ul>
                            </div>
                            {/* titulo */}
                            <div className="mt-2 text-xl font-bold text-center">{p.nome}</div>
                            {/* descrição */}
                            <div className="flex-1 mt-2 font-light text-justify hyphens-auto">{p.descricao}</div>
                            {/* links */}
                            <ul className="mt-2 flex flex-row justify-center gap-2 select-none">
                                <a className="flex-1" href={p.codigo} target="_blank" draggable="false">
                                    <li className="flex flex-row justify-center items-center gap-2 text-xl bg-sky-800 hover:bg-sky-400 duration-200 ease-in-out p-2 rounded-md"><FaGithub className="text-2xl" /> CÓDIGO</li>
                                </a>
                                <a className="flex-1" href={p.site} target="_blank" draggable="false">
                                    <li className="flex flex-row justify-center items-center gap-2 text-xl bg-green-800 hover:bg-green-400 duration-200 ease-in-out p-2 rounded-md"><FaEarthAmericas className="text-2xl" /> SITE</li>
                                </a>
                            </ul>
                        </TiltEffect>
                    ))}
                </div>
            </div>
        </div>
    )
}