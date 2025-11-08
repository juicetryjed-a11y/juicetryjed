import React from 'react'
import { Users } from 'lucide-react'

const CustomersManagement: React.FC = () => {
  return (
    <div className="p-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl">
          <Users className="h-8 w-8 text-indigo-600" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900">إدارة العملاء</h2>
          <p className="text-gray-600 font-medium">قريباً...</p>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
        <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 mb-2">إدارة العملاء</h3>
        <p className="text-gray-600">هذا القسم قيد التطوير وسيكون متاحاً قريباً</p>
      </div>
    </div>
  )
}

export default CustomersManagement
