# Your Blog! by Bagrudeen Ali AHamed -- NAAN MUDHALVAN (Content Creator Blog Manager)

A simple blog manager I built with React for my Naan Mudhalvan internship project
(Project 9 - Content Creator Blog Manager). It lets a writer create posts, save them
as drafts, publish them, search through them and read them on a clean detail page.
Everything is saved in the browser, so your posts are still there after you refresh.

## Features

- Create, edit and delete blog posts
- Save a post as a Draft or mark it Published
- Search posts by title, author, category or content
- A detailed reading page for every post
- A rich text editor with headings, quotes, lists, dividers and images
- Add a cover image by pasting a URL or uploading one
- Posts are saved in the browser using localStorage

## Tech I used

- React (with Vite)
- JavaScript
- CSS
- lucide-react for the icons
- DOMPurify to keep the rich text safe

## Run it on your computer

You need Node.js installed. Then run:

```bash
npm install
npm run dev
```

Open the link shown in the terminal (usually http://localhost:5173).

To make a production build:

```bash
npm run build
```

## How it works

When you open the app you see the dashboard with all your posts and a small summary
of how many are drafts and how many are published. Click "Write" to open the editor in
a new tab, type your title and story, then go to the finish page to set the category,
author and cover image before you publish. From the dashboard you can search your posts
or filter them by status, and click any post to read it.

## Deploy

I deployed this on Vercel using the Vite preset (build command `npm run build`,
output folder `dist`).

Live demo: https://your-blog-kohl.vercel.app

## Author

Made by Bagrudeen Ali Ahmed for the Naan Mudhalvan Frontend Web Development (React) inte
