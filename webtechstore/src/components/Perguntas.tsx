"use client";

import { useState } from "react";
import { CaretDown, CaretUp } from "phosphor-react";

interface PerguntaProps {
  pergunta: string;
  resposta: string;
}

export default function Perguntas({ pergunta, resposta }: PerguntaProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border border-gray-300 rounded-lg bg-card text-card-foreground overflow-hidden max-w-4xl">
      <button
        onClick={toggleOpen}
        className="w-full p-4 text-left cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 ease-in-out flex items-center gap-3 min-h-[60px]"
      >
        {isOpen ? (
          <CaretUp
            size={20}
            className="text-gray-500 shrink-0 transition-transform duration-300"
          />
        ) : (
          <CaretDown
            size={20}
            className="text-gray-500 shrink-0 transition-transform duration-300"
          />
        )}
        <h3 className="font-semibold text-foreground text-md flex-1">{pergunta}</h3>
      </button>

      <div
        className={`border-t border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
        style={{
          display: "grid",
          gridTemplateRows: isOpen ? "1fr" : "0fr",
        }}
      >
        <div className="overflow-hidden">
          <div className="px-4 pb-4 pt-3">
            <p className="text-sm font-medium text-secondary-color dark:text-gray-300 leading-relaxed">
              {resposta}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
