import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="container mx-auto text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-white mb-6">
            ¿Listo para aumentar tu productividad?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Únete a miles de usuarios que ya están organizando mejor su trabajo
            con TaskFlow.
          </p>
          <Link href="/auth">
            <Button
              size="lg"
              variant="secondary"
              className="text-md font-bold px-8 py-3 cursor-pointer rounded-[5px] hover:bg-chart-3 hover:text-accent"
            >
              Comenzar Gratis Ahora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;
