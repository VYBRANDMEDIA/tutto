'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function RegisterClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const roleParam = searchParams.get('role') as 'vrager' | 'aanbieder' | null

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    postcode: '',
    role: roleParam || ('vrager' as 'vrager' | 'aanbieder'),
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Sign up with Supabase Auth
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      })

      if (signUpError) throw signUpError
      if (!authData.user) throw new Error('No user returned')

      // Create user profile
      const { error: profileError } = await supabase.from('users').insert({
        id: authData.user.id,
        email: formData.email,
        name: formData.name,
        postcode: formData.postcode,
        role: formData.role,
        email_verified: false,
      })

      if (profileError) throw profileError

      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-3xl font-bold text-primary">
            Tutto Chat
          </Link>
          <h2 className="text-2xl font-semibold mt-4">Create Account</h2>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-card p-8 rounded-lg border border-border space-y-6">
          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium mb-3">I am a:</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'vrager' })}
                className={`p-4 rounded-lg border-2 transition ${
                  formData.role === 'vrager'
                    ? 'border-primary bg-primary/10'
                    : 'border-border'
                }`}
              >
                <div className="text-2xl mb-2">🙋</div>
                <div className="font-semibold">Vrager</div>
                <div className="text-xs text-muted-foreground">Post requests</div>
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, role: 'aanbieder' })}
                className={`p-4 rounded-lg border-2 transition ${
                  formData.role === 'aanbieder'
                    ? 'border-primary bg-primary/10'
                    : 'border-border'
                }`}
              >
                <div className="text-2xl mb-2">👷</div>
                <div className="font-semibold">Aanbieder</div>
                <div className="text-xs text-muted-foreground">€9.95/mo</div>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              required
              minLength={6}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Postcode</label>
            <input
              type="text"
              required
              placeholder="1234AB"
              value={formData.postcode}
              onChange={(e) => setFormData({ ...formData, postcode: e.target.value.toUpperCase() })}
              className="w-full px-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 transition"
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="text-primary font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
