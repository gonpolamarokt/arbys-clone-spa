import { Navigate, Route, Routes } from 'react-router-dom';
import { useMemo, useState } from 'react';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import MenuPage from './components/MenuPage';
import CheckoutPage from './components/CheckoutPage';
import DeliveryDetailsPage from './components/DeliveryDetailsPage';
import ShoppableAds from './components/ShoppableAds';
import RoktThanks from './components/RoktThanks';
import { menuItems } from './data/menuItems';

function App() {
  const [cart, setCart] = useState([]);
  const [latestOrder, setLatestOrder] = useState(null);

  const addToOrder = (item) => {
    setCart((current) => {
      const existing = current.find((entry) => entry.id === item.id);
      if (existing) {
        return current.map((entry) =>
          entry.id === item.id ? { ...entry, quantity: entry.quantity + 1 } : entry
        );
      }

      return [...current, { ...item, quantity: 1 }];
    });
  };

  const updateQuantity = (itemId, delta) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === itemId ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (itemId) => {
    setCart((current) => current.filter((item) => item.id !== itemId));
  };

  const subtotal = useMemo(
    () => cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [cart]
  );

  const tax = useMemo(() => subtotal * 0.08, [subtotal]);
  const total = useMemo(() => subtotal + tax, [subtotal, tax]);
  const cartCount = useMemo(
    () => cart.reduce((acc, item) => acc + item.quantity, 0),
    [cart]
  );

  const placeOrder = (orderDetails) => {
    setLatestOrder(orderDetails);
    setCart([]);
  };

  return (
    <>
      <Header cartCount={cartCount} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route
          path="/menu"
          element={
            <MenuPage
              items={menuItems}
              onAddToOrder={addToOrder}
              cartCount={cartCount}
              subtotal={subtotal}
            />
          }
        />
        <Route
          path="/bag"
          element={
            <CheckoutPage
              items={menuItems}
              cart={cart}
              subtotal={subtotal}
              tax={tax}
              total={total}
              onAddToOrder={addToOrder}
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeItem}
            />
          }
        />
        <Route
          path="/checkout"
          element={
            <DeliveryDetailsPage
              cart={cart}
              subtotal={subtotal}
              tax={tax}
              total={total}
              onPlaceOrder={placeOrder}
            />
          }
        />
        <Route path="/shoppable-ads" element={<ShoppableAds order={latestOrder} />} />
        <Route path="/rokt-thanks" element={<RoktThanks order={latestOrder} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
