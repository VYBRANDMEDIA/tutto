# Tutto Chat - Complete Deployment Guide

## Step 1: Supabase Setup (5 minutes)

1. Go to [supabase.com](https://supabase.com) and create account
2. Click "New Project"
3. Fill in:
   - Name: `tutto-chat`
   - Database Password: (save this!)
   - Region: Europe (eu-central-1)
4. Wait 2 minutes for project creation

5. Run the schema:
   - Go to SQL Editor
   - Copy entire content of `supabase/schema.sql`
   - Paste and click "Run"
   - You should see "Success" message

6. Get your credentials:
   - Go to Project Settings → API
   - Copy:
     - `Project URL` (NEXT_PUBLIC_SUPABASE_URL)
     - `anon public` key (NEXT_PUBLIC_SUPABASE_ANON_KEY)
     - `service_role` key (SUPABASE_SERVICE_ROLE_KEY)

## Step 2: Stripe Setup (10 minutes)

1. Create Stripe account at [stripe.com](https://stripe.com)

2. Create subscription product:
   - Go to Products → Add Product
   - Name: "Tutto Aanbieder"
   - Description: "Monthly subscription for service providers"
   - Pricing: €9.95 / month, recurring
   - Click "Save product"
   - Copy the **Price ID** (starts with `price_`)

3. Get API keys:
   - Go to Developers → API keys
   - Copy:
     - Publishable key (NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
     - Secret key (STRIPE_SECRET_KEY)

4. Set up webhook (AFTER deploying to Vercel):
   - Go to Developers → Webhooks
   - Click "Add endpoint"
   - Endpoint URL: `https://your-domain.vercel.app/api/webhooks/stripe`
   - Select events:
     - `checkout.session.completed`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
     - `invoice.payment_failed`
   - Click "Add endpoint"
   - Copy the **Signing secret** (STRIPE_WEBHOOK_SECRET)

## Step 3: Deploy to Vercel (5 minutes)

1. Push code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/tutto-chat.git
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com)
3. Click "Add New Project"
4. Import your GitHub repository
5. Configure:
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: ./
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

6. Add Environment Variables:
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...
JWT_SECRET=your-random-secret-min-32-chars
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
STRIPE_PRICE_ID=price_xxx
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
```

7. Click "Deploy"
8. Wait 2-3 minutes
9. Your app is live!

## Step 4: Configure Stripe Webhook

Now that your app is deployed:

1. Go back to Stripe → Developers → Webhooks
2. Add endpoint with your Vercel URL:
   `https://your-app.vercel.app/api/webhooks/stripe`
3. Copy the webhook signing secret
4. Add it to Vercel:
   - Go to your project → Settings → Environment Variables
   - Add `STRIPE_WEBHOOK_SECRET` with the value
   - Redeploy (Deployments → ... → Redeploy)

## Step 5: Test Everything

1. Visit your app: `https://your-app.vercel.app`
2. Register as Vrager (free)
3. Post an oproep
4. Register as Aanbieder (with test card)
5. Use Stripe test card: `4242 4242 4242 4242`
6. Respond to oproep
7. Test real-time chat

## Optional: Custom Domain

1. Buy domain (e.g., `tutto.chat`)
2. In Vercel: Settings → Domains
3. Add your domain
4. Update DNS records as instructed
5. Wait for SSL certificate (automatic)
6. Update `NEXT_PUBLIC_APP_URL` in environment variables

## Troubleshooting

### Database connection fails
- Check Supabase URL and keys are correct
- Ensure RLS policies are enabled (they are in schema.sql)

### Stripe webhook not working
- Check webhook URL is correct
- Verify signing secret matches
- Check Vercel logs for errors

### Real-time chat not working
- Ensure Realtime is enabled in Supabase (it is by default)
- Check browser console for errors

## Production Checklist

- [ ] Supabase project created and schema applied
- [ ] Stripe product created (€9.95/month)
- [ ] All environment variables set in Vercel
- [ ] Stripe webhook configured
- [ ] Test registration and login
- [ ] Test oproep creation
- [ ] Test subscription payment
- [ ] Test real-time chat
- [ ] PWA installable on mobile
- [ ] Custom domain configured (optional)

## Support

Need help? Check:
- [Supabase Docs](https://supabase.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Stripe Docs](https://stripe.com/docs)
- [Vercel Docs](https://vercel.com/docs)

---

**Your app is now live and ready for users!** 🎉
