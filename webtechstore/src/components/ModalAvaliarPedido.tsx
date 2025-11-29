import { useState, useEffect } from "react";
import { Star } from "phosphor-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import RatingStar from "./RatingStar";
import ImageUploader from "./ImageUploader";

interface Avaliacao {
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
  onClose,
}: ModalAvaliarPedidoProps) {
  const [formAvaliacao, setFormAvaliacao] = useState<Avaliacao>({
    rating: 5,
    comentario: "",
    imagem: [],
  });

  // When modal opens or avaliacao prop changes, populate form with existing data
  useEffect(() => {
    if (isOpen) {
      setFormAvaliacao({
        rating: avaliacao?.rating ?? 5,
        comentario: avaliacao?.comentario ?? "",
        imagem: avaliacao?.imagem ?? [],
      });
    }
  }, [isOpen, avaliacao]);

  const handleComentaryChange = (value: string) => {
    setFormAvaliacao((prev) => ({ ...prev, comentario: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="w-[95vw] max-w-md mx-auto h-fit max-h-[95vh] sm:max-h-[85vh] flex flex-col overflow-hidden
        [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar-track]:bg-gray-100
        dark:[&::-webkit-scrollbar-track]:bg-gray-800
        [&::-webkit-scrollbar-thumb]:bg-indigo-800
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb:hover]:bg-indigo-700"
      >
        {/* Header */}
        <DialogHeader className="px-6 py-5 border-b border-gray-200 dark:border-gray-700 shrink-0">
          <DialogTitle className="text-xl font-semibold text-center">
            Avaliação do Pedido
          </DialogTitle>
        </DialogHeader>

        {/* Content */}
        <div className="px-4 sm:px-6 py-3 sm:py-5 space-y-4 sm:space-y-5 overflow-y-auto flex-1 min-h-0">
          {/* Rating Section */}
          <div className="text-center space-y-2 sm:space-y-3">
            <h3 className="text-base sm:text-lg font-medium text-foreground">
              Como você avalia este pedido?
            </h3>
            <div className="flex justify-center">
              <RatingStar
                initialRating={formAvaliacao.rating}
                onRatingChange={(rating) =>
                  setFormAvaliacao((prev) => ({ ...prev, rating }))
                }
              />
            </div>
            <p className="text-sm text-muted-foreground">
              {formAvaliacao.rating === 0 && "Clique nas estrelas para avaliar"}
              {formAvaliacao.rating === 1 && "Muito ruim"}
              {formAvaliacao.rating === 2 && "Ruim"}
              {formAvaliacao.rating === 3 && "Regular"}
              {formAvaliacao.rating === 4 && "Bom"}
              {formAvaliacao.rating === 5 && "Excelente"}
            </p>
          </div>

          {/* Image Upload Section */}
          <div className="space-y-3">
            <h3 className="text-base font-medium text-foreground">
              Adicione fotos (opcional)
            </h3>
            <ImageUploader
              initialFiles={formAvaliacao.imagem}
              onImagesChange={(files) =>
                setFormAvaliacao((prev) => ({ ...prev, imagem: files }))
              }
            />
          </div>

          {/* Comment Section */}
          <div className="space-y-3">
            <h3 className="text-base font-medium text-foreground">
              Comentário
            </h3>
            <Textarea
              value={formAvaliacao.comentario || ""}
              onChange={(e) => handleComentaryChange(e.target.value)}
              placeholder="Escreva um comentário sobre este pedido..."
              rows={4}
              className="resize-none [&::selection]:bg-indigo-800 [&::selection]:text-white"
            />
          </div>
        </div>

        {/* Footer */}
        <DialogFooter className="px-6 py-5 border-t border-gray-200 dark:border-gray-700 shrink-0">
          <Button
            onClick={() => onSave(formAvaliacao)}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold"
          >
            Enviar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
