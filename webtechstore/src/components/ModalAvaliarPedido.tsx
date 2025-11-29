import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import RatingStar from "./RatingStar";
import ImageUploader from "./ImageUploader";


interface Avaliacao{
    rating: number;
    comentario: string;
    imagem?: File[];
}

interface ModalAvaliarPedidoProps {
    avaliacao?: Avaliacao;
    isOpen: boolean;
    onSave: (avaliacao: Avaliacao) => void;
    onClose: () => void;
}
export default function ModalAvaliarPedido({
    avaliacao,
    isOpen,
    onSave,
    onClose
}:ModalAvaliarPedidoProps){
    const [formAvaliacao, setFormAvaliacao] = useState<Avaliacao>({
        rating: 0,
        comentario: "",
        imagem: []
    });

    // When modal opens or avaliacao prop changes, populate form with existing data
    useEffect(() => {
      if (isOpen) {
        setFormAvaliacao({
          rating: avaliacao?.rating ?? 0,
          comentario: avaliacao?.comentario ?? "",
          imagem: avaliacao?.imagem ?? []
        });
      }
    }, [isOpen, avaliacao]);

    const handleComentaryChange = (value: string) => {
        setFormAvaliacao((prev) => ({...prev, comentario: value}));
      };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-lg">
            {/*Título do Modal */}
            <DialogHeader>
                <DialogTitle className="flex items-center gap-2"> 
                    <p className="text-xl font-semibold">Avaliação do Pedido</p>
                </DialogTitle>
            </DialogHeader>
            {/*Conteúdo do Modal */}
                <div className="flex flex-col justify-center items-center gap-4 w-full">
                <p>Pontuação</p>
                <RatingStar initialRating={formAvaliacao.rating} onRatingChange={
                    (rating) => setFormAvaliacao((prev) => ({...prev, rating}))
                } />
            </div>
                <ImageUploader
                    initialFiles={formAvaliacao.imagem}
                    onImagesChange={(files) => setFormAvaliacao((prev) => ({ ...prev, imagem: files }))}
                />

                <label htmlFor="comentario" className="text-lg font-semibold">Comentário</label>
            <Textarea
                id="comentario"
                value={formAvaliacao.comentario || ""}
                onChange={(e) => handleComentaryChange(e.target.value)}
                placeholder="Descrição do produto..."
                rows={3}
                className="[&::selection]:bg-indigo-800 [&::selection]:text-white"
              />

        <button 
            type="submit"
            onClick={() => onSave(formAvaliacao)}
            className="size-full mt-2 px-3 py-1.5 text-sm sm:px-4 sm:py-2 sm:text-base border rounded-md bg-yellow-500 text-white font-semibold" >
            {avaliacao ? 'Salvar' : 'Avaliar'}
        </button>   
        </DialogContent>
        </Dialog>
    );
}