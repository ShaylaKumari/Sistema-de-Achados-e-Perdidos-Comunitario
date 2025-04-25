import React from 'react';
import ItemForm from '../components/ItemForm';
import { createItem } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function AddItem() {
  const navigate = useNavigate();
  const handleAdd = (data) => {
    createItem(data).then(() => navigate('/'));
  };

  return (
    <div>
      <h1 className="text-2xl mb-4">Cadastrar Item</h1>
      <ItemForm onSubmit={handleAdd} />
    </div>
  );
}