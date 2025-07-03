import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { features } from "@/mooks/data";

const Features = () => (
  <section className="py-20 px-4 bg-background/20 backdrop-blur-3xl border-b border-border/50">
    <div className="container mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-foreground mb-4">
          Todo lo que necesitas para ser productivo
        </h2>
        <p className="text-xl text-foreground/80 font-bold max-w-2xl mx-auto">
          Funcionalidades diseñadas para equipos modernos que buscan eficiencia
          y colaboración.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature) => (
          <Card
            key={feature.title}
            className="bg-background/80 border-0 shadow-lg hover:shadow-xl transition-shadow rounded-[5px]"
          >
            <CardHeader>
              <div className="flex space-x-5 items-center mb-4">
                <div className="w-12 h-12 bg-blue-100  rounded-lg flex items-center justify-center ">
                  {feature.icon}
                </div>
                <CardTitle className="text-accent">{feature.title}</CardTitle>
              </div>
              <CardDescription>{feature.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
