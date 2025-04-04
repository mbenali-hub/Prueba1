import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { data } from 'react-router-dom';

function ProductList () {
  
  const API_URL="http://localhost:8888";
  const[products, setProducts]=useState([]);
  const[loading,setLoading]=useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_URL}/autores`);
        
        if (!response.ok) {
          throw new Error('Error al obtener los datos');
        }
        
        const data = await response.json();
        
        // Verificación adicional para asegurar que es un array
        if (Array.isArray(data)) {
            setProducts(data);
        } else {
          throw new Error('La respuesta no es un array');
        }
        
      } catch (err) {
        setError(err.message);
        setProducts([]); // Aseguramos que people sea array incluso con error
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Lista de Personas</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.nombre} - Edad: {product.edad}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default ProductList;
