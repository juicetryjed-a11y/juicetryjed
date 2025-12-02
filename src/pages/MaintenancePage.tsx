import React from 'react'
import { Settings, Wrench, Clock } from 'lucide-react'

const MaintenancePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Logo/Brand Section */}
        <div className="mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-orange-400 to-red-500 rounded-full mb-8 shadow-2xl">
            <Settings className="h-12 w-12 text-white animate-spin" style={{ animationDuration: '3s' }} />
          </div>

          <h1 className="text-6xl md:text-8xl font-bold text-gray-800 mb-4 tracking-wider">
            SOON
          </h1>

          <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-lg mb-6">
            <Wrench className="h-6 w-6 text-orange-500" />
            <span className="text-gray-700 font-medium">Under Maintenance</span>
            <Clock className="h-6 w-6 text-red-500" />
          </div>
        </div>

        {/* Message Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-6">
            Juicetry - جوستري
          </h2>

          <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
            نحن نقوم حالياً ببعض الأعمال الصيانية لتحسين تجربتكم وتقديم خدمة أفضل.
            عودة قريباً بمزيد من الطازجة والجودة!
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-gray-500">
            <div className="flex items-center gap-2">
              <div className="animate-pulse">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              </div>
              <span>جاري العمل على التحسينات</span>
            </div>

            <div className="hidden sm:block w-px h-6 bg-gray-300"></div>

            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>عودة قريباً</span>
            </div>
          </div>
        </div>

        {/* Animated Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 left-20 w-20 h-20 bg-orange-200 rounded-full opacity-20 animate-bounce"></div>
          <div className="absolute bottom-20 right-20 w-16 h-16 bg-red-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-yellow-200 rounded-full opacity-15 animate-ping"></div>
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-pink-200 rounded-full opacity-10 animate-bounce" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Footer Message */}
        <div className="mt-12 text-sm text-gray-400">
          نحن نبذل قصارى جهدنا للعودة أفضل مما مضى! 💪
        </div>
      </div>
    </div>
  )
}

export default MaintenancePage
