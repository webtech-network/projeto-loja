"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export interface ItemCarrinho {
  id: number;
  nome: string;
  preco: string;
  imagem: string;
  cor?: string;
  tamanho?: string;
  quantidade: number;
  categoria?: string;
}

interface CarrinhoContextType {
  itens: ItemCarrinho[];
  adicionarItem: (
    item: Omit<ItemCarrinho, "quantidade"> & { quantidade?: number }
  ) => void;
  removerItem: (id: number, cor?: string, tamanho?: string) => void;
  atualizarQuantidade: (
    id: number,
    quantidade: number,
    cor?: string,
    tamanho?: string
  ) => void;
  limparCarrinho: () => void;
  getTotalItens: () => number;
  getTotal: () => string;
}

const CarrinhoContext = createContext<CarrinhoContextType | undefined>(
  undefined
);

export function CarrinhoProvider({ children }: { children: ReactNode }) {
  const [itens, setItens] = useState<ItemCarrinho[]>([
    {
      id: 1,
      nome: "Camisa",
      preco: "35,00",
      imagem: "/images/camisa.png",
      cor: "Preto",
      tamanho: "M",
      quantidade: 1,
      categoria: "Roupas",
    },
    {
      id: 2,
      nome: "Boné",
      preco: "25,00",
      imagem: "/images/bone.png",
      cor: "Preto",
      quantidade: 1,
      categoria: "Acessórios",
    },
    {
      id: 3,
      nome: "Caneca",
      preco: "30,00",
      imagem: "/images/caneca.png",
      cor: "Branco",
      quantidade: 1,
      categoria: "Canecas",
    },
    {
      id: 4,
      nome: "Adesivo",
      preco: "20,00",
      imagem: "/images/adesivo.png",
      cor: "",
      quantidade: 2,
      categoria: "Adesivo",
    },
  ]);

  const adicionarItem = (
    novoItem: Omit<ItemCarrinho, "quantidade"> & { quantidade?: number }
  ) => {
    setItens((prevItens) => {
      const itemExistente = prevItens.find(
        (item) =>
          item.id === novoItem.id &&
          item.cor === novoItem.cor &&
          item.tamanho === novoItem.tamanho
      );

      if (itemExistente) {
        return prevItens.map((item) =>
          item.id === itemExistente.id &&
          item.cor === itemExistente.cor &&
          item.tamanho === itemExistente.tamanho
            ? {
                ...item,
                quantidade: item.quantidade + (novoItem.quantidade || 1),
              }
            : item
        );
      }

      return [
        ...prevItens,
        { ...novoItem, quantidade: novoItem.quantidade || 1 },
      ];
    });
  };

  const removerItem = (id: number, cor?: string, tamanho?: string) => {
    setItens((prevItens) =>
      prevItens.filter(
        (item) =>
          !(item.id === id && item.cor === cor && item.tamanho === tamanho)
      )
    );
  };

  const atualizarQuantidade = (
    id: number,
    novaQuantidade: number,
    cor?: string,
    tamanho?: string
  ) => {
    if (novaQuantidade <= 0) {
      removerItem(id, cor, tamanho);
      return;
    }

    setItens((prevItens) =>
      prevItens.map((item) =>
        item.id === id && item.cor === cor && item.tamanho === tamanho
          ? { ...item, quantidade: novaQuantidade }
          : item
      )
    );
  };

  const limparCarrinho = () => {
    setItens([]);
  };

  const getTotalItens = () => {
    return itens.reduce((total, item) => total + item.quantidade, 0);
  };

  const getTotal = () => {
    return itens
      .reduce((total, item) => {
        const preco = parseFloat(item.preco.replace(",", "."));
        return total + preco * item.quantidade;
      }, 0)
      .toFixed(2)
      .replace(".", ",");
  };

  return (
    <CarrinhoContext.Provider
      value={{
        itens,
        adicionarItem,
        removerItem,
        atualizarQuantidade,
        limparCarrinho,
        getTotalItens,
        getTotal,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}

export function useCarrinho() {
  const context = useContext(CarrinhoContext);
  if (context === undefined) {
    throw new Error("useCarrinho deve ser usado dentro de um CarrinhoProvider");
  }
  return context;
}
