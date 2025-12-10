import TiltEffect from "../TiltEffect"


type props = {
    nome?: string,
    icone?: string
}

export default function Tech({ nome, icone }: props) {
    return (
        <TiltEffect tiltScope="global" tiltStrength={30} resetOnInactivityMs={600}>
            <div className="flex flex-col items-center justify-center bg-gray-700 w-20 h-20 rounded-lg select-none">
                <img draggable="false" className="" src={icone} alt={nome} />
                <p className="text-white text-[12px] mt-2">{nome}</p>
            </div>
        </TiltEffect>
    )
}