# Loconomi

## 📝 Description

Loconomi is a cutting-edge decentralized platform designed to connect you with local service providers in real-time. Leveraging the power of WebSockets, Loconomi offers a dynamic and responsive experience, allowing you to discover nearby services as they become available. The platform boasts a seamless and intuitive user interface built with React, ensuring a smooth and engaging experience on any device. With its robust backend powered by Express.js and a scalable MongoDB database, Loconomi provides a reliable and efficient solution for finding the local services you need, when you need them. Experience the future of local service discovery with Loconomi!


## 🛠️ Tech Stack

- 🚀 Express.js
- ⚛️ React
- -Redux


## 📦 Key Dependencies

```
@tailwindcss/vite: ^4.1.8
express: ^5.1.0
framer-motion: ^12.15.0
mongoose: ^8.15.1
react: ^19.1.0
react-countup: ^6.5.3
react-dom: ^19.1.0
react-icons: ^5.5.0
react-router-dom: ^7.6.1
redis: ^5.5.6
socket.io: ^4.8.1
socket.io-client: ^4.8.1
tailwind-scrollbar: ^4.0.2
tailwindcss: ^4.1.8
```

## 🚀 Run Commands

- **start**: `npm run start`
- **dev**: `npm run dev`


.
├── backend/                  # Backend (Node.js + Express)
│   ├── app.js                 # App entry point
│   ├── db.js                  # Database connection config
│   ├── main.js                # Server startup script
│   ├── models/                # Mongoose models
│   │   ├── Provider.js
│   │   └── User.js
│   ├── package.json           # Backend dependencies
│   ├── routes/                # Express route handlers
│   │   ├── providerRoutes.js
│   │   └── userRoutes.js
│   ├── services/              # Business logic
│   │   ├── providerService.js
│   │   └── userService.js
│   └── socket.js              # Socket.IO setup
│
├── public/                    # Static assets
│   ├── Deliver.jpg
│   ├── Opportunities.jpg
│   ├── carpenter.png
│   ├── cleaner.png
│   ├── electrician.png
│   ├── gardener.png
│   ├── guest1.png
│   ├── guest2.jpg
│   ├── guest3.jpg
│   ├── handyman.png
│   ├── hero-image.jpg
│   ├── logo.png
│   ├── map.jpg
│   ├── mover.png
│   ├── painter.png
│   ├── plumber.png
│   ├── profile.jpg
│   └── vite.svg
│
├── src/                       # Frontend (React + Vite)
│   ├── App.css
│   ├── App.jsx
│   ├── Pages/                 # Page-level components
│   │   ├── AboutPage/
│   │   │   ├── Components/
│   │   │   │   ├── BookingSteps.jsx
│   │   │   │   ├── CallToAction.jsx
│   │   │   │   ├── HeroSection.jsx
│   │   │   │   ├── TeamSection.jsx
│   │   │   │   ├── ValuesSection.jsx
│   │   │   │   └── animations.js
│   │   │   └── index.jsx
│   │   ├── ContactPage/
│   │   │   ├── Components/
│   │   │   │   ├── ContactInfo.jsx
│   │   │   │   ├── FAQSection.jsx
│   │   │   │   ├── HeroSection.jsx
│   │   │   │   ├── MapSection.jsx
│   │   │   │   ├── QuestionForm.jsx
│   │   │   │   └── animations.js
│   │   │   └── index.jsx
│   │   ├── Hire/
│   │   │   ├── Components/
│   │   │   │   ├── FilterSidebar.jsx
│   │   │   │   ├── ProfessionalsGrid.jsx
│   │   │   │   └── animations.js
│   │   │   └── index.jsx
│   │   ├── JoinAsWorker/
│   │   │   ├── Components/
│   │   │   │   ├── HeroSection.jsx
│   │   │   │   ├── HowItWorksSection.jsx
│   │   │   │   ├── PerksSection.jsx
│   │   │   │   └── WhyChooseSection.jsx
│   │   │   └── index.jsx
│   │   ├── LandingPage/
│   │   │   ├── Components/
│   │   │   │   ├── CallToActionSection.jsx
│   │   │   │   ├── HeroSection.jsx
│   │   │   │   ├── HowItWorksSection.jsx
│   │   │   │   ├── PopularServicesSection.jsx
│   │   │   │   └── WhyChooseSection.jsx
│   │   │   └── index.jsx
│   │   ├── Login/
│   │   │   ├── Components/
│   │   │   │   ├── BackgroundElements.jsx
│   │   │   │   ├── FormFields.jsx
│   │   │   │   ├── FormFooter.jsx
│   │   │   │   ├── FormHeader.jsx
│   │   │   │   └── animations.js
│   │   │   └── index.jsx
│   │   ├── RegisterWorkers/
│   │   │   ├── Components/
│   │   │   │   ├── FormFields.jsx
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── ProfilePicture.jsx
│   │   │   │   └── SubmitButton.jsx
│   │   │   └── index.jsx
│   │   └── ServicePage/
│   │       ├── Components/
│   │       │   ├── BackgroundParticles.jsx
│   │       │   ├── CallToActionSection.jsx
│   │       │   ├── HeroSection.jsx
│   │       │   ├── ServicesSection.jsx
│   │       │   ├── TestimonialsSection.jsx
│   │       │   └── animations.js
│   │       └── index.jsx
│   ├── assets/
│   │   └── react.svg
│   ├── components/            # Shared UI components
│   │   ├── Footer.jsx
│   │   └── Navbar.jsx
│   ├── index.css
│   └── main.jsx
│
├── eslint.config.js           # ESLint configuration
├── index.html                  # Main HTML template
├── package.json                # Frontend dependencies
└── vite.config.js              # Vite configuration



## 🛠️ Development Setup

### Node.js/JavaScript Setup
1. Install Node.js (v18+ recommended)
2. Install dependencies: `npm install` or `yarn install`
3. Start development server: (Check scripts in `package.json`, e.g., `npm run dev`)



