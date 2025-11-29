"use client";

import { useState, useRef, useEffect } from "react";
import { Camera, X } from "phosphor-react";

interface ImageUploaderProps {
  onImagesChange?: (files: File[]) => void;
  initialFiles?: File[];
}

export default function ImageUploader({
  onImagesChange,
  initialFiles,
}: ImageUploaderProps = {}) {
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
    <div className="w-full">
      <div className="flex gap-3 flex-wrap">
        {/* Pré-visualização das imagens */}
        {previews.map((preview, index) => (
          <div
            key={index}
            className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-700 shrink-0"
          >
            <img
              src={preview}
              alt={`preview-${index}`}
              className="w-full h-full object-cover"
            />

            <button
              onClick={() => handleRemoveImage(index)}
              aria-label={`Remover imagem ${index + 1}`}
              className="absolute top-1 right-1 bg-black/60 text-white p-1 rounded-full hover:bg-black/80 transition-colors"
            >
              <X size={10} weight="bold" />
            </button>
          </div>
        ))}

        {/* Botões de adicionar imagem */}
        {Array.from({ length: 4 - images.length }).map((_, i) => (
          <label
            key={i}
            className="w-16 h-16 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600 flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 dark:hover:border-gray-500 transition-colors shrink-0"
          >
            <Camera
              size={16}
              weight="fill"
              className="text-gray-400 dark:text-gray-500"
            />
            <span className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">
              Add
            </span>
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
