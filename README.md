# Maaz Portfolio

A responsive personal portfolio website for Maaz, a software engineer focused on Python, FastAPI, React, databases, and AI-powered applications.

## ✨ Features

- Responsive single-page layout with About, Skills, Projects, and Contact sections
- Mobile navigation with smooth scrolling and active section highlighting
- Scroll reveal animations, animated skill bars, rotating hero subtitles, and project card tilt effects
- Project showcase with GitHub repositories and a live GLOWRA demo
- Contact form with real-time field validation for name, email, and message
- Contact form submission through Web3Forms
- Automatic current year in the footer

## 🛠️ Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- Web3Forms API
- Google Fonts: Inter

## 📁 Project Structure

```text
.
├── index.html   # Portfolio page structure and content
├── style.css    # Layout, responsive styles, animations, and theme
├── script.js    # Navigation, effects, validation, and form submission
├── server.js    # Local static server and form proxy
├── api/
│   └── contact.js # Vercel serverless contact function
├── .env         # Local secrets; never commit this file
└── DP.png       # Profile image
```

## 💻 Run Locally

Node.js 18 or newer is required.

1. Clone or download this repository.
2. Install dependencies:

```bash
npm install
```

3. Copy `.env.example` to `.env` and add your Web3Forms access key.
4. Start the server:

```bash
npm start
```

5. Open `http://localhost:3000`.

## ✉️ Contact Form Setup

The form submits to [Web3Forms](https://web3forms.com/) through `/api/contact`. Locally, `server.js` handles this endpoint. On Vercel, `api/contact.js` handles it as a serverless function. The Web3Forms access key is read only on the server from `WEB3FORMS_ACCESS_KEY`; it is never placed in the HTML or browser JavaScript.

Never commit `.env`. The included `.gitignore` excludes it from version control.

The form validates:

- Name: required, at least 3 letters
- Email: required, valid email format
- Message: required, at least 15 characters

## 🔧 Customization

- Update personal details, links, and project descriptions in `index.html`.
- Adjust colors, typography, spacing, and responsive behavior in `style.css`.
- Modify validation rules, animations, and form behavior in `script.js`.
- Replace `DP.png` with another profile image if needed.

## 🚀 Vercel Deployment

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Add `WEB3FORMS_ACCESS_KEY` in Vercel's project settings under **Environment Variables**.
4. Deploy. Vercel automatically detects `api/contact.js` as the `/api/contact` serverless endpoint.

Do not upload or commit `.env`. Vercel should store the key in its environment settings.
