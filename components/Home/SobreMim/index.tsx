import styles from "./index.module.css"
import TituloSecao from "@/components/Titulos/TituloSecao";

export default function SobreMim() {
    return (

        // seção
        <div className={`${styles.page} pb-10 bg-gray-800 border-t-4 border-gray-700`}>

            {/* container */}
            <div className="container ">

                {/* titulo */}
                <TituloSecao titulo="Um pouco sobre Mim" subTitulo="sobre mim" />

                {/* SobreMin e detalhes */}
                <div className="flex flex-col md:flex-row gap-5">

                    {/* Sobre */}
                    <div className=" flex-1">
                        <h3 className="text-4xl font-semibold">
                            Olá, eu sou <span>Henrique Marques</span>
                        </h3>
                        <p>
                            Sou desenvolvedor Fullstack em formação, focado nas principais tecnologias web. Transformo ideias em soluções modernas e funcionais, com atenção à clareza, usabilidade e manutenção do código.
                        </p>

                        <p>
                            Tenho base autodidata em tecnologia e manutenção de computadores, e experiência consolidada em liderança e atendimento ao público, onde gerenciei equipes como supervisor de segurança em um grande shopping, lidando com equipe de vigilância, CFTV e suporte à manutenção.
                        </p>

                        <p>
                            Depois de um período trabalhando com aplicativos de mobilidade, decidi voltar de vez para o desenvolvimento. Hoje estudo Técnico em Informática para Internet (Fullstack) no SENAC Americana e dedico minhas horas vagas a projetos práticos, com foco em evoluir rapidamente e entregar valor.
                        </p>

                        <p>
                            Pronto para colaborar em projetos que precisam de comprometimento, organização e vontade de aprender.{/* <span className="text-accent">Vamos conversar?</span>*/}
                        </p>
                    </div>


                    {/* detalhes */}
                    <ul className="bg-gray-900 text-gray-200 p-4 rounded-xl self-center md:self-start">
                        <li>
                            <span>Cidade:</span> Americana SP
                        </li>
                        <li>
                            <span>E-Mail:</span> henrincode@gmail.com
                        </li>
                        <li>
                            <span>Idade:</span> 35 anos
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}