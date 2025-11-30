"use client";

import { useState } from "react";
import { ArrowLeft, EnvelopeSimple, CheckCircle } from "phosphor-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function EsqueciSenhaPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Validação básica
    if (!email) {
      setError("Por favor, insira seu e-mail");
      setIsLoading(false);
      return;
    }

    if (!email.includes("@")) {
      setError("Por favor, insira um e-mail válido");
      setIsLoading(false);
      return;
    }

    // Simular envio (aqui você faria a chamada real para a API)
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-1 flex items-center justify-center px-4 py-8">
          <div className="max-w-md w-full space-y-8 text-center">
            {/* Ícone de sucesso */}
            <div className="space-y-4">
              <CheckCircle size={64} className="text-green-500 mx-auto" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                E-mail enviado!
              </h1>
              <div className="h-1 bg-indigo-800 w-16 mx-auto rounded-lg" />
            </div>

            {/* Mensagem */}
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Enviamos um link de recuperação para:
              </p>
              <p className="font-semibold text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg">
                {email}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Verifique sua caixa de entrada e siga as instruções para
                redefinir sua senha. O link expira em 1 hora.
              </p>
            </div>

            {/* Ações */}
            <div className="space-y-4">
              <Link href="/login" className="w-full">
                <Button className="w-full bg-indigo-800 hover:bg-indigo-900 text-white">
                  Voltar ao Login
                </Button>
              </Link>

              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setEmail("");
                }}
                className="w-full text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors cursor-pointer mt-3"
              >
                Não recebeu o e-mail? Enviar novamente
              </button>
            </div>

            {/* Dica */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                💡 Verifique também a pasta de spam
              </p>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div className="space-y-4 ">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors mb-4"
            >
              <ArrowLeft size={20} />
            
            </Link>

            <div>
              <h1 className="text-2xl text-center font-bold text-gray-900 dark:text-gray-100">
                Esqueceu sua senha?
              </h1>
              <div className="h-1 bg-indigo-800 w-16 mx-auto rounded-lg mt-4" />
            </div>

            <p className="text-gray-600 dark:text-gray-400 text-center">
              Não se preocupe! Insira seu e-mail e enviaremos um link para
              redefinir sua senha.
            </p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                E-mail
              </label>
              <div className="relative">
                <EnvelopeSimple
                  size={20}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
                <Input
                  id="email"
                  type="email"
                  placeholder="Digite seu e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12  [&::selection]:bg-indigo-800 [&::selection]:text-white"
                  disabled={isLoading}
                />
              </div>
              {error && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {error}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-indigo-800 hover:bg-indigo-900 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Enviando..." : "Enviar link de recuperação"}
            </Button>
          </form>

          {/* Info adicional */}
          <div className="text-center space-y-4 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Não tem uma conta?{" "}
              <Link
                href="/cadastro"
                className="text-indigo-800 hover:underline font-medium"
              >
                Criar conta
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
