# RickVerse Explorer

A small single-page application that lets users explore characters from The Rick and Morty API. This project was completed as an interview exercise and focuses on clarity, responsiveness, and solid engineering practices.

## Features
- Paginated character list with image, name, status, species, and origin.
- Search by name with a debounced input.
- Filter by status (Alive, Dead, Unknown) and species.
- Sort by name (A→Z or Z→A).
- Character details page showing core info and the first five episode names.
- Auto-refresh via a floating button that expands to Pause/Resume or trigger a manual Refresh.
- Light and Dark themes with persistence.
- Accessible labels, roles, and keyboard focus states.

API Endpoints
- Base: `https://rickandmortyapi.com/api`
- Characters: `GET /character?page=1&name=rick&status=alive`
- Episodes: `GET /episode/:id`
- Locations: `GET /location/:id`

## Getting Started
Requirements
- Node 20+ is recommended.

Install and run
```
npm install
npm run dev
```
Open the printed local URL in your browser.

Build and preview
```
npm run build
npm run preview
```

## Scripts
- `dev` – start the Vite dev server
- `build` – type-check and build for production
- `preview` – preview the production build
- `lint` – run ESLint

## Tech Stack
- React + TypeScript + Vite
- React Router
- Axios for HTTP requests
- SCSS Modules for component styling
- CSS variables for theming
- react-icons for small, inline icons

## Project Structure
```
src/
  api/                 // axios client + endpoints
  components/          // reusable UI components (cards, inputs, pagination, toggle, etc.)
  hooks/               // useCharacters, useDebounce, useTimer
  pages/               // Home and CharacterDetails
  routes/              // AppRouter with lazy routes
  styles/              // global variables, mixins, and theme setup
  types/               // API types
  utils/               // small helpers
```

## Architecture Notes
- `useCharacters` manages fetching, pagination, sorting, and errors. It exposes `page`, `setPage`, `totalPages`, and a `refetch` that guarantees a new request even when filters are unchanged.
- `useDebounce` smooths search requests.
- `useTimer` powers the refresh controls and countdown.
- Routing is lazy to keep the initial bundle small.

## Theming
- Dark is the default. A light theme is provided by toggling `data-theme="light"` on `<html>`.
- Component styles use CSS variables so the theme switch applies consistently.

## Accessibility
- Form fields are labeled, interactive elements are keyboard accessible, and feedback uses semantic elements and ARIA where appropriate.

## Future Work
- Recently viewed characters on the Home page (persist last five).
- Skeleton placeholders for list and details.
- Error boundary for improved routing fallback.
