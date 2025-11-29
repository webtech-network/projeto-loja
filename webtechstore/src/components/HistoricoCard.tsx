import { use, useMemo } from "react";

interface Variacao {
  id: number;
  tipo:string;
  valor: string;
  imagem?: string;
}

interface Produto {
  id: number;
  nome: string;
  preco: string;
  imagem: string;
  descricao?: string;
  variacoes: Variacao[];
}
interface Pedido {
  id: number;
  itens: Produto[];
  enderecoEntrega: string;
  dataCompra: string;
  dataRecebimento?: string;
  entregaRecebida?:string;
  status: string;
}


interface HistoricoCardProps {
  pedido: Pedido;
  verDetalhes: () => void;
  avaliar: () => void;
}


export default function HistoricoCard({pedido,verDetalhes,avaliar}:HistoricoCardProps) {

     const qtdItens =  useMemo(() => {
          return pedido.itens.length;
     },[pedido]);
  
     const totalPreco = useMemo(() => {
      let total = 0;
      pedido.itens.map((item) => {
        const precoLimpo = parseFloat(item.preco.replace("R$", "").replace(",", "."));
        total += precoLimpo;
      })
      return `R$${total.toFixed(2).replace(".", ",")}`;
    },[pedido]);
  return (
    <div className="border-2 rounded-xl border-[#364153] py-8 sm:py-4 sm:px-4 px-8 flex flex-col justify-center">
     <div className="flex justify-between items-center">
      <div className="flex items-center gap-2"> 
          <h2 className="text-lg font-semibold">Pedido {pedido.id} </h2>
          <h2 className="text-lg sm:text-sm text-gray-400">({qtdItens} {(qtdItens>1)? "itens" :"item"})</h2>
      </div>
      <p className="text-sm sm:text-xs">Concluído</p>
     </div>
     <div className="flex justify-between items-center">
      <div className="my-6">
        <h4 className="text-base font-medium">{pedido.itens[0].nome}</h4>
        <div className="flex items-center gap-4">
          {pedido.itens[0].variacoes.map((variacao) => (
            <p key={variacao.id} className="text-[10px]">{variacao.tipo}: {variacao.valor}</p>
          )) }
        </div>
      </div>
      <div>
        <p className="font-semibold">Total</p>
        <p className="font-semibold">{totalPreco}</p>
      </div>
    </div>
      <div className="justify-between items-center flex gap-4">
        <button 
        type="submit"
        onClick={verDetalhes}
        className="size-full mt-2 px-3 py-1.5 text-sm sm:px-4 sm:py-2 sm:text-base border-2 rounded-md border-[#364153] font-semibold" >
         Ver Detalhes</button>
        <button 
        type="submit"
        onClick={avaliar}
        className="size-full mt-2 px-3 py-1.5 text-sm sm:px-4 sm:py-2 sm:text-base border rounded-md bg-yellow-500 text-white font-semibold" >
        Avaliar</button>
     </div>
    </div>
  );
}

