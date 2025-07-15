import React from 'react';
import { motion } from 'framer-motion';
import { Package, ArrowRight, ArrowLeft, Check, X } from 'lucide-react';
import { Product, apiService } from '../services/api';
import { useLanguage } from '../context/LanguageContext';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick, index }) => {
  const { language, t } = useLanguage();
  const imageUrl = apiService.getImageUrl(product.image);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, rotateX: -10 }}
      animate={{ opacity: 1, scale: 1, rotateX: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 120
      }}
      whileHover={{ 
        scale: 1.03,
        rotateX: 5,
        transition: { duration: 0.3 }
      }}
      className="group cursor-pointer"
      onClick={() => onClick(product)}
    >
      <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden transform-gpu">
        <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="relative p-5">
          <div className="flex items-start justify-between mb-3">
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
              {imageUrl ? (
                <img 
                  src={imageUrl} 
                  alt={product.name_translations[language]}
                  className="w-10 h-10 object-cover rounded-lg"
                />
              ) : (
                <Package className="h-7 w-7 text-white" />
              )}
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${product.in_stock ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span className={`text-xs font-medium ${product.in_stock ? 'text-green-600' : 'text-red-600'}`}>
                {product.in_stock ? t('inStock') : t('outOfStock')}
              </span>
            </div>
          </div>
          
          <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-700 transition-colors line-clamp-2">
            {product.name_translations[language]}
          </h3>
          
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {product.description_translations[language]}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {product.product_code}
            </span>
            <motion.div
              className="text-blue-500 group-hover:text-blue-700 transition-colors"
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              {language === 'ar' ? <ArrowLeft className="h-5 w-5" /> : <ArrowRight className="h-5 w-5" />}
            </motion.div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
      </div>
    </motion.div>
  );
};

export default ProductCard;