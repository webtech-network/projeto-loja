import { use, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";



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

interface ModalDetalhesPedidoProps {
    pedido: Pedido;
    isOpen: boolean;
    onClose: () => void;
}
export default function ModalDetalhesPedido({
    pedido,
    isOpen,
    onClose
}:ModalDetalhesPedidoProps){

   const qtdItens =  useMemo(() => {
        return pedido.itens.length;
   },[pedido]);
   const seeNumItens = qtdItens > 1;

   const totalPreco = useMemo(() => {
    let total = 0;
    pedido.itens.map((item) => {
      const precoLimpo = parseFloat(item.preco.replace("R$", "").replace(",", "."));
      total += precoLimpo;
    })
    return `R$${total.toFixed(2).replace(".", ",")}`;
  },[pedido]);


    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="w-full max-w-2xl items-center">
            {/*Título do Modal */}
            <DialogHeader>
                <DialogTitle className="flex items-center gap-2"> 
                    <p className="text-xl font-semibold">Pedido 1 </p>
                    {seeNumItens &&(
                      <p className="text-lg font-light">({qtdItens} itens)</p>
                    )}
                </DialogTitle>
            </DialogHeader>
            {/*Conteúdo do Modal */}
            <div className="flex flex-col gap-4 max-h-[40vh] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-indigo-800 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-transparent [&::-webkit-scrollbar-thumb]:bg-clip-padding dark:[&::-webkit-scrollbar-track]:bg-gray-800 dark:[&::-webkit-scrollbar-thumb]:bg-indigo-900">
                {pedido.itens.map((item) => (
                    <div key={item.id} className="flex items-center gap-6">
                      <img src= {item.imagem}  alt={item.nome} className="w-20 object-fit rounded-xl"/>
                      <div>
                        <p className="text-lg font- mb-1">{item.nome}</p>
                        <div className="flex gap-4">
                          {item.variacoes.map((variacao) => (
                            <p key={variacao.id} className="text-xs text-gray-500">{variacao.tipo}: {variacao.valor}</p>
                          ))}
                        </div>
                        <p className="text-xs font-light mt-2">Valor: {item.preco}</p>
                      </div>
                    </div>
                ))}
            </div>
            <div className="border rounded bg-gray-900 "></div>
            {/**Endereço de entrega */}
            <div>
              <p className="font-semibold">Endereço de entrega:</p>
              <p className="text-sm font-light">{pedido.enderecoEntrega}</p>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">Data de compra:</p>
                <p className="text-sm font-light">{pedido.dataCompra}</p>
              </div>
              <div>
                <p className="font-semibold">Data de recebimento:</p>
                {(pedido.dataRecebimento)?
                  (<p className="text-sm font-light">{pedido.dataRecebimento}</p>):
                  (<p className="text-sm font-light">Ainda não recebido</p>)}
              </div>
            </div>
            <div>
              <p className="font-semibold">Entrega recebida por:</p>
              {
                (pedido.entregaRecebida)?
                  (<p className="text-sm font-light">{pedido.entregaRecebida}</p>):
                  (<p className="text-sm font-light">Não informado</p>)
              }
            </div>
            <div className="border rounded bg-gray-900"></div>
            {/**Total do pedido */}
              <div className="flex justify-center items-center gap-8 w-full">
                <p className="font-semibold">Total do pedido:</p>
                <p className="font-semibold">{totalPreco}</p>
              </div>
        </DialogContent>
        </Dialog>
    );
}