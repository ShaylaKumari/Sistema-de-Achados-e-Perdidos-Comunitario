import React, { useState, useEffect } from 'react';
import { fetchCategories } from '../services/api';

export default function ItemForm({ initialData = {}, onSubmit }) {
  const [form, setForm] = useState({
    name: initialData.name || '',
    categoryId: initialData.category?.id || '',
    date: initialData.date?.split('T')[0] || '',
    location: initialData.location || '',
    contact: initialData.contact || '',
    status: initialData.status || 'Perdido',
    photo: null,
    userName: ''
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories().then(res => setCategories(res.data));
    if (initialData.user) {
      setForm(f => ({ ...f, userName: initialData.user.name }));
    }
  }, []);

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === 'photo') return setForm(f => ({ ...f, photo: files[0] }));
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
      <div>
        <label className="block font-medium">Nome do Item</label>
        <input name="name" value={form.name} onChange={handleChange} required className="w-full border p-2 rounded" />
      </div>
      <div>
        <label>Categoria</label>
        <select name="categoryId" value={form.categoryId} onChange={handleChange} required className="w-full border p-2 rounded">
          <option value="">Selecione...</option>
          {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
        </select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label>Data</label>
          <input type="date" name="date" value={form.date} onChange={handleChange} required className="w-full border p-2 rounded" />
        </div>
        <div>
          <label>Localização</label>
          <input name="location" value={form.location} onChange={handleChange} required className="w-full border p-2 rounded" />
        </div>
      </div>
      <div>
        <label>Nome do Usuário</label>
        <input name="userName" value={form.userName} onChange={handleChange} required className="w-full border p-2 rounded" />
      </div>
      <div>
        <label>Contato (e-mail ou telefone)</label>
        <input name="contact" value={form.contact} onChange={handleChange} required className="w-full border p-2 rounded" />
      </div>
      <div>
        <label>Status</label>
        <select name="status" value={form.status} onChange={handleChange} className="w-full border p-2 rounded">
          <option value="Perdido">Perdido</option>
          <option value="Achado">Achado</option>
        </select>
      </div>
      <div>
        <label>Foto (opcional)</label>
        <input type="file" name="photo" accept="image/*" onChange={handleChange} />
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Salvar</button>
    </form>
  );
}