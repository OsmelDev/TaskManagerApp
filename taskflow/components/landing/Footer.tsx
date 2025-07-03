import { Target } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="container mx-auto text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Target className="h-6 w-6" />
          <span className="text-xl font-bold">TaskFlow</span>
        </div>
        <p className="text-gray-400">
          © 2024 TaskFlow. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
