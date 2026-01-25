# Bio App - New Features Documentation

This document provides comprehensive documentation for all features available in the Bio App, a modern biolink application built with Next.js 15, React 19, and Firebase Remote Config.

---

## Table of Contents

1. [Splash Screen](#1-splash-screen)
2. [Avatar Interactive Effects](#2-avatar-interactive-effects)
3. [Theme Toggle (Dark/Light Mode)](#3-theme-toggle-darklight-mode)
4. [QR Code Modal](#4-qr-code-modal)
5. [GitHub Repositories Modal](#5-github-repositories-modal)
6. [Platform Detection](#6-platform-detection)
7. [Featured Links](#7-featured-links)
8. [Additional Links](#8-additional-links)
9. [Skeleton Loading States](#9-skeleton-loading-states)
10. [Firebase Remote Config Integration](#10-firebase-remote-config-integration)
11. [Confetti Overlay Effect](#11-confetti-overlay-effect)
12. [Responsive Design](#12-responsive-design)
13. [Footer Component](#13-footer-component)

---

## 1. Splash Screen

### Overview
The Splash Screen provides a branded loading experience while the application connects to Firebase and fetches profile data from Remote Config.

### Features
- **Animated Logo**: Gradient circular logo with spinning loader
- **Dynamic Loading Text**: Real-time status updates during data fetch
- **Error Handling**: Graceful error states with retry options
- **Smooth Transition**: Fade-out animation when loading completes

### Component Location
`components/splash-screen.tsx`

### Usage
The splash screen automatically appears when the application loads and displays connection status:
- "Connecting to Firebase..."
- "Fetching Remote Config..."
- "Processing profile data..."

### Error Recovery
If the connection fails, users can:
- Click "Try Again" to retry the connection
- Click "Refresh Page" to reload the entire application

### Technical Details
- Uses exponential backoff for retry logic (up to 3 attempts)
- Configurable timeout (default: 20 seconds)
- Dynamic import to avoid SSR issues

---

## 2. Avatar Interactive Effects

### Overview
The avatar component features multi-stage interactive effects that reward user engagement with visual feedback.

### Features
- **RGB Circle Animation**: First click activates a colorful rotating ring
- **Confetti Explosion**: Second click triggers a full-page celebration
- **Hover Tooltips**: Dynamic hints guide users through interactions
- **Auto-reset**: Effects automatically reset after completion

### Component Location
- `components/profile/AvatarWithEffects.tsx`
- `lib/hooks/useAvatarEffects.ts`

### Interaction Flow
1. **Initial State**: Avatar displays with subtle hover scale effect
2. **First Click**: RGB circle animation appears around the avatar (5 seconds)
3. **Second Click**: Confetti explosion with page overlay (3 seconds)
4. **Reset**: System returns to initial state

### Customization (via Remote Config)
```json
{
  "profile": {
    "clickMeText": "Click me!",
    "clickAgainText": "Click again!",
    "surpriseText": "🎉 Surprise! You found the secret feature!",
    "secretFeatureText": "Keep clicking for more surprises!"
  }
}
```

### CSS Animation
The RGB circle effect uses a custom CSS animation defined in `globals.css`:
```css
.rgb-circle {
  background: linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3);
  animation: rgb-rotate 2s linear infinite;
}
```

---

## 3. Theme Toggle (Dark/Light Mode)

### Overview
Full dark/light mode support with system preference detection and persistent user preference.

### Features
- **System Detection**: Automatically detects user's preferred color scheme
- **Local Storage**: Persists theme preference across sessions
- **Smooth Transition**: Animated theme changes
- **Accessible Toggle**: Moon/Sun icons for clear visual indication

### Component Location
`components/theme-toggle.tsx`

### Technical Implementation
- Uses `localStorage` for persistence
- Applies `dark` class to `document.documentElement`
- Handles hydration with `mounted` state to prevent flash

### Usage
The theme toggle is fixed in the top-right corner of the screen and is always accessible.

---

## 4. QR Code Modal

### Overview
Generate and share QR codes for any link in the application, perfect for mobile scanning and quick sharing.

### Features
- **Dynamic Generation**: Creates QR codes on-the-fly using the `qrcode` library
- **Profile Header**: Displays user profile information in the modal
- **Download Option**: Save QR code as PNG image
- **Animated Entry**: Smooth slide-up animation with backdrop blur
- **Responsive Design**: Optimized for all screen sizes

### Component Location
`components/qr-code-modal.tsx`

### Props
| Prop | Type | Description |
|------|------|-------------|
| `isOpen` | boolean | Controls modal visibility |
| `onClose` | function | Callback when modal closes |
| `url` | string | URL to encode in QR code |
| `title` | string | Modal title text |
| `profile` | object | User profile for header display |

### Technical Details
- Uses HTML5 Canvas for QR code rendering
- Supports custom colors and sizes
- Handles generation errors gracefully

---

## 5. GitHub Repositories Modal

### Overview
A full-screen modal showcasing GitHub repositories with detailed information and quick actions.

### Features
- **Repository Cards**: Display name, description, language, stars, forks, watchers
- **Favorites Section**: Highlighted favorite repositories
- **QR Code Integration**: Generate QR codes for any repository
- **External Links**: Quick access to view repositories on GitHub
- **Responsive Grid**: Adapts layout for different screen sizes
- **Scrollable Content**: Handles large repository lists gracefully

### Component Location
- `components/modals/GitHubRepositoriesModal.tsx`
- `components/github-repositories.tsx`

### Data Structure
```json
{
  "favorites": [
    {
      "id": "repo-1",
      "name": "awesome-project",
      "description": "Description of the project",
      "url": "https://github.com/username/awesome-project",
      "stars": 42,
      "language": "TypeScript",
      "languageColor": "#3178c6"
    }
  ]
}
```

### Actions
- **View All**: Opens GitHub profile in new tab
- **QR Code**: Generates QR code for repository URL
- **View**: Opens specific repository in new tab

---

## 6. Platform Detection

### Overview
Automatically detects and displays the visitor's platform/device for a personalized experience.

### Features
- **Auto-Detection**: Identifies platform from user agent
- **SSR Compatible**: Handles server-side rendering gracefully
- **Loading State**: Prevents layout shift during detection

### Component Location
- `components/ui/PlatformDetection.tsx`
- `lib/hooks/usePlatformDetection.ts`

### Supported Platforms
| Platform | Detection Criteria |
|----------|-------------------|
| iOS | iPhone or iPad in user agent |
| Android | Android in user agent |
| macOS | Mac in user agent |
| Windows | Win in user agent |
| Linux | Linux in user agent |
| Web | Fallback for unidentified browsers |

### Customization (via Remote Config)
```json
{
  "profile": {
    "viewedFromText": "Viewed from:",
    "platformDetection": {
      "title": "Platform Detection",
      "subtitle": "Your device information",
      "downloadText": "Download our app",
      "iosLink": "https://apps.apple.com/your-app",
      "androidLink": "https://play.google.com/store/apps/your-app"
    }
  }
}
```

---

## 7. Featured Links

### Overview
Primary links displayed prominently with icons, descriptions, and special actions.

### Features
- **Card Layout**: Rich cards with icon, title, and description
- **Platform Icons**: Automatic icon mapping for common platforms
- **GitHub Special**: Custom handling with "Show Repos" button
- **Hover Effects**: Smooth transitions and visual feedback
- **External Navigation**: Opens links in new tabs safely

### Component Location
`components/links/FeaturedLinks.tsx`

### Supported Icons
```
github, linkedin, twitter, email, portfolio, blog, 
website, contact, qrcode, instagram, youtube, twitch, 
discord, telegram, whatsapp, medium, devto, stackoverflow, 
dribbble, behance, figma
```

### Link Configuration
```json
{
  "links": [
    {
      "id": "github",
      "title": "GitHub",
      "url": "https://github.com/username",
      "icon": "github",
      "description": "Check out my code and projects",
      "color": "#333333",
      "featured": true
    }
  ]
}
```

---

## 8. Additional Links

### Overview
Secondary links displayed as compact icon buttons with hover tooltips.

### Features
- **Icon-Only Design**: Space-efficient button layout
- **Hover Tooltips**: Shows link title on hover
- **QR Code Special**: Opens QR modal instead of navigating
- **Accessible**: Proper ARIA labels for screen readers

### Component Location
`components/links/AdditionalLinks.tsx`

### Configuration
Set `featured: false` in link configuration to display as additional link.

---

## 9. Skeleton Loading States

### Overview
Smooth loading states with animated skeleton placeholders that match the final layout.

### Features
- **Profile Skeleton**: Avatar and text placeholders
- **Links Skeleton**: Card-shaped placeholders
- **Footer Skeleton**: Footer layout placeholder
- **Pulse Animation**: Subtle animation indicates loading

### Component Locations
- `components/ui/ProfileSkeleton.tsx`
- `components/ui/LinksSkeleton.tsx`

### Usage
Skeletons automatically display during:
- Initial page load
- Data fetching from Firebase
- Content transition states

---

## 10. Firebase Remote Config Integration

### Overview
Dynamic content management without application rebuilds using Firebase Remote Config.

### Features
- **Real-time Updates**: Content updates without deployment
- **Type-safe**: Full TypeScript interface for bio data
- **Retry Logic**: Exponential backoff for reliability
- **Validation**: Ensures required fields exist
- **Caching**: Built-in caching for performance

### Component Location
`lib/firebase/remoteConfig.ts`

### Data Interface
```typescript
interface BioData {
  profile: ProfileData;
  seo: SEOData;
  links: LinkData[];
  favorites: FavoriteData[];
  footer: FooterData;
}
```

### Configuration
1. Set up Firebase project with Remote Config enabled
2. Create `bio` parameter with JSON value
3. Configure `google-service.yaml` with credentials
4. Run `npm run config:generate` to build configuration

### Retry Mechanism
- Maximum 3 retry attempts
- Exponential backoff: 1s, 2s, 4s (max 5s)
- 20-second timeout per attempt

---

## 11. Confetti Overlay Effect

### Overview
Full-page celebration overlay with confetti animations and surprise messages.

### Features
- **Backdrop Blur**: Semi-transparent dark overlay
- **Animated Messages**: Bouncing and pulsing text
- **Canvas Confetti**: High-performance particle animations
- **Customizable Colors**: Configurable confetti palette

### Component Location
`components/effects/ConfettiOverlay.tsx`

### Confetti Configuration
```javascript
const colors = [
  '#ff6b6b', '#4ecdc4', '#45b7d1', 
  '#96ceb4', '#ffeaa7', '#dda0dd', 
  '#ff9ff3', '#54a0ff'
];
```

### Animation Types
1. **Initial Explosion**: Center burst with 100 particles
2. **Side Explosions**: Continuous from left and right
3. **Falling Confetti**: Random positions from top

---

## 12. Responsive Design

### Overview
Mobile-first responsive design optimized for all devices from iPhone SE (320px) to large desktops.

### Breakpoints
| Breakpoint | Minimum Width | Target Devices |
|------------|---------------|----------------|
| Default | 0px | Mobile phones |
| `sm` | 640px | Large phones, small tablets |
| `md` | 768px | Tablets |
| `lg` | 1024px | Laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Large monitors |

### Responsive Features
- **Typography**: Scales with screen size
- **Spacing**: Adaptive padding and margins
- **Layouts**: Grid adjustments per breakpoint
- **Touch Targets**: Larger on mobile for accessibility
- **Modals**: Full-screen on mobile, centered on desktop

### Implementation Pattern
```tsx
<div className="text-sm sm:text-base md:text-lg lg:text-xl">
  Responsive Text
</div>

<div className="px-3 sm:px-4 md:px-6 lg:px-8">
  Responsive Padding
</div>
```

---

## 13. Footer Component

### Overview
Comprehensive footer with creator information, licensing, technology stack, and development credits.

### Features
- **Creator Information**: Links to GitHub profile
- **License Display**: MIT license with repository link
- **Status Badge**: Animated development status indicator
- **Application Description**: Brief app description
- **Cursor Credit**: Development tool attribution with logo
- **Copyright**: Year and name from configuration

### Component Location
`components/layout/Footer.tsx`

### Configuration
```json
{
  "footer": {
    "text": "Made with ❤️ by",
    "githubUrl": "https://github.com/username",
    "repositoryUrl": "https://github.com/username/bio",
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

---

## Quick Reference: Component Architecture

```
components/
├── ClientHomePage.tsx          # Main client component
├── splash-screen.tsx           # Loading screen
├── theme-toggle.tsx            # Theme switcher
├── qr-code-modal.tsx           # QR code modal
├── github-repositories.tsx     # GitHub repos display
├── effects/
│   └── ConfettiOverlay.tsx     # Confetti animations
├── icons/
│   └── x-icon.tsx              # Custom X/Twitter icon
├── layout/
│   └── Footer.tsx              # Footer component
├── links/
│   ├── FeaturedLinks.tsx       # Primary links
│   └── AdditionalLinks.tsx     # Secondary links
├── modals/
│   └── GitHubRepositoriesModal.tsx
├── profile/
│   ├── ProfileSection.tsx      # Profile display
│   └── AvatarWithEffects.tsx   # Interactive avatar
└── ui/
    ├── PlatformDetection.tsx   # Device detection
    ├── ProfileSkeleton.tsx     # Loading skeleton
    ├── LinksSkeleton.tsx       # Links skeleton
    └── ... (shadcn/ui components)
```

---

## Quick Reference: Custom Hooks

| Hook | Location | Purpose |
|------|----------|---------|
| `useAvatarEffects` | `lib/hooks/useAvatarEffects.ts` | Avatar click effects state |
| `usePlatformDetection` | `lib/hooks/usePlatformDetection.ts` | Device/browser detection |

---

## Quick Reference: Firebase Functions

| Function | Location | Purpose |
|----------|----------|---------|
| `fetchBioData` | `lib/firebase/remoteConfig.ts` | Fetch bio from Remote Config |
| `fetchBioDataWithRetry` | `lib/firebase/remoteConfig.ts` | Fetch with retry logic |
| `isRemoteConfigAvailable` | `lib/firebase/remoteConfig.ts` | Check config availability |

---

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/gurkanfikretgunak/bio.git
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase** (update `google-service.yaml`)

4. **Set up Remote Config** with your `bio` parameter

5. **Start development**
   ```bash
   npm run dev
   ```

---

## Contributing

When adding new features:

1. Create component in appropriate directory
2. Add comprehensive JSDoc documentation
3. Ensure responsive design at all breakpoints
4. Add dark mode support
5. Include accessibility attributes
6. Update this documentation

---

*Documentation last updated: January 2026*
