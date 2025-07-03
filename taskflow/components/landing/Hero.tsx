import { ArrowRight } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="py-20 px-4 bg-background/50 border-b border-border/50">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
            Gestiona tus tareas con
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {" "}
              eficiencia
            </span>
          </h1>
          <p className="text-xl text-foreground/60 mb-8 max-w-2xl mx-auto">
            TaskFlow te ayuda a organizar, priorizar y completar tus tareas de
            manera intuitiva. Colabora con tu equipo y mantén todo bajo control.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth">
              <Button
                size="lg"
                className="text-md font-bold px-8 py-3 cursor-pointer rounded-[5px] bg-chart-3"
              >
                Comenzar Ahora Gratis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
