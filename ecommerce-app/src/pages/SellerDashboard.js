import React, { useEffect, useState } from 'react';
import AddProductForm from '../components/AddProductForm';

const SellerDashboard = () => {
  const  [products, setProducts] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/getproduct');
        const data = await response.json();
        
        const allProducts = [...data.halls || [], ...data.decors || [], ...data.caterings || []];
        setProducts(allProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = (newProduct) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
    setShowAddForm(false);
  };

  const handleRemoveProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/auth/removeproduct/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));
      } else {
        console.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error removing product:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Seller Dashboard</h1>
      <button onClick={() => setShowAddForm(!showAddForm)} style={styles.addButton}>
        {showAddForm ? 'Cancel' : 'Add New Product'}
      </button>

      {showAddForm && <AddProductForm onAdd={handleAddProduct} />}

      <h2 style={styles.subtitle}>Product List</h2>
      {products.length === 0 ? (
        <p style={styles.noProducts}>No products available</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Price</th>
              <th style={styles.th}>Category</th>
              <th style={styles.th}>Image</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} style={styles.tr}>
                <td style={styles.td}>{product.name}</td>
                <td style={styles.td}>${product.price}</td>
                <td style={styles.td}>{product.category}</td>
                <td style={styles.td}>
                  <img src={`http://localhost:5000/uploads/${product.image}`} alt={product.name} style={styles.productImage} />
                </td>
                <td style={styles.td}>
                  <button onClick={() => handleRemoveProduct(product._id)} style={styles.removeButton}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#1a1a1a',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(255, 102, 0, 0.1)',
  },
  title: {
    color: '#ff6600',
    textAlign: 'center',
    marginBottom: '20px',
  },
  subtitle: {
    color: '#ffffff',
    marginTop: '30px',
    marginBottom: '15px',
  },
  addButton: {
    backgroundColor: '#ff6600',
    color: '#ffffff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    backgroundColor: '#333333',
    color: '#ffffff',
    padding: '10px',
    textAlign: 'left',
  },
  tr: {
    borderBottom: '1px solid #333333',
  },
  td: {
    padding: '10px',
    color: '#cccccc',
  },
  productImage: {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    borderRadius: '4px',
  },
  removeButton: {
    backgroundColor: '#f44336',
    color: '#ffffff',
    padding: '5px 10px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  noProducts: {
    color: '#cccccc',
    textAlign: 'center',
  },
};

export default SellerDashboard;