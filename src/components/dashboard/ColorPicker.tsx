import React, { useState } from 'react'
import { Palette } from 'lucide-react'

interface ColorPickerProps {
  value: string
  onChange: (color: string) => void
  label?: string
}

const ColorPicker: React.FC<ColorPickerProps> = ({ value, onChange, label }) => {
  const [isOpen, setIsOpen] = useState(false)

  const presetColors = [
    '#edd674', // primary
    '#f05a36', // coral
    '#9a488d', // purple
    '#6b6b6b', // gray
    '#f5907e', // lightCoral
    '#291719', // dark
    '#68a29f', // teal
    '#ffffff', // white
    '#000000', // black
  ]

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-semibold text-gray-700">{label}</label>
      )}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <div
              className="w-6 h-6 rounded border border-gray-300"
              style={{ backgroundColor: value }}
            />
            <span className="text-sm">{value}</span>
          </div>
          <Palette className="h-4 w-4 text-gray-500" />
        </button>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute top-full mt-2 w-80 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-20">
              <div className="space-y-4">
                {/* الألوان المحددة مسبقاً */}
                <div>
                  <h4 className="text-sm font-semibold mb-2">ألوان جاهزة</h4>
                  <div className="grid grid-cols-9 gap-2">
                    {presetColors.map((color) => (
                      <button
                        key={color}
                        onClick={() => {
                          onChange(color)
                          setIsOpen(false)
                        }}
                        className={`w-8 h-8 rounded border-2 transition-all ${
                          value === color ? 'border-juicetry-primary scale-110' : 'border-gray-300'
                        }`}
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>

                {/* Color Picker مخصص */}
                <div>
                  <h4 className="text-sm font-semibold mb-2">اختر لون مخصص</h4>
                  <input
                    type="color"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full h-10 rounded border border-gray-300 cursor-pointer"
                  />
                </div>

                {/* Input نصي */}
                <div>
                  <label className="block text-xs text-gray-600 mb-1">أدخل كود اللون</label>
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="#edd674"
                    className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                    pattern="^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ColorPicker

