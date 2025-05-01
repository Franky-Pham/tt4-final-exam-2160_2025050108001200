import axios from 'axios';
import { Book } from '../models/book';

const api = axios.create({
  baseURL: '/api',
});

export function getAll() {
  return api.get<Book[]>('/books').then(r => r.data);
}

export function getOne(id: number) {
  return api.get<Book>(`/books/${id}`).then(r => r.data);
}

export function create(b: Book) {
  return api.post<Book>('/books', b).then(r => r.data);
}

export function update(b: Book) {
  return api.put(`/books/${b.id}`, b);
}

export function remove(id: number) {
  return api.delete(`/books/${id}`);
}
