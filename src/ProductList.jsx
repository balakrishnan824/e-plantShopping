import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

// Builds a small illustrated thumbnail so the app works with no external image files.
// Swap `image` for real photo URLs whenever you like.
const thumb = (emoji, bg) =>
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300">` +
      `<rect width="300" height="300" fill="${bg}"/>` +
      `<text x="150" y="190" font-size="130" text-anchor="middle">${emoji}</text></svg>`
  );

const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { name: 'Snake Plant', image: thumb('🌿', '#dcebd5'), description: 'Produces oxygen at night and removes toxins.', cost: 15 },
      { name: 'Spider Plant', image: thumb('🌱', '#e4f0d0'), description: 'Filters formaldehyde and xylene from the air.', cost: 12 },
      { name: 'Peace Lily', image: thumb('🌼', '#f3efd6'), description: 'Removes mold spores and purifies the air.', cost: 18 },
      { name: 'Boston Fern', image: thumb('🍃', '#d3e8d8'), description: 'Adds humidity and removes pollutants.', cost: 20 },
      { name: 'Rubber Plant', image: thumb('🪴', '#d9e6df'), description: 'Easy to grow and absorbs airborne chemicals.', cost: 17 },
      { name: 'Aloe Vera', image: thumb('🌵', '#e1ecd2'), description: 'Purifies air and soothes minor burns.', cost: 14 },
    ],
  },
  {
    category: 'Aromatic Fragrant Plants',
    plants: [
      { name: 'Lavender', image: thumb('💜', '#e6def0'), description: 'Calming scent that promotes relaxation.', cost: 20 },
      { name: 'Jasmine', image: thumb('🤍', '#f4f1ea'), description: 'Sweet fragrance that lifts the mood.', cost: 18 },
      { name: 'Rosemary', image: thumb('🌿', '#dbe8d2'), description: 'Fragrant herb that sharpens focus.', cost: 15 },
      { name: 'Mint', image: thumb('🍃', '#d6ecdc'), description: 'Refreshing aroma, great for teas.', cost: 12 },
      { name: 'Lemon Balm', image: thumb('🍋', '#f2f0cc'), description: 'Citrus scent that eases stress.', cost: 14 },
      { name: 'Hyacinth', image: thumb('🌸', '#f0dfe8'), description: 'Rich perfume and bright spring blooms.', cost: 22 },
    ],
  },
  {
    category: 'Succulents and Cacti',
    plants: [
      { name: 'Echeveria', image: thumb('🪷', '#e9dfd3'), description: 'Rosette-shaped succulent in soft pastel tones.', cost: 10 },
      { name: 'Jade Plant', image: thumb('🪴', '#d5e7d4'), description: 'Thick glossy leaves, said to bring good luck.', cost: 16 },
      { name: 'Barrel Cactus', image: thumb('🌵', '#eadfc7'), description: 'Round, sturdy cactus that loves sun.', cost: 19 },
      { name: 'Zebra Haworthia', image: thumb('🌱', '#dfe9d9'), description: 'Striped leaves; thrives in low light.', cost: 11 },
      { name: 'String of Pearls', image: thumb('🫛', '#d8ead2'), description: 'Trailing strands of bead-like leaves.', cost: 21 },
      { name: 'Burro’s Tail', image: thumb('🌿', '#dbe7dc'), description: 'Cascading stems that look great in hanging pots.', cost: 17 },
    ],
  },
];

function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);

  // Total number of items shown on the cart icon
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // A plant's button is disabled whenever it is already in the cart
  const isInCart = (name) => cartItems.some((item) => item.name === name);

  const handleAddToCart = (plant) => {
    dispatch(addItem({ name: plant.name, image: plant.image, cost: plant.cost }));
  };

  const goHome = (e) => { e.preventDefault(); onHomeClick(); };
  const goPlants = (e) => { e.preventDefault(); setShowCart(false); };
  const goCart = (e) => { e.preventDefault(); setShowCart(true); };

  return (
    <div className="product-page">
      <nav className="navbar">
        <a href="#home" className="brand" onClick={goHome}>
          <span className="brand-name">Paradise Nursery</span>
          <span className="brand-sub">Where green meets serenity</span>
        </a>
        <div className="nav-links">
          <a href="#home" onClick={goHome}>Home</a>
          <a href="#plants" onClick={goPlants} aria-current={!showCart ? 'page' : undefined}>Plants</a>
          <a href="#cart" onClick={goCart} className="cart-link" aria-label={`Cart, ${totalQuantity} items`}>
            <svg viewBox="0 0 256 256" width="34" height="34" aria-hidden="true">
              <rect width="256" height="256" fill="none" />
              <circle cx="80" cy="216" r="12" fill="currentColor" />
              <circle cx="184" cy="216" r="12" fill="currentColor" />
              <path d="M42.3 72H221.7l-26.4 92.4A15.9 15.9 0 0 1 179.9 176H84.1a15.9 15.9 0 0 1-15.4-11.6L32.5 37.8A8 8 0 0 0 24.8 32H8"
                fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
            </svg>
            <span className="cart-count">{totalQuantity}</span>
          </a>
        </div>
      </nav>

      {showCart ? (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      ) : (
        <main className="plant-sections">
          {plantsArray.map((group) => (
            <section key={group.category} className="category">
              <h2 className="category-title">{group.category}</h2>
              <div className="product-grid">
                {group.plants.map((plant) => (
                  <article className="product-card" key={plant.name}>
                    <img className="product-image" src={plant.image} alt={plant.name} />
                    <h3 className="product-title">{plant.name}</h3>
                    <p className="product-description">{plant.description}</p>
                    <p className="product-price">${plant.cost}</p>
                    <button
                      className="product-button"
                      onClick={() => handleAddToCart(plant)}
                      disabled={isInCart(plant.name)}
                    >
                      {isInCart(plant.name) ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </main>
      )}
    </div>
  );
}

export default ProductList;
