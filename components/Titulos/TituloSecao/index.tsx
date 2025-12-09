type props = {
    titulo?: String
    subTitulo?: String
}

export default function TituloSecao({ titulo = "Título", subTitulo }: props) {
    return (
        < div className="relative flex mb-10 flex-col items-center justify-center font-bold select-none">
            {subTitulo && (
                <>
                    <h3 className="text-9xl leading-normal text-gray-400 opacity-10">{subTitulo.toLocaleUpperCase()}</h3>
                </>
            )}
            <h2 className={`${subTitulo?.trim() ? "absolute" : ""} text-4xl text-gray-400 leading-normal`}>{titulo}</h2>
        </div >
    )
}