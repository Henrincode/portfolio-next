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
    
    /** * Se tiltScope for 'global', o efeito só será ativado quando o mouse estiver sobre o elemento
      * correspondente a este seletor CSS (ex: '.tilt-area').
      * Se for null (padrão), ele segue o mouse em qualquer lugar do site.
      */
    globalTrackingSelector?: string | null;

    /** * Se verdadeiro (padrão), desativa o efeito de inclinação 
      * automaticamente em dispositivos móveis ou com tela sensível ao toque. 
      */
    disableOnTouchOrMobile?: boolean;
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
    resetOnInactivityMs = null, // Padrão: desativado
    globalTrackingSelector = null, // Novo padrão: rastreamento global simples
    disableOnTouchOrMobile = true, // NOVO: Desativa em touch por padrão
}) => {
    // Estado para armazenar os valores de inclinação (rotação X e Y)
    const [tilt, setTilt] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
    // Estado para controlar se o mouse está sobre o elemento (necessário para o modo 'local' e sombra 'onHover')
    const [isHovering, setIsHovering] = useState<boolean>(false);
    // Estado para controlar se o elemento externo (via selector) está sendo hoverado
    const [isExternalTargetHovered, setIsExternalTargetHovered] = useState<boolean>(false);
    // NOVO: Estado para detectar se é um dispositivo touch (usado para desativar o efeito)
    const [isTouchDevice, setIsTouchDevice] = useState<boolean | null>(null);
    
    // Referência tipada para o elemento DOM div
    const cardRef = useRef<HTMLDivElement>(null);
    // Referência para o ID do temporizador de inatividade (usado para clearTimeout)
    const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
    // Referência para o elemento DOM externo que estamos rastreando (seletor)
    const externalTargetRef = useRef<Element | null>(null);

    // Determina se o efeito deve estar ativo
    // O efeito está ativo se NÃO for um dispositivo touch E a prop 'disableOnTouchOrMobile' for verdadeira,
    // OU se a detecção de touch ainda não terminou (isTouchDevice === null),
    // OU se a prop 'disableOnTouchOrMobile' for falsa (permitindo em touch).
    const isTiltActive = isTouchDevice === null || !(isTouchDevice && disableOnTouchOrMobile);

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
      * Calcula a inclinação no modo LOCAL (baseado na posição do mouse dentro do COMPONENTE).
      * Este handler é anexado diretamente ao componente (onMouseMove).
      */
    const calculateLocalTilt = (event: MouseEvent<HTMLDivElement>): void => {
        if (!cardRef.current || !isTiltActive) return;

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

    // --- Handlers de Hover Locais (onMouseEnter/onMouseLeave do componente) ---

    const handleMouseEnter = () => setIsHovering(true);

    const handleMouseLeave = () => {
        setIsHovering(false);
        // Se o escopo for LOCAL, o tilt deve ser resetado ao sair.
        if (tiltScope === 'local') {
            resetTilt(); // Chama resetTilt que também limpa o timer
        }
        // Se o escopo for GLOBAL, o tilt continua a ser atualizado pelo listener do window (ou é resetado ao sair do selector).
    };

    // --- Efeitos para Detecção de Dispositivo e Listeners Globais ---

    // Efeito 1: Detecção de Dispositivo (Roda apenas no mount)
    useEffect(() => {
        // Checa se as APIs de janela estão disponíveis
        if (typeof window === 'undefined') {
            setIsTouchDevice(false);
            return;
        }

        // Detecta se o ponteiro principal é impreciso (touch/caneta)
        const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
        // Detecta eventos de toque ou se há pontos de toque máximos (fallback)
        const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

        // Considera touch se tiver ponteiro grosso OU se houver eventos de toque
        setIsTouchDevice(isCoarsePointer || isTouch);

    }, []);

    // Efeito 2: Listeners Globais e Lógica de Cleanup (Depende de isTiltActive e isTouchDevice)
    useEffect(() => {
        const clearInactivityTimer = () => {
            if (inactivityTimerRef.current) {
                clearTimeout(inactivityTimerRef.current);
                inactivityTimerRef.current = null;
            }
        };

        // Se o tilt não estiver ativo (devido a ser um dispositivo touch e a prop estar em true),
        // reseta o tilt e não anexa listeners.
        if (!isTiltActive) {
            resetTilt(); 
            return () => {
                clearInactivityTimer();
            };
        }

        // --- Handler de Movimento Global (Anexado ao Window) ---
        const handleGlobalMouseMove = (event: globalThis.MouseEvent): void => {
            if (tiltScope !== 'global' || !cardRef.current) return;

            // 1. Verifica se um seletor foi fornecido E se não estamos sobre o alvo.
            const isSelectiveTrackingActive = !!globalTrackingSelector;

            if (isSelectiveTrackingActive && !isExternalTargetHovered) {
                resetTilt(); 
                return; // Impede qualquer cálculo
            }

            // --- Lógica de Cálculo de Inclinação Global ---
            const rect = cardRef.current.getBoundingClientRect();

            // Calcula a posição do mouse relativa ao centro do COMPONENTE na viewport.
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

        // --- Anexar Listeners ---
        if (tiltScope === 'global') {
            // Anexa o listener de movimento global à janela
            window.addEventListener('mousemove', handleGlobalMouseMove as EventListener);

            // Lógica para rastreamento seletivo global
            if (globalTrackingSelector) {
                externalTargetRef.current = document.querySelector(globalTrackingSelector);

                if (externalTargetRef.current) {
                    
                    // Verifica se o mouse JÁ está sobre o elemento no mount
                    if (externalTargetRef.current.matches(':hover')) {
                        setIsExternalTargetHovered(true);
                    }

                    const handleExternalEnter = () => setIsExternalTargetHovered(true);
                    const handleExternalLeave = () => {
                        setIsExternalTargetHovered(false);
                        resetTilt();
                    };

                    externalTargetRef.current.addEventListener('mouseenter', handleExternalEnter);
                    externalTargetRef.current.addEventListener('mouseleave', handleExternalLeave);

                    // Retorna a função de limpeza que remove AMBOS os listeners globais E externos
                    return () => {
                        window.removeEventListener('mousemove', handleGlobalMouseMove as EventListener);
                        externalTargetRef.current?.removeEventListener('mouseenter', handleExternalEnter);
                        externalTargetRef.current?.removeEventListener('mouseleave', handleExternalLeave);
                        clearInactivityTimer();
                    };
                } else {
                    console.error(`TiltEffect: Seletor '${globalTrackingSelector}' não encontrado. O rastreamento seletivo não funcionará.`);
                }
            }
            
            // Cleanup para o caso de rastreamento global simples (sem seletor)
            return () => {
                window.removeEventListener('mousemove', handleGlobalMouseMove as EventListener);
                clearInactivityTimer();
            };
        } else {
            // Cleanup para o modo 'local': garante que o temporizador seja limpo se estiver ativo
             return () => {
                clearInactivityTimer();
            };
        }

    }, [
        tiltScope, 
        tiltStrength, 
        isHovering, 
        resetOnInactivityMs, 
        globalTrackingSelector, 
        isExternalTargetHovered, 
        isTiltActive // Dependência NOVO
    ]); 


    // --- Estilos Dinâmicos ---

    // 1. Determina se o brilho neon deve estar visível (usa neonVisibility)
    const shouldShowShadow = neonVisibility === 'always' || (neonVisibility === 'onHover' && isHovering);

    // 2. Monta a string de transformação CSS
    const transformStyle: string = `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`;

    // 3. Define o estilo de filtro (incluindo o drop-shadow)
    const filterStyle: string = shouldShowShadow
        ? `drop-shadow(0 0 ${neonBlurRadius}px ${neonColor})` // Sombra neon
        : 'none';

    // 4. Define a transição CSS: 
    // Usa 'none' se estiver no modo 'local' e sobre o objeto, para movimento instantâneo.
    const transitionStyle: string = (tiltScope === 'local' && isHovering)
        ? 'none'
        : `transform ${transitionDuration}ms ease-out, filter ${transitionDuration}ms ease-out`;

    // NOVO: Evita mismatch de hidratação (SSR vs Client)
    if (isTouchDevice === null) {
        return (
            <div className={`rounded-2xl ${className}`}>
                {children}
            </div>
        );
    }
    
    // NOVO: Se o tilt não estiver ativo (mobile/touch detectado e desabilitado por prop),
    // renderiza uma div simples, ignorando todos os listeners e transformações.
    if (!isTiltActive) {
        return (
            <div className={`rounded-2xl ${className}`}>
                {children}
            </div>
        );
    }


    // Renderização do componente com Tilt ativo
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
                filter: filterStyle, // Aplica o brilho neon usando o filtro drop-shadow
            }}
        >
            {children}
        </div>
    );
};

export default TiltEffect;