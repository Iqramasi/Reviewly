# Book Review Platform

A full-stack Book Review Platform with a cozy, playful, and journal-inspired design.  
**Frontend:** React (Vite + Tailwind CSS)  
**Backend:** Node.js, Express, MongoDB

---

## Features

- Browse books in a digital journal/open book themed UI
- User authentication (signup, login, profile)
- Add and view reviews for each book
- Persistent reviews (localStorage for demo)
- Modern, cozy, and visually appealing design inspired by digital journals and open books

---

## Project Structure

```
assisgnment/
  front/         # Frontend (React + Vite + Tailwind)
    src/
      pages/     # Main page components (Home, Books, BookDetails, Login, Signup, Profile)
      api.js     # API utility
      App.jsx    # Main app component
      main.jsx   # Entry point
      index.css  # Tailwind and custom styles
    index.html
    tailwind.config.js
    postcss.config.js
    package.json
    vite.config.js

  server/        # Backend (Node.js/Express/MongoDB)
    models/      # Mongoose models (Book, User, Review)
    controllers/ # Route controllers
    routes/      # API routes (books, users, reviews, auth)
    middleware/  # Custom middleware (auth, error handling)
    config/      # Database config
    server.js    # Entry point
    package.json
```

---

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- MongoDB (local or Atlas)

---

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd assisgnment
```

---

### 2. Backend Setup

```bash
cd server
npm install
```

- Create a `.env` file in `server/` with the following:
  ```
  MONGO_URI=<your-mongodb-connection-string>
  PORT=5000
  ```
- Start the backend server:
  ```bash
  npm run dev
  ```
  The backend will run on [http://localhost:5000](http://localhost:5000).

---

### 3. Frontend Setup

```bash
cd ../front
npm install
```

- Start the frontend dev server:
  ```bash
  npm run dev
  ```
  The frontend will run on [http://localhost:5173](http://localhost:5173) (default Vite port).

---

## Usage

- Visit the Home page for a cozy welcome in a digital journal/open book style.
- Browse books on the Books page, styled as an open book with a central spine and page edges.
- Click a book to view details and reviews, or add your own review (default reviewer: "Iqra").
- Sign up, log in, and view your profile.

---

## Customization

- **Theming:** All main pages use a consistent "open book"/journal theme with soft paper colors, a central spine, and playful accents.
- **Styling:** Tailwind CSS is used for rapid, modern styling. You can further customize styles in `front/src/index.css` and `tailwind.config.js`.

---

## Scripts

### Backend (`server/`)
- `npm run dev` — Start backend with nodemon (auto-reloads)
- `npm start` — Start backend with Node

### Frontend (`front/`)
- `npm run dev` — Start Vite dev server
- `npm run build` — Build for production
- `npm run preview` — Preview production build

---

## API Endpoints

- `POST /api/auth/signup` — Register a new user
- `POST /api/auth/login` — Login
- `GET /api/books` — List all books
- `GET /api/books/:id` — Get book details
- `POST /api/reviews` — Add a review
- `GET /api/reviews/:bookId` — Get reviews for a book
- `GET /api/users/:id` — Get user profile

---

## License

This project is for educational/demo purposes.

---

## Acknowledgements

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)

---

*Enjoy your cozy, bookish digital journal!*
