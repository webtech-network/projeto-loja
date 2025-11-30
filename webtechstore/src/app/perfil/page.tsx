"use client";

import React, { useState } from "react";
import { X, Camera, NotePencil } from "phosphor-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

interface PerfilData {
  nomeCompleto: string;
  telefone: string;
  cep: string;
  endereco: string;
  bairro: string;
  email: string;
  dataNascimento: string;
  fotoPerfil: string;
  cidade: string;
  numero: string;
  complemento: string;
  senha: string;
}

export default function PerfilPage() {
  const [isNotePencilModalOpen, setIsNotePencilModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const [perfil, setPerfil] = useState<PerfilData>({
    nomeCompleto: "Eduarda Vieira",
    telefone: "(19)98765-4321",
    cep: "30140-100",
    endereco: "Rua Cláudio Manoel",
    bairro: "Savassi",
    email: "eduardavieira@gmail.com",
    dataNascimento: "07/03/2006",
    fotoPerfil: "",
    cidade: "Belo Horizonte",
    numero: "1162",
    complemento: "Apto 7",
    senha: "",
  });

  const [formData, setFormData] = useState<PerfilData>(perfil);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result as string);
        setFormData((prev) => ({
          ...prev,
          fotoPerfil: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setPerfil(formData);
    setIsNotePencilModalOpen(false);
    setPreviewImage(null);
  };

  const handleCancel = () => {
    setFormData(perfil);
    setIsNotePencilModalOpen(false);
    setPreviewImage(null);
  };

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
      <Navbar />

      {/* Section Indigo de Fundo */}
      <section className="w-full  bg-gray-100 dark:bg-gray-900 h-32 sm:h-40"></section>

      <main className="flex-1 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Header do Perfil - Posicionamento Negativo */}
          <div className="rounded-lg p-6 mb-8 -mt-16 sm:-mt-16 relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-end gap-6">
              {/* Foto de Perfil - Metade em cima do indigo */}
              <div className="relative self-center sm:self-auto">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-yellow-500 flex items-center justify-center overflow-hidden shadow-lg">
                  {perfil.fotoPerfil ? (
                    <img
                      src={perfil.fotoPerfil}
                      alt="Foto de perfil"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-3xl font-bold text-white">
                      {perfil.nomeCompleto
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .slice(0, 2)}
                    </span>
                  )}
                </div>
              </div>

              {/* Informações do Usuário */}
              <div className="flex-1 pb-2">
                <div className="flex flex-col sm:flex-row gap-3 sm:mt-6 items-center sm:items-center sm:justify-between">
                  <div className="text-center sm:text-left">
                    <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                      {perfil.nomeCompleto}
                    </h1>
                    <p className="text-background-foreground mt-1 break-all">
                      {perfil.email}
                    </p>
                  </div>
                  <button
                    onClick={() => setIsNotePencilModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-800 hover:bg-indigo-900 cursor-pointer text-white rounded-md transition-colors"
                  >
                    <NotePencil size={16} />
                    Editar
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Informações do Perfil */}
          <div className="grid grid-cols-1 border border-border rounded-lg dark:bg-gray-900 overflow-hidden">
            {/* Dados Pessoais */}
            <div className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-6">
                Dados Pessoais
              </h2>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Nome completo
                    </label>
                    <div className="p-3 dark:bg-gray-900 border border-border rounded-md text-sm text-foreground">
                      {perfil.nomeCompleto}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Data de Nascimento
                    </label>
                    <div className="p-3 dark:bg-gray-900 border border-border rounded-md text-sm text-foreground">
                      {perfil.dataNascimento}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Telefone
                    </label>
                    <div className="p-3 dark:bg-gray-900 border border-border rounded-md text-sm text-foreground">
                      {perfil.telefone}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      E-mail
                    </label>
                    <div className="p-3 dark:bg-gray-900 border border-border rounded-md text-sm text-foreground">
                      {perfil.email}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Endereço */}
            <div className="px-6 pb-6">
              <h2 className="text-xl font-semibold text-foreground mb-6">
                Endereço
              </h2>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      CEP
                    </label>
                    <div className="p-3 dark:bg-gray-900 border border-border rounded-md text-sm text-foreground">
                      {perfil.cep}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Cidade
                    </label>
                    <div className="p-3 dark:bg-gray-900 border border-border rounded-md text-sm text-foreground">
                      {perfil.cidade}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Endereço
                  </label>
                  <div className="p-3 dark:bg-gray-900 border border-border rounded-md text-sm text-foreground">
                    {perfil.endereco}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Número
                    </label>
                    <div className="p-3 dark:bg-gray-900 border border-border rounded-md text-sm text-foreground">
                      {perfil.numero}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Bairro
                    </label>
                    <div className="p-3 dark:bg-gray-900 border border-border rounded-md text-sm text-foreground">
                      {perfil.bairro}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Complemento
                    </label>
                    <div className="p-3 dark:bg-gray-900 border border-border rounded-md text-sm text-foreground">
                      {perfil.complemento}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Histórico de Compras */}
          <div className="mt-5  rounded-lg p-6 border border-border dark:bg-gray-900">
            <h2 className="text-xl font-semibold text-foreground mb-6">
              Histórico de Compras
            </h2>
            <button 
              onClick={() => window.location.href = '/historico'}
              className="w-full py-3 bg-indigo-900 hover:bg-indigo-950 text-white rounded-md font-medium transition-colors cursor-pointer"
            >
              Visualizar histórico de compras
            </button>
          </div>
        </div>
      </main>

      <Footer />

      {/* Modal de Edição */}
      {isNotePencilModalOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={handleCancel}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-background rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-border [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-indigo-800 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:border-transparent [&::-webkit-scrollbar-thumb]:bg-clip-padding dark:[&::-webkit-scrollbar-track]:bg-gray-800 dark:[&::-webkit-scrollbar-thumb]:bg-indigo-900">
              {/* Header do Modal */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h2 className="text-xl font-semibold text-foreground">
                  Editar Perfil
                </h2>
                <button
                  onClick={handleCancel}
                  className="p-2 hover:bg-background/5 rounded-md transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Conteúdo do Modal */}
              <div className="p-6 space-y-6">
                {/* Foto de Perfil */}
                <div className="flex flex-col items-center gap-4">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-yellow-500 flex items-center justify-center overflow-hidden">
                      {previewImage || formData.fotoPerfil ? (
                        <img
                          src={previewImage || formData.fotoPerfil}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-2xl font-bold text-white">
                          {formData.nomeCompleto
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)}
                        </span>
                      )}
                    </div>
                    <label className="absolute bottom-0 right-0 w-8 h-8 bg-indigo-800 hover:bg-indigo-900 rounded-full flex items-center justify-center cursor-pointer transition-colors">
                      <Camera size={16} className="text-white" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="sr-only"
                      />
                    </label>
                  </div>
                </div>

                {/* Formulário */}
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        Nome completo
                      </label>
                      <input
                        type="text"
                        name="nomeCompleto"
                        value={formData.nomeCompleto}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        Data de Nascimento
                      </label>
                      <input
                        type="text"
                        name="dataNascimento"
                        value={formData.dataNascimento}
                        onChange={handleInputChange}
                        placeholder="DD/MM/AAAA"
                        className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        Telefone
                      </label>
                      <input
                        type="text"
                        name="telefone"
                        value={formData.telefone}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        CEP
                      </label>
                      <input
                        type="text"
                        name="cep"
                        value={formData.cep}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        Endereço
                      </label>
                      <input
                        type="text"
                        name="endereco"
                        value={formData.endereco}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        Cidade
                      </label>
                      <input
                        type="text"
                        name="cidade"
                        value={formData.cidade}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        Número
                      </label>
                      <input
                        type="text"
                        name="numero"
                        value={formData.numero}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        Bairro
                      </label>
                      <input
                        type="text"
                        name="bairro"
                        value={formData.bairro}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1">
                        Complemento
                      </label>
                      <input
                        type="text"
                        name="complemento"
                        value={formData.complemento}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      E-mail
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">
                      Senha
                    </label>
                    <input
                      type="password"
                      name="senha"
                      value={formData.senha}
                      onChange={handleInputChange}
                      placeholder="Digite sua senha"
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                    />
                  </div>
                </div>
              </div>

              {/* Footer do Modal */}
              <div className="flex font-medium gap-4 p-6 border-t border-border">
                <button
                  onClick={handleCancel}
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
                >
                  Excluir
                </button>
                <button
                  onClick={handleSave}
                  className="flex-2 px-4 py-2 bg-indigo-800 hover:bg-indigo-900 text-white rounded-md transition-colors"
                >
                  Atualizar
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
