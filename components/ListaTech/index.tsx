import Tech from "./Tech"


const iconesTamanho = "30"
const iconesCor = "ffffff"
const techs = [
    { nome: "Figma", icone: `https://img.icons8.com/?size=${iconesTamanho}&id=amXjtNWVYSKP&format=png&color=${iconesCor}` },
    { nome: "Git", icone: `https://img.icons8.com/?size=${iconesTamanho}&id=38389&format=png&color=${iconesCor}` },
    { nome: "Github", icone: `https://img.icons8.com/?size=${iconesTamanho}&id=12599&format=png&color=${iconesCor}` },
    { nome: "HTML5", icone: `https://img.icons8.com/?size=${iconesTamanho}&id=23028&format=png&color=${iconesCor}` },
    { nome: "CSS", icone: `https://img.icons8.com/?size=${iconesTamanho}&id=38272&format=png&color=${iconesCor}` },
    { nome: "JavaScript", icone: `https://img.icons8.com/?size=${iconesTamanho}&id=39854&format=png&color=${iconesCor}` },
    { nome: "Bootstrap", icone: `https://img.icons8.com/?size=${iconesTamanho}&id=ldQqWiIRv9bc&format=png&color=${iconesCor}` },
    { nome: "Wordpress", icone: `https://img.icons8.com/?size=${iconesTamanho}&id=vK5is4aqGzbO&format=png&color=${iconesCor}` },
    { nome: "NodeJS", icone: `https://img.icons8.com/?size=${iconesTamanho}&id=DAoKOqsuGfIG&format=png&color=${iconesCor}` },
    { nome: "NPM", icone: `https://img.icons8.com/?size=${iconesTamanho}&id=QERhMe8qpblP&format=png&color=${iconesCor}` },
    { nome: "React", icone: `https://img.icons8.com/?size=${iconesTamanho}&id=122637&format=png&color=${iconesCor}` },
    { nome: "Vercel", icone: `https://img.icons8.com/?size=${iconesTamanho}&id=2xFS7aynbwiR&format=png&color=${iconesCor}` },
    { nome: "Supabase", icone: `https://img.icons8.com/?size=${iconesTamanho}&id=WOIMvKUjwCRp&format=png&color=${iconesCor}` },
    { nome: "SQL", icone: `https://img.icons8.com/?size=${iconesTamanho}&id=8305&format=png&color=${iconesCor}` },
    { nome: "NoSQL", icone: `https://img.icons8.com/?size=${iconesTamanho}&id=8305&format=png&color=${iconesCor}` },
    { nome: "MySQL", icone: `https://img.icons8.com/?size=${iconesTamanho}&id=Js9YezXtUl9g&format=png&color=${iconesCor}` },
    { nome: "PostgreSQL", icone: `https://img.icons8.com/?size=${iconesTamanho}&id=36440&format=png&color=${iconesCor}` },
    { nome: "MongoDB", icone: `https://img.icons8.com/?size=${iconesTamanho}&id=8305&format=png&color=${iconesCor}` },
    { nome: "NextJS", icone: `https://img.icons8.com/?size=${iconesTamanho}&id=gwR0hbBi5JeZ&format=png&color=${iconesCor}` },
    { nome: "Tailwind", icone: `https://img.icons8.com/?size=${iconesTamanho}&id=UpSCHTwpywad&format=png&color=${iconesCor}` },
]

type props = {
    className?: string
}

export default function ListaTech({ className }: props) {
    return (
        <div className={className}>
            {techs.map(({ nome, icone }, idx) => <Tech key={idx} nome={nome} icone={icone} />)}
        </div>
    )
}