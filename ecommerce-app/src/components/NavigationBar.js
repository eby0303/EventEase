import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { ShoppingCart, User, LogOut } from 'lucide-react';

const NavigationBar = () => {
  const { auth, logout } = useContext(AuthContext);

  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>
        <Link to="/" style={styles.link}>EventEase</Link>
      </h2>
      <ul style={styles.navList}>
        <li style={styles.navItem}>
          <Link to="/" style={styles.link}>Home</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/Products" style={styles.link}>Plan Your Event</Link>
        </li>
        <li style={styles.navItem}>
          <Link to="/cart" style={styles.link}>
            <ShoppingCart size={18} style={styles.icon} />
            Cart
          </Link>
        </li>
        {auth.isAuthenticated ? (
          <>
            {auth.role === 'seller' && (
              <li style={styles.navItem}>
                <Link to="/seller-dashboard" style={styles.link}>Dashboard</Link>
              </li>
            )}
            <li style={styles.navItem}>
              <button onClick={logout} style={styles.logoutButton}>
                <LogOut size={18} style={styles.icon} />
                Logout
              </button>
            </li>
          </>
        ) : (
          <li style={styles.navItem}>
            <Link to="/login" style={styles.link}>
              <User size={18} style={styles.icon} />
              Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

const styles = {
  nav: {
    position: 'sticky',
    top: 0,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#000000',
    color: '#fff',
    boxShadow: '0 2px 5px rgba(255,102,0,0.1)',
    zIndex: 1000,
  },
  logo: {
    margin: 0,
    color: '#ff6600',
  },
  navList: {
    display: 'flex',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    alignItems: 'center',
  },
  navItem: {
    marginLeft: '20px',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '500',
    position: 'relative',
    transition: 'color 0.3s ease',
    display: 'flex',
    alignItems: 'center',
  },
  logoutButton: {
    backgroundColor: '#ff6600',
    color: '#fff',
    border: 'none',
    padding: '8px 12px',
    cursor: 'pointer',
    borderRadius: '5px',
    fontWeight: '500',
    transition: 'background-color 0.3s ease',
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    marginRight: '5px',
  },
};

export default NavigationBar;