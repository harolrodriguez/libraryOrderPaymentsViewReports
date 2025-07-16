import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import OrdersPage from './pages/OrdersPage';
import CheckoutPage from './pages/CheckoutPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OrdersPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;