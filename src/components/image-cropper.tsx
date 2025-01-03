import { useState, useRef } from "react";
import ReactCrop, { Crop } from "react-image-crop";
import 'react-image-crop/dist/ReactCrop.css';

interface ImageCropperProps {
    image: string;
    onCropComplete: (croppedImage: string) => void;
    onCancel: ()=>void;
    aspectRatio?: number;
}

export const ImageCropper: React.FC<ImageCropperProps> = ({ image, onCropComplete, onCancel, aspectRatio =4/3 }) => {
    const [crop, setCrop] = useState<Crop>({
        unit: '%',
        width: 90,
        height: 90/aspectRatio,
        x: 5,
        y: 5
    });

    const imageRef = useRef<HTMLImageElement>(null)

    const getCroppedImage = () => {
        const image = imageRef.current;
        if (!image) return;

        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width * scaleX;
        canvas.height = crop.height * scaleY;

        const ctx = canvas.getContext('2d');

        if (!ctx) return;

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width * scaleX,
            crop.height * scaleY,
        )

        const  base64Image = canvas.toDataURL('image/jpeg');
        onCropComplete(base64Image)
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white max-w-3xl p-6 rounded-lg shadow-lg">
                {/* Dialog Header */}
                <div className="mb-4">
                    <h2 className="text-xl font-semibold">Crop Image</h2>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="max-h-[60vh] overflow-auto">
                        <ReactCrop
                            crop={crop}
                            onChange={setCrop}
                            aspect={aspectRatio}
                            className="max-w-full"
                        >
                            <img
                                ref={imageRef}
                                src={image}
                                alt="Crop preview"
                                className="max-w-full h-auto"
                            />
                        </ReactCrop>
                    </div>

                    <div className="flex justify-end gap-2">
                        {/* Cancel Button */}
                        <button
                            className="px-4 py-2 border rounded-md text-gray-600 bg-white border-gray-300 hover:bg-gray-100"
                            onClick={onCancel}
                        >
                            Cancel
                        </button>

                        {/* Apply Button */}
                        <button
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            onClick={getCroppedImage}
                        >
                            Apply
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}