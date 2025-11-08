import { dataService } from '@/lib/dataService'

export interface UploadResult {
  success: boolean
  url?: string
  error?: string
}

export const uploadImage = async (file: File, folder: string = 'uploads'): Promise<UploadResult> => {
  try {
    // التحقق من نوع الملف
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
    if (!allowedTypes.includes(file.type)) {
      return {
        success: false,
        error: 'نوع الملف غير مدعوم. يرجى اختيار صورة بصيغة JPG, PNG, GIF أو WebP'
      }
    }

    // التحقق من حجم الملف (5MB كحد أقصى)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.size > maxSize) {
      return {
        success: false,
        error: 'حجم الملف كبير جداً. يرجى اختيار صورة أصغر من 5MB'
      }
    }

    // استخدام dataService لرفع الصورة
    const result = await dataService.uploadImage(file, folder)
    
    if (result.success) {
      return {
        success: true,
        url: result.url
      }
    } else {
      return {
        success: false,
        error: 'فشل في رفع الصورة. يرجى المحاولة مرة أخرى'
      }
    }
  } catch (error) {
    console.error('خطأ في رفع الصورة:', error)
    return {
      success: false,
      error: 'حدث خطأ غير متوقع أثناء رفع الصورة'
    }
  }
}

export const deleteImage = async (url: string): Promise<boolean> => {
  try {
    // للبيانات التجريبية، نحاكي حذف الصورة
    console.log('🗑️ Mock: Deleting image:', url)
    
    // محاكاة تأخير العملية
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return true
  } catch (error) {
    console.error('خطأ في حذف الصورة:', error)
    return false
  }
}
