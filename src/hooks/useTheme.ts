import { useEffect } from 'react'

interface ThemeColors {
  primary: string
  secondary: string
  accent: string
}

export const useTheme = (colors: ThemeColors) => {
  useEffect(() => {
    // تطبيق الألوان على CSS Variables
    const root = document.documentElement
    
    root.style.setProperty('--color-primary', colors.primary)
    root.style.setProperty('--color-secondary', colors.secondary)
    root.style.setProperty('--color-accent', colors.accent)
    
    // تحديث الألوان في Tailwind CSS
    const style = document.createElement('style')
    style.innerHTML = `
      :root {
        --color-primary: ${colors.primary};
        --color-secondary: ${colors.secondary};
        --color-accent: ${colors.accent};
      }
      
      .bg-primary { background-color: ${colors.primary} !important; }
      .bg-secondary { background-color: ${colors.secondary} !important; }
      .bg-accent { background-color: ${colors.accent} !important; }
      
      .text-primary { color: ${colors.primary} !important; }
      .text-secondary { color: ${colors.secondary} !important; }
      .text-accent { color: ${colors.accent} !important; }
      
      .border-primary { border-color: ${colors.primary} !important; }
      .border-secondary { border-color: ${colors.secondary} !important; }
      .border-accent { border-color: ${colors.accent} !important; }
      
      .from-primary { --tw-gradient-from: ${colors.primary} !important; }
      .to-secondary { --tw-gradient-to: ${colors.secondary} !important; }
      .to-accent { --tw-gradient-to: ${colors.accent} !important; }
      
      /* تحديث الألوان في الأزرار والعناصر التفاعلية */
      .btn-primary {
        background: linear-gradient(to right, ${colors.primary}, ${colors.secondary}) !important;
      }
      
      .btn-accent {
        background-color: ${colors.accent} !important;
      }
      
      /* تحديث ألوان الروابط */
      .link-primary {
        color: ${colors.primary} !important;
      }
      
      .link-primary:hover {
        color: ${colors.secondary} !important;
      }
      
      /* تحديث ألوان النماذج */
      .form-focus:focus {
        border-color: ${colors.primary} !important;
        box-shadow: 0 0 0 3px ${colors.primary}25 !important;
      }
      
      /* تحديث ألوان الحالة */
      .status-success { background-color: ${colors.primary} !important; }
      .status-warning { background-color: ${colors.accent} !important; }
      .status-info { background-color: ${colors.secondary} !important; }
    `
    
    // إزالة الستايل القديم إذا كان موجوداً
    const oldStyle = document.getElementById('dynamic-theme')
    if (oldStyle) {
      oldStyle.remove()
    }
    
    style.id = 'dynamic-theme'
    document.head.appendChild(style)
    
    return () => {
      const styleElement = document.getElementById('dynamic-theme')
      if (styleElement) {
        styleElement.remove()
      }
    }
  }, [colors.primary, colors.secondary, colors.accent])
}

export const applyThemeColors = (colors: ThemeColors) => {
  // تطبيق فوري للألوان
  const root = document.documentElement
  root.style.setProperty('--color-primary', colors.primary)
  root.style.setProperty('--color-secondary', colors.secondary)
  root.style.setProperty('--color-accent', colors.accent)
  
  // تطبيق الألوان على جميع عناصر الموقع
  const style = document.createElement('style')
  style.id = 'global-theme-override'
  style.innerHTML = `
    /* استبدال ألوان Tailwind الافتراضية */
    .bg-green-500, .bg-green-600, .bg-juicetry-primary,
    .from-green-500, .from-green-600 {
      background-color: ${colors.primary} !important;
      --tw-gradient-from: ${colors.primary} !important;
    }
    
    .bg-lime-400, .bg-lime-500, .to-lime-500,
    .bg-juicetry-secondary {
      background-color: ${colors.secondary} !important;
      --tw-gradient-to: ${colors.secondary} !important;
    }
    
    .bg-orange-500, .bg-orange-600,
    .text-orange-500, .text-orange-600 {
      background-color: ${colors.accent} !important;
      color: ${colors.accent} !important;
    }
    
    .text-green-500, .text-green-600, .text-green-700 {
      color: ${colors.primary} !important;
    }
    
    .border-green-500, .border-green-600 {
      border-color: ${colors.primary} !important;
    }
    
    .hover\\:bg-green-600:hover,
    .hover\\:bg-green-700:hover {
      background-color: ${colors.primary} !important;
      filter: brightness(0.9);
    }
    
    /* الأزرار */
    button.bg-green-500, button.bg-green-600,
    a.bg-green-500, a.bg-green-600 {
      background-color: ${colors.primary} !important;
    }
    
    /* التدرجات */
    .bg-gradient-to-r.from-green-500,
    .bg-gradient-to-br.from-green-500 {
      background-image: linear-gradient(to right, ${colors.primary}, ${colors.secondary}) !important;
    }
  `
  
  // إزالة الستايل القديم
  const oldStyle = document.getElementById('global-theme-override')
  if (oldStyle) {
    oldStyle.remove()
  }
  
  document.head.appendChild(style)
  
  console.log('🎨 Global theme colors applied!')
}
