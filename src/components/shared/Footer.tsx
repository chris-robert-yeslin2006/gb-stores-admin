
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="logo-circle">GB</div>
              <span className="font-semibold text-xl">stores</span>
            </Link>
            <p className="text-gray-500">
              Premium fashion, footwear, and gadgets for style enthusiasts.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/store?category=shoes" className="text-gray-500 hover:text-brand-secondary">
                  Shoes
                </Link>
              </li>
              <li>
                <Link to="/store?category=clothing" className="text-gray-500 hover:text-brand-secondary">
                  Clothing
                </Link>
              </li>
              <li>
                <Link to="/store?category=gadgets" className="text-gray-500 hover:text-brand-secondary">
                  Gadgets
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-500 hover:text-brand-secondary">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Help */}
          <div>
            <h3 className="font-semibold mb-4">Help</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-gray-500 hover:text-brand-secondary">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-500 hover:text-brand-secondary">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-500 hover:text-brand-secondary">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-500 hover:text-brand-secondary">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          
          {/* WhatsApp Join */}
          <div>
            <h3 className="font-semibold mb-4">Stay Connected</h3>
            <p className="text-gray-500 mb-4">
              Join our WhatsApp group for exclusive deals and updates.
            </p>
            <a 
              href="https://chat.whatsapp.com/your-group-link" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white transition-colors"
            >
              Join WhatsApp Group
            </a>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} GB Stores. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <a href="#" className="text-gray-500 hover:text-brand-secondary">
              Terms of Service
            </a>
            <a href="#" className="text-gray-500 hover:text-brand-secondary">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
