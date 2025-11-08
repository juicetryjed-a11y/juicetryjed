// ملف اختبار بسيط - إذا كان هذا يعمل، فالمشكلة في المكونات الأخرى
import React from 'react'

export default function AppTest() {
  return (
    <div style={{ padding: '20px', background: 'white', minHeight: '100vh' }}>
      <h1 style={{ color: '#f97316', fontSize: '2rem' }}>✅ React يعمل!</h1>
      <p>إذا رأيت هذه الرسالة، فـ React يعمل بشكل صحيح.</p>
      <p>المشكلة قد تكون في المكونات الأخرى.</p>
    </div>
  )
}


