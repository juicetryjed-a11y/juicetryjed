import React from 'react'
import { UserCircle } from 'lucide-react'

const AboutSettings: React.FC = () => {
  return (
    <div className="p-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-gradient-to-br from-emerald-100 to-green-100 rounded-xl">
          <UserCircle className="h-8 w-8 text-emerald-600" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900">إعدادات صفحة من نحن</h2>
          <p className="text-gray-600 font-medium">قريباً...</p>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
        <UserCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 mb-2">إعدادات صفحة من نحن</h3>
        <p className="text-gray-600">هذا القسم قيد التطوير وسيكون متاحاً قريباً</p>
      </div>
    </div>
  )
}

export default AboutSettings
