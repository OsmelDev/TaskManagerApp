"use client";

import { useState, useEffect } from "react";

const MOBILE_BREAKPOINT = 800;

export function useMobile() {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    // Función para verificar si la pantalla es móvil
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    // Verificar al cargar
    checkMobile();

    // Agregar listener para cambios de tamaño
    window.addEventListener("resize", checkMobile);

    // Limpiar listener
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return { isMobile };
}
