"use client";

import React, { useState } from "react";
import { ArrowLeft } from "phosphor-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import HistoricoCard from "../../components/HistoricoCard";
import ModalDetalhesPedido from "../../components/ModalDetalhesPedido";
import ModalAvaliarPedido from "../../components/ModalAvaliarPedido";

type Variacao = { id: number; tipo: string; valor: string };
type Item = {
  id: number;
  nome: string;
  preco: string;
  imagem: string;
  variacoes: Variacao[];
};
type Avaliacao = { rating: number; comentario: string; imagem?: File[] };
type Pedido = {
  id: number;
  itens: Item[];
  enderecoEntrega: string;
  dataCompra: string;
  dataRecebimento: string;
  entregaRecebida: string;
  status: "concluido" | "em andamento" | "cancelado";
  avaliacao: Avaliacao;
};
{
  /**Isso será trocado pela API, ela deverá vir com os pedidos do usuário */
}
const initialPedidos: Pedido[] = [
  {
    id: 1,
    itens: [
      {
        id: 1,
        nome: "Boné",
        preco: "R$45,00",
        imagem: "/images/bone.png",
        variacoes: [
          { id: 1, tipo: "Tamanho", valor: "57cm" },
          { id: 2, tipo: "Cor", valor: "Preto" },
        ],
      },
      {
        id: 2,
        nome: "Boné",
        preco: "R$45,00",
        imagem: "/images/bone.png",
        variacoes: [
          { id: 1, tipo: "Tamanho", valor: "57cm" },
          { id: 2, tipo: "Cor", valor: "Preto" },
        ],
      },
      {
        id: 3,
        nome: "Boné",
        preco: "R$45,00",
        imagem: "/images/bone.png",
        variacoes: [
          { id: 1, tipo: "Tamanho", valor: "57cm" },
          { id: 2, tipo: "Cor", valor: "Preto" },
        ],
      },
      {
        id: 4,
        nome: "Boné",
        preco: "R$45,00",
        imagem: "/images/bone.png",
        variacoes: [
          { id: 1, tipo: "Tamanho", valor: "57cm" },
          { id: 2, tipo: "Cor", valor: "Preto" },
        ],
      },
    ],
    enderecoEntrega:
      "Rua das Flores, 314, Bairro Santa Inês, 305740-01 - Belo Horizonte",
    dataCompra: "25/12/2024",
    dataRecebimento: "05/01/2025",
    entregaRecebida: "Jurandir",
    status: "concluido",
    avaliacao: { rating: 1, comentario: "", imagem: [] },
  },
  {
    id: 2,
    itens: [
      {
        id: 2,
        nome: "Caneca",
        preco: "R$30,00",
        imagem: "/images/caneca.png",
        variacoes: [
          { id: 3, tipo: "Tamanho", valor: "300ml" },
          { id: 4, tipo: "Cor", valor: "Branco" },
        ],
      },
      {
        id: 3,
        nome: "Caneca",
        preco: "R$30,00",
        imagem: "/images/caneca.png",
        variacoes: [
          { id: 3, tipo: "Tamanho", valor: "300ml" },
          { id: 4, tipo: "Cor", valor: "Branco" },
        ],
      },
    ],
    enderecoEntrega:
      "Rua das Flores, 314, Bairro Santa Inês, 305740-01 - Belo Horizonte",
    dataCompra: "10/11/2024",
    dataRecebimento: "20/11/2024",
    entregaRecebida: "Maria",
    status: "concluido",
    avaliacao: { rating: 0, comentario: "", imagem: [] },
  },
  {
    id: 3,
    itens: [
      {
        id: 3,
        nome: "Camisa",
        preco: "R$35,00",
        imagem: "/images/camisa.png",
        variacoes: [
          { id: 5, tipo: "Tamanho", valor: "M" },
          { id: 6, tipo: "Cor", valor: "Preto" },
        ],
      },
    ],
    enderecoEntrega:
      "Rua das Flores, 314, Bairro Santa Inês, 305740-01 - Belo Horizonte",
    dataCompra: "01/09/2024",
    dataRecebimento: "10/09/2024",
    entregaRecebida: "João",
    status: "concluido",
    avaliacao: { rating: 4, comentario: "Bom", imagem: [] },
  },
];

export default function HistoricoPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>(initialPedidos);
  const [selectedPedido, setSelectedPedido] = useState<Pedido | null>(null);
  const [isOpenDetalhes, setIsOpenDetalhes] = useState(false);
  const [isOpenAvaliar, setIsOpenAvaliar] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => window.history.back()}
            className="mb-4 text-gray-600 dark:text-gray-400 hover:underline flex items-center gap-2"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl text-center sm:text-2xl md:text-start font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            <span className="inline-block">
              Histórico de Pedidos
              <span className="block h-1 bg-indigo-800 w-1/5 mx-auto md:mx-0 rounded-lg" />
            </span>
          </h1>

          <div className="w-full p-1 sm:py-2 flex flex-col gap-4 mt-5">
            {pedidos.length > 0 ? (
              pedidos.map((p) => (
                <HistoricoCard
                  key={p.id}
                  pedido={p}
                  avaliar={() => {
                    setSelectedPedido(p);
                    setIsOpenAvaliar(true);
                  }}
                  verDetalhes={() => {
                    setSelectedPedido(p);
                    setIsOpenDetalhes(true);
                  }}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="text-gray-400 dark:text-gray-600 mb-4">
                  <svg
                    className="w-24 h-24 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                  Nenhum pedido encontrado
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md">
                  Você ainda não fez nenhuma compra. Que tal explorar nossos
                  produtos e fazer seu primeiro pedido?
                </p>
                <a
                  href="/"
                  className="bg-indigo-800 hover:bg-indigo-900 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Explorar Produtos
                </a>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />

      {/* Modal de detalhes do pedido */}
      {isOpenDetalhes && selectedPedido && (
        <ModalDetalhesPedido
          isOpen={isOpenDetalhes}
          onClose={() => setIsOpenDetalhes(false)}
          pedido={selectedPedido}
        />
      )}

      {/* Modal de avaliar o pedido */}
      {isOpenAvaliar && selectedPedido && (
        <ModalAvaliarPedido
          avaliacao={selectedPedido.avaliacao}
          isOpen={isOpenAvaliar}
          onClose={() => setIsOpenAvaliar(false)}
          onSave={(avaliacao) => {
            setPedidos((prev) =>
              prev.map((pp) =>
                pp.id === selectedPedido.id
                  ? {
                      ...pp,
                      avaliacao: {
                        rating: avaliacao.rating,
                        comentario: avaliacao.comentario,
                        imagem: avaliacao.imagem ?? [],
                      },
                    }
                  : pp
              )
            );
            setIsOpenAvaliar(false);
            setSelectedPedido(null);
          }}
        />
      )}
    </div>
  );
}
