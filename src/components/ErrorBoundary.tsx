import React from 'react';

const searilizeError = (error: any) => {
  if (error instanceof Error) {
    return error.message + '\n' + error.stack;
  }
  return JSON.stringify(error, null, 2);
};

export class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: any }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <div className="max-w-2xl w-full p-6 border-2 border-red-500 rounded-lg bg-white">
            <h2 className="text-2xl font-bold text-red-500 mb-4">حدث خطأ!</h2>
            <p className="text-gray-700 mb-4">عذراً، حدث خطأ في التطبيق. يرجى تحديث الصفحة.</p>
            <pre className="mt-4 p-4 bg-gray-100 rounded text-sm overflow-auto max-h-96">
              {searilizeError(this.state.error)}
            </pre>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
            >
              تحديث الصفحة
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}