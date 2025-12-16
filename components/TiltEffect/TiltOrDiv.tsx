'use client';

import { useEffect, useState } from 'react';
import TiltEffect from '@/components/TiltEffect';

type Props = {
  children: React.ReactNode;
  className?: string;
};

export default function TiltOrDiv({ children, className }: Props) {
  const [canUseTilt, setCanUseTilt] = useState<boolean | null>(null);

  useEffect(() => {
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const isTouch =
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0;

    // Só ativa tilt se for mouse/trackpad
    setCanUseTilt(!isCoarsePointer && !isTouch);
  }, []);

  // Evita mismatch de hidratação
  if (canUseTilt === null) {
    return (
      <div className={className}>
        {children}
      </div>
    );
  }

  return canUseTilt ? (
    <TiltEffect tiltScope="local" neonBlurRadius={10} className={className}>
      {children}
    </TiltEffect>
  ) : (
    <div className={className}>
      {children}
    </div>
  );
}
