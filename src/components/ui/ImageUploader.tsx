import React, { useState, useRef } from 'react'
import { Upload } from 'lucide-react'
import { dataService } from '@/lib/dataService'

interface ImageUploaderProps {
  onUpload: (url: string) => void
  currentImage?: string
  folder?: string
  className?: string
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ 
  onUpload, 
  currentImage, 
  folder = 'uploads', 
  className = '' 
}) => {
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (file: File) => {
    setUploading(true)
    try {
      const result = await dataService.uploadImage(file, folder)
      
      if (result.success && result.url) {
        onUpload(result.url)
      } else {
        alert('فشل في رفع الصورة')
      }
    } catch (error) {
      alert('فشل في رفع الصورة')
    }
    
    setUploading(false)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    
    const file = e.dataTransfer.files[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = () => {
    setDragOver(false)
  }

  return (
    <div className={className}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      
      <div
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`
          border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all
          ${dragOver 
            ? 'border-green-500 bg-green-50' 
            : 'border-gray-300 hover:border-green-400 hover:bg-gray-50'
          }
          ${uploading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        {uploading ? (
          <div className="flex flex-col items-center gap-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
            <p className="text-sm text-gray-600">جاري رفع الصورة...</p>
          </div>
        ) : currentImage ? (
          <div className="flex flex-col items-center gap-3">
            <img 
              src={currentImage} 
              alt="الصورة الحالية" 
              className="w-20 h-20 object-cover rounded-lg"
            />
            <p className="text-sm text-gray-600">اضغط لتغيير الصورة أو اسحب صورة جديدة هنا</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
              <Upload className="h-6 w-6 text-gray-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">اضغط لاختيار صورة</p>
              <p className="text-xs text-gray-500">أو اسحب الصورة هنا</p>
            </div>
            <p className="text-xs text-gray-400">JPG, PNG, GIF, WebP (حتى 5MB)</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ImageUploader
