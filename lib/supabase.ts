import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://buuutyrucoixyxluhjer.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1dXV0eXJ1Y29peHl4bHVoamVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkwODk2ODYsImV4cCI6MjA4NDY2NTY4Nn0.syHLEU9mHX75f77GobcUb535nbntdKLiYbPyqSG3XUQ'

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables:', {
    url: !!supabaseUrl,
    key: !!supabaseAnonKey,
    env: process.env
  })
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
})

// Server-side client with service role key
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
)

// Database types
export type User = {
  id: string
  email: string
  voornaam: string
  achternaam: string
  postcode: string
  gemeente?: string
  provincie?: string
  role: 'vrager' | 'aanbieder' | 'admin'
  language: string
  stripe_customer_id?: string
  stripe_subscription_id?: string
  subscription_status: 'active' | 'canceled' | 'past_due' | 'none'
  subscription_start_date?: string
  subscription_end_date?: string
  created_at: string
  last_login?: string
  is_verified: boolean
  is_blocked: boolean
}

export type Category = {
  id: number
  naam: string
  beschrijving?: string
  icon?: string
  created_at: string
  is_active: boolean
}

export type Oproep = {
  id: number
  user_id: string
  categorie_id: number
  titel: string
  beschrijving: string
  bereik: 'gemeente' | 'provincie' | 'landelijk'
  locatie_gemeente?: string
  locatie_provincie?: string
  status: 'actief' | 'gesloten' | 'verwijderd'
  created_at: string
  updated_at: string
  closed_at?: string
}

export type Chat = {
  id: number
  oproep_id: number
  vrager_id: string
  aanbieder_id: string
  status: 'active' | 'archived' | 'blocked'
  created_at: string
  last_message_at?: string
}

export type Message = {
  id: number
  chat_id: number
  sender_id: string
  message: string
  is_read: boolean
  read_at?: string
  created_at: string
}
