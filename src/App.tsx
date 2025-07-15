import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { Category, Product, Variant } from './services/api';
import Header from './components/Header';
import Categories from './pages/Categories';
import Products from './pages/Products';
import Variants from './pages/Variants';
import Upload from './pages/Upload';

type ViewType = 'categories' | 'products' | 'variants' | 'upload';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('categories');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    setCurrentView('products');
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('variants');
  };

  const handleVariantSelect = (variant: Variant) => {
    setSelectedVariant(variant);
    setCurrentView('upload');
  };

  const handleBackToCategories = () => {
    setCurrentView('categories');
    setSelectedCategory(null);
    setSelectedProduct(null);
    setSelectedVariant(null);
  };

  const handleBackToProducts = () => {
    setCurrentView('products');
    setSelectedProduct(null);
    setSelectedVariant(null);
  };

  const handleBackToVariants = () => {
    setCurrentView('variants');
    setSelectedVariant(null);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'categories':
        return <Categories onCategorySelect={handleCategorySelect} />;
      
      case 'products':
        return selectedCategory ? (
          <Products
            category={selectedCategory}
            onProductSelect={handleProductSelect}
            onBack={handleBackToCategories}
          />
        ) : null;
      
      case 'variants':
        return selectedProduct ? (
          <Variants
            product={selectedProduct}
            onVariantSelect={handleVariantSelect}
            onBack={handleBackToProducts}
          />
        ) : null;
      
      case 'upload':
        return selectedVariant ? (
          <Upload
            variant={selectedVariant}
            onBack={handleBackToVariants}
          />
        ) : null;
      
      default:
        return <Categories onCategorySelect={handleCategorySelect} />;
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
        <Header />
        {renderCurrentView()}
      </div>
    </LanguageProvider>
  );
}

export default App;