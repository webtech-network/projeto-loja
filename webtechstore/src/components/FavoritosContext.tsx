"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

export interface ItemFavorito {
  id: number;
  nome: string;
  preco: string;
  imagem: string;
  categoria?: string;
}

interface FavoritosContextType {
  favoritos: ItemFavorito[];
  adicionarFavorito: (item: ItemFavorito) => void;
  removerFavorito: (id: number) => void;
  isFavorito: (id: number) => boolean;
  limparFavoritos: () => void;
}

const FavoritosContext = createContext<FavoritosContextType | undefined>(
  undefined
);

export function FavoritosProvider({ children }: { children: ReactNode }) {
  const [favoritos, setFavoritos] = useState<ItemFavorito[]>([]);

  // Carregar favoritos do localStorage na inicialização
  useEffect(() => {
    if (typeof window !== "undefined") {
      const favoritosSalvos = localStorage.getItem("favoritos");
      if (favoritosSalvos) {
        setFavoritos(JSON.parse(favoritosSalvos));
      }
    }
  }, []);

  // Salvar favoritos no localStorage sempre que a lista mudar
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("favoritos", JSON.stringify(favoritos));
    }
  }, [favoritos]);

  const adicionarFavorito = (item: ItemFavorito) => {
    setFavoritos((prevFavoritos) => {
      const existe = prevFavoritos.find((fav) => fav.id === item.id);
      if (!existe) {
        return [...prevFavoritos, item];
      }
      return prevFavoritos;
    });
  };

  const removerFavorito = (id: number) => {
    setFavoritos((prevFavoritos) =>
      prevFavoritos.filter((item) => item.id !== id)
    );
  };

  const isFavorito = (id: number) => {
    return favoritos.some((item) => item.id === id);
  };

  const limparFavoritos = () => {
    setFavoritos([]);
  };

  return (
    <FavoritosContext.Provider
      value={{
        favoritos,
        adicionarFavorito,
        removerFavorito,
        isFavorito,
        limparFavoritos,
      }}
    >
      {children}
    </FavoritosContext.Provider>
  );
}

export function useFavoritos() {
  const context = useContext(FavoritosContext);
  if (context === undefined) {
    throw new Error("useFavoritos must be used within a FavoritosProvider");
  }
  return context;
}
