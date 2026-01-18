import { useState, useEffect } from 'react';
import './Catering.css';
import Footer from './footer';

const BIN_OPTIONS = [
  { 
    id: 'tacos', 
    name: 'Taco Bin (40 tacos)', 
    price: 149.99, 
    description: '40 tacos - Choose up to 2 standard meats',
    quantity: 40,
    type: 'tacos'
  },
  { 
    id: 'tortas', 
    name: 'Torta Bin (10 tortas)', 
    price: 149.99, 
    description: '10 tortas - Choose up to 2 standard meats',
    quantity: 10,
    type: 'tortas'
  },
  { 
    id: 'burritos', 
    name: 'Burrito Bin (10 burritos)', 
    price: 149.99, 
    description: '10 burritos - Choose up to 2 standard meats',
    quantity: 10,
    type: 'burritos'
  },
  { 
    id: 'quesadillas', 
    name: 'Quesadilla Bin (10 quesadillas)', 
    price: 149.99, 
    description: '10 quesadillas - Choose up to 2 standard meats',
    quantity: 10,
    type: 'quesadillas'
  },
  { 
    id: 'smallhotdogs', 
    name: 'Cali Hot Dog Bin (15 Cali Hot Dogs)', 
    price: 124.99, 
    description: '15 Cali Hot Dogs - Bacon wrapped with Grilled Onions and Peppers',
    quantity: 15,
    type: 'smallhotdogs'
  },
  { 
    id: 'largehotdogs', 
    name: 'Cali Hot Dog Bin (30 Cali Hot Dogs)', 
    price: 249.99, 
    description: '30 Cali Hot Dogs - Bacon wrapped with Grilled Onions and Peppers',
    quantity: 30,
    type: 'largehotdogs'
  }
];

const MEAT_OPTIONS = [
  { id: 'chicken', name: 'Chicken', isStandard: true, upcharge: 0 },
  { id: 'asada', name: 'Carne Asada', isStandard: true, upcharge: 0 },
  { id: 'pastor', name: 'Al Pastor', isStandard: true, upcharge: 0 },
  { id: 'lengua', name: 'Lengua', isStandard: false, upcharge: 45 },
  { id: 'birria', name: 'Birria', isStandard: false, upcharge: 45 },
  { id: 'cabeza', name: 'Cabeza', isStandard: false, upcharge: 45 }
];

const SIDES_OPTIONS = [
  { id: 'rice_small', name: 'Mexican Rice (Small Bin)', price: 24.99, description: 'Traditional seasoned rice - serves 10-15 people' },
  { id: 'rice_large', name: 'Mexican Rice (Large Bin)', price: 49.99, description: 'Traditional seasoned rice - serves 25-30 people' },
  { id: 'beans_small', name: 'Refried Beans (Small Bin)', price: 24.99, description: 'Creamy refried beans - serves 10-15 people' },
  { id: 'beans_large', name: 'Refried Beans (Large Bin)', price: 49.99, description: 'Creamy refried beans - serves 25-30 people' },
  { id: 'guac', name: 'Guacamole', price: 24.99, description: 'Fresh avocado dip - 32oz Large Cup' },
  { id: 'pico', name: 'Pico de Gallo', price: 16.99, description: 'Fresh pico de gallo - 32oz Large Cup' },
  { id: 'greensalsa', name: 'Green Salsa', price: 24.99, description: 'Fresh mid-spicy green salsa - 32oz Large Cup' },
  { id: 'redsalsa', name: 'Red Salsa', price: 24.99, description: 'Fresh spicy red salsa - 32oz Large Cup' },
];

const DRINKS_OPTIONS = [
  { id: 'agua_de_horchata_gallon', name: 'Horchata (Gallon)', price: 64.99, description: 'Traditional rice drink - serves 8-10 people' },
  { id: 'agua_de_jamaica_gallon', name: 'Agua De Jamaica (Gallon)', price: 64.99, description: 'Traditional hibiscus drink - serves 8-10 people' },
  { id: 'agua_de_pina_gallon', name: 'Agua De PepinoPina (Gallon)', price: 64.99, description: 'Traditional cucumber/pineapple drink - serves 8-10 people' },
  { id: 'agua_de_mango_gallon', name: 'Agua De Mango (Gallon)', price: 64.99, description: 'Traditional mango drink - serves 8-10 people' },
  { id: 'sodas', name: 'Mexican Sodas', price: 4.25, description: 'Mexican Glass Sodas: Mexican Coke, Sprite, Fanta' },
];

function Catering() {
  const [selectedBins, setSelectedBins] = useState({});
  const [selectedMeats, setSelectedMeats] = useState({});
  const [selectedSides, setSelectedSides] = useState({});
  const [selectedDrinks, setSelectedDrinks] = useState({});
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    eventDate: '',
    eventTime: '',
    specialRequests: ''
  });
  const [totalPrice, setTotalPrice] = useState(0);

  // Calculate total price whenever selections change
  useEffect(() => {
    let total = 0;
    
    // Calculate bin prices with meat upcharges
    Object.entries(selectedBins).forEach(([binId, quantity]) => {
      if (quantity > 0) {
        const bin = BIN_OPTIONS.find(b => b.id === binId);
        const basePrice = bin.price * quantity;
        
        // Calculate meat upcharges for this bin
        const binMeats = selectedMeats[binId] || {};
        const upcharges = Object.entries(binMeats).reduce((sum, [meatId, selected]) => {
          if (selected) {
            const meat = MEAT_OPTIONS.find(m => m.id === meatId);
            return sum + (meat.upcharge * quantity);
          }
          return sum;
        }, 0);
        
        total += basePrice + upcharges;
      }
    });
    
    // Calculate sides price
    const sidesPrice = Object.entries(selectedSides).reduce((sum, [id, quantity]) => {
      const side = SIDES_OPTIONS.find(s => s.id === id);
      return sum + (side.price * quantity);
    }, 0);
    
    // Calculate drinks price
    const drinksPrice = Object.entries(selectedDrinks).reduce((sum, [id, quantity]) => {
      const drink = DRINKS_OPTIONS.find(d => d.id === id);
      return sum + (drink.price * quantity);
    }, 0);
    
    setTotalPrice(total + sidesPrice + drinksPrice);
  }, [selectedBins, selectedMeats, selectedSides, selectedDrinks]);

  const handleBinQuantityChange = (binId, quantity) => {
    setSelectedBins(prev => ({
      ...prev,
      [binId]: Math.max(0, quantity)
    }));
  };

  const handleMeatSelection = (binId, meatId, selected) => {
    setSelectedMeats(prev => {
      const binMeats = prev[binId] || {};
      const currentSelected = Object.values(binMeats).filter(Boolean).length;
      
      // Limit to 2 meats per bin
      if (selected && currentSelected >= 2) {
        alert('You can only select up to 2 meats per bin');
        return prev;
      }
      
      return {
        ...prev,
        [binId]: {
          ...binMeats,
          [meatId]: selected
        }
      };
    });
  };

  const handleQuantityChange = (category, itemId, quantity) => {
    const setters = {
      sides: setSelectedSides,
      drinks: setSelectedDrinks
    };
    
    setters[category](prev => ({
      ...prev,
      [itemId]: Math.max(0, quantity)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Prepare order details for Netlify form
    const formData = new FormData(e.target);
    
    // Add order summary data to form
    const orderSummary = {
      bins: Object.entries(selectedBins).map(([id, qty]) => {
        const bin = BIN_OPTIONS.find(b => b.id === id);
        const binMeats = selectedMeats[id] || {};
        const selectedMeatList = Object.entries(binMeats)
          .filter(([meatId, selected]) => selected)
          .map(([meatId]) => MEAT_OPTIONS.find(m => m.id === meatId));
        
        return {
          ...bin,
          quantity: qty,
          selectedMeats: selectedMeatList
        };
      }).filter(item => item.quantity > 0),
      sides: Object.entries(selectedSides).map(([id, qty]) => ({
        ...SIDES_OPTIONS.find(s => s.id === id),
        quantity: qty
      })).filter(item => item.quantity > 0),
      drinks: Object.entries(selectedDrinks).map(([id, qty]) => ({
        ...DRINKS_OPTIONS.find(d => d.id === id),
        quantity: qty
      })).filter(item => item.quantity > 0)
    };

    // Create formatted order details
    const orderDetails = `
BINS:
${orderSummary.bins.map(item => {
  const meatsText = item.selectedMeats.map(meat => 
    `${meat.name}${meat.upcharge > 0 ? ` (+$${meat.upcharge})` : ''}`
  ).join(', ');
  const binTotal = item.price + item.selectedMeats.reduce((sum, meat) => sum + meat.upcharge, 0);
  return `- ${item.name} x${item.quantity} - Meats: ${meatsText} ($${binTotal * item.quantity} total)`;
}).join('\n')}

SIDES:
${orderSummary.sides.map(item => `- ${item.name} x${item.quantity} ($${item.price} each)`).join('\n')}

DRINKS:
${orderSummary.drinks.map(item => `- ${item.name} x${item.quantity} ($${item.price} each)`).join('\n')}

TOTAL ESTIMATED PRICE: $${totalPrice.toFixed(2)}
    `.trim();

    // Add order details to form data
    formData.set('order-details', orderDetails);
    formData.set('total-price', `$${totalPrice.toFixed(2)}`);

    // Submit to Netlify
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString()
    })
    .then(() => {
      alert('Your catering request has been submitted successfully! We will contact you within 24 hours.');
      // Reset form
      setSelectedBins({});
      setSelectedMeats({});
      setSelectedSides({});
      setSelectedDrinks({});
      setCustomerInfo({
        name: '',
        email: '',
        phone: '',
        eventDate: '',
        eventTime: '',
        specialRequests: ''
      });
    })
    .catch((error) => {
      console.error('Form submission error:', error);
      alert('There was an error submitting your request. Please try again or call us directly.');
    });
  };

  const getTotalBins = () => {
    return Object.values(selectedBins).reduce((sum, qty) => sum + qty, 0);
  };

  return (
    <div className="catering-page">
      <div className="catering-hero">
        <div className="hero-content">
          <h1>Catering Services</h1>
          <p>Build your perfect catering package for any event!
          </p>
        </div>
      </div>

      <div className="catering-container">
        <div className="package-builder">
          <section className="bins-section">
            <h2> 🥡Choose Your Food Bins ({getTotalBins()} bins selected)</h2>
            <div className="items-grid">
              {BIN_OPTIONS.map(bin => (
                <div key={bin.id} className="bin-card">
                  <div className="bin-info">
                    <h3>{bin.name}</h3>
                    <p>{bin.description}</p>
                    <span className="price">${bin.price} per bin</span>
                  </div>
                  <div className="quantity-controls">
                    <button 
                      onClick={() => handleBinQuantityChange(bin.id, (selectedBins[bin.id] || 0) - 1)}
                      disabled={!selectedBins[bin.id]}
                    >-</button>
                    <span>{selectedBins[bin.id] || 0}</span>
                    <button 
                      onClick={() => handleBinQuantityChange(bin.id, (selectedBins[bin.id] || 0) + 1)}
                    >+</button>
                  </div>
                  
                  {selectedBins[bin.id] > 0 && (
                    <div className="meat-selection">
                      <h4>Select Meats (up to 2):</h4>
                      <div className="meat-options">
                        {MEAT_OPTIONS.map(meat => {
                          const isSelected = selectedMeats[bin.id]?.[meat.id] || false;
                          return (
                            <label key={meat.id} className={`meat-option ${isSelected ? 'selected' : ''}`}>
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={(e) => handleMeatSelection(bin.id, meat.id, e.target.checked)}
                              />
                              <span>{meat.name}</span>
                              {meat.upcharge > 0 && <span className="upcharge">+${meat.upcharge}</span>}
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="items-section">
            <h2>🥑 Add Sides ({Object.values(selectedSides).reduce((sum, qty) => sum + qty, 0)} selected)</h2>
            <div className="items-grid">
              {SIDES_OPTIONS.map(side => (
                <div key={side.id} className="item-card">
                  <div className="item-info">
                    <h3>{side.name}</h3>
                    <p>{side.description}</p>
                    <span className="price">${side.price} each</span>
                  </div>
                  <div className="quantity-controls">
                    <button 
                      onClick={() => handleQuantityChange('sides', side.id, (selectedSides[side.id] || 0) - 1)}
                      disabled={!selectedSides[side.id]}
                    >-</button>
                    <span>{selectedSides[side.id] || 0}</span>
                    <button 
                      onClick={() => handleQuantityChange('sides', side.id, (selectedSides[side.id] || 0) + 1)}
                    >+</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="items-section">
            <h2>🥤 Choose Beverages ({Object.values(selectedDrinks).reduce((sum, qty) => sum + qty, 0)} selected)</h2>
            <div className="items-grid">
              {DRINKS_OPTIONS.map(drink => (
                <div key={drink.id} className="item-card">
                  <div className="item-info">
                    <h3>{drink.name}</h3>
                    <p>{drink.description}</p>
                    <span className="price">${drink.price} each</span>
                  </div>
                  <div className="quantity-controls">
                    <button 
                      onClick={() => handleQuantityChange('drinks', drink.id, (selectedDrinks[drink.id] || 0) - 1)}
                      disabled={!selectedDrinks[drink.id]}
                    >-</button>
                    <span>{selectedDrinks[drink.id] || 0}</span>
                    <button 
                      onClick={() => handleQuantityChange('drinks', drink.id, (selectedDrinks[drink.id] || 0) + 1)}
                    >+</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="order-summary">
          <div className="summary-card">
            <h2>Order Summary</h2>
            <div className="summary-content">
              
              {Object.entries(selectedBins).filter(([id, qty]) => qty > 0).map(([id, qty]) => {
                const bin = BIN_OPTIONS.find(b => b.id === id);
                const binMeats = selectedMeats[id] || {};
                const selectedMeatsList = Object.entries(binMeats)
                  .filter(([meatId, selected]) => selected)
                  .map(([meatId]) => MEAT_OPTIONS.find(m => m.id === meatId));
                
                const basePrice = bin.price * qty;
                const upcharges = selectedMeatsList.reduce((sum, meat) => sum + meat.upcharge, 0) * qty;
                const totalPrice = basePrice + upcharges;
                
                return (
                  <div key={id} className="bin-summary">
                    <div className="bin-header">
                      <span>{bin.name} x{qty}</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    {selectedMeatsList.length > 0 && (
                      <div className="meat-list">
                        Meats: {selectedMeatsList.map(meat => 
                          `${meat.name}${meat.upcharge > 0 ? ` (+$${meat.upcharge})` : ''}`
                        ).join(', ')}
                      </div>
                    )}
                  </div>
                );
              })}
              
              {Object.entries(selectedSides).filter(([id, qty]) => qty > 0).map(([id, qty]) => {
                const side = SIDES_OPTIONS.find(s => s.id === id);
                const totalPrice = side.price * qty;
                return (
                  <div key={id} className="summary-item">
                    <span>{side.name} x{qty}</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                );
              })}
              
              {Object.entries(selectedDrinks).filter(([id, qty]) => qty > 0).map(([id, qty]) => {
                const drink = DRINKS_OPTIONS.find(d => d.id === id);
                const totalPrice = drink.price * qty;
                return (
                  <div key={id} className="summary-item">
                    <span>{drink.name} x{qty}</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                );
              })}
              
              <div className="total-price">
                <strong>Total: ${totalPrice.toFixed(2)}</strong>
              </div>
            </div>

            <form 
              onSubmit={handleSubmit} 
              className="customer-form"
              name="catering-request"
              method="POST"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
            >
              {/* Hidden field for Netlify */}
              <input type="hidden" name="form-name" value="catering-request" />
              
              {/* Honeypot field for spam protection */}
              <p style={{ display: 'none' }}>
                <label>
                  Don't fill this out if you're human: <input name="bot-field" />
                </label>
              </p>

              <h3>Contact Information</h3>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={customerInfo.name}
                onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={customerInfo.email}
                onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={customerInfo.phone}
                onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                required
              />
              <input
                type="date"
                name="event-date"
                placeholder="Event Date"
                value={customerInfo.eventDate}
                onChange={(e) => setCustomerInfo({...customerInfo, eventDate: e.target.value})}
                required
              />
              <textarea
                name="special-requests"
                placeholder="Special requests or dietary restrictions..."
                value={customerInfo.specialRequests}
                onChange={(e) => setCustomerInfo({...customerInfo, specialRequests: e.target.value})}
                rows="3"
              ></textarea>
              
              {/* Hidden fields for order details - these will be populated by JavaScript */}
              <input type="hidden" name="order-details" value="" />
              <input type="hidden" name="total-price" value="" />
              
              <button type="submit" className="submit-request-btn" disabled={!customerInfo.name || !customerInfo.email}>
                Request Catering Quote
              </button>
            </form>

            {/* Contact Alternative Section */}
            <div className="contact-alternative">
              <div className="alternative-divider">
                <span>OR</span>
              </div>
              <h3>Prefer to speak with us directly?</h3>
              <div className="contact-options">
                <div className="contact-option">
                  <a href="tel:+18042921401" className="contact-btn phone-btn">
                    📞 Call Us
                  </a>
                  <span className="contact-detail">(804) 292-1401</span>
                </div>
                <div className="contact-option">
                  <a href="https://mail.google.com/mail/u/2/#inbox?compose=DmwnWrRpdCxqmLDXcpPzHdskMhjbJwnQRzTPMtXDqrJVLLJKKtpRjmvJPxMmKcpcSSsHTxLswfbB" className="contact-btn email-btn" target="_blank" rel="noopener noreferrer">
                    ✉️ Email Us
                  </a>
                  <span className="contact-detail">tacontigofamilia@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Catering;