import { useState } from 'react'
import { User, Check } from 'lucide-react'
import { ImageUpload } from './image-upload'
import RichTextEditor from './rich-text-editor'

interface ProductFormData {
    name: string
    category: string
    model: string
    mainImage: File | null
    additionalImages: File | null
    price: number
    oldPrice: number
    weight: number
    description: string
}

export function ProductForm() {
    const [formData, setFormData] = useState<ProductFormData>({
        name: '',
        category: '',
        model: '',
        mainImage: null,
        additionalImages: null,
        price: 0,
        oldPrice: 0,
        weight: 0,
        description: '',
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        // Handle form submission here
        console.log(formData)
    }

    const handleMainImageSelect = (file: File | null) => {
        setFormData({ ...formData, mainImage: file })
    }

    const handleAdditionalImagesSelect = (files: File | null) => {
        setFormData({ ...formData, additionalImages: files })
    }

    return (
        <div className="bg-white w-screen h-auto p-8 rounded-lg shadow-md overflow-y-auto scroll-smooth">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Add Product</h1>

            <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Product Details Section */}
                <section>
                    <h4 className="flex items-center text-lg font-semibold text-gray-700 mb-4">
                        <User className="mr-2" size={20}/>
                        Product Details
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                id="name"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                placeholder="Product Name"
                                className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="category"
                                   className="block text-sm font-medium text-gray-700">Category</label>
                            <select
                                id="category"
                                value={formData.category}
                                onChange={(e) => setFormData({...formData, category: e.target.value})}
                                className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select Category</option>
                                <option value="electronics">Electronics</option>
                                <option value="clothing">Clothing</option>
                                <option value="books">Books</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="model" className="block text-sm font-medium text-gray-700">Model</label>
                            <input
                                id="model"
                                value={formData.model}
                                onChange={(e) => setFormData({...formData, model: e.target.value})}
                                placeholder="Product Model"
                                className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </section>

                {/* Image Upload Section */}
                <section>
                    <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700">Main Image</label>
                        <ImageUpload
                            onFileSelect={handleMainImageSelect}
                            className="mt-2 w-full border border-gray-300 rounded-md"
                        />
                    </div>

                    <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700">Additional Images</label>
                        <ImageUpload
                            onFileSelect={handleAdditionalImagesSelect}
                            className="mt-2 w-full border border-gray-300 rounded-md"
                            multiple={true}
                        />
                    </div>
                </section>

                {/* Pricing & Weight Section */}
                <section>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                            <input
                                id="price"
                                type="number"
                                value={formData.price}
                                onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                                placeholder="Price"
                                className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="oldPrice" className="block text-sm font-medium text-gray-700">Old
                                Price</label>
                            <input
                                id="oldPrice"
                                type="number"
                                value={formData.oldPrice}
                                onChange={(e) => setFormData({...formData, oldPrice: Number(e.target.value)})}
                                placeholder="Old Price"
                                className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label htmlFor="weight" className="block text-sm font-medium text-gray-700">Weight
                                (gm)</label>
                            <input
                                id="weight"
                                type="number"
                                value={formData.weight}
                                onChange={(e) => setFormData({...formData, weight: Number(e.target.value)})}
                                placeholder="Weight"
                                className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </section>

                {/* Description Section */}
                <section>
                    <label className="block text-sm font-medium text-gray-700"><strong>Description</strong></label>
                    <RichTextEditor
                        value={formData.description}
                        onChange={(value) => setFormData({...formData, description: value})}
                    />
                </section>

                {/* Form Actions */}
                <div className="flex justify-end mt-6 space-x-4">
                    <button
                        type="button"
                        className="px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600"
                        onClick={() => setFormData({
                            name: '',
                            category: '',
                            model: '',
                            mainImage: null,
                            additionalImages: null,
                            price: 0,
                            oldPrice: 0,
                            weight: 0,
                            description: '',
                        })}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center"
                    >
                        <Check className="mr-2" size={18}/>
                        Save
                    </button>
                </div>
            </form>
        </div>
    )
}
