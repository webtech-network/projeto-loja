import Navbar from "../components/Navbar";
import Categorias from "../components/Categorias";
import Perguntas from "../components/Perguntas";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

const produtos = [
  {
    id: 1,
    nome: "Camisa Webtech",
    preco: "45,00",
    imagem: "/images/camisa.png",
  },
  {
    id: 2,
    nome: "Boné Webtech",
    preco: "35,00",
    imagem: "/images/bone.png",
  },
  {
    id: 3,
    nome: "Caneca Webtech",
    preco: "25,00",
    imagem: "/images/caneca.png",
  },
  {
    id: 4,
    nome: "Adesivo Webtech",
    preco: "15,00",
    imagem: "/images/adesivo.png",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
      <Navbar />
      <a href="/produtos">
        <img
          src="/images/banner.png"
          alt="Webtech Store"
          className="object-cover sm:max-w-2xl md:max-w-4xl sm:flex-1 sm:mx-auto sm:mt-5 "
        />
      </a>
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col  py-12 px-8 sm:px-4">
        <div className="flex flex-col gap-6">
          <h1 className="text-xl text-center sm:text-2xl md:text-start font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            <span className="inline-block">
              Produtos
              <span className="block h-1 bg-indigo-800 w-2/5 mx-auto md:mx-0 rounded-lg" />
            </span>
          </h1>

          <section className="w-full">
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
              {produtos.map((produto) => (
                <ProductCard
                  key={produto.id}
                  id={produto.id}
                  nome={produto.nome}
                  preco={produto.preco}
                  imagem={produto.imagem}
                />
              ))}
            </div>

            <div className="flex justify-center mt-6">
              <a
                href="/produtos"
                className="bg-background border-2 border-gray-200 dark:border-gray-700 drop-shadow-[4px_4px_0px_rgba(0,0,0,0.3)] dark:drop-shadow-[4px_4px_0px_rgba(255,255,255,0.1)] hover:drop-shadow-[6px_6px_0px_rgba(0,0,0,0.4)] dark:hover:drop-shadow-[6px_6px_0px_rgba(255,255,255,0.2)] transition-all  px-4 py-2 text-sm font-medium "
              >
                Ver mais
              </a>
            </div>
          </section>
        </div>

        <div className="mt-4 flex flex-col gap-6 mb-4">
          <h1 className="text-xl text-center mt-2 sm:text-2xl md:text-start font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            <span className="inline-block">
              Categorias
              <span className="block h-1 bg-indigo-800 w-2/5 mx-auto md:mx-0 rounded-lg" />
            </span>
          </h1>

          <section className="w-full">
            <div className="flex  flex-wrap gap-2 ">
              <Categorias nome="Acessórios" />
              <Categorias nome="Adesivos" />
              <Categorias nome="Canecas" />
              <Categorias nome="Roupas" />
            </div>
          </section>
        </div>
        <div className="mt-3 flex flex-col  sm:flex-row gap-6">
          <div>
            <img
              src="/images/Webtech-all1.png"
              className="object-contain border border-b-5 border-r-5 border-yellow-500 w-xl sm:w-xl"
              alt=""
            />
            <a
              target="_blank"
              href="https://webtech.network"
              className="bg-background text-center justify-center items-center text-yellow-500 font-semibold border-2 border-yellow-500 p-2 flex mt-2 drop-shadow-[4px_4px_0px_#eab308] dark:drop-shadow-[4px_4px_0px_#f0b100] hover:drop-shadow-[6px_6px_0px_#eab30866] dark:hover:drop-shadow-[6px_6px_0px_#f0b100] transition-all"
            >
              Conheça a Webtech
            </a>
          </div>
          <div>
            <h1 className="text-xl text-center mt-2 sm:text-2xl md:text-start font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
              <span className="inline-block">
                Informações Relevantes
                <span className="block h-1 bg-indigo-800 w-1/6 mb-4 mx-auto md:mx-0 rounded-lg" />
              </span>
            </h1>
            <div className="flex flex-col gap-3 w-full">
              <Perguntas
                pergunta="Qual é o prazo de entrega?"
                resposta="O prazo de entrega é de 5 a 7 dias úteis."
              />
              <Perguntas
                pergunta="Quais são as formas de pagamento?"
                resposta="Aceitamos cartões de crédito, débito e boleto bancário."
              />
              <Perguntas
                pergunta="Posso trocar um produto?"
                resposta="Sim, você pode solicitar a troca em até 30 dias após o recebimento."
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
