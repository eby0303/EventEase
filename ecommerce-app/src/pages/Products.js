import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ChevronRight, Star } from 'lucide-react';

export default function Component() {
  const [products, setProducts] = useState({
    halls: [],
    decors: [],
    caterings: []
  });
  const [filteredProducts, setFilteredProducts] = useState({
    halls: [],
    decors: [],
    caterings: []
  });
  const [filter, setFilter] = useState('');
  
  const userId = sessionStorage.getItem('userId');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/getproduct');
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (filter === '') {
      setFilteredProducts(products);
    } else {
      const filtered = { ...products };
      Object.keys(filtered).forEach((categoryKey) => {
        filtered[categoryKey] = filtered[categoryKey].filter(
          (product) => product.category.toLowerCase() === filter.toLowerCase()
        );
      });
      setFilteredProducts(filtered);
    }
  }, [filter, products]);

  const renderProducts = (productList) => (
    productList.length > 0 ? (
      <div className="product-grid">
        {productList.map((product) => (
          <div key={product._id} className="product-card">
            <div className="product-image-container">
              <img 
                src={`http://localhost:5000/uploads/${product.image}`} 
                alt={product.name}
                className="product-image"
              />
            </div>
            <div className="product-content">
              <h3 className="product-title">{product.name}</h3>
              <div className="product-rating">
                <Star className="star-icon filled" />
                <Star className="star-icon filled" />
                <Star className="star-icon filled" />
                <Star className="star-icon filled" />
                <Star className="star-icon" />
                <span className="rating-text">(4.0)</span>
              </div>
              <p className='product-description'>{product.description || "No description available."}</p>
              <div className="product-footer">
                <span className="product-price">${product.price}</span>
                <a 
                  href={`/product/${product._id}`} 
                  className="view-details-button"
                >
                  View Details
                  <ChevronRight className="chevron-icon" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p className="no-products">No products available</p>
    )
  );

  return (
    <div className="products-page">
      <header className="page-header">
        <h1 className="page-title">Event Essentials</h1>
        <p className="page-subtitle">"Explore our diverse range of event services including elegant halls, exquisite decor, and delicious catering options. Whether you're planning a wedding, corporate event, or celebration, we have everything you need to create a memorable experience."</p>
      </header>

      <section className="filter-section">
        <ul className="filter-list">
          {['All', 'Hall', 'Decor', 'Catering'].map((category) => (
            <li key={category}>
              <button 
                onClick={() => setFilter(category === 'All' ? '' : category.toLowerCase())}
                className={`filter-button ${
                  (category === 'All' && filter === '') || category.toLowerCase() === filter
                    ? 'active'
                    : ''
                }`}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </section>

      <div className="product-sections">
        {(!filter || filter === 'hall') && (
          <section className="product-section">
            <h2 className="section-title">Halls</h2>
            {renderProducts(filteredProducts.halls)}
          </section>
        )}

        {(!filter || filter === 'decor') && (
          <section className="product-section">
            <h2 className="section-title">Decors</h2>
            {renderProducts(filteredProducts.decors)}
          </section>
        )}

        {(!filter || filter === 'catering') && (
          <section className="product-section">
            <h2 className="section-title">Catering</h2>
            {renderProducts(filteredProducts.caterings)}
          </section>
        )}
      </div>

      <style jsx>{`
        .products-page {
          min-height: 100vh;
          background-color: #1a1a1a;
          color: #ffffff;
          padding: 2rem;
        }

        .page-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .page-title {
          font-size: 2.5rem;
          font-weight: bold;
          color: #ff6600;
          margin-bottom: 0.5rem;
        }

        .page-subtitle {
          font-size: 1.25rem;
          color: #cccccc;
        }

        .filter-section {
          margin-bottom: 3rem;
        }

        .filter-list {
          display: flex;
          justify-content: center;
          list-style-type: none;
          padding: 0;
        }

        .filter-button {
          padding: 0.5rem 1rem;
          margin: 0 0.5rem;
          background-color: #333333;
          color: #ffffff;
          border: none;
          border-radius: 9999px;
          cursor: pointer;
          transition: background-color 0.3s, color 0.3s;
        }

        .filter-button:hover, .filter-button.active {
          background-color: #ff6600;
          color: #ffffff;
        }

        .product-sections {
          display: flex;
          flex-direction: column;
          gap: 4rem;
        }

        .product-section {
          margin-bottom: 2rem;
        }

        .section-title {
          font-size: 2rem;
          font-weight: 600;
          color: #ff6600;
          margin-bottom: 1.5rem;
        }

        .product-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }

        .product-card {
          background-color: #2a2a2a;
          border-radius: 0.5rem;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
        }

        .product-image-container {
          position: relative;
          padding-bottom: 66.67%; /* 2:3 aspect ratio */
        }

        .product-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .product-content {
          padding: 1.5rem;
        }

        .product-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #ffffff;
          margin-bottom: 0.5rem;
        }

        .product-rating {
          display: flex;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .star-icon {
          width: 1.25rem;
          height: 1.25rem;
          color: #cccccc;
        }

        .star-icon.filled {
          color: #fbbf24;
        }

        .rating-text {
          margin-left: 0.5rem;
          color: #cccccc;
          font-size: 0.875rem;
        }

        .product-description {
          color: #cccccc;
          font-size: 0.875rem;
          margin-bottom: 1rem;
        }

        .product-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .product-price {
          font-size: 1.5rem;
          font-weight: bold;
          color: #ff6600;
        }

        .view-details-button {
          display: inline-flex;
          align-items: center;
          padding: 0.5rem 1rem;
          background-color: #ff6600;
          color: #ffffff;
          text-decoration: none;
          border-radius: 0.25rem;
          font-size: 0.875rem;
          font-weight: 500;
          transition: background-color 0.3s;
        }

        .view-details-button:hover {
          background-color: #ff8533;
        }

        .chevron-icon {
          width: 1rem;
          height: 1rem;
          margin-left: 0.5rem;
        }

        .no-products {
          text-align: center;
          color: #cccccc;
          font-style: italic;
          font-size: 1.125rem;
        }

        @media (max-width: 768px) {
          .product-grid {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          }

          .filter-list {
            flex-wrap: wrap;
          }

          .filter-button {
            margin-bottom: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
}