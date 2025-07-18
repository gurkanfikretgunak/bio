# Bio - Modern Biolink Application

A modern, responsive biolink application similar to Linktree, built with Next.js 15, TypeScript, and Firebase Remote Config. Features a clean white design with outlined buttons, social media integration, and advanced interactive effects. **No persistent local data** - all content is dynamically loaded from Firebase Remote Config.

## 🚀 Key Features

### 🎯 Core Functionality
- **Dynamic Content**: All content loaded from Firebase Remote Config (no local data persistence)
- **Modern Design**: Clean white theme with outlined buttons and social media color schemes
- **Responsive Design**: Optimized for all devices (iPhone SE 320px+)
- **Interactive Effects**: 
  - Avatar RGB circle animations
  - Confetti effects on avatar interactions
  - Smooth transitions and loading states
- **QR Code Sharing**: Generate and share profile QR codes
- **GitHub Integration**: Modal view for repository showcase
- **Platform Detection**: Automatic visitor device/platform detection

### 🎨 UI/UX Features
- **Theme Toggle**: Full dark/light mode support
- **Skeleton Loading**: Smooth loading states with skeleton components
- **Splash Screen**: Branded loading experience with Firebase connection status
- **Modal System**: QR code sharing and GitHub repositories modals
- **Error Handling**: Graceful error states with retry mechanisms
- **Accessibility**: Full accessibility support with proper ARIA labels

### 🔧 Technical Features
- **Component Architecture**: Modular, well-documented components
- **SEO Optimized**: Complete SEO metadata with Open Graph and Twitter Cards
- **Performance**: Built with Next.js 15 and React 19 for optimal performance
- **TypeScript**: Full TypeScript support for type safety
- **Firebase Integration**: Real-time content updates via Remote Config
- **Build-time Configuration**: YAML to TypeScript conversion

## 🛠️ Tech Stack

### Frontend
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - Latest React with concurrent features
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety and better DX
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[shadcn/ui](https://ui.shadcn.com/)** - Beautiful, accessible UI components

### Backend & Data
- **[Firebase Remote Config](https://firebase.google.com/docs/remote-config)** - Dynamic content management
- **[Firebase Analytics](https://firebase.google.com/docs/analytics)** - User analytics and insights
- **No persistent local data** - All content served from Firebase

### Libraries & Tools
- **[Lucide React](https://lucide.dev/)** - Beautiful, customizable icons
- **[Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)** - Interactive animations
- **[QR Code Generator](https://www.npmjs.com/package/qrcode)** - QR code functionality
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible components
- **[js-yaml](https://www.npmjs.com/package/js-yaml)** - YAML configuration parsing

## 📦 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/gurkanfikretgunak/bio.git
cd bio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Firebase
The project uses Firebase Remote Config for dynamic content. Update `google-service.yaml` with your Firebase project credentials:

```yaml
# Firebase Configuration
firebase:
  apiKey: "your-api-key"
  authDomain: "your-project.firebaseapp.com"
  projectId: "your-project-id"
  storageBucket: "your-project.firebasestorage.app"
  messagingSenderId: "your-sender-id"
  appId: "your-app-id"
  measurementId: "your-measurement-id"
```

### 4. Set up Firebase Remote Config
1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Remote Config
3. Add a parameter named `bio` with your profile data (JSON format)
4. Publish the configuration

### 5. Start Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## ⚙️ Configuration System

### Build-time Configuration
The project uses a build-time configuration system that converts YAML to TypeScript:

```bash
# Generates lib/config/firebaseConfig.ts from google-service.yaml
npm run config:generate
```

### Firebase Remote Config Structure
All content is managed through Firebase Remote Config. The `bio` parameter should contain:

```json
{
  "profile": {
    "name": "Your Name",
    "username": "your-username",
    "title": "Your Professional Title",
    "bio": "Your bio description",
    "avatar": "/profile-picture.png",
    "location": "Your Location",
    "website": "https://your-website.com",
    "verified": true,
    "company": {
      "name": "Company Name",
      "url": "https://company.com",
      "icon": "/company-icon.svg"
    },
    "shareTitle": "Check out my profile!",
    "surpriseText": "🎉 Surprise! You found the secret feature!",
    "secretFeatureText": "Keep clicking for more surprises!",
    "repositoriesTitle": "My Featured Repositories",
    "clickMeText": "Click me!",
    "clickAgainText": "Click again!",
    "viewedFromText": "Viewed from:",
    "platformDetection": {
      "title": "Platform Detection",
      "subtitle": "Your device information",
      "downloadText": "Download our app",
      "iosLink": "https://apps.apple.com/your-app",
      "androidLink": "https://play.google.com/store/apps/your-app"
    }
  },
  "seo": {
    "title": "Your Name - Professional Profile",
    "description": "Your professional bio and links",
    "keywords": ["developer", "profile", "portfolio"],
    "ogImage": "/og-image.png",
    "twitterCard": "summary_large_image",
    "siteName": "Your Bio",
    "metadataBase": "https://your-domain.com"
  },
  "links": [
    {
      "id": "github",
      "title": "GitHub",
      "url": "https://github.com/your-username",
      "icon": "github",
      "description": "Check out my code and projects",
      "color": "#333333",
      "featured": true
    }
  ],
  "favorites": [
    {
      "id": "repo-1",
      "name": "your-awesome-project",
      "description": "Description of your project",
      "url": "https://github.com/your-username/your-project",
      "stars": 42,
      "language": "TypeScript",
      "languageColor": "#3178c6"
    }
  ],
  "footer": {
    "text": "Made with ❤️ by",
    "githubUrl": "https://github.com/your-username",
    "repositoryUrl": "https://github.com/your-username/bio",
    "badge": "⭐ Star this project",
    "year": 2024,
    "cursor": {
      "textBefore": "Built with",
      "textAfter": "",
      "url": "https://cursor.com",
      "logo": "/cursor-logo.svg"
    }
  }
}
```

## 🎨 Customization

### Available Link Icons
- `github`, `linkedin`, `twitter`, `email`, `portfolio`, `blog`, `website`, `contact`, `qrcode`
- `instagram`, `youtube`, `twitch`, `discord`, `telegram`, `whatsapp`
- `medium`, `devto`, `stackoverflow`, `dribbble`, `behance`, `figma`

### Interactive Features
- **Avatar Effects**: Click once for RGB circle animation, click again for confetti
- **QR Code Sharing**: Click QR icon to generate and share profile QR code
- **GitHub Repositories**: Showcase your favorite repositories in a modal
- **Platform Detection**: Display visitor's device and platform information
- **Theme Toggle**: Switch between light and dark modes
- **Responsive Design**: Optimized for all screen sizes

### Content Management
- **Real-time Updates**: Content updates via Firebase Remote Config (no app rebuild needed)
- **No Local Data**: All content served dynamically from Firebase
- **Caching**: Built-in caching for optimal performance
- **Error Handling**: Graceful fallbacks and retry mechanisms

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Environment Variables
Set these in your deployment platform:
- No environment variables needed (uses build-time YAML configuration)

## 📁 Project Structure

```
bio/
├── app/                          # Next.js App Router
│   ├── favicon.ico
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page (Server Component)
├── components/
│   ├── ClientHomePage.tsx       # Main client component
│   ├── splash-screen.tsx        # Loading screen
│   ├── theme-toggle.tsx         # Theme switcher
│   ├── qr-code-modal.tsx        # QR code sharing modal
│   ├── github-repositories.tsx  # GitHub repos component
│   ├── effects/
│   │   └── ConfettiOverlay.tsx  # Confetti animations
│   ├── icons/
│   │   └── x-icon.tsx           # Custom icons
│   ├── layout/
│   │   └── Footer.tsx           # Footer component
│   ├── links/
│   │   ├── FeaturedLinks.tsx    # Featured links section
│   │   └── AdditionalLinks.tsx  # Additional links section
│   ├── modals/
│   │   └── GitHubRepositoriesModal.tsx
│   ├── profile/
│   │   ├── ProfileSection.tsx   # Profile display
│   │   └── AvatarWithEffects.tsx # Interactive avatar
│   └── ui/                      # shadcn/ui components
│       ├── avatar.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── skeleton.tsx
│       └── ...
├── lib/
│   ├── config/
│   │   ├── buildTimeConfig.js   # YAML to TS converter
│   │   └── yamlReader.ts        # YAML parsing utilities
│   ├── firebase/
│   │   ├── config.ts            # Firebase initialization
│   │   └── remoteConfig.ts      # Remote Config client
│   ├── hooks/
│   │   ├── useAvatarEffects.ts  # Avatar interaction hooks
│   │   └── usePlatformDetection.ts
│   └── utils.ts                 # Utility functions
├── public/                      # Static assets
│   ├── profile-picture.png
│   └── ...
├── google-service.yaml          # Firebase configuration
├── components.json              # shadcn/ui configuration
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
```

## 🔧 Development Scripts

```bash
# Start development with config generation
npm run dev

# Build for production with config generation
npm run build

# Start production server
npm run start

# Generate Firebase config from YAML
npm run config:generate

# Run linter
npm run lint
```

## 🎯 Architecture Highlights

### No Persistent Local Data
- All content dynamically loaded from Firebase Remote Config
- No local JSON files or databases
- Real-time content updates without app rebuilds
- Centralized content management

### Modern React Patterns
- Server Components for initial rendering
- Client Components for interactivity
- Custom hooks for state management
- Proper error boundaries and loading states

### Performance Optimizations
- Next.js 15 with App Router
- React 19 concurrent features
- Optimized images and assets
- Proper caching strategies

## 📱 Mobile-First Design

The application is optimized for mobile devices with:
- Responsive breakpoints for all screen sizes
- Touch-friendly interactions
- Optimized loading states
- Platform-specific enhancements

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Gurkan Fikret Gunak** - Solution Architect & Full-Stack Developer

- **Specialization**: Mobile architecture, solution architecture, and DevOps
- **Tech Stack**: Dart, Flutter, TypeScript, Next.js, NestJS
- **Philosophy**: Open-source advocate, modern web technologies enthusiast
- **Focus**: Building scalable, performant applications with excellent UX

**Connect with me:**
- 🐙 GitHub: [@gurkanfikretgunak](https://github.com/gurkanfikretgunak)
- 🌐 Website: [gurkanfikretgunak.com](https://gurkanfikretgunak.com)
- 💼 LinkedIn: [Gurkan Fikret Gunak](https://linkedin.com/in/gurkanfikretgunak)

---

**Built with ❤️ using Next.js 15, TypeScript, and Firebase Remote Config**

*No persistent local data - all content dynamically served from Firebase*
