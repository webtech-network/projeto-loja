"use client";

import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import HistoricoCard from "../../components/HistoricoCard";
import ModalDetalhesPedido from "../../components/ModalDetalhesPedido";
import ModalAvaliarPedido from "../../components/ModalAvaliarPedido";

type Variacao = { id: number; tipo: string; valor: string };
type Item = { id: number; nome: string; preco: string; imagem: string; variacoes: Variacao[] };
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
{/**Isso será trocado pela API, ela deverá vir com os pedidos do usuário */}
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
    enderecoEntrega: "Rua das Flores, 314, Bairro Santa Inês, 305740-01 - Belo Horizonte",
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
    enderecoEntrega: "Rua das Flores, 314, Bairro Santa Inês, 305740-01 - Belo Horizonte",
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
    enderecoEntrega: "Rua das Flores, 314, Bairro Santa Inês, 305740-01 - Belo Horizonte",
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
          <button onClick={() => window.history.back()} className="mb-4 text-blue-600 hover:underline">
           <svg width="23" height="19" viewBox="0 0 23 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.5007 9.37552C22.5007 9.62416 22.402 9.86262 22.2262 10.0384C22.0503 10.2142 21.8119 10.313 21.5632 10.313H3.20113L10.039 17.1497C10.1261 17.2368 10.1952 17.3403 10.2424 17.4541C10.2895 17.5679 10.3138 17.6898 10.3138 17.813C10.3138 17.9362 10.2895 18.0582 10.2424 18.172C10.1952 18.2858 10.1261 18.3892 10.039 18.4763C9.95192 18.5634 9.84851 18.6325 9.7347 18.6796C9.6209 18.7268 9.49892 18.751 9.37574 18.751C9.25255 18.751 9.13058 18.7268 9.01677 18.6796C8.90297 18.6325 8.79956 18.5634 8.71246 18.4763L0.274956 10.0388C0.187791 9.95173 0.118642 9.84834 0.0714628 9.73453C0.0242837 9.62072 0 9.49872 0 9.37552C0 9.25232 0.0242837 9.13032 0.0714628 9.01651C0.118642 8.9027 0.187791 8.79931 0.274956 8.71224L8.71246 0.27474C8.88837 0.0988269 9.12696 -1.85355e-09 9.37574 0C9.62452 1.85355e-09 9.86311 0.0988269 10.039 0.27474C10.2149 0.450653 10.3138 0.689242 10.3138 0.938021C10.3138 1.1868 10.2149 1.42539 10.039 1.6013L3.20113 8.43802H21.5632C21.8119 8.43802 22.0503 8.53679 22.2262 8.71261C22.402 8.88842 22.5007 9.12688 22.5007 9.37552Z" fill="#E5E7EB"/>
            </svg>
          </button>
          <h1 className="text-2xl font-semibold mb-2">Histórico de Pedidos</h1>
          <div className="border-2 rounded bg-[#4433de] w-16 mb-6" />

          <div className="w-full shadow p-6 flex flex-col gap-4">
            {pedidos.map((p) => (
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
            ))}
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
                  ? { ...pp, avaliacao: { rating: avaliacao.rating, comentario: avaliacao.comentario, imagem: avaliacao.imagem ?? [] } }
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
