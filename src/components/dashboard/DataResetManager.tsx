import React, { useState } from 'react'
import { Trash2, AlertTriangle, RefreshCw } from 'lucide-react'
import { completeReset } from '@/lib/resetData'

const DataResetManager: React.FC = () => {
  const [isResetting, setIsResetting] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)

  const handleReset = async () => {
    setIsResetting(true)
    
    try {
      const result = await completeReset()
      console.log('نتيجة المسح:', result)
      
      // عرض رسالة نجاح
      alert('تم مسح جميع البيانات بنجاح! سيتم إعادة تحميل الصفحة...')
      
    } catch (error) {
      console.error('خطأ في مسح البيانات:', error)
      alert('حدث خطأ أثناء مسح البيانات')
    } finally {
      setIsResetting(false)
      setShowConfirm(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
          <Trash2 className="h-5 w-5 text-red-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">مسح البيانات التجريبية</h2>
          <p className="text-gray-600">مسح جميع المنتجات والتصنيفات والبدء من الصفر</p>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-semibold text-yellow-800 mb-2">تحذير مهم:</h3>
            <ul className="text-yellow-700 text-sm space-y-1">
              <li>• سيتم مسح جميع المنتجات والتصنيفات</li>
              <li>• سيتم مسح جميع الطلبات والمراجعات</li>
              <li>• سيتم مسح جميع المقالات</li>
              <li>• هذا الإجراء لا يمكن التراجع عنه</li>
              <li>• ستبقى إعدادات الموقع كما هي</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-green-800 mb-2">ما سيحدث بعد المسح:</h3>
        <ul className="text-green-700 text-sm space-y-1">
          <li>• ستحصل على نظام فارغ تماماً</li>
          <li>• تصنيف واحد أساسي فقط (عصائر طبيعية)</li>
          <li>• يمكنك البدء في إضافة منتجاتك الخاصة</li>
          <li>• جميع الصفحات ستعمل بشكل طبيعي</li>
        </ul>
      </div>

      {!showConfirm ? (
        <button
          onClick={() => setShowConfirm(true)}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <Trash2 className="h-5 w-5" />
          مسح جميع البيانات التجريبية
        </button>
      ) : (
        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800 font-semibold text-center">
              هل أنت متأكد من مسح جميع البيانات؟
            </p>
            <p className="text-red-600 text-sm text-center mt-1">
              هذا الإجراء لا يمكن التراجع عنه
            </p>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => setShowConfirm(false)}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors"
              disabled={isResetting}
            >
              إلغاء
            </button>
            
            <button
              onClick={handleReset}
              disabled={isResetting}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isResetting ? (
                <>
                  <RefreshCw className="h-5 w-5 animate-spin" />
                  جاري المسح...
                </>
              ) : (
                <>
                  <Trash2 className="h-5 w-5" />
                  نعم، امسح كل شيء
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default DataResetManager
