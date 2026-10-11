<div align="center">
  <img src="public/bazar-hero.png" alt="বাজার দর — fruit basket" width="145" />

  # 🛒 বাজার দর — BazarDor

  **বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের বাজারদর ও বাজারভিত্তিক তুলনা, সব এক জায়গায়।**

## Technologies Used

  Next.js App Router • Tailwind CSS • TypeScript • Better Auth • REST API
</div>

---

## 🌱 Project overview

BazarDor is a Bangla-first daily market price tracker. Browse prices of rice, lentils, oil, vegetables, fish, meat, eggs/dairy and spices; see the largest price rises and falls; sort by cost; sign in to view protected detailed price comparisons; and update your own profile.

> **Price accuracy:** The application requests real data from the two assignment endpoints. If both services are unavailable, it **explicitly labels** a 33-product snapshot from the reference demo dated **9 October 2026**. Snapshot prices are **not live quotations**. It never fabricates market-by-market price rows: only real market records supplied by the API appear.

## ✨ Key features

1. **Responsive layout** across phones, tablets and desktops; mobile category navigation and continuous market ticker.
2. **Live REST API** with primary endpoint, alternative endpoint, request timeout and documented reference-data fallback.
3. **Price movers:** top six risers and top six fallers ranked by actual percent change.
4. **33-product reference catalogue** across 8 categories, with product emojis, Bangla units, Bangla numerals and directional change badges.
5. **Category sorting** (default / ascending / descending) with Bengali numeral normalization before numeric sorting.
6. **Protected product details** with current price, min/max/average and every available per-market quote; unauthenticated visitors return to the intended product after login.
7. **Better Auth** email/password registration, email/password login, Google OAuth, GitHub OAuth, session-aware navigation and logout.
8. **Protected profile management** and working `authClient.updateUser({ name })` form on `/profile/edit`.
9. **Friendly 404s**, skeleton loading states and `react-hot-toast` success/error/redirect notifications.
10. **SEO-friendly App Router** and full-page-refresh support for `/category/[slug]`, `/product/[slug]`, etc. on Vercel.