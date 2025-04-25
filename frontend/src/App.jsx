import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import AddItem from './pages/AddItem';
import ItemList from './pages/ItemList';
import EditItem from './pages/EditItem';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow p-4 flex space-x-4">
        <Link to="/" className="font-semibold">Listar Itens</Link>
        <Link to="/add" className="font-semibold">Cadastrar Item</Link>
        <Link to="/edit" className="font-semibold">Editar/Remover</Link>
      </nav>
      <main className="p-6">
        <Routes>
          <Route path="/" element={<ItemList />} />
          <Route path="/add" element={<AddItem />} />
          <Route path="/edit" element={<EditItem />} />
        </Routes>
      </main>
    </div>
  );
}