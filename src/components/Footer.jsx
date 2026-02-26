import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Github, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Shop: [
      { name: 'All Products', path: '/products' },
      { name: 'Electronics', path: '/products?category=Electronics' },
      { name: 'Fashion', path: '/products?category=Fashion' },
      { name: 'Sports', path: '/products?category=Sports' },
    ],
    Support: [
      { name: 'Contact Us', path: '#' },
      { name: 'FAQs', path: '#' },
      { name: 'Shipping Info', path: '#' },
      { name: 'Returns', path: '#' },
    ],
    Company: [
      { name: 'About Us', path: '#' },
      { name: 'Careers', path: '#' },
      { name: 'Privacy Policy', path: '#' },
      { name: 'Terms of Service', path: '#' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Github, href: '#', label: 'Github' },
  ];

  return (
    <footer className="bg-gray-50 dark:bg-dark-card border-t border-gray-200 dark:border-gray-800 mt-12 sm:mt-16 md:mt-20">
      <div className="container mx-auto px-4 py-8 sm:py-10 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg sm:text-xl">L</span>
              </div>
              <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                LuxeStore
              </span>
            </div>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 max-w-sm">
              Your premium destination for quality products. We bring you the best selection with unbeatable prices and exceptional service.
            </p>
            <div className="flex gap-2 sm:gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="p-2 bg-gray-200 dark:bg-dark-hover rounded-lg hover:bg-primary hover:text-white transition-colors"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 text-sm sm:text-base">
                {title}
              </h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-sm sm:text-base">
                Subscribe to our newsletter
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
                Get the latest updates on new products and upcoming sales
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
              <div className="relative flex-1 md:w-64 lg:w-80">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-2 sm:py-3 bg-white dark:bg-dark-hover border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-gray-900 dark:text-white text-sm sm:text-base"
                />
              </div>
              <button className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all font-semibold whitespace-nowrap text-sm sm:text-base">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-gray-600 dark:text-gray-400 text-xs sm:text-sm">
          <p>© {currentYear} LuxeStore. All rights reserved. Built with ❤️ using React & Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
