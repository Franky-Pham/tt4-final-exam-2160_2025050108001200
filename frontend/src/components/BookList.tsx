import { useEffect, useState } from 'react';
import { Book }               from '../models/book';
import * as svc               from '../services/bookService';

export default function BookList() {
  const [books,   setBooks ] = useState<Book[]>([]);
  const [newBook, setNew   ] = useState<Book>({
    title:         '',
    author:        '',
    genre:         '',
    publishedYear: new Date().getFullYear(),
  });

  const load = () => svc.getAll().then(setBooks);

  useEffect(() => {
    load();
  }, []);

  const add = async () => {
    await svc.create(newBook);
    setNew({ title:'', author:'', genre:'', publishedYear: new Date().getFullYear() });
    load();
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl mb-4">Book Library</h2>

      <div className="space-y-2 mb-6">
        <input
          className="border p-2 w-full"
          placeholder="Title"
          value={newBook.title}
          onChange={e => setNew({ ...newBook, title: e.target.value })}
        />
        <input
          className="border p-2 w-full"
          placeholder="Author"
          value={newBook.author}
          onChange={e => setNew({ ...newBook, author: e.target.value })}
        />
        <input
          className="border p-2 w-full"
          placeholder="Genre"
          value={newBook.genre}
          onChange={e => setNew({ ...newBook, genre: e.target.value })}
        />
        <input
          type="number"
          className="border p-2 w-full"
          placeholder="Published Year"
          value={newBook.publishedYear}
          onChange={e => setNew({ ...newBook, publishedYear: +e.target.value })}
        />

        <button
          className="bg-blue-600 text-white px-4 py-2"
          onClick={add}
        >
          Add Book
        </button>
      </div>

      <ul className="space-y-2">
        {books.map(b => (
          <li key={b.id} className="flex items-center space-x-2">
            <div className="flex-1">
              <div>
                <strong>{b.title}</strong> by {b.author}
              </div>
              <div>
                {b.genre} — {b.publishedYear}
              </div>
            </div>

            <button
              className="text-red-600"
              onClick={async () => {
                await svc.remove(b.id!);
                load();
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
