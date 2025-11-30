"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { useFavoritos } from "../../../components/FavoritosContext";
import { useCarrinho } from "../../../components/CarrinhoContext";
import { Heart, Star, ShoppingCart, Minus, Plus, NotePencil } from "phosphor-react";
import Toast from "../../../components/Toast";
import ModalEditarProduto from "../../../components/ModalEditarProduto";

// Dados mockados dos produtos (normalmente viria de uma API)
const produtos = [
  {
    id: 1,
    nome: "Camisa Webtech",
    preco: "35,00",
    imagem: "/images/camisa.png",
    categoria: "Roupas",
    descricao: "Camisa personalizada com a logo da WebTech, 100% poliéster",
    avaliacao: 4.8,
    numeroAvaliacoes: 90,
    tamanhos: ["P", "M", "G", "GG"],
    cores: [
      { nome: "Preto", hex: "#000000", imagem: "/images/camisa.png" },
      { nome: "Branco", hex: "#FFFFFF", imagem: "/images/camisa-branca.png" },
    ],
  },
  {
    id: 2,
    nome: "Boné Webtech",
    preco: "25,00",
    imagem: "/images/bone.png",
    categoria: "Acessórios",
    descricao: "Boné ajustável com bordado da WebTech",
    avaliacao: 4.5,
    numeroAvaliacoes: 45,
    tamanhos: ["Único"],
    cores: [
      { nome: "Preto", hex: "#000000", imagem: "/images/bone.png" },
      { nome: "Azul", hex: "#1E40AF", imagem: "/images/bone-azul.png" },
    ],
  },
  {
    id: 3,
    nome: "Caneca Webtech",
    preco: "30,00",
    imagem: "/images/caneca.png",
    categoria: "Canecas",
    descricao: "Caneca de cerâmica com estampa da WebTech",
    avaliacao: 4.7,
    numeroAvaliacoes: 120,
    tamanhos: ["350ml"],
    cores: [
      { nome: "Branco", hex: "#FFFFFF", imagem: "/images/caneca.png" },
      { nome: "Preto", hex: "#000000", imagem: "/images/caneca-preta.png" },
    ],
  },
  {
    id: 4,
    nome: "Adesivo Webtech",
    preco: "15,00",
    imagem: "/images/adesivo.png",
    categoria: "Adesivos",
    descricao: "Adesivo resistente à água com logo da WebTech",
    avaliacao: 4.9,
    numeroAvaliacoes: 200,
    tamanhos: ["10x10cm"],
    cores: [
      { nome: "Transparente", hex: "#FFFFFF", imagem: "/images/adesivo.png" },
    ],
  },
];

const comentarios = [
  {
    id: 1,
    nome: "Eduardo Vieira",
    tempo: "2 meses atrás",
    comentario: "Excelente produto!",
    descricao:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution.",
    avaliacao: 5.0,
    imagem: "/images/camisa.png",
  },
  {
    id: 2,
    nome: "Artur Bomtempo",
    tempo: "2 meses atrás",
    comentario: "Gostei!",
    descricao:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution.",
    avaliacao: 5.0,
    imagem: "/images/camisa.png",
  },
];

export default function ProdutoDetalhes() {
  const params = useParams();
  const produtoId = parseInt(params.id as string);
  const produto = produtos.find((p) => p.id === produtoId);

  const { adicionarFavorito, removerFavorito, isFavorito } = useFavoritos();
  const { adicionarItem } = useCarrinho();

  const [tamanhoSelecionado, setTamanhoSelecionado] = useState("");
  const [corSelecionada, setCorSelecionada] = useState("");
  const [imagemAtual, setImagemAtual] = useState(produto?.imagem || "");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [modalEdicaoAberto, setModalEdicaoAberto] = useState(false);
  const [produtoParaEditar, setProdutoParaEditar] = useState<any>(null);

  if (!produto) {
    return (
      <div className="flex min-h-screen flex-col bg-background font-sans">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center px-4 py-8">
            <h1 className="text-2xl font-bold text-foreground mb-7">
              Produto não encontrado
            </h1>
            <a
              href="/produtos"
              className="bg-yellow text-white rounded-md p-3  hover:bg-yellow-600 transition-colors"
            >
              Voltar para produtos
            </a>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAdicionarCarrinho = () => {
    if (!tamanhoSelecionado) {
      setToastMessage("Selecione um tamanho");
      setShowToast(true);
      return;
    }
    if (!corSelecionada && produto.cores.length > 1) {
      setToastMessage("Selecione uma cor");
      setShowToast(true);
      return;
    }

    adicionarItem({
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      imagem: produto.imagem,
      categoria: produto.categoria,
      tamanho: tamanhoSelecionado,
      cor: corSelecionada,
    });
    setToastMessage(`${produto.nome} adicionado ao carrinho!`);
    setShowToast(true);
  };

  const handleToggleFavorito = () => {
    if (isFavorito(produto.id)) {
      removerFavorito(produto.id);
      setToastMessage(`${produto.nome} removido dos favoritos!`);
    } else {
      adicionarFavorito({
        id: produto.id,
        nome: produto.nome,
        preco: produto.preco,
        imagem: produto.imagem,
        categoria: produto.categoria,
      });
      setToastMessage(`${produto.nome} adicionado aos favoritos!`);
    }
    setShowToast(true);
  };

  const handleMudancaCor = (cor: any) => {
    setCorSelecionada(cor.nome);
    if (cor.imagem) {
      setImagemAtual(cor.imagem);
    }
  };

  const abrirModalEdicao = () => {
    const produtoParaModal = {
      id: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      imagem: produto.imagem,
      descricao: produto.descricao,
      variacoes: [
        ...produto.cores.map((cor, index) => ({
          id: index + 1,
          tipo: "cor" as const,
          valor: cor.nome,
          imagem: cor.imagem || produto.imagem,
        })),
        ...produto.tamanhos.map((tamanho, index) => ({
          id: index + 100,
          tipo: "tamanho" as const,
          valor: tamanho,
        })),
      ],
    };
    setProdutoParaEditar(produtoParaModal);
    setModalEdicaoAberto(true);
  };

  const fecharModalEdicao = () => {
    setModalEdicaoAberto(false);
    setProdutoParaEditar(null);
  };

  const salvarProdutoEditado = (produtoAtualizado: any) => {
    setToastMessage("Produto atualizado com sucesso!");
    setShowToast(true);
    console.log("Produto atualizado:", produtoAtualizado);
  };

  const renderEstrelas = (avaliacao: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        weight={i < Math.floor(avaliacao) ? "fill" : "regular"}
        className={
          i < Math.floor(avaliacao) ? "text-yellow-400" : "text-gray-300"
        }
      />
    ));
  };

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
      <Navbar />

      <main className="mx-auto flex w-full max-w-6xl flex-1 py-4 px-4 sm:py-6 sm:px-6 lg:py-8">
        <div className="w-full">
          {/* Seção principal do produto */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 lg:p-5 mb-12">
            {/* Imagem do produto */}
            <div className="flex flex-col">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                <img
                  src={imagemAtual}
                  alt={produto.nome}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Miniaturas */}
              <div className="flex gap-2 justify-center md:justify-start">
                {Array.from({ length: 3 }, (_, i) => (
                  <div
                    key={i}
                    className={`w-16 h-16 bg-gray-100 rounded-md overflow-hidden border-2 ${
                      i === 0 ? "border-yellow-500" : "border-gray-200"
                    }`}
                  >
                    <img
                      src={imagemAtual}
                      alt={`${produto.nome} ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>{" "}
            {/* Detalhes do produto */}
            <div className="flex flex-col">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {produto.categoria}
                </span>
                <button
                  onClick={abrirModalEdicao}
                  className="flex items-center gap-2 px-3 py-2 bg-indigo-900 hover:bg-indigo-800 text-white rounded-lg transition-colors font-medium text-sm"
                >
                  <NotePencil size={18} />
                  Editar produto
                </button>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                {produto.nome}
              </h1>

              {/* Avaliações */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {renderEstrelas(Math.floor(produto.avaliacao))}
                </div>
                <span className="text-sm font-medium">
                  {produto.avaliacao} ({produto.numeroAvaliacoes} avaliações)
                </span>
              </div>

              {/* Preço */}
              <div className="mb-6">
                <span className="text-2xl sm:text-3xl font-bold text-foreground">
                  R$ {produto.preco}
                </span>
              </div>

              {/* Descrição */}
              <p className="text-muted-foreground mb-6">{produto.descricao}</p>

              {/* Tamanhos */}
              <div className="mb-4">
                <h3 className="font-medium text-foreground mb-3">Tamanhos</h3>
                <div className="flex gap-2 flex-wrap">
                  {produto.tamanhos.map((tamanho) => (
                    <button
                      key={tamanho}
                      onClick={() => setTamanhoSelecionado(tamanho)}
                      className={`px-4 py-2 rounded-md border-2 text-sm font-medium transition-colors ${
                        tamanhoSelecionado === tamanho
                          ? "border-yellow-500 bg-yellow-50 text-yellow-700"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {tamanho}
                    </button>
                  ))}
                </div>
              </div>

              {/* Cores */}
              {produto.cores.length > 1 && (
                <div className="mb-6">
                  <h3 className="font-medium text-foreground mb-3">Cores</h3>
                  <div className="flex gap-2 flex-wrap">
                    {produto.cores.map((cor) => (
                      <button
                        key={cor.nome}
                        onClick={() => handleMudancaCor(cor)}
                        className={`px-4 py-2 rounded-md border-2 text-sm font-medium transition-colors ${
                          corSelecionada === cor.nome
                            ? "border-yellow-500 bg-yellow-50 text-yellow-700"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        {cor.nome}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Botões */}
              <div className="flex gap-3">
                <button
                  onClick={handleAdicionarCarrinho}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} />
                  Adicionar ao carrinho
                </button>

                <button
                  onClick={handleToggleFavorito}
                  className={`w-12 h-12 rounded-full cursor-pointer flex items-center justify-center transition-colors ${
                    isFavorito(produto.id)
                      ? "bg-red-500"
                      : "bg-background-bg border-2 border-red-400 hover:border-red-500"
                  }`}
                >
                  <Heart
                    size={20}
                    className={
                      isFavorito(produto.id)
                        ? "text-white fill-current"
                        : "text-red-600 dark:text-red-400"
                    }
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Comentários */}
          <div className="w-full lg:px-5">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6">
              Comentários
            </h2>

            <div className="space-y-6">
              {comentarios.map((comentario) => (
                <div
                  key={comentario.id}
                  className="border-b border-border pb-6"
                >
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-xs sm:text-sm font-medium">
                        {comentario.nome.charAt(0)}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-2">
                        <span className="font-medium text-sm sm:text-base">
                          {comentario.nome}
                        </span>
                        <span className="text-xs sm:text-sm text-muted-foreground">
                          {comentario.tempo}
                        </span>
                      </div>

                      <h4 className="font-medium mb-2 text-sm sm:text-base">
                        {comentario.comentario}
                      </h4>

                      <p className="text-muted-foreground text-xs sm:text-sm mb-3">
                        {comentario.descricao}
                      </p>

                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex">
                          {renderEstrelas(Math.floor(comentario.avaliacao))}
                        </div>
                        <span className="text-xs sm:text-sm font-medium">
                          {comentario.avaliacao}
                        </span>
                      </div>

                      {comentario.imagem && (
                        <div>
                          <img
                            src={comentario.imagem}
                            alt="Comentário"
                            className="w-12 h-12 sm:w-16 sm:h-16 rounded-md object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Modal de edição */}
      {produtoParaEditar && (
        <ModalEditarProduto
          produto={produtoParaEditar}
          isOpen={modalEdicaoAberto}
          onClose={fecharModalEdicao}
          onSave={salvarProdutoEditado}
        />
      )}

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
