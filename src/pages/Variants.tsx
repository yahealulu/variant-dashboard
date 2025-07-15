import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Product, Variant, apiService } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import VariantCard from '../components/VariantCard';
import Loading from '../components/Loading';

interface VariantsProps {
  product: Product;
  onVariantSelect: (variant: Variant) => void;
  onBack: () => void;
}

const Variants: React.FC<VariantsProps> = ({ product, onVariantSelect, onBack }) => {
  const { language, t } = useLanguage();
  const [variants, setVariants] = useState<Variant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVariants = async () => {
      try {
        setLoading(true);
        const data = await apiService.getProductVariants(product.id);
        setVariants(data);
      } catch (err) {
        setError('Failed to fetch variants');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchVariants();
  }, [product.id]);

  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">{error}</div>
          <button 
            onClick={() => window.location.reload()}
            className="bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-100">
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
            <span className="font-medium">{t('backToProducts')}</span>
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
            {product.name_translations[language]}
          </h1>
          <p className="text-xl text-gray-600">
            {variants.length} {t('variants')}
          </p>
        </motion.div>

        {variants.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-gray-500 text-2xl">{t('noVariants')}</div>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {variants.map((variant, index) => (
              <VariantCard
                key={variant.id}
                variant={variant}
                onClick={onVariantSelect}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Variants;