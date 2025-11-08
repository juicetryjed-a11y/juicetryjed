import React, { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/SimpleAuthContext'
import { useNavigate } from 'react-router-dom'
import { Coffee, Lock, Mail, Eye, EyeOff, Leaf } from 'lucide-react'

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  
  const { signIn, user, isAdmin } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user && isAdmin) {
      navigate('/admin/dashboard')
    }
  }, [user, isAdmin, navigate])

  // استعادة بيانات تسجيل الدخول المحفوظة
  useEffect(() => {
    const savedEmail = localStorage.getItem('admin_email')
    const savedPassword = localStorage.getItem('admin_password')
    const savedRememberMe = localStorage.getItem('admin_remember_me') === 'true'

    if (savedRememberMe && savedEmail && savedPassword) {
      setEmail(savedEmail)
      setPassword(savedPassword)
      setRememberMe(true)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { error } = await signIn(email, password)
      if (error) {
        setError('بيانات الدخول غير صحيحة')
      } else {
        // حفظ بيانات تسجيل الدخول إذا كان المستخدم يريد ذلك
        if (rememberMe) {
          localStorage.setItem('admin_email', email)
          localStorage.setItem('admin_password', password)
          localStorage.setItem('admin_remember_me', 'true')
        } else {
          // مسح البيانات المحفوظة إذا لم يختر المستخدم حفظها
          localStorage.removeItem('admin_email')
          localStorage.removeItem('admin_password')
          localStorage.removeItem('admin_remember_me')
        }
        // Navigation will be handled by useEffect
      }
    } catch (err) {
      setError('حدث خطأ أثناء تسجيل الدخول')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-lime-50 to-yellow-50 flex items-center justify-center p-4">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-32 h-32 bg-green-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-lime-200 rounded-full blur-3xl opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-200 rounded-full blur-3xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-md w-full bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-green-100">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-lime-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <div className="flex items-center gap-1">
              <Coffee className="h-6 w-6 text-white" />
              <Leaf className="h-4 w-4 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-700 to-lime-600 bg-clip-text text-transparent">
            Juicetry - جوستري
          </h1>
          <p className="text-gray-600 mt-2 font-medium">لوحة الإدارة المتقدمة</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl shadow-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                {error}
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">
              البريد الإلكتروني
            </label>
            <div className="relative">
              <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pr-10 pl-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-300 bg-gray-50 focus:bg-white"
                placeholder="admin@juicetry.com"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">
              كلمة المرور
            </label>
            <div className="relative">
              <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pr-10 pl-12 py-4 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all duration-300 bg-gray-50 focus:bg-white"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
              />
              <label htmlFor="rememberMe" className="text-sm font-medium text-gray-700">
                تذكر بيانات الدخول
              </label>
            </div>
            <button
              type="button"
              onClick={() => {
                setEmail('')
                setPassword('')
                setRememberMe(false)
                localStorage.removeItem('admin_email')
                localStorage.removeItem('admin_password')
                localStorage.removeItem('admin_remember_me')
              }}
              className="text-sm text-red-600 hover:text-red-800 font-medium transition-colors"
            >
              مسح البيانات المحفوظة
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-500 to-lime-500 text-white py-4 rounded-xl font-bold text-lg hover:from-green-600 hover:to-lime-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="loading-spinner w-5 h-5"></div>
                جاري تسجيل الدخول...
              </>
            ) : (
              <>
                <Lock className="h-5 w-5" />
                تسجيل الدخول
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <div className="bg-green-50 rounded-xl p-4 border border-green-100">
            <p className="text-sm text-green-700 font-medium">
              🔐 للحصول على حساب إداري، يرجى التواصل مع مطور النظام
            </p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default AdminLogin