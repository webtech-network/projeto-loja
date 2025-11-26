"use client";
import Navbar from "../../components/Navbar";
import ProductCard from "../../components/ProductCard";
import Footer from "../../components/Footer";
import { useFavoritos } from "../../components/FavoritosContext";
import { Heart, Star } from "phosphor-react";

export default function FavoritosPage() {
  const { favoritos, limparFavoritos } = useFavoritos();

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
      <Navbar />

      <main className="mx-auto flex w-full max-w-5xl flex-1 py-6 px-8 sm:py-8 sm:px-6">
        <div className="w-full">
          {/* Header da página */}
          <div className="flex items-center justify-between mb-6 lg:mb-8">
            <div className="flex items-center gap-3">
              <Star size={24} className="text-yellow-500 fill-yellow-500" />
              <h1 className="text-lg lg:text-3xl font-bold text-foreground flex items-center gap-2">
                Meus Favoritos
              </h1>
            </div>

            {favoritos.length > 0 && (
              <button
                onClick={limparFavoritos}
                className="px-2 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-red-600 dark:text-white dark:border-none dark:hover:bg-red-600 dark:bg-red-500 hover:cursor-pointer hover:text-red-700 border-2 border-red-400 hover:border-red-400 rounded-md transition-colors"
              >
                Limpar Favoritos
              </button>
            )}
          </div>

          {/* Contador de favoritos */}
          {favoritos.length > 0 && (
            <div className="mb-6">
              <p className="text-sm text-muted-foreground">
                {favoritos.length} {favoritos.length === 1 ? "item" : "itens"}{" "}
                na lista de favoritos
              </p>
            </div>
          )}

          {/* Grid de produtos favoritos */}
          {favoritos.length > 0 ? (
            <section className="w-full">
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4 lg:gap-6">
                {favoritos.map((produto) => (
                  <ProductCard
                    key={produto.id}
                    id={produto.id}
                    nome={produto.nome}
                    preco={produto.preco}
                    imagem={produto.imagem}
                    categoria={produto.categoria}
                  />
                ))}
              </div>
            </section>
          ) : (
            // Estado vazio
            <div className="flex flex-col items-center justify-center py-16 lg:py-24">
              <div className="text-center">
                <h2 className="text-xl lg:text-2xl font-semibold text-foreground mb-2">
                  Nenhum favorito ainda
                </h2>
                <p className="text-muted-foreground mb-6 max-w-md">
                  Adicione produtos aos seus favoritos para encontrá-los
                  facilmente mais tarde.
                </p>
                <a
                  href="/produtos"
                  className="inline-flex items-center px-6 py-3 bg-yellow-500 text-white font-medium rounded-lg hover:bg-yellow-600 transition-colors"
                >
                  Explorar Produtos
                </a>
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
