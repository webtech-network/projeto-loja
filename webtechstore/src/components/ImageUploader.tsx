"use client";

import { useState, useRef, useEffect } from "react";

interface ImageUploaderProps {
  onImagesChange?: (files: File[]) => void;
  initialFiles?: File[];
}

export default function ImageUploader({ onImagesChange, initialFiles }: ImageUploaderProps = {}) {
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const urlsRef = useRef<string[]>([]);

  const handleAddImage = (file: File | null) => {
    if (!file) return;
    if (images.length >= 4) return;

    const url = URL.createObjectURL(file);
    urlsRef.current.push(url);
    setImages((prev) => [...prev, file]);
    setPreviews((prev) => [...prev, url]);
  };

  const handleRemoveImage = (index: number) => {
    const url = urlsRef.current[index];
    if (url) {
      URL.revokeObjectURL(url);
      urlsRef.current.splice(index, 1);
    }

    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    handleAddImage(file);
    e.currentTarget.value = "";
  };

  const callbackRef = useRef(onImagesChange);

  useEffect(() => {
    callbackRef.current = onImagesChange;
  }, [onImagesChange]);

  useEffect(() => {
    callbackRef.current?.(images);
  }, [images]);

  useEffect(() => {
    if (!initialFiles || initialFiles.length === 0) return;

    urlsRef.current.forEach((u) => URL.revokeObjectURL(u));
    urlsRef.current = [];

    const urls = initialFiles.map((f) => {
      const u = URL.createObjectURL(f);
      urlsRef.current.push(u);
      return u;
    });

    setImages(initialFiles);
    setPreviews(urls);
  }, [initialFiles]);

  useEffect(() => {
    return () => {
      urlsRef.current.forEach((u) => URL.revokeObjectURL(u));
      urlsRef.current = [];
    };
  }, []);

  return (
    <div>
      <label className="block text-lg font-semibold mb-2">Imagens</label>

      <div className="flex gap-4">
        {/* Pré-visualização das imagens */}
        {previews.map((preview, index) => (
          <div
            key={index}
            className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-700"
          >
            <img src={preview} alt={`preview-${index}`} className="w-full h-full object-cover" />

            <button
              onClick={() => handleRemoveImage(index)}
              aria-label={`Remover imagem ${index + 1}`}
              className="absolute top-1 right-1 bg-black/60 text-white text-xs px-1.5 py-0.5 rounded-lg"
            >
              X
            </button>
          </div>
        ))}

        {/* Botões de adicionar imagem */}
        {Array.from({ length: 4 - images.length }).map((_, i) => (
          <label
            key={i}
            className="w-24 h-24 rounded-lg bg-[#3b2c6e] flex items-center justify-center text-3xl font-bold text-white cursor-pointer hover:bg-[#4b3c8e] transition"
          >
            +
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleInputChange}
            />
          </label>
        ))}
      </div>

    </div>
  );
}
