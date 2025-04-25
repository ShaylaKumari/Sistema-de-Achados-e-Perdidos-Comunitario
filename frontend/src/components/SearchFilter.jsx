import React, { useState, useEffect } from 'react';
import { fetchCategories } from '../services/api';

export default function SearchFilter({ onChange }) {
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({ category: '', location: '', status: '', keyword: '' });

  useEffect(() => { fetchCategories().then(res => setCategories(res.data)); }, []);

  const handleApply = () => onChange(filters);
  const handleChange = e => setFilters(f => ({ ...f, [e.target.name]: e.target.value }));

  return (
    <div className="bg-white p-4 rounded shadow mb-4 grid grid-cols-4 gap-4">
      <input name="keyword" placeholder="Pesquisar..." value={filters.keyword} onChange={handleChange} className="border p-2 rounded col-span-1" />
      <select name="category" value={filters.category} onChange={handleChange} className="border p-2 rounded">
        <option value="">Todas Categorias</option>
        {categories.map(cat => <option key={cat.id} value={cat.name}>{cat.name}</option>)}
      </select>
      <input name="location" placeholder="Local" value={filters.location} onChange={handleChange} className="border p-2 rounded" />
      <select name="status" value={filters.status} onChange={handleChange} className="border p-2 rounded">
        <option value="">Todos Status</option>
        <option value="Perdido">Perdido</option>
        <option value="Achado">Achado</option>
      </select>
      <button onClick={handleApply} className="col-span-4 px-4 py-2 bg-gray-300 rounded">Filtrar</button>
    </div>
  );
}