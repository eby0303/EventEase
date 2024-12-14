import React from 'react';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        <div style={styles.grid}>
          <div>
            <h3 style={styles.title}>EventEase</h3>
            <p style={styles.description}>Creating unforgettable events, one celebration at a time.</p>
          </div>
          <div>
            <h4 style={styles.subtitle}>Quick Links</h4>
            <ul style={styles.list}>
              <li><a href="#" style={styles.link}>About Us</a></li>
              <li><a href="#" style={styles.link}>Services</a></li>
              <li><a href="#" style={styles.link}>Contact</a></li>
              <li><a href="#" style={styles.link}>FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 style={styles.subtitle}>Connect With Us</h4>
            <div style={styles.socialIcons}>
              <a href="#" style={styles.iconLink}><Facebook size={24} /></a>
              <a href="#" style={styles.iconLink}><Twitter size={24} /></a>
              <a href="#" style={styles.iconLink}><Instagram size={24} /></a>
              <a href="#" style={styles.iconLink}><Mail size={24} /></a>
            </div>
          </div>
        </div>
        <div style={styles.copyright}>
          <p>© 2024 EventEase. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: '#000000',
    color: '#ffffff',
    padding: '40px 0',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '40px',
  },
  title: {
    fontSize: '24px',
    color: '#ff6600',
    marginBottom: '20px',
  },
  subtitle: {
    fontSize: '18px',
    color: '#ff6600',
    marginBottom: '20px',
  },
  description: {
    color: '#cccccc',
  },
  list: {
    listStyle: 'none',
    padding: 0,
  },
  link: {
    color: '#cccccc',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
  },
  socialIcons: {
    display: 'flex',
    gap: '15px',
  },
  iconLink: {
    color: '#cccccc',
    transition: 'color 0.3s ease',
  },
  copyright: {
    borderTop: '1px solid #333333',
    marginTop: '40px',
    paddingTop: '20px',
    textAlign: 'center',
    color: '#cccccc',
  },
};

export default Footer;