import React, { useState, useEffect } from 'react';
import { fetchItems } from '../services/api';
import ItemTable from '../components/ItemTable';
import SearchFilter from '../components/SearchFilter';

export default function ItemList() {
  const [items, setItems] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    load();
  }, [filters]);

  const load = () => fetchItems(filters).then(res => setItems(res.data));

  return (
    <div>
      <h1 className="text-2xl mb-4">Lista de Itens</h1>
      <SearchFilter onChange={setFilters} />
      <ItemTable items={items} />
    </div>
  );
}