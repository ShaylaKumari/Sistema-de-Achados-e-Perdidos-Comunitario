import React, { useState, useEffect } from 'react';
import { fetchCategories } from '../services/api';

export default function ItemForm({ initialData = {}, onSubmit }) {
  const [form, setForm] = useState({
    title: initialData.title || '',
    description: initialData.description || '',
    categoryId: initialData.categoryId || '',
    code: initialData.code || ''
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories().then(res => setCategories(res.data));
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
      <div>
        <label className="block">Título</label>
        <input name="title" value={form.title} onChange={handleChange} className="w-full border p-2 rounded" required />
      </div>
      <div>
        <label className="block">Descrição</label>
        <textarea name="description" value={form.description} onChange={handleChange} className="w-full border p-2 rounded" />
      </div>
      <div>
        <label className="block">Categoria</label>
        <select name="categoryId" value={form.categoryId} onChange={handleChange} className="w-full border p-2 rounded" required>
          <option value="">Selecione...</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block">Código Único</label>
        <input name="code" value={form.code} onChange={handleChange} className="w-full border p-2 rounded" required />
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Salvar</button>
    </form>
  );
}