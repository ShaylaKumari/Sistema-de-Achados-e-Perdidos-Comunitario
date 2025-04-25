import React, { useState } from 'react';

export default function SearchFilter({ onChange }) {
  const [search, setSearch] = useState('');

  const handleSearch = () => onChange({ title: search });

  return (
    <div className="flex space-x-2 mb-4">
      <input
        type="text"
        placeholder="Pesquisar..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="border p-2 rounded flex-grow"
      />
      <button onClick={handleSearch} className="px-4 py-2 bg-gray-300 rounded">Filtrar</button>
    </div>
  );
}
