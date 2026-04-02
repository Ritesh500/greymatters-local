# Grey Matters Education - Setup & Run Guide

## Issues Found & Fixed ✅

### Issue: Case-Sensitivity Error in Import Paths
**Problem:** The folder is named `Components` (capital C), but imports were using `@/components` (lowercase c). This caused module resolution errors on Windows/macOS systems.

**Error message:**
```
File name differs from already included file name only in casing.
```

**Files Fixed:**
- `pages/index.js` - Fixed 6 import statements
- `pages/_app.js` - Fixed 2 import statements
- `pages/about.js` - Fixed 3 import statements
- `pages/howitworks.js` - Fixed 2 import statements
- `pages/immigration.js` - Fixed 3 import statements
- `pages/contact.js` - Fixed 4 import statements
- `pages/bookconsultation.js` - Fixed 4 import statements
- `pages/courses.js` - Fixed 4 import statements
- `pages/blog.js` - Fixed 4 import statements
- `pages/successstories.js` - Fixed 4 import statements
- `pages/studentportal.js` - Fixed 4 import statements
- `Layout.js` - Fixed 4 import statements
- `Components/layout/Layout.js` - Fixed 1 import statement
- `Components/common/ConversionPopup.js` - Fixed 4 import statements
- `Components/courses/CourseCompare.js` - Fixed 1 import statement
- `Components/ui/alert-dialog.js` - Fixed 1 import statement
- `Components/ui/calendar.js` - Fixed 1 import statement
- `Components/ui/carousel.js` - Fixed 1 import statement
- `Components/ui/command.js` - Fixed 1 import statement
- `Components/ui/form.js` - Fixed 1 import statement
- `Components/ui/pagination.js` - Fixed 1 import statement

**Resolution:** All imports now use `@/Components` (capital C) to match the actual folder structure.

---

## How to Run the Project

### Step 1: Install Dependencies
```bash
cd greymatters-local
npm install
```

### Step 2: Run Development Server
```bash
npm run dev
```

The app will start on **http://localhost:3000**

### Step 3: Build for Production
```bash
npm run build
npm start
```

### Step 4: Run Linting
```bash
npm run lint
```

---

## Available Scripts

From `package.json`:

| Script | Command | Purpose |
|--------|---------|---------|
| `npm run dev` | `set NEXT_DISABLE_TURBOPACK=1 && next dev` | Start development server (port 3000) |
| `npm run build` | `next build` | Create production-ready build |
| `npm start` | `next start` | Run production server |
| `npm run lint` | `eslint` | Check code with ESLint |

---

## Tech Stack
- **Framework**: Next.js (React 19.2.3)
- **Styling**: Tailwind CSS 4
- **UI Library**: Radix UI + 40+ custom components
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Next.js with Turbopack disabled (for compatibility)

---

## Testing the App

After running `npm run dev`, test the following pages:

1. **Homepage** - http://localhost:3000/
2. **Courses** - http://localhost:3000/courses
3. **Immigration** - http://localhost:3000/immigration
4. **About** - http://localhost:3000/about
5. **Contact** - http://localhost:3000/contact
6. **Book Consultation** - http://localhost:3000/bookconsultation
7. **Student Portal** - http://localhost:3000/studentportal
8. **Blog** - http://localhost:3000/blog
9. **How It Works** - http://localhost:3000/howitworks
10. **Success Stories** - http://localhost:3000/successstories

---

## Notes

- ✅ All module resolution errors are fixed
- ✅ All imports now use correct case-sensitive paths
- ✅ Project should build and run without errors
- ⚠️ Some API endpoints may require environment variables (Google Sheets credentials, email config)
- ⚠️ Student Portal page is a placeholder design

---

## Troubleshooting

### Error: "Module not found"
- Ensure you ran `npm install` successfully
- Check that all imports use `@/Components` (capital C)

### Error: "Port 3000 already in use"
- Kill the process: `npx kill-port 3000`
- Or start on a different port: `npm run dev -- -p 3001`

### Build fails
- Clear Next.js cache: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`

---

Generated: April 1, 2026
