import React from 'react';
import { motion } from 'framer-motion';
import { Package, ArrowRight, ArrowLeft } from 'lucide-react';
import { Category, apiService } from '../services/api';
import { useLanguage } from '../context/LanguageContext';

interface CategoryCardProps {
  category: Category;
  onClick: (category: Category) => void;
  index: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick, index }) => {
  const { language, t } = useLanguage();
  const imageUrl = apiService.getImageUrl(category.image);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateY: -15 }}
      animate={{ opacity: 1, y: 0, rotateY: 0 }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        y: -10, 
        rotateY: 5, 
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      className="group cursor-pointer"
      onClick={() => onClick(category)}
    >
      <div className="relative bg-white rounded-3xl shadow-lg overflow-hidden transform-gpu perspective-1000">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="relative p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
              {imageUrl ? (
                <img 
                  src={imageUrl} 
                  alt={category.name_translations[language]}
                  className="w-12 h-12 object-cover rounded-xl"
                />
              ) : (
                <Package className="h-8 w-8 text-white" />
              )}
            </div>
            <motion.div
              className="text-purple-500 group-hover:text-purple-700 transition-colors"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              {language === 'ar' ? <ArrowLeft className="h-6 w-6" /> : <ArrowRight className="h-6 w-6" />}
            </motion.div>
          </div>
          
          <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-purple-700 transition-colors">
            {category.name_translations[language]}
          </h3>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">{category.products_count} {t('productsCount')}</span>
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-bold text-purple-600">{category.products_count}</span>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
      </div>
    </motion.div>
  );
};

export default CategoryCard;