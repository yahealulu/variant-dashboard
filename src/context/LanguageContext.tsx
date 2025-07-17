import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: 'en' | 'ar';
  setLanguage: (lang: 'en' | 'ar') => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    categories: 'Categories',
    products: 'Products',
    variants: 'Variants',
    uploadImage: 'Upload Image',
    backToCategories: 'Back to Categories',
    backToProducts: 'Back to Products',
    backToVariants: 'Back to Variants',
    productsCount: 'Products',
    selectImage: 'Select Image',
    dragDrop: 'Drag & drop an image here, or click to select',
    upload: 'Upload',
    uploading: 'Uploading...',
    uploadSuccess: 'Image uploaded successfully!',
    uploadError: 'Error uploading image',
    size: 'Size',
    weight: 'Weight',
    packaging: 'Packaging',
    inStock: 'In Stock',
    outOfStock: 'Out of Stock',
    loading: 'Loading...',
    noProducts: 'No products available',
    noVariants: 'No variants available',
    search: 'Search',
    searchVariants: 'Search Variants',
    searchVariantsDescription: 'Enter a variant ID to search for specific product variants',
    searchVariantPlaceholder: 'Enter variant ID...',
    searching: 'Searching...',
    searchError: 'Search Error',
    variantNotFound: 'Variant not found. Please check the ID and try again.',
    enterVariantId: 'Enter a variant ID to start searching'
  },
  ar: {
    categories: 'الفئات',
    products: 'المنتجات',
    variants: 'المتغيرات',
    uploadImage: 'رفع صورة',
    backToCategories: 'العودة للفئات',
    backToProducts: 'العودة للمنتجات',
    backToVariants: 'العودة للمتغيرات',
    productsCount: 'منتجات',
    selectImage: 'اختر صورة',
    dragDrop: 'اسحب وأسقط صورة هنا، أو انقر للاختيار',
    upload: 'رفع',
    uploading: 'جاري الرفع...',
    uploadSuccess: 'تم رفع الصورة بنجاح!',
    uploadError: 'خطأ في رفع الصورة',
    size: 'الحجم',
    weight: 'الوزن',
    packaging: 'التغليف',
    inStock: 'متوفر',
    outOfStock: 'غير متوفر',
    loading: 'جاري التحميل...',
    noProducts: 'لا توجد منتجات متاحة',
    noVariants: 'لا توجد متغيرات متاحة',
    search: 'بحث',
    searchVariants: 'البحث في المتغيرات',
    searchVariantsDescription: 'أدخل معرف المتغير للبحث عن متغيرات منتج محددة',
    searchVariantPlaceholder: 'أدخل معرف المتغير...',
    searching: 'جاري البحث...',
    searchError: 'خطأ في البحث',
    variantNotFound: 'المتغير غير موجود. يرجى التحقق من المعرف والمحاولة مرة أخرى.',
    enterVariantId: 'أدخل معرف المتغير لبدء البحث'
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'ar'>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div className={language === 'ar' ? 'rtl' : 'ltr'} dir={language === 'ar' ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};