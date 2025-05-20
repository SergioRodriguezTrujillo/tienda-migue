"use client"

import { useState } from "react"
import { ArrowRight, ArrowLeft, Filter, X } from "lucide-react"
import ProductCard from "../components/ProductCard"
import "./ShopPage.css"

const ShopPage = () => {
  const [showFilters, setShowFilters] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedColors, setSelectedColors] = useState([])
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [sortBy, setSortBy] = useState("featured")

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const toggleColor = (color) => {
    setSelectedColors((prev) => (prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]))
  }

  const handlePriceChange = (e, index) => {
    const newRange = [...priceRange]
    newRange[index] = Number.parseInt(e.target.value)
    setPriceRange(newRange)
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedColors([])
    setPriceRange([0, 1000])
  }

  const products = [
    {
      id: 1,
      name: "Kit Gamer_AVA Monitor LG",
      price: 230,
      originalPrice: 250,
      discount: 35,
      rating: 5,
      reviewCount: 88,
      colors: ["black", "blue"],
      image: "/gaming-kit.jpg",
      category: "Gaming",
    },
    {
      id: 2,
      name: "ROLT-120V",
      price: 135,
      originalPrice: 145,
      discount: 35,
      rating: 4,
      reviewCount: 75,
      colors: ["black", "blue"],
      image: "/rolt-120v.jpg",
      category: "Accesorios",
    },
    {
      id: 3,
      name: "Cable IP67-SORT",
      price: 2.5,
      originalPrice: 3,
      discount: 35,
      rating: 5,
      reviewCount: 99,
      colors: ["black", "blue"],
      image: "/cable.jpg",
      category: "Cables",
    },
    {
      id: 4,
      name: "Memoria RAM 16GB RGB 3200Hz",
      price: 10,
      originalPrice: 15,
      discount: 35,
      rating: 5,
      reviewCount: 99,
      colors: ["black", "blue"],
      image: "/ram.jpg",
      category: "Componentes",
    },
    {
      id: 5,
      name: "Teclado Mecánico RGB",
      price: 45,
      originalPrice: 60,
      discount: 35,
      rating: 4,
      reviewCount: 120,
      colors: ["black", "blue"],
      image: "/keyboard.jpg",
      category: "Periféricos",
    },
    {
      id: 6,
      name: "Mouse Gaming 16000 DPI",
      price: 25,
      originalPrice: 35,
      discount: 35,
      rating: 4,
      reviewCount: 85,
      colors: ["black", "blue"],
      image: "/mouse.jpg",
      category: "Periféricos",
    },
    {
      id: 7,
      name: "SSD 500GB",
      price: 65,
      originalPrice: 80,
      discount: 35,
      rating: 5,
      reviewCount: 150,
      colors: ["black"],
      image: "/ssd.jpg",
      category: "Almacenamiento",
    },
    {
      id: 8,
      name: 'Monitor 27" 144Hz',
      price: 180,
      originalPrice: 220,
      discount: 35,
      rating: 4,
      reviewCount: 78,
      colors: ["black"],
      image: "/monitor.jpg",
      category: "Monitores",
    },
  ]

  // Filtrar productos
  const filteredProducts = products.filter((product) => {
    // Filtrar por categoría
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
      return false
    }

    // Filtrar por color
    if (selectedColors.length > 0 && !product.colors.some((color) => selectedColors.includes(color))) {
      return false
    }

    // Filtrar por precio
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false
    }

    return true
  })

  // Ordenar productos
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "newest":
        return new Date(b.date) - new Date(a.date)
      case "rating":
        return b.rating - a.rating
      default:
        return 0
    }
  })

  return (
    <div className="shop-page">
      <div className="container">
        <div className="shop-header">
          <h1 className="shop-title">Tienda</h1>

          <div className="shop-actions">
            <button className="filter-toggle" onClick={() => setShowFilters(!showFilters)}>
              <Filter size={16} strokeWidth={1.5} /> Filtros
            </button>

            <div className="sort-select">
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="featured">Destacados</option>
                <option value="price-low">Precio: Menor a Mayor</option>
                <option value="price-high">Precio: Mayor a Menor</option>
                <option value="newest">Más Recientes</option>
                <option value="rating">Mejor Valorados</option>
              </select>
            </div>
          </div>
        </div>

        <div className="shop-content">
          <aside className={`shop-sidebar ${showFilters ? "active" : ""}`}>
            <div className="sidebar-header">
              <h3>Filtros</h3>
              <button className="close-filters" onClick={() => setShowFilters(false)}>
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            <div className="filter-section">
              <h4>Categorías</h4>
              <div className="filter-options">
                <label className="filter-option">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes("Gaming")}
                    onChange={() => toggleCategory("Gaming")}
                  />
                  Gaming
                </label>
                <label className="filter-option">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes("Accesorios")}
                    onChange={() => toggleCategory("Accesorios")}
                  />
                  Accesorios
                </label>
                <label className="filter-option">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes("Cables")}
                    onChange={() => toggleCategory("Cables")}
                  />
                  Cables
                </label>
                <label className="filter-option">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes("Componentes")}
                    onChange={() => toggleCategory("Componentes")}
                  />
                  Componentes
                </label>
                <label className="filter-option">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes("Periféricos")}
                    onChange={() => toggleCategory("Periféricos")}
                  />
                  Periféricos
                </label>
                <label className="filter-option">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes("Almacenamiento")}
                    onChange={() => toggleCategory("Almacenamiento")}
                  />
                  Almacenamiento
                </label>
                <label className="filter-option">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes("Monitores")}
                    onChange={() => toggleCategory("Monitores")}
                  />
                  Monitores
                </label>
              </div>
            </div>

            <div className="filter-section">
              <h4>Color</h4>
              <div className="filter-options">
                <label className="filter-option">
                  <input
                    type="checkbox"
                    checked={selectedColors.includes("black")}
                    onChange={() => toggleColor("black")}
                  />
                  Negro
                </label>
                <label className="filter-option">
                  <input
                    type="checkbox"
                    checked={selectedColors.includes("blue")}
                    onChange={() => toggleColor("blue")}
                  />
                  Azul
                </label>
              </div>
            </div>

            <div className="filter-section">
              <h4>Precio</h4>
              <div className="price-range">
                <div className="price-inputs">
                  <input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => handlePriceChange(e, 0)}
                    min="0"
                    max={priceRange[1]}
                  />
                  <span>-</span>
                  <input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => handlePriceChange(e, 1)}
                    min={priceRange[0]}
                    max="1000"
                  />
                </div>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange[0]}
                  onChange={(e) => handlePriceChange(e, 0)}
                  className="price-slider"
                />
                <input
                  type="range"
                  min="0"
                  max="1000"
                  value={priceRange[1]}
                  onChange={(e) => handlePriceChange(e, 1)}
                  className="price-slider"
                />
              </div>
            </div>

            <button className="clear-filters" onClick={clearFilters}>
              Limpiar Filtros
            </button>
          </aside>

          <div className="shop-products">
            <div className="products-grid">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {sortedProducts.length === 0 && (
              <div className="no-products">
                <p>No se encontraron productos con los filtros seleccionados.</p>
              </div>
            )}

            <div className="pagination">
              <button className="pagination-arrow prev">
                <ArrowLeft size={16} strokeWidth={1.5} />
              </button>
              <div className="pagination-numbers">
                <span className="pagination-number active">1</span>
                <span className="pagination-number">2</span>
                <span className="pagination-number">3</span>
                <span className="pagination-dots">...</span>
                <span className="pagination-number">10</span>
              </div>
              <button className="pagination-arrow next">
                <ArrowRight size={16} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShopPage
