'use client'

import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'

type Category = {
  id: number
  naam: string
}

export default function NewOproepPage() {
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>([])
  const [formData, setFormData] = useState({
    titel: '',
    beschrijving: '',
    categorie_id: '',
    bereik: 'gemeente' as 'gemeente' | 'provincie' | 'landelijk',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'vrager')) {
      router.push('/dashboard')
    }
  }, [user, authLoading, router])

  useEffect(() => {
    fetchCategories()
  }, [])

  async function fetchCategories() {
    const { data } = await supabase
      .from('categories')
      .select('*')
      .eq('is_active', true)
      .order('naam')

    if (data) setCategories(data)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!user) return

    setError('')
    setLoading(true)

    try {
      const { data, error: insertError } = await supabase
        .from('oproepen')
        .insert({
          user_id: user.id,
          titel: formData.titel,
          beschrijving: formData.beschrijving,
          categorie_id: parseInt(formData.categorie_id),
          bereik: formData.bereik,
          locatie_gemeente: user.gemeente,
          locatie_provincie: user.provincie,
          status: 'actief',
        })
        .select()
        .single()

      if (insertError) throw insertError

      router.push('/oproepen')
    } catch (err: any) {
      setError(err.message || 'Failed to create oproep')
    } finally {
      setLoading(false)
    }
  }

  if (authLoading || !user) return null

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <Link href="/oproepen" className="text-2xl font-bold text-primary">
            ← Back
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-3xl font-bold mb-8">Post a New Request</h1>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              required
              value={formData.categorie_id}
              onChange={(e) => setFormData({ ...formData, categorie_id: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.naam}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              required
              value={formData.titel}
              onChange={(e) => setFormData({ ...formData, titel: e.target.value })}
              placeholder="e.g., Need help moving furniture"
              className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              required
              value={formData.beschrijving}
              onChange={(e) => setFormData({ ...formData, beschrijving: e.target.value })}
              rows={6}
              placeholder="Describe what you need help with..."
              className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Reach</label>
            <div className="grid grid-cols-3 gap-4">
              {(['gemeente', 'provincie', 'landelijk'] as const).map((bereik) => (
                <button
                  key={bereik}
                  type="button"
                  onClick={() => setFormData({ ...formData, bereik })}
                  className={`p-4 rounded-lg border-2 transition capitalize ${
                    formData.bereik === bereik
                      ? 'border-primary bg-primary/10'
                      : 'border-border'
                  }`}
                >
                  {bereik}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 transition"
          >
            {loading ? 'Posting...' : 'Post Request'}
          </button>
        </form>
      </main>
    </div>
  )
}
