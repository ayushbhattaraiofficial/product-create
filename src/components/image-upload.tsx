import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { ImageCropper } from './image-cropper'
import { ImageUploadProps } from '../types/product'

export function ImageUpload({ onFileSelect, placeholder = 'Drop files here to upload', className, multiple = false }: ImageUploadProps) {
    const [preview, setPreview] = useState<string | null>(null)
    const [tempImage, setTempImage] = useState<string | null>(null)
    const [originalImage, setOriginalImage] = useState<string | null>(null)

    const handleCropComplete = (croppedImage: string) => {
        setPreview(croppedImage)
        setTempImage(null)

        // Convert base64 to file
        fetch(croppedImage)
            .then(res => res.blob())
            .then(blob => {
                const file = new File([blob], 'cropped-image.jpg', { type: 'image/jpeg' })
                onFileSelect(file)  // Pass the single file
            })
    }

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0 && !preview) {
            const file = acceptedFiles[0]
            const reader = new FileReader()
            reader.onloadend = () => {
                setOriginalImage(reader.result as string)
                setTempImage(reader.result as string)
            }
            reader.readAsDataURL(file)

            // If multiple, send an array, otherwise send a single file
            if (multiple) {
                onFileSelect(acceptedFiles)  // Pass an array of files
            } else {
                onFileSelect(acceptedFiles[0])  // Pass only the first file
            }
        }
    }, [preview, multiple, onFileSelect])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.webp']
        },
        multiple: multiple,  // Enable or disable multiple file selection
        disabled: !!preview
    })

    const handleRemove = () => {
        setPreview(null)
        setOriginalImage(null)
        onFileSelect(null)  // Reset to null when removed
    }

    const handleReCrop = () => {
        if (originalImage) {
            setTempImage(originalImage)
        }
    }

    return (
        <div className="space-y-4">
            <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-primary transition-colors ${isDragActive ? 'border-primary bg-primary/10' : ''} ${preview ? 'pointer-events-none' : ''} ${className}`}
            >
                <input {...getInputProps()} />
                {preview ? (
                    <img src={preview} alt="Preview" className="max-h-40 mx-auto" />
                ) : (
                    <p className="text-muted-foreground">{placeholder}</p>
                )}
            </div>

            {preview && (
                <div className="flex justify-center gap-4">
                    <button
                        onClick={handleReCrop}
                        className="px-4 py-2 border rounded-md text-gray-600 bg-white border-gray-300 hover:bg-gray-100"
                    >
                        Crop
                    </button>
                    <button
                        onClick={handleRemove}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                        Remove
                    </button>
                </div>
            )}

            {tempImage && (
                <ImageCropper
                    image={tempImage}
                    onCropComplete={handleCropComplete}
                    onCancel={() => setTempImage(null)}
                    aspectRatio={4 / 3}
                />
            )}
        </div>
    )
}
