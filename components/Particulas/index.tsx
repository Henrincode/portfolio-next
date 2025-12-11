// components/Particulas/index.tsx
"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  memo,
  ReactNode,
} from "react";

import Particles from "@tsparticles/react";
import { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/plugin-slim";

import type { Engine, Container } from "@tsparticles/engine";

import padrao from "./padrao.json"; // certifique-se de que tsconfig.json tem "resolveJsonModule": true
import styles from "./index.module.css";

interface ParticulasProps {
  children?: ReactNode;
  className?: string;
}

/**
 * Componente que inicializa o engine dos particles (apenas uma vez no client).
 * Mantive isso separado para evitar re-render desnecessário do wrapper.
 */
const ParticlesFixed: React.FC = memo(() => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // initParticlesEngine recebe uma função que recebe o engine e retorna Promise<void>
    // carregamos o pacote slim nele.
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
    })
      .then(() => setReady(true))
      .catch((err) => {
        // opcional: log para debug
        // eslint-disable-next-line no-console
        console.error("Erro ao inicializar tsparticles:", err);
        setReady(true); // se quiser continuar mesmo com falha, evita travar a UI
      });
  }, []);

  // Tipagem correta: container pode ser undefined; função assincrona retorna Promise<void>
  const particlesLoaded = useCallback(async (container?: Container): Promise<void> => {
    // aqui você pode guardar o container, jogar no estado global, etc.
    // por ora não faz nada — mas o tipo está correto para TS.
    return;
  }, []);

  // tipagem simples para options (padrão vindo do JSON)
  const options = useMemo(() => padrao as unknown as Record<string, any>, []);

  // enquanto o engine carrega, não renderiza o canvas (evita warnings do server-side)
  if (!ready) return null;

  return (
    <Particles
      id="tsparticles"
      particlesLoaded={particlesLoaded}
      options={options}
      // você pode passar className se quiser estilizar diretamente o canvas
    />
  );
});

function Particulas({ children, className }: ParticulasProps) {
  return (
    <div className={`${styles.Particulas} ${className ?? ""}`}>
      {/* Partículas fixas no fundo */}
      <ParticlesFixed />

      {/* Conteúdo sobreposto */}
      <div className={styles.children + " container"}>{children}</div>
    </div>
  );
}

export default memo(Particulas);
