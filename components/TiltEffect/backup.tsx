'use client';
import React, { useState, useRef, ReactNode, useEffect, MouseEvent } from 'react';

// Define a interface para as props do componente
interface TiltEffectProps {
    /** O conteúdo a ser renderizado dentro do componente (children). */
    children: ReactNode;

    /** Classes CSS adicionais para estilizar o container principal (usando Tailwind). */
    className?: string;

    /** A cor do brilho neon/sombra (ex: 'rgba(255, 0, 0, 0.6)'). */
    neonColor?: string;

    /** * Força de inclinação (sensibilidade e ângulo máximo) em graus (padrão é 15).
      * Controla a intensidade do efeito.
      */
    tiltStrength?: number;

    /** A duração da transição, usada para suavizar o movimento constante ou o reset (padrão é 300ms). */
    transitionDuration?: number;

    /** * Define o escopo do efeito de inclinação: 
      * 'global' (segue o mouse em toda a tela) ou 
      * 'local' (somente ao passar sobre o componente).
      */
    tiltScope?: 'global' | 'local';

    /** * Define quando o brilho neon deve aparecer: 
      * 'always' ou 'onHover'.
      */
    neonVisibility?: 'always' | 'onHover';

    /** * O raio de desfoque (blur) do brilho neon em pixels (padrão é 40).
      * Controla o quão espalhado (e intenso) o brilho é.
      */
    neonBlurRadius?: number;

    /** * Tempo de inatividade do mouse em milissegundos (ms).
     * Se o mouse não se mover por esse tempo, o componente volta ao estado original (tilt: 0, 0).
     * O valor padrão é 'null' (desativado).
     */
    resetOnInactivityMs?: number | null;
}

/**
 * Componente TiltEffect (Efeito de Inclinação)
 * * Aplica um efeito 3D de inclinação suave e sombra/neon personalizável.
 */
const TiltEffect: React.FC<TiltEffectProps> = ({
    children,
    className = '',
    neonColor = 'rgba(100, 100, 255, 0.4)', // Azul neon padrão
    tiltStrength = 15,
    transitionDuration = 300,
    tiltScope = 'global', // Padrão: segue o mouse globalmente
    neonVisibility = 'onHover', // Padrão: brilho aparece no hover
    neonBlurRadius = 40, // Padrão: 40 pixels de desfoque
    resetOnInactivityMs = null // Padrão: desativado
}) => {
    // Estado para armazenar os valores de inclinação (rotação X e Y)
    const [tilt, setTilt] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
    // Estado para controlar se o mouse está sobre o elemento (necessário para o modo 'local' e sombra 'onHover')
    const [isHovering, setIsHovering] = useState<boolean>(false);
    // Referência tipada para o elemento DOM div
    const cardRef = useRef<HTMLDivElement>(null);
    // Referência para o ID do temporizador de inatividade (usado para clearTimeout)
    const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

    // --- Funções de Inatividade do Mouse ---

    /**
     * Reseta o estado de inclinação para o original (0, 0).
     * Também garante que qualquer temporizador pendente seja limpo.
     */
    const resetTilt = () => {
        setTilt({ x: 0, y: 0 });
        if (inactivityTimerRef.current) {
            clearTimeout(inactivityTimerRef.current);
            inactivityTimerRef.current = null;
        }
    };

    /**
     * Agenda ou reinicia o temporizador de reset por inatividade.
     */
    const scheduleReset = () => {
        if (!resetOnInactivityMs || resetOnInactivityMs <= 0) return;

        // Limpa o temporizador existente
        if (inactivityTimerRef.current) {
            clearTimeout(inactivityTimerRef.current);
        }

        // Configura um novo temporizador
        inactivityTimerRef.current = setTimeout(() => {
            // Executa o reset quando o tempo expirar
            resetTilt();
        }, resetOnInactivityMs);
    };

    // --- Funções de Cálculo de Inclinação ---

    /**
     * Calcula a inclinação no modo GLOBAL (baseado na posição do mouse em relação ao centro do COMPONENTE na viewport).
     */
    const calculateGlobalTilt = (event: globalThis.MouseEvent): void => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();

        // Calcula a posição do mouse relativa ao centro do COMPONENTE.
        const mouseXRelativeToCenter = event.clientX - (rect.left + rect.width / 2);
        const mouseYRelativeToCenter = event.clientY - (rect.top + rect.height / 2);

        // Normaliza a posição em relação ao tamanho da TELA.
        const xPercentage = mouseXRelativeToCenter / (window.innerWidth / 2);
        const yPercentage = mouseYRelativeToCenter / (window.innerHeight / 2);

        // Aplica a força de inclinação.
        const rotateX = -yPercentage * tiltStrength;
        const rotateY = xPercentage * tiltStrength;

        setTilt({ x: rotateX, y: rotateY });
        scheduleReset(); // Reinicia o temporizador de inatividade a cada movimento
    };

    /**
     * Calcula a inclinação no modo LOCAL (baseado na posição do mouse dentro do COMPONENTE).
     */
    const calculateLocalTilt = (event: MouseEvent<HTMLDivElement>): void => {
        if (!cardRef.current) return;

        const rect = cardRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;

        // Posição do mouse relativa ao canto superior esquerdo do elemento
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        // Porcentagem a partir do centro do elemento (-1 a 1)
        const xPercentage = (mouseX - width / 2) / (width / 2);
        const yPercentage = (mouseY - height / 2) / (height / 2);

        // Aplica a força de inclinação.
        const rotateX = -yPercentage * tiltStrength;
        const rotateY = xPercentage * tiltStrength;

        setTilt({ x: rotateX, y: rotateY });
        setIsHovering(true);
        scheduleReset(); // Reinicia o temporizador de inatividade a cada movimento
    };

    // --- Efeito para Listeners Globais e Limpeza ---

    useEffect(() => {
        // Função de limpeza do temporizador
        const clearInactivityTimer = () => {
            if (inactivityTimerRef.current) {
                clearTimeout(inactivityTimerRef.current);
                inactivityTimerRef.current = null;
            }
        };

        if (tiltScope === 'global') {
            // Adiciona o listener global para mousemove
            window.addEventListener('mousemove', calculateGlobalTilt as EventListener);

            // Se mudar de 'local' para 'global', o tilt deve ser zero inicialmente se não estivermos sobre o elemento.
            if (!isHovering && (tilt.x !== 0 || tilt.y !== 0)) {
                setTilt({ x: 0, y: 0 });
            }
        } else {
            // Se estiver no modo 'local', garante que o listener global seja removido
            window.removeEventListener('mousemove', calculateGlobalTilt as EventListener);
            // E reseta o tilt se não estivermos mais sobre o objeto (apenas para garantir)
            if (!isHovering) {
                setTilt({ x: 0, y: 0 });
            }
        }

        // Função de limpeza: remove o listener global E limpa o temporizador
        return () => {
            window.removeEventListener('mousemove', calculateGlobalTilt as EventListener);
            clearInactivityTimer();
        };
        // Dependências: tiltScope define qual lógica usar. tiltStrength afeta o cálculo.
    }, [tiltScope, tiltStrength, isHovering, resetOnInactivityMs]);

    // --- Handlers de Hover Locais ---

    const handleMouseEnter = () => setIsHovering(true);

    const handleMouseLeave = () => {
        setIsHovering(false);
        // Se o escopo for LOCAL, o tilt deve ser resetado ao sair.
        if (tiltScope === 'local') {
            resetTilt(); // Chama resetTilt que também limpa o timer
        }
        // Se o escopo for GLOBAL, o tilt continua a ser atualizado pelo listener do window.
        // O timer também é limpo se estiver ativo, pelo resetTilt.
    };


    // --- Estilos Dinâmicos ---

    // 1. Determina se o brilho neon deve estar visível (usa neonVisibility)
    const shouldShowShadow = neonVisibility === 'always' || (neonVisibility === 'onHover' && isHovering);

    // 2. Monta a string de transformação CSS
    const transformStyle: string = `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`;

    // 3. Define o estilo de sombra, usando neonBlurRadius
    const boxShadowStyle: string = shouldShowShadow
        ? `0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 ${neonBlurRadius}px ${neonColor}`
        : 'none';

    // 4. Define a transição CSS: 
    // Usa 'none' se estiver no modo 'local' e sobre o objeto, para movimento instantâneo.
    // Caso contrário, usa a transição suave para reset ou movimento global.
    const transitionStyle: string = (tiltScope === 'local' && isHovering)
        ? 'none'
        : `transform ${transitionDuration}ms ease-out, box-shadow ${transitionDuration}ms ease-out`;

    return (
        <div
            ref={cardRef}
            // Chama calculateLocalTilt apenas no modo 'local'
            onMouseMove={tiltScope === 'local' ? calculateLocalTilt : undefined}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={`
        // Estilos base de aparência: canto arredondado
        rounded-2xl
        // Classes customizadas passadas pelo usuário
        ${className} 
      `}
            style={{
                transform: transformStyle,
                transition: transitionStyle,
                boxShadow: boxShadowStyle,
            }}
        >
            {children}
        </div>
    );
};

export default TiltEffect;