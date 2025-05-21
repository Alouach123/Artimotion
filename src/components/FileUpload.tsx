
"use client";

import { useState, useCallback, useEffect } from 'react';
import type { ChangeEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UploadCloud, Image as ImageIcon, XCircle } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';

interface FileUploadProps {
  onFileSelect: (file: File, dataUri: string) => void;
  disabled?: boolean;
  // reset prop is no longer needed
}

export function FileUpload({ onFileSelect, disabled }: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleFileChange = useCallback((file: File | null) => {
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Format de fichier invalide",
          description: "Veuillez sélectionner un fichier image (JPEG, PNG, GIF, etc.).",
          variant: "destructive",
        });
        setSelectedFile(null);
        setPreviewUrl(null);
        return;
      }
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast({
          title: "Fichier trop volumineux",
          description: "La taille maximale du fichier est de 10MB.",
          variant: "destructive",
        });
        setSelectedFile(null);
        setPreviewUrl(null);
        return;
      }

      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUri = reader.result as string;
        setPreviewUrl(dataUri);
        onFileSelect(file, dataUri);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedFile(null);
      setPreviewUrl(null);
    }
  }, [onFileSelect, toast]);

  // useEffect for reset is removed as the key prop will handle remounting

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      handleFileChange(event.target.files[0]);
    }
  };

  const onDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    if (disabled) return;
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      handleFileChange(event.dataTransfer.files[0]);
    }
  }, [disabled, handleFileChange]);

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (!disabled) setIsDragging(true);
  };

  const onDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    // Reset the input field value to allow re-selecting the same file
    const fileInput = document.getElementById('file-upload-input') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
    // Call onFileSelect with null to indicate clearing, if the parent needs to know
    // onFileSelect(null, ''); // This might be needed depending on parent logic, but resetState handles it now.
  };

  return (
    <div className="w-full">
      <div
        className={`w-full p-6 border-2 border-dashed rounded-lg transition-colors
          ${disabled ? 'cursor-not-allowed bg-muted/50' : 'cursor-pointer hover:border-primary'}
          ${isDragging ? 'border-primary bg-primary/10' : 'border-border'}`}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onClick={() => !disabled && !selectedFile && document.getElementById('file-upload-input')?.click()}
      >
        <Input
          id="file-upload-input"
          type="file"
          accept="image/*"
          onChange={onInputChange}
          className="hidden"
          disabled={disabled}
        />
        {!previewUrl ? (
          <div className="flex flex-col items-center justify-center space-y-2 text-muted-foreground">
            <UploadCloud className="w-12 h-12" />
            <p className="text-sm">
              <span className="font-semibold text-primary">Cliquez pour télécharger</span> ou glissez-déposez
            </p>
            <p className="text-xs">PNG, JPG, GIF jusqu'à 10MB</p>
          </div>
        ) : (
          <div className="relative group">
            <Image
              src={previewUrl}
              alt="Aperçu de l'image"
              width={300}
              height={300}
              className="rounded-md object-contain max-h-64 w-auto mx-auto"
              data-ai-hint="uploaded image"
            />
            {!disabled && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-background/70 hover:bg-background text-destructive hover:text-destructive"
                onClick={(e) => { e.stopPropagation(); clearSelection(); }}
                aria-label="Supprimer l'image"
              >
                <XCircle className="w-5 h-5" />
              </Button>
            )}
            <p className="text-center text-sm mt-2 truncate">{selectedFile?.name}</p>
          </div>
        )}
      </div>
    </div>
  );
}
