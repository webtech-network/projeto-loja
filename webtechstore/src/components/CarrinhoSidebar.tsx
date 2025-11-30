"use client";

import React from "react";
import { X, Minus, Plus, Trash } from "phosphor-react";
import { useCarrinho } from "./CarrinhoContext";

interface CarrinhoSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CarrinhoSidebar({
  isOpen,
  onClose,
}: CarrinhoSidebarProps) {
  const { itens, removerItem, atualizarQuantidade, getTotal } = useCarrinho();

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-500 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-xs sm:max-w-sm bg-background border-l border-border z-50 transform transition-transform duration-500 ease-in-out shadow-2xl ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <a href="/perfil">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center">
                  <span className="text-sm font-medium text-white">E</span>
                </div>
                <div>
                  <h2 className="text-sm font-medium">Olá, Eduarda</h2>
                  <p className="text-xs text-muted-foreground">
                    eduardavieira@gmail.com
                  </p>
                </div>
              </div>
            </a>
            <button
              onClick={onClose}
              className="p-2 rounded-md hover:bg-background/5 transition-colors"
              aria-label="Fechar carrinho"
            >
              <X size={20} />
            </button>
          </div>

          {/* Título */}
          <div className="px-4 py-3 border-b border-border">
            <h3 className="text-lg font-semibold">Itens no carrinho</h3>
          </div>

          {/* Lista de itens */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {itens.map((item, index) => (
                <div
                  key={`${item.id}-${item.cor || ""}-${
                    item.tamanho || ""
                  }-${index}`}
                  className="flex gap-3 p-3 rounded-lg border border-border/50 bg-card"
                >
                  <div className="w-14 h-14 rounded-md overflow-hidden bg-muted shrink-0">
                    <img
                      src={item.imagem}
                      alt={item.nome}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">
                      {item.nome}
                    </h4>

                    <div className="flex flex-col gap-1 mt-1">
                      {item.tamanho && (
                        <span className="text-xs text-muted-foreground">
                          Tamanho {item.tamanho}
                        </span>
                      )}
                      {item.cor && (
                        <span className="text-xs text-muted-foreground">
                          Cor {item.cor}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center mt-2">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() =>
                            atualizarQuantidade(
                              item.id,
                              item.quantidade - 1,
                              item.cor,
                              item.tamanho
                            )
                          }
                          className="w-6 h-6 rounded-full border border-border flex items-center justify-center hover:bg-background/5"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="text-sm w-6 text-center">
                          {item.quantidade}
                        </span>
                        <button
                          onClick={() =>
                            atualizarQuantidade(
                              item.id,
                              item.quantidade + 1,
                              item.cor,
                              item.tamanho
                            )
                          }
                          className="w-6 h-6 rounded-full border border-border flex items-center justify-center hover:bg-background/5"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-between shrink-0">
                    <button
                      onClick={() =>
                        removerItem(item.id, item.cor, item.tamanho)
                      }
                      className="flex p-1 bg-destructive/10 text-destructive rounded transition-all duration-300 ease-in-out hover:scale-110 cursor-pointer"
                    >
                      <Trash size={18} />
                    </button>
                    <span className="text-sm font-medium">R${item.preco}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-border p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-lg font-semibold">R$ {getTotal()}</span>
            </div>
            <button className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-md font-medium transition-colors cursor-pointer">
              Finalizar pedido
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
