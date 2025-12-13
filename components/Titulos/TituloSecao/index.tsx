type props = {
    titulo?: string
    subTitulo?: string
}

export default function TituloSecao({ titulo = "Título", subTitulo }: props) {
    return (
        < div className="relative flex flex-col items-center justify-center pb-3 font-bold select-none">
            {subTitulo && (
                <>
                    <h3 className="leading-normal text-gray-700 sm:text-gray-400/10 text-5xl sm:text-9xl ">
                        {subTitulo.toLocaleUpperCase()}
                    </h3>
                </>
            )}
            <h2 className={`${subTitulo?.trim() ? "absolute" : ""} hidden sm:block sm:text-4xl text-gray-400 leading-normal`}>{titulo}</h2>
        </div >
    )
}