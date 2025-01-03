export interface ProductFormData {
    name: string;
    category: string;
    model: string;
    mainImage: File | null;
    additionalImages: File[];
    price: number;
    oldPrice: number;
    weight: number;
    description: string;
}

export interface ImageUploadProps {
    onFileSelect: (file: File | null) => void;
    placeholder?: string;
    className?: string;
    multiple?: boolean;
}