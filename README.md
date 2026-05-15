# 🚀 Awanish Singh – Developer Portfolio

A modern, animated developer portfolio built with **React**, **Vite**, **Tailwind CSS**, and **Framer Motion**. Designed to be fast, responsive, and fully customizable.

🌐 **Live Demo:** [](http://)

---

## ✨ Features

- ⚡ **Blazing Fast** – Powered by Vite for lightning-quick dev server and optimized builds
- 🎨 **Custom Animated Cursor** – Unique cursor experience with smooth motion
- 🌟 **Intro Animation** – Cinematic loading/intro screen on first visit
- 🧭 **Responsive Navbar** – Sticky navbar with smooth scroll navigation
- 📂 **Overlay Menu** – Fullscreen animated overlay menu for mobile & desktop
- 🪐 **Particles Background** – Dynamic animated particle canvas background
- 🙋 **About Section** – Bio, skills summary, and personal details
- 💼 **Experience Section** – Work history and professional timeline
- 🛠️ **Projects Section** – Showcase of personal and professional projects with links
- 🧠 **Skills Section** – Visual display of tech stack and tools
- 📬 **Contact Section** – Contact form and social links
- 🦶 **Footer** – Clean footer with credits and links
- 📱 **Fully Responsive** – Works seamlessly on mobile, tablet, and desktop
- 🎭 **Framer Motion Animations** – Smooth, professional animations throughout
- 🧹 **Well-commented Code** – Every file is commented for easy customization

---

## 📁 Project Structure

```
AWANISH-SINGH-PORTFOLIO/
├── public/
└── src/
    ├── assets/
    ├── components/
    │   ├── CustomCursor.jsx       # Custom animated mouse cursor
    │   ├── IntroAnimation.jsx     # Intro/loading screen animation
    │   ├── Navbar.jsx             # Top navigation bar
    │   ├── OverlayMenu.jsx        # Fullscreen overlay navigation menu
    │   └── ParticlesBackground.jsx # Animated canvas particle background
    └── sections/
        ├── About.jsx              # About me section
        ├── Contact.jsx            # Contact form and social links
        ├── Experience.jsx         # Work experience / timeline
        ├── Footer.jsx             # Page footer
        ├── Home.jsx               # Hero / landing section
        ├── Projects.jsx           # Projects showcase
        └── Skills.jsx             # Tech stack and skills display
    ├── App.css                    # Global app styles
    ├── App.jsx                    # Root component
    ├── index.css                  # Tailwind base + theme customization
    └── main.jsx                   # App entry point
    |__ index.html                 # html boilerplate
├── .env.template                  # Environment variable template
├── .gitignore
└── eslint.config.js
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| [React](https://react.dev) | UI framework |
| [Vite](https://vitejs.dev) | Build tool & dev server |
| [Tailwind CSS](https://tailwindcss.com) | Utility-first styling |
| [Framer Motion](https://www.framer.com/motion/) | Animations & transitions |

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18 or later
- npm (comes with Node.js) or yarn
- A code editor (VS Code recommended)

### Installation

```bash
# 1. Clone the repository or extract the ZIP
git clone https://github.com/your-username/your-portfolio.git
cd your-portfolio

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser — your portfolio is live locally! 🎉

---

## 🎨 Customization

| What to change | Where to edit |
|---|---|
| Name, bio, skills | `src/sections/About.jsx` |
| Projects & links | `src/sections/Projects.jsx` |
| Work experience | `src/sections/Experience.jsx` |
| Colors & fonts | `src/index.css` |
| Animations | Framer Motion props in each component |
| Social links & contact | `src/sections/Contact.jsx` |

> Every file is commented to guide you through what each part does.

---

## 📦 Deployment

### Vercel (Recommended)

1. Push your project to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click **New Project** → Import your GitHub repo
4. Vercel auto-detects Vite + React — click **Deploy**
5. Live at: `https://your-portfolio.vercel.app`

### Netlify

1. Go to [netlify.com](https://netlify.com) and sign in
2. Click **Add New Site** → Import Project → select your repo
3. Set build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Click **Deploy Site**
5. Live at: `https://your-portfolio.netlify.app`

### Custom Domain

1. Buy a domain from Namecheap, GoDaddy, Hostinger, etc.
2. In your Vercel/Netlify dashboard, go to **Domain Settings**
3. Add your custom domain and update DNS records as instructed
4. Within a few hours, your portfolio will be live at your own domain 🌐

---

## 📄 License

This project is for personal portfolio use. Feel free to customize it for your own portfolio.

---

> Built with ❤️ by **Awanish Singh**