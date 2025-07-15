import React from 'react';
import { motion } from 'framer-motion';
import { Package, ArrowRight, ArrowLeft, Weight, Box } from 'lucide-react';
import { Variant, apiService } from '../services/api';
import { useLanguage } from '../context/LanguageContext';

interface VariantCardProps {
  variant: Variant;
  onClick: (variant: Variant) => void;
  index: number;
}

const VariantCard: React.FC<VariantCardProps> = ({ variant, onClick, index }) => {
  const { language, t } = useLanguage();
  const imageUrl = apiService.getImageUrl(variant.image);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateZ: -2 }}
      animate={{ opacity: 1, y: 0, rotateZ: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 140
      }}
      whileHover={{ 
        scale: 1.02,
        rotateZ: 1,
        transition: { duration: 0.3 }
      }}
      className="group cursor-pointer"
      onClick={() => onClick(variant)}
    >
      <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden transform-gpu border border-gray-100">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="relative p-5">
          <div className="flex items-start justify-between mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
              {imageUrl ? (
                <img 
                  src={imageUrl} 
                  alt={variant.size}
                  className="w-12 h-12 object-cover rounded-xl"
                />
              ) : (
                <Package className="h-8 w-8 text-white" />
              )}
            </div>
            <div className={`w-4 h-4 rounded-full ${variant.in_stock ? 'bg-green-500' : 'bg-red-500'} shadow-sm`}></div>
          </div>
          
          <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-orange-700 transition-colors">
            {variant.size}
          </h3>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 flex items-center">
                <Weight className="h-4 w-4 mr-1" />
                {t('weight')}
              </span>
              <span className="font-medium text-gray-800">{variant.net_weight}g</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 flex items-center">
                <Box className="h-4 w-4 mr-1" />
                {t('packaging')}
              </span>
              <span className="font-medium text-gray-800">{variant.packaging}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {variant.barcode}
            </span>
            <motion.div
              className="text-orange-500 group-hover:text-orange-700 transition-colors"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              {language === 'ar' ? <ArrowLeft className="h-5 w-5" /> : <ArrowRight className="h-5 w-5" />}
            </motion.div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-red-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
      </div>
    </motion.div>
  );
};

export default VariantCard;