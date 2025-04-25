import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ItemForm from '../components/ItemForm';
import { fetchItems, updateItem } from '../services/api';

export default function EditItem() {
  const [searchParams] = useSearchParams();
  const codeParam = searchParams.get('code');
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    fetchItems({}).then(res => {
      const found = res.data.find(i => String(i.code) === codeParam);
      if (found) setFormData(found);
    });
  }, [codeParam]);

  const handleUpdate = async form => {
    const payload = {
      name: form.name,
      categoryId: form.categoryId,
      date: form.date,
      location: form.location,
      contact: form.contact,
      status: form.status
    };
    await updateItem(codeParam, payload);
    navigate('/');
  };

  return (
    <div>
      <h1 className="text-2xl mb-4">Editar Item</h1>
      {formData ? <ItemForm initialData={formData} onSubmit={handleUpdate} /> : <p>Carregando...</p>}
    </div>
  );
}
