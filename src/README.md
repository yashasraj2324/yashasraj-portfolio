# Portfolio Project Structure

## 📁 Folder Organization

```
src/
├── app/                    # Next.js App Router
│   ├── layout.js          # Root layout with fonts
│   ├── page.js            # Home page (main entry)
│   ├── globals.css        # Global styles
│   └── App.portfolio.tsx  # Preview component
│
├── components/            # Reusable UI components
│   ├── Sidebar/          # Navigation sidebar
│   │   └── Sidebar.js
│   ├── Hero/             # Hero section with intro
│   │   └── Hero.js
│   ├── FloatingButtons/  # Floating action buttons
│   │   └── FloatingButtons.js
│   ├── Icons/            # SVG icon components
│   │   ├── GitHubIcon.js
│   │   ├── LinkedInIcon.js
│   │   ├── DownloadIcon.js
│   │   ├── ChevronDownIcon.js
│   │   └── index.js
│   └── index.js          # Component exports
│
└── constants/            # Application constants
    ├── navigation.js     # Navigation items & social links
    └── index.js          # Constants exports
```

## 🎯 Component Architecture

### **Sidebar Component**
- Displays user name and title
- Navigation menu with active state
- Social media links (GitHub, LinkedIn, Kaggle)

### **Hero Component**
- Introduction section
- Call-to-action buttons
- Profile image

### **FloatingButtons Component**
- Help button
- Indicator dot

### **Icons**
- Reusable SVG icon components
- Consistent sizing and styling

## 🔧 Usage

### Adding a new navigation item:
Edit `src/constants/navigation.js`:
```js
export const NAVIGATION_ITEMS = [
  'Home',
  'About',
  'NewSection', // Add here
  ...
];
```

### Adding a new social link:
Edit `src/constants/navigation.js`:
```js
export const SOCIAL_LINKS = [
  {
    name: 'Twitter',
    url: 'https://twitter.com/...',
    icon: 'twitter'
  }
];
```

### Creating a new icon:
1. Create file in `src/components/Icons/NewIcon.js`
2. Export from `src/components/Icons/index.js`
3. Import where needed: `import { NewIcon } from '@/components/Icons'`

## 🎨 Styling

- Uses Tailwind CSS v4
- Custom colors defined in `globals.css`
- Responsive design with mobile-first approach

## 📦 Dependencies

- Next.js 15.5.4
- React 19.1.0
- Tailwind CSS v4