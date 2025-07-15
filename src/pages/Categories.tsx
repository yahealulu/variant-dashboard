import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Category, apiService } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import CategoryCard from '../components/CategoryCard';
import Loading from '../components/Loading';

interface CategoriesProps {
  onCategorySelect: (category: Category) => void;
}

const Categories: React.FC<CategoriesProps> = ({ onCategorySelect }) => {
  const { t } = useLanguage();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await apiService.getCategories();
        setCategories(data);
      } catch (err) {
        setError('Failed to fetch categories');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">{error}</div>
          <button 
            onClick={() => window.location.reload()}
            className="bg-purple-500 text-white px-6 py-3 rounded-xl hover:bg-purple-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            {t('categories')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our extensive collection of high-quality products organized by categories
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.id}
              category={category}
              onClick={onCategorySelect}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;