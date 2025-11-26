"use client";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import ProductCard from "../../components/ProductCard";
import Footer from "../../components/Footer";

const produtos = [
  {
    id: 1,
    nome: "Camisa",
    preco: "35,00",
    imagem: "/images/camisa.png",
    categoria: "Roupas",
  },
  {
    id: 2,
    nome: "Boné",
    preco: "25,00",
    imagem: "/images/bone.png",
    categoria: "Acessórios",
  },
  {
    id: 3,
    nome: "Caneca",
    preco: "30,00",
    imagem: "/images/caneca.png",
    categoria: "Canecas",
  },
  {
    id: 4,
    nome: "Camisa",
    preco: "35,00",
    imagem: "/images/camisa.png",
    categoria: "Roupas",
  },
  {
    id: 5,
    nome: "Boné",
    preco: "25,00",
    imagem: "/images/bone.png",
    categoria: "Acessórios",
  },
  {
    id: 6,
    nome: "Caneca",
    preco: "30,00",
    imagem: "/images/caneca.png",
    categoria: "Canecas",
  },
  {
    id: 7,
    nome: "Camisa",
    preco: "35,00",
    imagem: "/images/camisa.png",
    categoria: "Roupas",
  },
  {
    id: 8,
    nome: "Boné",
    preco: "25,00",
    imagem: "/images/bone.png",
    categoria: "Acessórios",
  },
  {
    id: 9,
    nome: "Caneca",
    preco: "30,00",
    imagem: "/images/caneca.png",
    categoria: "Canecas",
  },
];

const categorias = ["Adesivo", "Acessórios", "Canecas", "Roupas"];
const faixasPreco = [
  "até R$50,00",
  "de R$50,00 a R$150,00",
  "a partir de R$150,00",
];

export default function ProdutosPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoriasSelecionadas, setCategoriasSelecionadas] = useState<
    string[]
  >([]);
  const [faixaPrecoSelecionada, setFaixaPrecoSelecionada] =
    useState<string>("");

  const toggleCategoria = (categoria: string) => {
    setCategoriasSelecionadas((prev) =>
      prev.includes(categoria)
        ? prev.filter((c) => c !== categoria)
        : [...prev, categoria]
    );
  };

  const produtosFiltrados = produtos.filter((produto) => {
    const matchesSearch = produto.nome
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategoria =
      categoriasSelecionadas.length === 0 ||
      categoriasSelecionadas.includes(produto.categoria);

    let matchesPreco = true;
    if (faixaPrecoSelecionada) {
      const preco = parseFloat(produto.preco.replace(",", "."));
      if (faixaPrecoSelecionada === "até R$50,00") {
        matchesPreco = preco <= 50;
      } else if (faixaPrecoSelecionada === "de R$50,00 a R$150,00") {
        matchesPreco = preco > 50 && preco <= 150;
      } else if (faixaPrecoSelecionada === "a partir de R$150,00") {
        matchesPreco = preco > 150;
      }
    }

    return matchesSearch && matchesCategoria && matchesPreco;
  });

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
      <Navbar />

      <main className="mx-auto flex w-full max-w-7xl flex-1 py-6 px-8 sm:py-8 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 w-full">
          {/* Sidebar com filtros */}
          <aside className="w-full lg:w-64 lg:shrink-0">
            <div className="lg:sticky lg:top-8">
              {/* Título Filtrar */}
              <div className="flex items-center gap-2 mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-yellow-500"
                >
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                </svg>
                <h2 className="text-lg font-semibold text-yellow-500">
                  Filtrar
                </h2>
              </div>

              {/* Filtro por Categorias */}
              <div className="mb-4 lg:mb-2">
                <h3 className="font-medium text-foreground mb-3">Categorias</h3>
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-2 lg:space-y-2 lg:block">
                  {categorias.map((categoria) => (
                    <label
                      key={categoria}
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={categoriasSelecionadas.includes(categoria)}
                        onChange={() => toggleCategoria(categoria)}
                        className="sr-only"
                      />
                      <div
                        className={`w-4 h-4 border border-gray-300 rounded mr-3 flex items-center justify-center ${
                          categoriasSelecionadas.includes(categoria)
                            ? "bg-yellow-500 border-yellow-500"
                            : ""
                        }`}
                      >
                        {categoriasSelecionadas.includes(categoria) && (
                          <svg
                            className="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                      <span className="text-sm text-foreground">
                        {categoria}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Filtro por Preço */}
              <div className="mb-4 lg:mb-6">
                <h3 className="font-medium text-foreground mb-3">Preço</h3>
                <div className="grid grid-cols-1 gap-2 lg:space-y-2">
                  {faixasPreco.map((faixa) => (
                    <label
                      key={faixa}
                      className="flex items-center cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="preco"
                        checked={faixaPrecoSelecionada === faixa}
                        onChange={() =>
                          setFaixaPrecoSelecionada(
                            faixaPrecoSelecionada === faixa ? "" : faixa
                          )
                        }
                        className="sr-only"
                      />
                      <div
                        className={`w-4 h-4 border border-gray-300 rounded-full mr-3 flex items-center justify-center ${
                          faixaPrecoSelecionada === faixa
                            ? "border-yellow-500"
                            : ""
                        }`}
                      >
                        {faixaPrecoSelecionada === faixa && (
                          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        )}
                      </div>
                      <span className="text-sm text-foreground">{faixa}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Conteúdo principal */}
          <div className="flex-1 w-full">
            {/* Barra de pesquisa */}
            <div className="mb-6 lg:mb-8">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Pesquisar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-background placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-yellow-500 focus:border-yellow-500"
                />
              </div>
            </div>

            {/* Grid de produtos */}
            <section className="w-full">
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-4 lg:gap-6">
                {produtosFiltrados.map((produto) => (
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

              {produtosFiltrados.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-lg mb-2">
                    Nenhum produto encontrado
                  </div>
                  <div className="text-gray-500 text-sm">
                    Tente ajustar seus filtros ou termo de pesquisa
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
