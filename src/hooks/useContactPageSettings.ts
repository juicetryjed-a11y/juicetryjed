import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export interface ContactPageSettings {
    id?: number
    hero_title: string
    hero_subtitle: string
    hero_bg_color: string
    hero_text_color: string
    phone_primary: string
    phone_secondary?: string
    email_primary: string
    email_secondary?: string
    address: string
    working_hours: string
    google_maps_url: string
    google_maps_embed?: string
    map_title: string
    show_map: boolean
    form_title: string
    form_description?: string
    show_form: boolean
    whatsapp_number: string
    whatsapp_message: string
    info_alignment: string
    form_alignment: string
    primary_color: string
    accent_color: string
    text_color: string
}

export const useContactPageSettings = () => {
    const [settings, setSettings] = useState<ContactPageSettings | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchSettings()
    }, [])

    const fetchSettings = async () => {
        try {
            const { data, error } = await supabase
                .from('contact_page_settings')
                .select('*')
                .single()

            if (data) {
                setSettings(data)
            }
        } catch (error) {
            console.error('Error fetching contact page settings:', error)
        } finally {
            setLoading(false)
        }
    }

    return { settings, loading }
}
