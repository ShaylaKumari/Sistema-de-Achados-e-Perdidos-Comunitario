import React from 'react';
import { Link } from 'react-router-dom';
import { deleteItem } from '../services/api';

export default function ItemTable({ items }) {
  const handleDelete = code => { if (window.confirm('Remover este item?')) deleteItem(code).then(() => window.location.reload()); };

  return (
    <table className="w-full bg-white rounded shadow overflow-hidden">
      <thead className="bg-gray-200"><tr>
        <th className="p-2">Nome</th>
        <th className="p-2">Categoria</th>
        <th className="p-2">Data</th>
        <th className="p-2">Local</th>
        <th className="p-2">Contato</th>
        <th className="p-2">Status</th>
        <th className="p-2">Foto</th>
        <th className="p-2">Ações</th>
      </tr></thead>
      <tbody>{items.map(item => (
        <tr key={item.code} className="hover:bg-gray-50">
          <td className="p-2">{item.name}</td>
          <td className="p-2">{item.category?.name}</td>
          <td className="p-2">{new Date(item.date).toLocaleDateString()}</td>
          <td className="p-2">{item.location}</td>
          <td className="p-2">{item.user?.email || item.user?.phone}</td>
          <td className="p-2 capitalize">{item.status}</td>
          <td className="p-2">{item.photo && <img src={`${API_URL}/${item.photo}`} alt={item.name} className="h-12 w-12 object-cover rounded" />}</td>
          <td className="p-2 space-x-2">
            <Link to={`/edit?code=${item.code}`} className="text-blue-500">Editar</Link>
            <button onClick={() => handleDelete(item.code)} className="text-red-500">Remover</button>
          </td>
        </tr>
      ))}</tbody>
    </table>
  );
}