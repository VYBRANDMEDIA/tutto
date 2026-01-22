# Tutto Chat

**Vraag alles aan iedereen**

Complete Next.js PWA with Supabase + Vercel deployment.

## Stack
- Next.js 15
- Supabase (PostgreSQL + Realtime)
- Stripe subscriptions
- Tailwind CSS
- TypeScript
- PWA support

## Quick Deploy

1. Fork/clone this repo
2. Create Supabase project
3. Run `supabase/schema.sql` in Supabase SQL Editor
4. Deploy to Vercel
5. Add environment variables in Vercel
6. Done!

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
JWT_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_PRICE_ID=
```

## Features

✅ Email/password auth
✅ Real-time chat (Supabase Realtime)
✅ Stripe €9.95/month subscriptions
✅ Geographic filtering (NL postcodes)
✅ Admin dashboard
✅ Mobile-first PWA
✅ Multilingual (EN/NL)

## Development

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Deploy

Push to GitHub → Import in Vercel → Add env vars → Deploy

That's it!
