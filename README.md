# FullstackApp-Imagekit

A modern full-stack web application built with [Next.js](https://nextjs.org) and TypeScript, designed for video upload, management, and authentication.

## Features

- **User Authentication**: Secure registration and login system using NextAuth (JWT strategy).
- **Video Upload & Management**: Authenticated users can upload, view, and download videos.
- **Video Display**: Videos are displayed in a responsive gallery with playback and download functionality.
- **API Integration**: RESTful endpoints for video operations.
- **UI/UX**: Clean, responsive interface using Next.js app directory, custom fonts, and Vercel's Geist font.
- **Cloud Integration**: Uses ImageKit for optimized video hosting and delivery.

## Tech Stack

- Frontend: Next.js (App Router), React, TypeScript, Tailwind CSS (implied by class usage)
- Backend: Next.js API routes, MongoDB via Mongoose
- Authentication: NextAuth (credentials provider)
- File Storage/Delivery: ImageKit
- State/Session: next-auth, React Context (Provider pattern)

## Getting Started

### 1. Clone and Install

```bash
git clone https://github.com/maitreya-16/fullstackapp.git
cd fullstackapp
npm install
```

### 2. Configure Environment

Set up your `.env.local` with the following variables:

```
NEXTAUTH_SECRET=your_secret
MONGODB_URI=your_mongodb_uri
NEXT_PUBLIC_URL_ENDPOINT=your_imagekit_endpoint
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
```

### 3. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### 4. Usage

- Register a new account or log in.
- Navigate to the upload page to add new videos.
- View and download uploaded videos from the gallery.

## Project Structure

```
fullstackapp/
├── app/
│   ├── api/            # Next.js API routes (REST endpoints)
│   ├── components/     # Shared React components (Provider, etc.)
│   ├── main/           # Main app pages (video gallery, upload)
│   ├── login/          # Login page
│   ├── register/       # Registration page
│   ├── layout.tsx      # Root layout with providers
│   └── page.tsx        # Home page
├── lib/                # Utilities (api-client, auth, db)
├── models/             # Mongoose models (User, Video)
├── public/             # Static assets
├── README.md
└── ...
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [ImageKit docs](https://docs.imagekit.io/)
- [NextAuth docs](https://next-auth.js.org/)

## Deployment

The easiest way to deploy your Next.js app is with [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

See [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) for more options.

---

> _Made with ❤️ by [maitreya-16](https://github.com/maitreya-16)_
