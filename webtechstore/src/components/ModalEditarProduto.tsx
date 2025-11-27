"use client";

import { useState, useEffect } from "react";
import { Plus, Minus, PencilIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface Variacao {
  id: number;
  tipo: "cor" | "tamanho";
  valor: string;
  imagem?: string;
}

interface ProdutoModal {
  id: number;
  nome: string;
  preco: string;
  imagem: string;
  descricao?: string;
  variacoes: Variacao[];
}

interface ModalEditarProdutoProps {
  produto: ProdutoModal;
  isOpen: boolean;
  onClose: () => void;
  onSave: (produto: ProdutoModal) => void;
}

export default function ModalEditarProduto({
  produto,
  isOpen,
  onClose,
  onSave,
}: ModalEditarProdutoProps) {
  const [produtoEditado, setProdutoEditado] = useState<ProdutoModal>(produto);
  const [nextVariacaoId, setNextVariacaoId] = useState(1);

  useEffect(() => {
    setProdutoEditado(produto);
    setNextVariacaoId(Math.max(...produto.variacoes.map((v) => v.id), 0) + 1);
  }, [produto]);

  const handleInputChange = (field: keyof ProdutoModal, value: string) => {
    setProdutoEditado((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const adicionarVariacao = (tipo: "cor" | "tamanho") => {
    const novaVariacao: Variacao = {
      id: nextVariacaoId,
      tipo,
      valor: "",
      imagem: tipo === "cor" ? "" : undefined,
    };
    setProdutoEditado((prev) => ({
      ...prev,
      variacoes: [...prev.variacoes, novaVariacao],
    }));
    setNextVariacaoId((prev) => prev + 1);
  };

  const removerVariacao = (id: number) => {
    setProdutoEditado((prev) => ({
      ...prev,
      variacoes: prev.variacoes.filter((v) => v.id !== id),
    }));
  };

  const atualizarVariacao = (
    id: number,
    valor: string,
    campo: "valor" | "imagem" = "valor"
  ) => {
    setProdutoEditado((prev) => ({
      ...prev,
      variacoes: prev.variacoes.map((v) =>
        v.id === id ? { ...v, [campo]: valor } : v
      ),
    }));
  };

  const handleSave = () => {
    const variacoesValidas = produtoEditado.variacoes.filter(
      (v) => v.valor.trim() !== ""
    );
    const produtoFinal = {
      ...produtoEditado,
      variacoes: variacoesValidas,
    };
    onSave(produtoFinal);
    onClose();
  };

  const cores = produtoEditado.variacoes.filter((v) => v.tipo === "cor");
  const tamanhos = produtoEditado.variacoes.filter((v) => v.tipo === "tamanho");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-indigo-800 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-transparent [&::-webkit-scrollbar-thumb]:bg-clip-padding dark:[&::-webkit-scrollbar-track]:bg-gray-800 dark:[&::-webkit-scrollbar-thumb]:bg-indigo-900">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <PencilIcon className="w-5 h-5" />
            Editar Produto
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informações básicas */}
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome do Produto</Label>
              <Input
                id="nome"
                value={produtoEditado.nome}
                onChange={(e) => handleInputChange("nome", e.target.value)}
                placeholder="Nome do produto"
                className="[&::selection]:bg-indigo-800 [&::selection]:text-white"
                autoFocus={false}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="preco">Preço</Label>
              <Input
                id="preco"
                value={produtoEditado.preco}
                onChange={(e) => handleInputChange("preco", e.target.value)}
                placeholder="45,00"
                className="[&::selection]:bg-indigo-800 [&::selection]:text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="imagem">URL da Imagem Principal</Label>
              <Input
                id="imagem"
                value={produtoEditado.imagem}
                onChange={(e) => handleInputChange("imagem", e.target.value)}
                placeholder="/images/produto.png"
                className="[&::selection]:bg-indigo-800 [&::selection]:text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="descricao">Descrição</Label>
              <Textarea
                id="descricao"
                value={produtoEditado.descricao || ""}
                onChange={(e) => handleInputChange("descricao", e.target.value)}
                placeholder="Descrição do produto..."
                rows={3}
                className="[&::selection]:bg-indigo-800 [&::selection]:text-white"
              />
            </div>
          </div>

          {/* Cores */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold">Cores</Label>
              <Button
                type="button"
                onClick={() => adicionarVariacao("cor")}
                size="sm"
                className="bg-indigo-900 hover:bg-indigo-800 text-white"
              >
                <Plus className="w-4 h-4 mr-1" />
                Adicionar Cor
              </Button>
            </div>

            <div className="space-y-3">
              {cores.map((cor) => (
                <div key={cor.id} className="border rounded-lg p-3 space-y-3">
                  <div className="flex items-center gap-2">
                    <Input
                      value={cor.valor}
                      onChange={(e) =>
                        atualizarVariacao(cor.id, e.target.value)
                      }
                      placeholder="Nome da cor (ex: Azul, Vermelho)"
                      className="flex-1 [&::selection]:bg-indigo-800 [&::selection]:text-white"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removerVariacao(cor.id)}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                  </div>
                  <Input
                    value={cor.imagem || ""}
                    onChange={(e) =>
                      atualizarVariacao(cor.id, e.target.value, "imagem")
                    }
                    placeholder="URL da imagem para esta cor (ex: /images/camisa-azul.png)"
                    className="[&::selection]:bg-indigo-800 [&::selection]:text-white"
                  />
                </div>
              ))}
              {cores.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  Nenhuma cor adicionada
                </p>
              )}
            </div>
          </div>

          {/* Tamanhos */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold">Tamanhos</Label>
              <Button
                type="button"
                onClick={() => adicionarVariacao("tamanho")}
                size="sm"
                className="bg-indigo-900 hover:bg-indigo-800 text-white"
              >
                <Plus className="w-4 h-4 mr-1" />
                Adicionar Tamanho
              </Button>
            </div>

            <div className="space-y-2">
              {tamanhos.map((tamanho) => (
                <div key={tamanho.id} className="flex items-center gap-2">
                  <Input
                    value={tamanho.valor}
                    onChange={(e) =>
                      atualizarVariacao(tamanho.id, e.target.value)
                    }
                    placeholder="Tamanho (ex: P, M, G, GG)"
                    className="flex-1 [&::selection]:bg-indigo-800 [&::selection]:text-white"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => removerVariacao(tamanho.id)}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              {tamanhos.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  Nenhum tamanho adicionado
                </p>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            className="bg-green-500 hover:bg-green-600 text-white"
          >
            Salvar Alterações
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
