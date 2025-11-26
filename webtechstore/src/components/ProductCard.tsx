"use client";
import { Heart } from "phosphor-react";
import { useFavoritos } from "./FavoritosContext";
import { useState } from "react";
import Toast from "./Toast";
import Link from "next/link";

interface ProductCardProps {
  id: number;
  nome: string;
  preco: string;
  imagem: string;
  categoria?: string;
}

export default function ProductCard({
  id,
  nome,
  preco,
  imagem,
  categoria,
}: ProductCardProps) {
  const { adicionarFavorito, removerFavorito, isFavorito } = useFavoritos();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleToggleFavorito = () => {
    if (isFavorito(id)) {
      removerFavorito(id);
      setToastMessage(`${nome} removido dos favoritos!`);
    } else {
      adicionarFavorito({
        id,
        nome,
        preco,
        imagem,
        categoria,
      });
      setToastMessage(`${nome} adicionado aos favoritos!`);
    }
    setShowToast(true);
  };
  return (
    <div className="p-2 cursor-pointer sm:p-4 lg:p-0">
      <Link href={`/produto/${id}`}>
        <div className="aspect-square mb-2 overflow-hidden">
          <img
            src={imagem}
            alt={nome}
            className="w-full h-full object-cover hover:scale-105 transition-transform"
          />
        </div>
      </Link>

      <div className="relative">
        <Link href={`/produto/${id}`}>
          <div className="space-y-1 sm:space-y-2 pr-10 sm:pr-12">
            <h3 className="font-medium text-sm sm:text-base text-foreground">
              {nome}
            </h3>
            <span className="text-xs sm:text-sm font-semibold text-primary">
              R$ {preco}
            </span>
          </div>
        </Link>

        <button
          onClick={handleToggleFavorito}
          aria-label={
            isFavorito(id) ? "Remover dos favoritos" : "Adicionar aos favoritos"
          }
          className="absolute bottom-0 right-0 w-6 h-6 sm:w-8 sm:h-8 cursor-pointer flex items-center justify-center bg-red-50 rounded-md text-red-500 hover:bg-red-100 transition-colors dark:bg-destructive/20 hover:dark:bg-destructive/30"
        >
          <Heart
            size={14}
            className={`sm:w-4 sm:h-4 ${isFavorito(id) ? "fill-red-500" : ""}`}
          />
        </button>
      </div>

      {showToast && (
        <Toast
          message={toastMessage}
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}
