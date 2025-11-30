"use client";

import { useState } from "react";
import { Star, ArrowRight } from "phosphor-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ModalAvaliarPedido from "./ModalAvaliarPedido";

type Variacao = { id: number; tipo: string; valor: string };
type Avaliacao = { rating: number; comentario: string; imagem?: File[] };
type Item = {
  id: number;
  nome: string;
  preco: string;
  imagem: string;
  variacoes: Variacao[];
  avaliacao?: Avaliacao;
};

interface ModalAvaliarProdutosProps {
  isOpen: boolean;
  onClose: () => void;
  produtos: Item[];
  onSave: (produtoId: number, avaliacao: Avaliacao) => void;
}

export default function ModalAvaliarProdutos({
  isOpen,
  onClose,
  produtos,
  onSave,
}: ModalAvaliarProdutosProps) {
  const [selectedProduto, setSelectedProduto] = useState<Item | null>(null);
  const [isAvaliarOpen, setIsAvaliarOpen] = useState(false);

  const produtosSemAvaliacao = produtos.filter((p) => !p.avaliacao);
  const produtosComAvaliacao = produtos.filter((p) => p.avaliacao);

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            weight={star <= rating ? "fill" : "regular"}
            className={star <= rating ? "text-yellow-500" : "text-gray-300"}
          />
        ))}
      </div>
    );
  };

  const handleAvaliarProduto = (produto: Item) => {
    setSelectedProduto(produto);
    setIsAvaliarOpen(true);
  };

  const handleSaveAvaliacao = (avaliacao: Avaliacao) => {
    if (selectedProduto) {
      onSave(selectedProduto.id, avaliacao);
      setIsAvaliarOpen(false);
      setSelectedProduto(null);
    }
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="w-[95vw] max-w-lg mx-auto max-h-[90vh] flex flex-col overflow-hidden">
          <DialogHeader className="px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-200 dark:border-gray-700 shrink-0">
            <DialogTitle className="text-lg sm:text-xl font-semibold text-center">
              Avaliar Produtos
            </DialogTitle>
          </DialogHeader>

          <div className="px-4 sm:px-6 py-4 sm:py-5 space-y-4 sm:space-y-6 overflow-y-auto flex-1 min-h-0">
            {/* Produtos sem avaliação */}
            {produtosSemAvaliacao.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-medium text-foreground">
                  Produtos para avaliar
                </h3>
                {produtosSemAvaliacao.map((produto) => (
                  <div
                    key={produto.id}
                    className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-4 border rounded-lg border-gray-200 dark:border-gray-700"
                  >
                    <img
                      src={produto.imagem}
                      alt={produto.nome}
                      className="w-16 h-16 object-cover rounded-lg mx-auto sm:mx-0"
                    />
                    <div className="flex-1 text-center sm:text-left">
                      <h4 className="font-medium">{produto.nome}</h4>
                      <p className="text-sm text-gray-500">{produto.preco}</p>
                      <div className="flex flex-wrap justify-center sm:justify-start gap-2 text-xs text-gray-400">
                        {produto.variacoes.map((v) => (
                          <span key={v.id}>
                            {v.tipo}: {v.valor}
                          </span>
                        ))}
                      </div>
                    </div>
                    <Button
                      onClick={() => handleAvaliarProduto(produto)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white w-full sm:w-auto"
                      size="sm"
                    >
                      Avaliar
                      <ArrowRight size={14} className="ml-1" />
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {/* Produtos já avaliados */}
            {produtosComAvaliacao.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-lg font-medium text-foreground">
                  Produtos já avaliados
                </h3>
                {produtosComAvaliacao.map((produto) => (
                  <div
                    key={produto.id}
                    className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-4 border rounded-lg border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50"
                  >
                    <img
                      src={produto.imagem}
                      alt={produto.nome}
                      className="w-16 h-16 object-cover rounded-lg mx-auto sm:mx-0"
                    />
                    <div className="flex-1 text-center sm:text-left">
                      <h4 className="font-medium">{produto.nome}</h4>
                      <p className="text-sm text-gray-500">{produto.preco}</p>
                      <div className="flex flex-wrap justify-center sm:justify-start gap-2 text-xs text-gray-400 mb-2">
                        {produto.variacoes.map((v) => (
                          <span key={v.id}>
                            {v.tipo}: {v.valor}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-col  items-center sm:items-start gap-2">
                        {renderStars(produto.avaliacao?.rating || 0)}
                        {produto.avaliacao?.comentario && (
                          <span className="text-sm text-gray-500 text-center sm:text-left">
                            "{produto.avaliacao.comentario.substring(0, 25)}
                            {produto.avaliacao.comentario.length > 25
                              ? "..."
                              : ""}
                            "
                          </span>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => handleAvaliarProduto(produto)}
                      className="text-sm w-full sm:w-auto"
                      size="sm"
                    >
                      Editar
                    </Button>
                  </div>
                ))}
              </div>
            )}

            {/* Estado vazio */}
            {produtos.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  Nenhum produto encontrado neste pedido.
                </p>
              </div>
            )}
          </div>

          <DialogFooter className="px-4 sm:px-6 py-4 sm:py-5 border-t border-gray-200 dark:border-gray-700 shrink-0">
            <Button variant="outline" onClick={onClose} className="w-full">
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de avaliação individual */}
      {isAvaliarOpen && selectedProduto && (
        <ModalAvaliarPedido
          avaliacao={selectedProduto.avaliacao}
          isOpen={isAvaliarOpen}
          onClose={() => {
            setIsAvaliarOpen(false);
            setSelectedProduto(null);
          }}
          onSave={handleSaveAvaliacao}
          produtoNome={selectedProduto.nome}
        />
      )}
    </>
  );
}
