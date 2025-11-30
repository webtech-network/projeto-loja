"use client";

import Link from "next/link";
import { House } from "phosphor-react";
import { Button } from "@/components/ui/button";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col  bg-gray-50 dark:bg-gray-900">
    <Navbar/>
      <div className="max-w-md w-full text-center space-y-8 mx-auto my-20 px-4">
        {/* Número 404 */}
        <div className="space-y-4">
          <h1 className="text-9xl font-extrabold text-gray-900 dark:text-gray-100">
            404
          </h1>
          <div className="h-2 bg-indigo-800 w-16 mx-auto rounded-lg" />
        </div>

        {/* Mensagem */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Página não encontrada
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Ops! A página que você está procurando não existe ou foi movida.
            Verifique o endereço ou volte para a página inicial.
          </p>
        </div>
 
          <Link href="/" className="w-full">
            <Button className=" bg-indigo-800 text-md hover:bg-indigo-900 text-white py-5 cursor-pointer ">
              <House size={24} className="mr-1" />
              Voltar ao início
            </Button>
          </Link>
      </div>
      <Footer/>
    </div>
  );
}
