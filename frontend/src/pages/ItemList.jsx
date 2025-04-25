import React, { useState, useEffect } from 'react';
import { fetchItems } from '../services/api';
import SearchFilter from '../components/SearchFilter';
import ItemTable from '../components/ItemTable';

export default function ItemList() {
  const [items, setItems] = useState([]);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const { keyword, ...apiFilters } = filters;
    fetchItems(apiFilters).then(res => {
      let data = res.data;
      if (keyword) data = data.filter(i => i.name.toLowerCase().includes(keyword.toLowerCase()));
      setItems(data);
    });
  }, [filters]);

  return (
    <div>
      <h1 className="text-2xl mb-4">Lista de Itens</h1>
      <SearchFilter onChange={setFilters} />
      <ItemTable items={items} />
    </div>
  );
}
