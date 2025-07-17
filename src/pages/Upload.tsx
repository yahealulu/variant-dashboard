import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle, XCircle } from 'lucide-react';
import { Variant, apiService } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import ImageUpload from '../components/ImageUpload';

interface UploadProps {
  variant: Variant | (Variant & { product_name: { en: string; ar: string } });
  onBack: () => void;
}

const Upload: React.FC<UploadProps> = ({ variant, onBack }) => {
  const { language, t } = useLanguage();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleUpload = async (file: File) => {
    try {
      setIsUploading(true);
      setUploadStatus('idle');
      
      await apiService.uploadVariantImage(variant.product_id, variant.id, file);
      setUploadStatus('success');
      
      setTimeout(() => {
        onBack();
      }, 2000);
    } catch (error) {
      setUploadStatus('error');
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const getVariantDisplayName = () => {
    if ('product_name' in variant) {
      return variant.product_name[language];
    }
    return variant.size;
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-100">
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
            <span className="font-medium">{t('backToVariants')}</span>
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            {t('uploadImage')}
          </h1>
          <p className="text-xl text-gray-600">
            {getVariantDisplayName()} - {variant.packaging}
          </p>
        </motion.div>

        {uploadStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto mb-8"
          >
            <div className="bg-green-100 border border-green-200 rounded-2xl p-6 text-center">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-green-800 mb-2">{t('uploadSuccess')}</h3>
              <p className="text-green-600">Redirecting back to variants...</p>
            </div>
          </motion.div>
        )}

        {uploadStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto mb-8"
          >
            <div className="bg-red-100 border border-red-200 rounded-2xl p-6 text-center">
              <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-red-800 mb-2">{t('uploadError')}</h3>
              <p className="text-red-600">Please try again</p>
            </div>
          </motion.div>
        )}

        <ImageUpload onUpload={handleUpload} isLoading={isUploading} />
      </div>
    </div>
  );
};

export default Upload;