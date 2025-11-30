import { use, useMemo } from "react";

interface Variacao {
  id: number;
  tipo: string;
  valor: string;
  imagem?: string;
}

type Avaliacao = { rating: number; comentario: string; imagem?: File[] };

interface Produto {
  id: number;
  nome: string;
  preco: string;
  imagem: string;
  descricao?: string;
  variacoes: Variacao[];
  avaliacao?: Avaliacao;
}
interface Pedido {
  id: number;
  itens: Produto[];
  enderecoEntrega: string;
  dataCompra: string;
  dataRecebimento?: string;
  entregaRecebida?: string;
  status: string;
}

interface HistoricoCardProps {
  pedido: Pedido;
  verDetalhes: () => void;
  avaliar: () => void;
}

export default function HistoricoCard({
  pedido,
  verDetalhes,
  avaliar,
}: HistoricoCardProps) {
  const qtdItens = useMemo(() => {
    return pedido.itens.length;
  }, [pedido]);

  const produtosAvaliados = useMemo(() => {
    return pedido.itens.filter((item) => item.avaliacao).length;
  }, [pedido]);

  const totalPreco = useMemo(() => {
    let total = 0;
    pedido.itens.map((item) => {
      const precoLimpo = parseFloat(
        item.preco.replace("R$", "").replace(",", ".")
      );
      total += precoLimpo;
    });
    return `R$${total.toFixed(2).replace(".", ",")}`;
  }, [pedido]);

  const statusAvaliacao = useMemo(() => {
    if (produtosAvaliados === qtdItens) return "Completo";
    if (produtosAvaliados > 0) return "Parcial";
    return "Pendente";
  }, [produtosAvaliados, qtdItens]);
  return (
    <div className="border-2 rounded-xl border-border py-4 px-4 sm:px-6 flex flex-col justify-center">
      {/* Header - quebra em celular */}
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">Pedido {pedido.id}</h2>
          <h2 className="text-sm text-gray-500 dark:text-gray-400">
            ({qtdItens} {qtdItens > 1 ? "itens" : "item"})
          </h2>
        </div>
        <div className="flex items-center justify-between sm:gap-3">
          <div className="text-left sm:text-right">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Avaliações: {produtosAvaliados}/{qtdItens}
            </p>
            <div
              className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                statusAvaliacao === "Completo"
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                  : statusAvaliacao === "Parcial"
                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                  : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
              }`}
            >
              {statusAvaliacao}
            </div>
          </div>
          <p className="text-xs sm:text-sm">Concluído</p>
        </div>
      </div>
      {/* Produto e Preço - quebra em celular */}
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center my-4 sm:my-6">
        <div className="flex-1">
          <h4 className="text-base font-medium">{pedido.itens[0].nome}</h4>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            {pedido.itens[0].variacoes.map((variacao) => (
              <p key={variacao.id} className="text-xs">
                {variacao.tipo}: {variacao.valor}
              </p>
            ))}
          </div>
        </div>
        <div className="text-left sm:text-right">
          <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">
            Total
          </p>
          <p className="text-lg font-semibold">{totalPreco}</p>
        </div>
      </div>
      {/* Botões - empilhados em celular */}
      <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
        <button
          type="submit"
          onClick={verDetalhes}
          className="w-full px-4 py-2.5 text-sm text-gray-500 dark:text-gray-200 border-2 rounded-md border-border font-semibold hover:scale-102 transition-transform duration-200 ease-all cursor-pointer"
        >
          Ver Detalhes
        </button>
        <button
          type="submit"
          onClick={avaliar}
          className={`w-full px-4 py-2.5 text-sm border rounded-md font-semibold cursor-pointer hover:scale-102 transition-transform duration-200 ease-all ${
            statusAvaliacao === "Completo"
              ? "bg-green-500 text-white"
              : statusAvaliacao === "Parcial"
              ? "bg-yellow-500 text-white"
              : "bg-yellow-500 text-white"
          }`}
        >
          {statusAvaliacao === "Completo"
            ? "Ver Avaliações"
            : statusAvaliacao === "Parcial"
            ? "Continuar Avaliação"
            : "Avaliar Produtos"}
        </button>
      </div>
    </div>
  );
}
