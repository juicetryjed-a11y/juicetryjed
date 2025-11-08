// نظام إشعارات بين الصفحات لتحديث البيانات
class EventBus {
  private listeners: { [key: string]: Function[] } = {}

  // الاستماع لحدث
  on(event: string, callback: Function) {
    if (!this.listeners[event]) {
      this.listeners[event] = []
    }
    this.listeners[event].push(callback)
  }

  // إلغاء الاستماع لحدث
  off(event: string, callback: Function) {
    if (!this.listeners[event]) return
    this.listeners[event] = this.listeners[event].filter(cb => cb !== callback)
  }

  // إرسال حدث
  emit(event: string, data?: any) {
    if (!this.listeners[event]) return
    this.listeners[event].forEach(callback => callback(data))
  }

  // مسح جميع المستمعين
  clear() {
    this.listeners = {}
  }
}

// إنشاء instance واحد للتطبيق كله
export const eventBus = new EventBus()

// أحداث النظام
export const EVENTS = {
  PRODUCT_ADDED: 'product_added',
  PRODUCT_UPDATED: 'product_updated', 
  PRODUCT_DELETED: 'product_deleted',
  CATEGORY_ADDED: 'category_added',
  CATEGORY_UPDATED: 'category_updated',
  DATA_REFRESH: 'data_refresh'
}
