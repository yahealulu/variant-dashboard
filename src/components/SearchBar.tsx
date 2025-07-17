import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface SearchBarProps {
  onSearch: (variantId: string) => void;
  isLoading: boolean;
  onClear: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading, onClear }) => {
  const { t } = useLanguage();
  const [searchValue, setSearchValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      onSearch(searchValue.trim());
    }
  };

  const handleClear = () => {
    setSearchValue('');
    onClear();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl mx-auto mb-12"
    >
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="flex items-center">
            <div className="pl-6 pr-4 py-4">
              <Search className="h-6 w-6 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder={t('searchVariantPlaceholder')}
              className="flex-1 py-4 pr-4 text-lg bg-transparent border-none outline-none text-gray-800 placeholder-gray-400"
            />
            {searchValue && (
              <motion.button
                type="button"
                onClick={handleClear}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="mr-2 p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </motion.button>
            )}
            <motion.button
              type="submit"
              disabled={!searchValue.trim() || isLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="m-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white px-8 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isLoading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  />
                  <span>{t('searching')}</span>
                </>
              ) : (
                <span>{t('search')}</span>
              )}
            </motion.button>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default SearchBar;