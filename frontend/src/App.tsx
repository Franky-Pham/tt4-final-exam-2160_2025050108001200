import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BookList from './components/BookList';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BookList />} />
      </Routes>
    </BrowserRouter>
  );
}
