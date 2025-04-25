import React from 'react';
import { Link } from 'react-router-dom';
import { deleteItem } from '../services/api';

export default function ItemTable({ items }) {
  const handleDelete = (code) => {
    if (window.confirm('Deseja remover este item?')) {
      deleteItem(code).then(() => window.location.reload());
    }
  };

  return (
    <table className="w-full bg-white rounded shadow overflow-hidden">
      <thead className="bg-gray-200">
        <tr>
          <th className="p-2">Código</th>
          <th className="p-2">Título</th>
          <th className="p-2">Categoria</th>
          <th className="p-2">Ações</th>
        </tr>
      </thead>
      <tbody>
        {items.map(item => (
          <tr key={item.code} className="hover:bg-gray-50">
            <td className="p-2">{item.code}</td>
            <td className="p-2">{item.title}</td>
            <td className="p-2">{item.category.name}</td>
            <td className="p-2 space-x-2">
              <Link to={`/edit?code=${item.code}`} className="text-blue-500">Editar</Link>
              <button onClick={() => handleDelete(item.code)} className="text-red-500">Remover</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}