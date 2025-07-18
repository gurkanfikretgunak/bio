# Bio - Modern Biolink Application

A modern, responsive biolink application similar to Linktree, built with Next.js 15, TypeScript, and Tailwind CSS. Features a clean white design with outlined buttons, social media integration, and advanced interactive effects. Created by a solution architect passionate about mobile architecture and DevOps.

## 🚀 Features

- **Modern Design**: Clean white theme with outlined buttons and social media color schemes
- **Responsive**: Fully responsive design that works on all device sizes (iPhone SE 320px+)
- **Interactive Effects**: Avatar RGB animations and confetti effects
- **Modal System**: QR code sharing and GitHub repositories modal
- **Component Architecture**: Modular, well-documented components
- **SEO Optimized**: Complete SEO metadata with Open Graph and Twitter Cards
- **Performance**: Built with Next.js 15 for optimal performance
- **TypeScript**: Full TypeScript support for type safety
- **Configurable**: Easy configuration through `data/bio.json`
- **Shadcn/UI**: Modern UI components with Tailwind CSS
- **Dark Mode**: Full dark mode support
- **Platform Detection**: Automatic device/platform detection

## 🛠️ Technologies

- [Next.js 15](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Lucide React](https://lucide.dev/) - Icons
- [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti) - Animations
- [QR Code Generator](https://www.npmjs.com/package/qrcode) - QR functionality

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/gurkanfikretgunak/bio.git
cd bio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## ⚙️ Configuration

Edit `data/bio.json` to customize your biolink:

```json
{
  "profile": {
    "name": "Your Name",
    "title": "Solution Architect",
    "bio": "Mobile architecture and software development solution architect passionate about DevOps. Building with Dart, TypeScript, Flutter, Next.js, and Nest.js.",
    "avatar": "/your-avatar.jpg",
    "location": "Your Location",
    "website": "https://your-website.com",
    "verified": true,
    "company": {
      "name": "Your Company",
      "url": "https://company.com",
      "icon": "/company-icon.svg"
    }
  },
  "links": [
    {
      "type": "link",
      "subtype": "primary",
      "id": "github",
      "title": "GitHub",
      "description": "Check out my code and projects",
      "url": "https://github.com/yourusername",
      "icon": "github",
      "color": "#333333",
      "featured": true
    }
  ]
}
```

### Object Structure

The configuration uses an iterative object structure:

- `type`: Main category (profile, link, theme, seo, footer, analytics)
- `subtype`: Sub-category for links (primary, social, project, contact, utility)
- Additional properties for styling and functionality

## 🎨 Customization

### Adding New Links

Add new links to the `links` array in `bio.json`:

```json
{
  "type": "link",
  "subtype": "social",
  "id": "unique-id",
  "title": "Platform Name",
  "description": "Description",
  "url": "https://platform.com/profile",
  "icon": "icon-name",
  "color": "#brand-color",
  "featured": true
}
```

### Available Icons

- `github`, `linkedin`, `twitter`, `email`, `portfolio`, `blog`, `website`, `contact`, `qrcode`

### Interactive Features

- **Avatar Effects**: Click once for RGB circle, click again for confetti
- **QR Code**: Share profile via QR code
- **GitHub Repos**: View repositories in modal
- **Platform Detection**: Shows visitor's device/platform

### Styling

The application uses a white theme with:
- Outlined buttons for secondary actions
- Social media brand colors for links
- Gray color scheme for text and borders
- Responsive grid layout
- Dark mode support

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

The easiest way to deploy is using [Vercel](https://vercel.com):

```bash
npm i -g vercel
vercel
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Gurkan Fikret Gunak** - Solution Architect
- **Focus**: Mobile architecture, software development, DevOps
- **Technologies**: Dart, TypeScript, Flutter, Next.js, Nest.js
- **Approach**: Open-source advocate, modern technology enthusiast
- GitHub: [@gurkanfikretgunak](https://github.com/gurkanfikretgunak)
- Website: [gurkanfikretgunak.com](https://gurkanfikretgunak.com)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 Project Structure

```
bio/
├── app/
│   ├── favicon
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── ui/
├── data/
│   └── bio.json
├── lib/
│   └── utils.ts
├── public/
├── LICENSE
├── README.md
├── package.json
└── tsconfig.json
```

Built with ❤️ using Next.js
