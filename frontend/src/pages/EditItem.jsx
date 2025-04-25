import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import ItemForm from '../components/ItemForm';
import { fetchItemByCode, updateItem } from '../services/api';

export default function EditItem() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const navigate = useNavigate();
  const [itemData, setItemData] = useState(null);

  React.useEffect(() => {
    if (code) fetchItemByCode(code).then(res => setItemData(res.data));
  }, [code]);

  const handleUpdate = (data) => {
    updateItem(code, data).then(() => navigate('/'));
  };

  return (
    <div>
      <h1 className="text-2xl mb-4">Editar Item</h1>
      {itemData ? <ItemForm initialData={itemData} onSubmit={handleUpdate} /> : <p>Carregando...</p>}
    </div>
  );
}