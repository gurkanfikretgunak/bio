# Bio - Modern Biolink Application

A modern, responsive biolink application similar to Linktree, built with Next.js 15, TypeScript, and Tailwind CSS. Features a clean white design with outlined buttons and social media integration.

## 🚀 Features

- **Modern Design**: Clean white theme with outlined buttons and social media color schemes
- **Responsive**: Fully responsive design that works on all device sizes
- **SEO Optimized**: Complete SEO metadata with Open Graph and Twitter Cards
- **Performance**: Built with Next.js 15 for optimal performance
- **TypeScript**: Full TypeScript support for type safety
- **Configurable**: Easy configuration through `data/bio.json`
- **Shadcn/UI**: Modern UI components with Tailwind CSS

## 🛠️ Technologies

- [Next.js 15](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Lucide React](https://lucide.dev/) - Icons

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
    "bio": "Your bio description",
    "avatar": "/your-avatar.jpg",
    "location": "Your Location",
    "website": "https://your-website.com"
  },
  "links": [
    {
      "type": "link",
      "subtype": "primary",
      "id": "github",
      "title": "GitHub",
      "description": "Check out my code",
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
- `subtype`: Sub-category for links (primary, social, project, contact)
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

- `github`, `linkedin`, `twitter`, `email`, `portfolio`, `blog`, `website`, `contact`

### Styling

The application uses a white theme with:
- Outlined buttons for secondary actions
- Social media brand colors for links
- Gray color scheme for text and borders
- Responsive grid layout

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

**Gurkan Fikret Gunak**
- GitHub: [@gurkanfikretgunak](https://github.com/gurkanfikretgunak)
- Website: [gurkanfikretgunak.com](https://gurkanfikretgunak.com)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 Project Structure

```
bio/
├── app/
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
