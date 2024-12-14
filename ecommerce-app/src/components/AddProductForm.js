import React, { useState } from 'react';

const AddProductForm = ({ onAdd }) => {
  const [category, setCategory] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  
  // For Halls
  const [location, setLocation] = useState('');
  const [capacity, setCapacity] = useState('');
  const [amenities, setAmenities] = useState([]);

  // For Catering
  const [cuisineType, setCuisineType] = useState('');
  const [menuOptions, setMenuOptions] = useState([]);
  const [dietaryOptions, setDietaryOptions] = useState([]);

  // For Decor
  const [style, setStyle] = useState('');
  const [availableItems, setAvailableItems] = useState([]);
  const [customizationOptions, setCustomizationOptions] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('category', category);
    formData.append('image', image);

    // Append category-specific fields
    if (category === 'Hall') {
      formData.append('location', location);
      formData.append('capacity', capacity);
      formData.append('amenities', JSON.stringify(amenities));
    } else if (category === 'Catering') {
      formData.append('cuisineType', cuisineType);
      formData.append('menuOptions', JSON.stringify(menuOptions));
      formData.append('dietaryOptions', JSON.stringify(dietaryOptions));
    } else if (category === 'Decor') {
      formData.append('style', style);
      formData.append('availableItems', JSON.stringify(availableItems));
      formData.append('customizationOptions', JSON.stringify(customizationOptions));
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/addproduct', {
        method: 'POST',
        body: formData,
      });

      const newProduct = await response.json();
      onAdd(newProduct);
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.formGroup}>
        <label style={styles.label}>Category:</label>
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            // Reset other fields when category changes
            setName('');
            setPrice('');
            setImage(null);
            setLocation('');
            setCapacity('');
            setAmenities([]);
            setCuisineType('');
            setMenuOptions([]);
            setDietaryOptions([]);
            setStyle('');
            setAvailableItems([]);
            setCustomizationOptions([]);
          }}
          required
          style={styles.select}
        >
          <option value="" disabled>Select a category</option>
          <option value="Hall">Hall</option>
          <option value="Decor">Decor</option>
          <option value="Catering">Catering</option>
        </select>
      </div>

      <div style={styles.formGroup}>
        <label style={styles.label}>Product Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={styles.input}
        />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label}>Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          style={styles.input}
        />
      </div>

      {category === 'Hall' && (
        <>
          <div style={styles.formGroup}>
            <label style={styles.label}>Location:</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Capacity:</label>
            <input
              type="number"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Amenities:</label>
            <input
              type="text"
              value={amenities}
              onChange={(e) => setAmenities(e.target.value.split(','))}
              placeholder="Enter amenities separated by commas"
              style={styles.input}
            />
          </div>
        </>
      )}

      {category === 'Catering' && (
        <>
          <div style={styles.formGroup}>
            <label style={styles.label}>Cuisine Type:</label>
            <input
              type="text"
              value={cuisineType}
              onChange={(e) => setCuisineType(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Menu Options:</label>
            <input
              type="text"
              value={menuOptions}
              onChange={(e) => setMenuOptions(e.target.value.split(','))}
              placeholder="Enter menu options separated by commas"
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Dietary Options:</label>
            <input
              type="text"
              value={dietaryOptions}
              onChange={(e) => setDietaryOptions(e.target.value.split(','))}
              placeholder="Enter dietary options separated by commas"
              style={styles.input}
            />
          </div>
        </>
      )}

      {category === 'Decor' && (
        <>
          <div style={styles.formGroup}>
            <label style={styles.label}>Style:</label>
            <input
              type="text"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Available Items:</label>
            <input
              type="text"
              value={availableItems}
              onChange={(e) => setAvailableItems(e.target.value.split(','))}
              placeholder="Enter available items separated by commas"
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Customization Options:</label>
            <input
              type="text"
              value={customizationOptions}
              onChange={(e) => setCustomizationOptions(e.target.value.split(','))}
              placeholder="Enter customization options separated by commas"
              style={styles.input}
            />
          </div>
        </>
      )}

      <div style={styles.formGroup}>
        <label style={styles.label}>Upload Image:</label>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          required
          style={styles.fileInput}
        />
      </div>
      <button type="submit" style={styles.submitButton}>Add Product</button>
    </form>
  );
};

const styles = {
  form: {
    backgroundColor: '#1a1a1a',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '500px',
    margin: '0 auto',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    color: '#ffffff',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #333333',
    backgroundColor: '#2a2a2a',
    color: '#ffffff',
  },
  select: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #333333',
    backgroundColor: '#2a2a2a',
    color: '#ffffff',
  },
  fileInput: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #333333',
    backgroundColor: '#2a2a2a',
    color: '#ffffff',
  },
  submitButton: {
    backgroundColor: '#ff6600',
    color: '#ffffff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
  },
};

export default AddProductForm;