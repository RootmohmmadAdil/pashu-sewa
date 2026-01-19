import React from 'react';

const Footer = ({ text }) => {
  return (
    <footer>
      <p>
        {text || '© 2025 PashuSewa'} | <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a>
      </p>
    </footer>
  );
};

export default Footer;
