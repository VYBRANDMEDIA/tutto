# Environment Variables for Vercel Deployment

## ✅ Complete Supabase Configuration (Ready to Use)

```
NEXT_PUBLIC_SUPABASE_URL=https://buuutyrucoixyxluhjer.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1dXV0eXJ1Y29peHl4bHVoamVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkwODk2ODYsImV4cCI6MjA4NDY2NTY4Nn0.syHLEU9mHX75f77GobcUb535nbntdKLiYbPyqSG3XUQ
SUPABASE_SERVICE_ROLE_KEY=sb_secret_kMdcPD3zU38vFbgusDF7-g_XnykClrC
```

## JWT Secret (Use Legacy JWT Secret from Supabase)

```
JWT_SECRET=WJiRgpo/+VQQSdLRja4XG6iW928X+8atkJm5Bw17ENshp6fAENAlPRxgJR4sG+nMXbX++lOQvpvhG2Ly/bhIAw==
```

## ⚠️ Stripe Configuration (TODO - Setup Required)

You need to create these in Stripe Dashboard:

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
STRIPE_SECRET_KEY=sk_test_YOUR_KEY_HERE
STRIPE_WEBHOOK_SECRET=whsec_YOUR_WEBHOOK_SECRET_HERE
STRIPE_PRICE_ID=price_YOUR_PRICE_ID_HERE
```

### Stripe Setup Steps:

1. **Create Product** (2 min):
   - Go to: https://dashboard.stripe.com/products
   - Click "Add Product"
   - Name: "Tutto Aanbieder Subscription"
   - Price: €9.95 / month (recurring)
   - Save and copy the **Price ID** (starts with `price_`)

2. **Get API Keys** (1 min):
   - Go to: https://dashboard.stripe.com/apikeys
   - Copy **Publishable key** (pk_test_...)
   - Copy **Secret key** (sk_test_...)

3. **Setup Webhook** (AFTER Vercel deployment):
   - Go to: https://dashboard.stripe.com/webhooks
   - Click "Add endpoint"
   - Endpoint URL: `https://tutto.vercel.app/api/webhooks/stripe`
   - Select events:
     - `checkout.session.completed`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
     - `invoice.payment_failed`
   - Copy **Signing secret** (whsec_...)

## App URL (Update after Vercel deployment)

```
NEXT_PUBLIC_APP_URL=https://tutto.vercel.app
```

---

## 🚀 Quick Deploy to Vercel

1. Go to: https://vercel.com/matchfindrs-projects
2. Click "Add New..." → "Project"
3. Import `VYBRANDMEDIA/tutto` from GitHub
4. Project Name: `tutto`
5. **Copy-paste ALL environment variables above** (except Stripe if not ready yet)
6. Click "Deploy"
7. Wait 2-3 minutes
8. Done! ✅

---

## ✅ What's Already Connected:

- **GitHub**: VYBRANDMEDIA/tutto ✅
- **Supabase**: Database fully configured ✅
  - All tables created
  - RLS policies enabled
  - 8 categories seeded
  - Realtime enabled
- **Credentials**: All Supabase keys ready ✅

## ⏳ What's Needed:

- **Stripe**: Create subscription product and get keys
- **Vercel**: Deploy the project
- **Webhook**: Configure Stripe webhook after deployment

---

## 📝 Summary

**Supabase** ✅ READY
- Project: tutto-chat
- Region: eu-central-1
- Status: ACTIVE_HEALTHY
- Database: Fully configured

**GitHub** ✅ READY
- Repository: VYBRANDMEDIA/tutto
- Code: Pushed and ready

**Vercel** ⏳ PENDING
- Team: matchfindrs-projects
- Action: Import and deploy

**Stripe** ⏳ PENDING
- Action: Create product and get keys

---

You're almost done! Just deploy to Vercel and setup Stripe! 🎉
