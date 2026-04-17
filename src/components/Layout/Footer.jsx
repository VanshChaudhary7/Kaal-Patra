import './Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} KaalPatra. A system that forces you to confront yourself.</p>
        <div className="footer-links">
          <span>Contact Us</span>
          <span>Terms</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
