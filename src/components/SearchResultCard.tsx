import React from 'react';
import { motion } from 'framer-motion';
import { Package, ArrowRight, ArrowLeft, Weight, Box } from 'lucide-react';
import { Variant, apiService } from '../services/api';
import { useLanguage } from '../context/LanguageContext';

interface SearchResultCardProps {
  variant: Variant & { product_name: { en: string; ar: string } };
  onClick: (variant: Variant & { product_name: { en: string; ar: string } }) => void;
}

const SearchResultCard: React.FC<SearchResultCardProps> = ({ variant, onClick }) => {
  const { language, t } = useLanguage();
  const imageUrl = apiService.getImageUrl(variant.image);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl mx-auto"
    >
      <motion.div
        whileHover={{ 
          scale: 1.02,
          transition: { duration: 0.3 }
        }}
        className="group cursor-pointer"
        onClick={() => onClick(variant)}
      >
        <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden transform-gpu border border-gray-100">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <div className="relative p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-600 rounded-3xl flex items-center justify-center shadow-lg">
                {imageUrl ? (
                  <img 
                    src={imageUrl} 
                    alt={variant.size}
                    className="w-16 h-16 object-cover rounded-2xl"
                  />
                ) : (
                  <Package className="h-10 w-10 text-white" />
                )}
              </div>
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full ${variant.in_stock ? 'bg-green-500' : 'bg-red-500'} shadow-sm`}></div>
                <span className={`text-sm font-medium ${variant.in_stock ? 'text-green-600' : 'text-red-600'}`}>
                  {variant.in_stock ? t('inStock') : t('outOfStock')}
                </span>
              </div>
            </div>
            
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-purple-700 transition-colors">
                {variant.product_name[language]}
              </h2>
              <h3 className="text-xl font-semibold text-gray-600 mb-4">
                {variant.size}
              </h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 flex items-center">
                    <Weight className="h-4 w-4 mr-2" />
                    {t('weight')}
                  </span>
                  <span className="font-medium text-gray-800">{variant.net_weight}g</span>
                </div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 flex items-center">
                    <Box className="h-4 w-4 mr-2" />
                    {t('packaging')}
                  </span>
                  <span className="font-medium text-gray-800">{variant.packaging}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 bg-gray-100 px-4 py-2 rounded-full">
                ID: {variant.id} | {variant.barcode}
              </span>
              <motion.div
                className="text-purple-500 group-hover:text-purple-700 transition-colors"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                {language === 'ar' ? <ArrowLeft className="h-6 w-6" /> : <ArrowRight className="h-6 w-6" />}
              </motion.div>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SearchResultCard;