# Maaz Portfolio

My responsive personal portfolio website, I am a Software Engineer focused on Python, FastAPI, React, databases, and AI-powered applications.

## ✨ Features

- Responsive single-page layout with About, Skills, Projects, and Contact sections
- Mobile navigation with smooth scrolling and active section highlighting
- Scroll reveal animations, animated skill bars, rotating hero subtitles, and project card tilt effects
- Project showcase with GitHub repositories and a live GLOWRA demo
- Contact form with real-time field validation for name, email, and message
- Contact form submission through Web3Forms
- Automatic current year in the footer

## 🌐 Live Demo

**[View Portfolio](https://portfolio-2-0-tau-henna.vercel.app/)**

## 🛠️ Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- Web3Forms API
- Google Fonts: Inter
- Vercel Serverless Functions

## 📁 Project Structure

```text
.
├── index.html           # Portfolio page structure and content
├── style.css            # Layout, responsive styles, animations, and theme
├── script.js            # Navigation, effects, validation, and form submission
├── api/
│   └── contact.js       # Vercel serverless contact function
├── .env                 # Local secrets; never commit this file
├── .gitignore           # Git ignore rules
└── DP.png               # Profile image
```

## 💻 Run Locally

No build process or package installation is required.

1. Clone or download this repository.
2. Open the project folder.
3. Run the website using a local development server, such as VS Code Live Server.
4. Open the provided local URL in your browser.

> **Note:** The contact form's `/api/contact` endpoint is designed for Vercel's serverless environment. For local testing of the contact form, deploy the project to Vercel and configure the required environment variable.

## ✉️ Contact Form Setup

The contact form submits through **Web3Forms** using the `/api/contact` endpoint.

On Vercel, `api/contact.js` handles the request as a serverless function. The Web3Forms access key is read from the `WEB3FORMS_ACCESS_KEY` environment variable and is never exposed in the HTML or browser JavaScript.

The form validates:

- **Name:** Required, at least 3 letters
- **Email:** Required, valid email format
- **Message:** Required, at least 15 characters

Never commit `.env`. The included `.gitignore` excludes it from version control.

## 🔧 Customization

- Update personal details, links, and project descriptions in `index.html`.
- Adjust colors, typography, spacing, and responsive behavior in `style.css`.
- Modify validation rules, animations, and form behavior in `script.js`.
- Replace `DP.png` with another profile image if needed.

## 🚀 Vercel Deployment

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Ensure the project is configured as a static website.
4. Add `WEB3FORMS_ACCESS_KEY` in Vercel's **Environment Variables**.
5. Deploy the project.

Vercel automatically detects `api/contact.js` as the `/api/contact` serverless endpoint.

Do not upload or commit `.env`. Store the Web3Forms access key securely in Vercel's environment settings.