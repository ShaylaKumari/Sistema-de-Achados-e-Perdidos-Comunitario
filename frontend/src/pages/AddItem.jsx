import React from 'react';
import { useNavigate } from 'react-router-dom';
import ItemForm from '../components/ItemForm';
import { createUser, createItem } from '../services/api';

export default function AddItem() {
  const navigate = useNavigate();
  const handleAdd = async form => {
    const userPayload = { name: form.userName };
    if (form.contact.includes('@')) userPayload.email = form.contact;
    else userPayload.phone = form.contact;
    const userRes = await createUser(userPayload);
  
    const data = new FormData();
    data.append('name', form.name);
    data.append('categoryId', form.categoryId);
    data.append('date', form.date);
    data.append('location', form.location);
    data.append('contact', form.contact);
    data.append('status', form.status);
    data.append('userId', userRes.data.id);
    if (form.photo) data.append('photo', form.photo);
    
    await createItem(data);
    navigate('/');
  };

  return (
    <div><h1 className="text-2xl mb-4">Cadastrar Item</h1><ItemForm onSubmit={handleAdd} /></div>
  );
}