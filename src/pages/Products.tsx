import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Filter, Grid, List, SortAsc } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const Products: React.FC = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');
  
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortBy, setSortBy] = useState('name');
  const [filterBy, setFilterBy] = useState({
    priceRange: [0, 1000],
    organic: false,
    inStock: true
  });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Mock products data
  const mockProducts = [
    {
      id: '1',
      name: 'Organic Tomatoes',
      price: 80,
      image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=400',
      seller: 'Green Valley Farm',
      rating: 4.8,
      reviews: 124,
      category: 'vegetables',
      inStock: true,
      organic: true
    },
    {
      id: '2',
      name: 'Fresh Mangoes',
      price: 120,
      image: 'https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg?auto=compress&cs=tinysrgb&w=400',
      seller: 'Sunshine Orchards',
      rating: 4.9,
      reviews: 89,
      category: 'fruits',
      inStock: true,
      organic: true
    },
    {
      id: '3',
      name: 'Farm Fresh Milk',
      price: 60,
      image: 'https://images.pexels.com/photos/416088/pexels-photo-416088.jpeg?auto=compress&cs=tinysrgb&w=400',
      seller: 'Happy Cow Dairy',
      rating: 4.7,
      reviews: 156,
      category: 'dairy',
      inStock: true
    },
    {
      id: '4',
      name: 'Handwoven Baskets',
      price: 250,
      image: 'https://images.pexels.com/photos/5767921/pexels-photo-5767921.jpeg?auto=compress&cs=tinysrgb&w=400',
      seller: 'Rural Crafts Co.',
      rating: 4.6,
      reviews: 67,
      category: 'handmade',
      inStock: true
    },
    {
      id: '5',
      name: 'Organic Carrots',
      price: 50,
      image: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg?auto=compress&cs=tinysrgb&w=400',
      seller: 'Green Valley Farm',
      rating: 4.5,
      reviews: 98,
      category: 'vegetables',
      inStock: true,
      organic: true
    },
    {
      id: '6',
      name: 'Fresh Apples',
      price: 100,
      image: 'https://images.pexels.com/photos/209339/pexels-photo-209339.jpeg?auto=compress&cs=tinysrgb&w=400',
      seller: 'Mountain Orchards',
      rating: 4.7,
      reviews: 134,
      category: 'fruits',
      inStock: true
    },
    {
      id: '7',
      name: 'Organic Wheat',
      price: 40,
      image: 'https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg?auto=compress&cs=tinysrgb&w=400',
      seller: 'Golden Harvest',
      rating: 4.6,
      reviews: 78,
      category: 'grains',
      inStock: true,
      organic: true
    },
    {
      id: '8',
      name: 'Handmade Pottery',
      price: 180,
      image: 'https://images.pexels.com/photos/1123767/pexels-photo-1123767.jpeg?auto=compress&cs=tinysrgb&w=400',
      seller: 'Clay Works Studio',
      rating: 4.8,
      reviews: 45,
      category: 'handmade',
      inStock: false
    }
  ];

  useEffect(() => {
    setProducts(mockProducts);
  }, []);

  useEffect(() => {
    let filtered = [...products];

    // Filter by category
    if (category) {
      filtered = filtered.filter(product => product.category === category);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.seller.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply filters
    if (filterBy.organic) {
      filtered = filtered.filter(product => product.organic);
    }

    if (filterBy.inStock) {
      filtered = filtered.filter(product => product.inStock);
    }

    filtered = filtered.filter(product =>
      product.price >= filterBy.priceRange[0] && product.price <= filterBy.priceRange[1]
    );

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  }, [products, category, searchQuery, filterBy, sortBy]);

  const getCategoryTitle = () => {
    if (searchQuery) return `Search results for "${searchQuery}"`;
    if (category) return category.charAt(0).toUpperCase() + category.slice(1);
    return 'All Products';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {getCategoryTitle()}
          </h1>
          <p className="text-gray-600">
            {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
          </p>
        </div>

        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="name">Sort by Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>

          {/* View Mode */}
          <div className="flex border border-gray-300 rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-green-500 text-white' : 'text-gray-600'}`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-green-500 text-white' : 'text-gray-600'}`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </h3>

            {/* Price Range */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={filterBy.priceRange[1]}
                  onChange={(e) => setFilterBy(prev => ({
                    ...prev,
                    priceRange: [0, parseInt(e.target.value)]
                  }))}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>₹0</span>
                  <span>₹{filterBy.priceRange[1]}</span>
                </div>
              </div>
            </div>

            {/* Organic Filter */}
            <div className="mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filterBy.organic}
                  onChange={(e) => setFilterBy(prev => ({
                    ...prev,
                    organic: e.target.checked
                  }))}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span className="ml-2 text-gray-900">Organic Only</span>
              </label>
            </div>

            {/* In Stock Filter */}
            <div className="mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={filterBy.inStock}
                  onChange={(e) => setFilterBy(prev => ({
                    ...prev,
                    inStock: e.target.checked
                  }))}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span className="ml-2 text-gray-900">In Stock Only</span>
              </label>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
            </div>
          ) : (
            <div className={`grid gap-6 ${
              viewMode === 'grid'
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                : 'grid-cols-1'
            }`}>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;