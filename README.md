# SmartMark - Premium Bookmark Manager

SmartMark is a high-end, curated bookmark manager developed by **Falguni Timande**. It allows users to store, organize, and access their digital resources with a premium, focused interface and real-time synchronization.

## 🚀 Features

- **Google OAuth Integration**: Secure, one-tap login using Google (no passwords required).
- **Private Bookmarks**: Each user has their own private space, secured by Supabase Row Level Security (RLS).
- **Real-time Synchronization**: Changes sync instantly across all tabs and devices without page refreshes.
- **Premium Glassmorphic UI**: High-fidelity design with dynamic background glows, noise textures, and smooth animations.
- **Search & Filter**: Quickly find your resources with instant search.
- **Responsive Layout**: Designed to look stunning on all screen sizes.

## 🛠️ Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Styling**: Tailwind CSS v4 (Alpha) & PostCSS
- **Database & Auth**: Supabase
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 🧠 Challenges & Solutions

During the development of SmartMark, I encountered several technical hurdles. Here's how I solved them:

### 1. The Styles Not Working (PostCSS Config)
**Problem**: At first, the beautiful design wouldn't show up. The app looked like plain text because the Tailwind styles were not loading.
**Solution**: I found that I forgot to "export" the configuration in `postcss.config.js`. Once I added `export default`, the styles immediately started working.

### 2. Google Cloud & Login Process
**Problem**: Setting up "Sign in with Google" was the most confusing part. I had to go to the **Google Cloud Console**, create a project, and set up an **OAuth Consent Screen**. It was hard to figure out which "Redirect URIs" to use so that Google would send the user back to my app.
**Solution**: I carefully copied the "Callback URL" from Supabase and pasted it into Google Cloud. I also had to make sure the app was set to "External" so anyone with a Google account could log in.

### 3. Dealing with Secret Keys (Supabase & Google)
**Problem**: I had many secret keys (API keys) for Supabase. I was worried about accidentally showing them to the world. If someone gets these keys, they can access my database!
**Solution**: I used a `.env.local` file to hide all my secrets. I made sure this file is never uploaded to GitHub. I learned that `NEXT_PUBLIC_` keys are okay for the browser, but the "Service Role" keys must stay very secret.

### 4. Making it Real-Time
**Problem**: I wanted the app to feel "alive," where links appear instantly without clicking refresh.
**Solution**: I used Supabase "Channels" to listen for any changes. Now, as soon as you save a link, it pops up on the screen instantly.

### 5. Private Data (RLS)
**Problem**: I didn't want users to see each other's bookmarks.
**Solution**: I used **Row Level Security (RLS)** in Supabase. It’s like a security guard for every row in the database that checks if you are the right owner before showing the data.

### 🏁 Finally Done!
This project was a big learning experience. I learned how to connect a frontend (Next.js) with a backend (Supabase) and a giant like Google Cloud. Everything is now working smoothly and looks premium!



---

**Developed with ❤️ by Falguni Timande**  
*Still working and refining the experience.*
