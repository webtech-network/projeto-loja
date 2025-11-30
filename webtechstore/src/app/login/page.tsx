"use client";
import Link from "next/link";
import { useTheme } from "../../components/ThemeProvider";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function LoginPage() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <section className="w-full max-w-md">
          <div className="rounded-lg p-6 bg-login dark:bg-indigo-950 text-card-foreground border-2 dark:border-indigo-900">
            <Link href="/" className="mb-8">
              <img
                src={
                  mounted && theme === "dark"
                    ? "/images/Logo-dark.png"
                    : "/images/Logo-light.png"
                }
                alt="Webtech Store"
                className="object-cover w-40 items-center my-4 justify-center mx-auto sm:w-48 md:w-52"
              />
            </Link>
            <p className="text-lg font-semibold mb-4">Entrar</p>
            <p className="text-sm font-medium text-secondary-color mb-4">
              Preencha suas informações abaixo para fazer login
            </p>

            <form className="flex flex-col gap-3">
              <label className="flex flex-col text-sm">
                <span className="mb-1">Email</span>
                <input
                  type="email"
                  placeholder="seu@exemplo.com"
                  className="px-3 py-2 rounded-md bg-popover text-popover-foreground border border-border dark:bg-indigo-950 "
                />
              </label>

              <label className="flex flex-col text-sm">
                <span className="mb-1">Senha</span>
                <div className="relative">
                  <input
                    type={mostrarSenha ? "text" : "password"}
                    placeholder="••••••••"
                    className="px-3 py-2 pr-10 rounded-md bg-popover text-popover-foreground border border-border dark:bg-indigo-950 w-full"
                  />
                  <button
                    type="button"
                    onClick={() => setMostrarSenha(!mostrarSenha)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {mostrarSenha ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                        <line x1="2" y1="2" x2="22" y2="22" />
                      </svg>
                    )}
                  </button>
                </div>
              </label>
               <Link
                href="/esqueci-senha"
                className="text-xs text-yellow hover:underline font-medium block pl-1"
              >
                Esqueci minha senha
              </Link>

              <button
                type="submit"
                className="mt-2 px-4 py-2 rounded-md bg-indigo-900 text-white font-semibold"
              >
                Entrar
              </button>
            </form>

            <div className="text-center mt-4 space-y-2">

              <p className="text-sm text-muted-foreground">
                Não tem uma conta?{" "}
                <Link
                  href="/cadastro"
                  className="text-primary hover:underline font-medium"
                >
                  Cadastre-se
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
