// نظام تزامن البيانات عبر localStorage events
// يعمل بين جميع التابات والنوافذ المفتوحة

export class StorageSync {
  private static instance: StorageSync
  private listeners: { [key: string]: Function[] } = {}

  static getInstance(): StorageSync {
    if (!StorageSync.instance) {
      StorageSync.instance = new StorageSync()
    }
    return StorageSync.instance
  }

  constructor() {
    // الاستماع لتغييرات localStorage
    window.addEventListener('storage', this.handleStorageChange.bind(this))
    
    // الاستماع لأحداث مخصصة في نفس النافذة
    window.addEventListener('localDataUpdate', this.handleLocalUpdate.bind(this))
  }

  // إرسال حدث تحديث البيانات
  notifyDataUpdate(type: string, data?: any) {
    const event = {
      type,
      data,
      timestamp: Date.now()
    }

    // حفظ في localStorage لإشعار التابات الأخرى
    localStorage.setItem('dataUpdate', JSON.stringify(event))
    
    // إرسال حدث في نفس النافذة
    window.dispatchEvent(new CustomEvent('localDataUpdate', { detail: event }))
    
    console.log('📢 تم إرسال حدث تحديث البيانات:', type)
  }

  // الاستماع لتحديثات البيانات
  onDataUpdate(callback: (type: string, data?: any) => void) {
    if (!this.listeners['dataUpdate']) {
      this.listeners['dataUpdate'] = []
    }
    this.listeners['dataUpdate'].push(callback)
  }

  // إلغاء الاستماع
  offDataUpdate(callback: Function) {
    if (this.listeners['dataUpdate']) {
      this.listeners['dataUpdate'] = this.listeners['dataUpdate'].filter(cb => cb !== callback)
    }
  }

  // معالجة تغييرات localStorage (من تابات أخرى)
  private handleStorageChange(event: StorageEvent) {
    if (event.key === 'dataUpdate' && event.newValue) {
      try {
        const updateEvent = JSON.parse(event.newValue)
        this.notifyListeners(updateEvent.type, updateEvent.data)
      } catch (error) {
        console.error('خطأ في معالجة حدث localStorage:', error)
      }
    }
  }

  // معالجة الأحداث المحلية (نفس النافذة)
  private handleLocalUpdate(event: CustomEvent) {
    const updateEvent = event.detail
    this.notifyListeners(updateEvent.type, updateEvent.data)
  }

  // إشعار جميع المستمعين
  private notifyListeners(type: string, data?: any) {
    if (this.listeners['dataUpdate']) {
      this.listeners['dataUpdate'].forEach(callback => {
        try {
          callback(type, data)
        } catch (error) {
          console.error('خطأ في تنفيذ callback:', error)
        }
      })
    }
  }
}

// إنشاء instance واحد
export const storageSync = StorageSync.getInstance()

// أنواع الأحداث
export const SYNC_EVENTS = {
  PRODUCT_ADDED: 'product_added',
  PRODUCT_UPDATED: 'product_updated',
  PRODUCT_DELETED: 'product_deleted',
  PRODUCTS_REFRESH: 'products_refresh'
}
