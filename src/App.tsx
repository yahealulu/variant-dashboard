import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { Category, Product, Variant } from './services/api';
import Header from './components/Header';
import Categories from './pages/Categories';
import Products from './pages/Products';
import Variants from './pages/Variants';
import Search from './pages/Search';
import Upload from './pages/Upload';

type ViewType = 'categories' | 'products' | 'variants' | 'upload' | 'search';

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('categories');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);
  const [searchedVariant, setSearchedVariant] = useState<(Variant & { product_name: { en: string; ar: string } }) | null>(null);

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

  const handleSearchVariantSelect = (variant: Variant & { product_name: { en: string; ar: string } }) => {
    setSearchedVariant(variant);
    setCurrentView('upload');
  };

  const handleSearchClick = () => {
    setCurrentView('search');
    setSelectedCategory(null);
    setSelectedProduct(null);
    setSelectedVariant(null);
    setSearchedVariant(null);
  };

  const handleBackToCategories = () => {
    setCurrentView('categories');
    setSelectedCategory(null);
    setSelectedProduct(null);
    setSelectedVariant(null);
    setSearchedVariant(null);
  };

  const handleBackToProducts = () => {
    setCurrentView('products');
    setSelectedProduct(null);
    setSelectedVariant(null);
    setSearchedVariant(null);
  };

  const handleBackToVariants = () => {
    setCurrentView('variants');
    setSelectedVariant(null);
    setSearchedVariant(null);
  };

  const handleBackToSearch = () => {
    setCurrentView('search');
    setSearchedVariant(null);
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
      
      case 'search':
        return <Search onVariantSelect={handleSearchVariantSelect} />;
      
      case 'upload':
        if (selectedVariant) {
          return (
            <Upload
              variant={selectedVariant}
              onBack={handleBackToVariants}
            />
          );
        } else if (searchedVariant) {
          return (
            <Upload
              variant={searchedVariant}
              onBack={handleBackToSearch}
            />
          );
        }
        return null;
      
      default:
        return <Categories onCategorySelect={handleCategorySelect} />;
    }
  };

  const shouldShowSearch = currentView === 'categories';

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
        <Header onSearchClick={handleSearchClick} showSearch={shouldShowSearch} />
        {renderCurrentView()}
      </div>
    </LanguageProvider>
  );
}

export default App;