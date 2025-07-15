import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Category, Product } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import ProductCard from '../components/ProductCard';

interface ProductsProps {
  category: Category;
  onProductSelect: (product: Product) => void;
  onBack: () => void;
}

const Products: React.FC<ProductsProps> = ({ category, onProductSelect, onBack }) => {
  const { language, t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-100">
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onBack}
            className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm text-gray-700 px-6 py-3 rounded-xl hover:bg-white/90 transition-all duration-300 shadow-lg"
          >
            {language === 'ar' ? <ArrowRight className="h-5 w-5" /> : <ArrowLeft className="h-5 w-5" />}
            <span className="font-medium">{t('backToCategories')}</span>
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
            {category.name_translations[language]}
          </h1>
          <p className="text-xl text-gray-600">
            {category.products.length} {t('products')}
          </p>
        </motion.div>

        {category.products.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-gray-500 text-2xl">{t('noProducts')}</div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {category.products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={onProductSelect}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;