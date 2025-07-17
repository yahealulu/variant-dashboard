import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Package, Search } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeaderProps {
  onSearchClick?: () => void;
  showSearch?: boolean;
}

const Header: React.FC<HeaderProps> = ({ onSearchClick, showSearch = true }) => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 text-white shadow-2xl"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
          >
            <Package className="h-8 w-8" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              SetAlkel
            </h1>
          </motion.div>

          <div className="flex items-center space-x-4">
            {showSearch && onSearchClick && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={onSearchClick}
                className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 hover:bg-white/30 transition-all duration-300"
              >
                <Search className="h-5 w-5" />
                <span className="font-medium">{t('search')}</span>
              </motion.button>
            )}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
              className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 hover:bg-white/30 transition-all duration-300"
            >
              <Globe className="h-5 w-5" />
              <span className="font-medium">{language === 'en' ? 'العربية' : 'English'}</span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;