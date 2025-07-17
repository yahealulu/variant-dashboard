import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search as SearchIcon, AlertCircle } from 'lucide-react';
import { Variant, apiService } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import SearchBar from '../components/SearchBar';
import SearchResultCard from '../components/SearchResultCard';

interface SearchProps {
  onVariantSelect: (variant: Variant & { product_name: { en: string; ar: string } }) => void;
}

const Search: React.FC<SearchProps> = ({ onVariantSelect }) => {
  const { t } = useLanguage();
  const [searchResult, setSearchResult] = useState<(Variant & { product_name: { en: string; ar: string } }) | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (variantId: string) => {
    try {
      setIsLoading(true);
      setError(null);
      setSearchResult(null);
      
      const result = await apiService.getVariantById(parseInt(variantId));
      setSearchResult(result);
    } catch (err) {
      setError(t('variantNotFound'));
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setSearchResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <SearchIcon className="h-16 w-16 mx-auto text-purple-500 mb-4" />
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            {t('searchVariants')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('searchVariantsDescription')}
          </p>
        </motion.div>

        <SearchBar 
          onSearch={handleSearch} 
          isLoading={isLoading}
          onClear={handleClear}
        />

        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto mb-8"
          >
            <div className="bg-red-100 border border-red-200 rounded-2xl p-6 text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-red-800 mb-2">{t('searchError')}</h3>
              <p className="text-red-600">{error}</p>
            </div>
          </motion.div>
        )}

        {searchResult && (
          <SearchResultCard 
            variant={searchResult} 
            onClick={onVariantSelect}
          />
        )}

        {!searchResult && !error && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-gray-400 text-lg">{t('enterVariantId')}</div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Search;