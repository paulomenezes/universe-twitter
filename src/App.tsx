import { Route, Routes } from 'react-router-dom';

import './App.css';
import { Navigation } from './components/Navigation/Navigation';
import { AuthorPage } from './pages/AuthorPage/AuthorPage';
import { DetailPage } from './pages/DetailPage/DetailPage';
import { HomePage } from './pages/HomePage/HomePage';

export function App() {
  return (
    <div>
      <Navigation />

      <main className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/i/:id" element={<DetailPage />} />
          <Route path="/a/:id" element={<AuthorPage />} />
        </Routes>
      </main>
    </div>
  );
}
