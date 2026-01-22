'use client'

import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type Oproep = {
  id: number
  titel: string
  beschrijving: string
  bereik: string
  locatie_gemeente?: string
  locatie_provincie?: string
  created_at: string
  categorie_id: number
  user_id: string
}

type Category = {
  id: number
  naam: string
}

export default function OproepenPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [oproepen, setOproepen] = useState<Oproep[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login')
    }
  }, [user, authLoading, router])

  useEffect(() => {
    if (user) {
      fetchCategories()
      fetchOproepen()
    }
  }, [user, selectedCategory])

  async function fetchCategories() {
    const { data } = await supabase
      .from('categories')
      .select('*')
      .eq('is_active', true)
      .order('naam')

    if (data) setCategories(data)
  }

  async function fetchOproepen() {
    let query = supabase
      .from('oproepen')
      .select('*')
      .eq('status', 'actief')
      .order('created_at', { ascending: false })

    if (selectedCategory) {
      query = query.eq('categorie_id', selectedCategory)
    }

    const { data } = await query
    if (data) setOproepen(data)
    setLoading(false)
  }

  if (authLoading || !user) return null

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <Link href="/dashboard" className="text-2xl font-bold text-primary">
              ← Tutto Chat
            </Link>
            {user.role === 'vrager' && (
              <Link
                href="/oproepen/new"
                className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary/90 transition"
              >
                + New Request
              </Link>
            )}
          </div>

          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition ${
                selectedCategory === null
                  ? 'bg-primary text-white'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition ${
                  selectedCategory === cat.id
                    ? 'bg-primary text-white'
                    : 'bg-muted text-foreground hover:bg-muted/80'
                }`}
              >
                {cat.naam}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : oproepen.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-xl font-semibold mb-2">No requests found</h3>
            <p className="text-muted-foreground">
              Be the first to post a request!
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {oproepen.map((oproep) => (
              <Link
                key={oproep.id}
                href={`/oproepen/${oproep.id}`}
                className="bg-card p-6 rounded-lg border border-border hover:border-primary transition"
              >
                <h3 className="text-xl font-semibold mb-2">{oproep.titel}</h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {oproep.beschrijving}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="capitalize">📍 {oproep.bereik}</span>
                  {oproep.locatie_gemeente && (
                    <span>{oproep.locatie_gemeente}</span>
                  )}
                  <span>
                    {new Date(oproep.created_at).toLocaleDateString()}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
