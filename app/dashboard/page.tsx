'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'

export default function DashboardPage() {
  const { user, loading, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  if (!user) return null

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">Tutto Chat</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {user.voornaam} {user.achternaam}
            </span>
            <button
              onClick={logout}
              className="px-4 py-2 text-sm bg-muted hover:bg-muted/80 rounded-lg transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">
            Welcome, {user.voornaam}!
          </h2>
          <p className="text-muted-foreground">
            Role: <span className="font-semibold capitalize">{user.role}</span>
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            href="/oproepen"
            className="bg-card p-6 rounded-lg border border-border hover:border-primary transition"
          >
            <div className="text-4xl mb-4">📋</div>
            <h3 className="text-xl font-semibold mb-2">Browse Oproepen</h3>
            <p className="text-muted-foreground text-sm">
              Find requests in your area
            </p>
          </Link>

          {user.role === 'vrager' && (
            <Link
              href="/oproepen/new"
              className="bg-card p-6 rounded-lg border border-border hover:border-primary transition"
            >
              <div className="text-4xl mb-4">➕</div>
              <h3 className="text-xl font-semibold mb-2">Post Request</h3>
              <p className="text-muted-foreground text-sm">
                Create a new oproep
              </p>
            </Link>
          )}

          <Link
            href="/chat"
            className="bg-card p-6 rounded-lg border border-border hover:border-primary transition"
          >
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-xl font-semibold mb-2">Messages</h3>
            <p className="text-muted-foreground text-sm">
              View your conversations
            </p>
          </Link>

          {user.role === 'admin' && (
            <Link
              href="/admin"
              className="bg-card p-6 rounded-lg border border-border hover:border-primary transition"
            >
              <div className="text-4xl mb-4">⚙️</div>
              <h3 className="text-xl font-semibold mb-2">Admin Panel</h3>
              <p className="text-muted-foreground text-sm">
                Manage users and content
              </p>
            </Link>
          )}

          {user.role === 'aanbieder' && user.subscription_status !== 'active' && (
            <Link
              href="/provider/subscription"
              className="bg-primary text-white p-6 rounded-lg hover:bg-primary/90 transition"
            >
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="text-xl font-semibold mb-2">Subscribe Now</h3>
              <p className="text-sm opacity-90">
                €9.95/mo - Respond to all requests
              </p>
            </Link>
          )}
        </div>
      </main>
    </div>
  )
}
