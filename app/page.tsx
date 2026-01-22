import Link from 'next/link'
import { MessageCircle, Users, Shield, Zap } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageCircle className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">Tutto Chat</span>
          </div>
          <div className="flex gap-4">
            <Link 
              href="/login" 
              className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors"
            >
              Login
            </Link>
            <Link 
              href="/register" 
              className="px-6 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Vraag alles aan iedereen
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Connect with service providers in your area. Post requests or offer your services.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/register?role=vrager" 
            className="px-8 py-4 bg-primary text-primary-foreground rounded-full text-lg font-medium hover:opacity-90 transition-opacity"
          >
            Post a Request (Free)
          </Link>
          <Link 
            href="/register?role=aanbieder" 
            className="px-8 py-4 bg-secondary text-secondary-foreground rounded-full text-lg font-medium hover:opacity-90 transition-opacity"
          >
            Become a Provider (€9.95/mo)
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-card p-8 rounded-2xl shadow-sm">
            <Users className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">Local Connections</h3>
            <p className="text-muted-foreground">
              Find help in your gemeente, provincie, or nationwide
            </p>
          </div>
          
          <div className="bg-card p-8 rounded-2xl shadow-sm">
            <MessageCircle className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">Real-time Chat</h3>
            <p className="text-muted-foreground">
              Instant messaging with typing indicators and read receipts
            </p>
          </div>
          
          <div className="bg-card p-8 rounded-2xl shadow-sm">
            <Shield className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">Secure & Reliable</h3>
            <p className="text-muted-foreground">
              Verified users and secure payment processing
            </p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-4xl font-bold text-center mb-12">Simple Pricing</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-card p-8 rounded-2xl shadow-sm border-2 border-border">
            <h3 className="text-2xl font-bold mb-2">Vrager</h3>
            <div className="text-4xl font-bold mb-4">Free</div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Post unlimited requests
              </li>
              <li className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Receive responses
              </li>
              <li className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-primary" />
                Chat with providers
              </li>
            </ul>
            <Link 
              href="/register?role=vrager" 
              className="block w-full px-6 py-3 bg-muted text-center rounded-full font-medium hover:bg-muted/80 transition-colors"
            >
              Get Started Free
            </Link>
          </div>
          
          <div className="bg-primary text-primary-foreground p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold mb-2">Aanbieder</h3>
            <div className="text-4xl font-bold mb-4">€9.95/mo</div>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Everything in Free
              </li>
              <li className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Respond to all requests
              </li>
              <li className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Unlimited chats
              </li>
              <li className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Priority support
              </li>
            </ul>
            <Link 
              href="/register?role=aanbieder" 
              className="block w-full px-6 py-3 bg-white text-primary text-center rounded-full font-medium hover:bg-white/90 transition-colors"
            >
              Start 7-Day Trial
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-border mt-20">
        <div className="text-center text-muted-foreground">
          <p>© 2026 Tutto Chat. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
