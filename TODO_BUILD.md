# TUTTO CHAT - COMPLETE BUILD CHECKLIST

## CRITICAL - MUST BUILD NOW

### Authentication Pages
- [ ] /register - Registration with role selection (vrager/aanbieder)
- [ ] /login - Login page
- [ ] /api/auth/register - Register API
- [ ] /api/auth/login - Login API
- [ ] /api/auth/logout - Logout API

### User Dashboard
- [ ] /dashboard - Main user dashboard
- [ ] /dashboard/profile - User profile
- [ ] /dashboard/my-oproepen - My requests

### Oproepen System
- [ ] /oproepen - Browse all oproepen
- [ ] /oproepen/new - Create new oproep
- [ ] /oproepen/[id] - View oproep detail
- [ ] /api/oproepen - CRUD API

### Chat System
- [ ] /chat - Chat list
- [ ] /chat/[id] - Chat room
- [ ] /api/chat - Chat API
- [ ] Supabase Realtime subscriptions

### Provider Section
- [ ] /provider/dashboard - Provider dashboard
- [ ] /provider/subscription - Stripe subscription
- [ ] /api/webhooks/stripe - Stripe webhook

### Admin Section
- [ ] /admin - Admin dashboard
- [ ] /admin/users - User management
- [ ] /admin/categories - Category management
- [ ] /admin/moderation - Moderation tools

### Components
- [ ] Navigation component
- [ ] Auth context
- [ ] Protected route wrapper
- [ ] Mobile bottom nav

## BUILD ORDER
1. Auth system (register, login, API)
2. Navigation & layout
3. Oproepen CRUD
4. Chat system
5. Dashboards
6. Admin section
7. Stripe integration
