type props = {
    titulo?: string
    subTitulo?: string
}

export default function TituloSecao({ titulo = "Título", subTitulo }: props) {
    return (
        < div className="relative flex flex-col items-center justify-center pb-10 font-bold select-none">
            {subTitulo && (
                <>
                    <h3 className="leading-normal text-gray-400 text-5xl sm:text-9xl opacity-10">
                        {subTitulo.toLocaleUpperCase()}
                    </h3>
                </>
            )}
            <h2 className={`${subTitulo?.trim() ? "absolute" : ""} sm:text-4xl text-gray-400 leading-normal`}>{titulo}</h2>
        </div >
    )
}