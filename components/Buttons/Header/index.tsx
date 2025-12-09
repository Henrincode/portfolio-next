import type { CSSProperties } from "react"

type ButtonVars = CSSProperties & {
    "--bg"?: string
    "--cor"?: string
}

export default function Button({ texto = "Sem texto", bg = "#888", cor = "#000", link = "#" }) {
    return (
        <a
            style={{
                "--bg": bg,
                "--cor": cor
            } as ButtonVars}
            className="hover:bg-(--bg) border-2 border-(--bg) text-(--bg) hover:text-(--color) p-2  rounded-[10px] hover:scale-110 duration-100 ease-in"
            href={link}>
            {texto}
        </a>
    )
}