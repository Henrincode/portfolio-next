// components/Particulas/index.tsx
"use client";

import React, {
  useEffect,
  useMemo,
  useState,
  memo, // <--- Mantido para o export, mas opcional
  ReactNode,
} from "react";

import Particles from "@tsparticles/react";
import { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

import type { Engine } from "@tsparticles/engine"; // Removido 'Container'
import padrao from "./padrao.json";
import styles from "./index.module.css";

interface ParticulasProps {
  children?: ReactNode;
  className?: string;
}

function Particulas({ children, className }: ParticulasProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // 1. Inicializa o engine APENAS uma vez no lado do cliente
    initParticlesEngine(async (engine: Engine) => {
      await loadSlim(engine);
    })
      .then(() => setReady(true))
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error("Erro ao inicializar tsparticles:", err);
        setReady(true);
      });
  }, []); // Dependências vazias garantem que roda só na montagem

  // 2. Options com useMemo
  // Removida a callback particlesLoaded não utilizada
  const options = useMemo(() => padrao as unknown as Record<string, any>, []);

  return (
    <div className={`${styles.Particulas} ${className ?? ""}`}>
      {/* 3. Renderiza o Particles APENAS quando o engine estiver pronto */}
      {ready && (
        <Particles
          id="tsparticles"
          options={options}
        />
      )}
      {/* 4. Conteúdo sobreposto */}
      <div className={styles.children + " container"}>{children}</div>
    </div>
  );
}

// 5. O memo no export é opcional aqui, mas ainda é uma boa prática
// se o componente Particulas for usado em um local com muitas re-renderizações.
export default memo(Particulas); 