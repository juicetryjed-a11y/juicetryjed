import React, { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

const TestConnection = () => {
    const [status, setStatus] = useState('Checking...')
    const [productsCount, setProductsCount] = useState<number | null>(null)
    const [products, setProducts] = useState<any[]>([])
    const [error, setError] = useState<string | null>(null)
    const [config, setConfig] = useState<any>(null)

    useEffect(() => {
        checkConnection()
    }, [])

    const checkConnection = async () => {
        try {
            // 1. Check Config
            const url = import.meta.env.VITE_SUPABASE_URL || 'Hardcoded Fallback'
            setConfig({ url })

            // 2. Fetch Products
            setStatus('Fetching products...')
            const { data, error: dbError } = await supabase
                .from('products')
                .select('*')

            if (dbError) {
                throw dbError
            }

            if (data) {
                setProducts(data)
                setProductsCount(data.length)
                setStatus('Success ✅')
            } else {
                setStatus('Success but no data ⚠️')
            }

        } catch (err: any) {
            console.error('Connection Error:', err)
            setError(err.message || JSON.stringify(err))
            setStatus('Error ❌')
        }
    }

    return (
        <div className="p-8 font-mono text-left dir-ltr" style={{ direction: 'ltr' }}>
            <h1 className="text-2xl font-bold mb-4">Supabase Connection Test</h1>

            <div className="mb-6 p-4 bg-gray-100 rounded">
                <p><strong>Status:</strong> {status}</p>
                <p><strong>Supabase URL:</strong> {config?.url}</p>
                <p><strong>Products Found:</strong> {productsCount !== null ? productsCount : '...'}</p>
                {error && <p className="text-red-600 mt-2"><strong>Error:</strong> {error}</p>}
            </div>

            <h2 className="text-xl font-bold mb-2">First 5 Products:</h2>
            <pre className="bg-black text-green-400 p-4 rounded overflow-auto max-h-96 text-xs">
                {JSON.stringify(products.slice(0, 5), null, 2)}
            </pre>
        </div>
    )
}

export default TestConnection
