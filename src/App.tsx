import { Route, Routes } from 'react-router-dom';

import './App.css';
import { DetailPage } from './pages/DetailPage/DetailPage';
import { HomePage } from './pages/HomePage/HomePage';

export function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/i/:id" element={<DetailPage />} />
      </Routes>
    </div>
  );
}
