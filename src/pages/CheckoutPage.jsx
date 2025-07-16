import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../services/orderService';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    customerName: '',
    deliveryType: 'Recojo',
    address: '',
    paymentMethod: 'Yape'
  });

  // Productos del carrito (simulados)
  const cartItems = [
    { name: 'JavaScript Avanzado', price: 25.00, qty: 1 },
    { name: 'React Fundamentals', price: 30.00, qty: 1 }
  ];
  
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.qty), 0);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setError(''); // Limpiar error al cambiar input
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validaciones
    if (!formData.customerName.trim()) {
      setError('El nombre del cliente es requerido');
      return;
    }
    
    if (formData.deliveryType === 'Delivery' && !formData.address.trim()) {
      setError('La dirección es requerida para delivery');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      await createOrder(formData);
      
      // Redirigir a órdenes con mensaje de éxito
      navigate('/', { 
        state: { 
          message: '¡Orden creada exitosamente!',
          type: 'success'
        }
      });
      
    } catch (err) {
      setError('Error al crear la orden. Inténtalo de nuevo.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return `S/ ${amount.toFixed(2)}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
          <p className="text-gray-600">Completa tu orden de compra</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Formulario */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-6">Información de la Orden</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nombre del Cliente */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre del Cliente *
                </label>
                <input
                  type="text"
                  value={formData.customerName}
                  onChange={(e) => handleInputChange('customerName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ingresa tu nombre completo"
                  required
                />
              </div>

              {/* Tipo de Entrega */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Tipo de Entrega
                </label>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="Recojo"
                      checked={formData.deliveryType === 'Recojo'}
                      onChange={(e) => handleInputChange('deliveryType', e.target.value)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">Recojo en Sede</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="Delivery"
                      checked={formData.deliveryType === 'Delivery'}
                      onChange={(e) => handleInputChange('deliveryType', e.target.value)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <span className="ml-2 text-sm text-gray-700">Delivery a Domicilio</span>
                  </label>
                </div>
              </div>

              {/* Dirección (condicional) */}
              {formData.deliveryType === 'Delivery' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dirección de Entrega *
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Ingresa tu dirección completa"
                    required
                  />
                </div>
              )}

              {/* Método de Pago */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Método de Pago
                </label>
                <div className="space-y-3">
                  {['Yape', 'Transferencia', 'Visa', 'Efectivo'].map(method => (
                    <label key={method} className="flex items-center">
                      <input
                        type="radio"
                        value={method}
                        checked={formData.paymentMethod === method}
                        onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">{method}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3">
                  <p className="text-red-600 text-sm">{error}</p>
                </div>
              )}

              {/* Botones */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? 'Procesando...' : 'Confirmar Orden'}
                </button>
              </div>
            </form>
          </div>

          {/* Resumen del Carrito */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-6">Resumen del Carrito</h2>
            
            <div className="space-y-4">
              {cartItems.map((item, index) => (
                <div key={index} className="flex justify-between items-center py-3 border-b border-gray-200">
                  <div>
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-600">Cantidad: {item.qty}</p>
                  </div>
                  <p className="font-medium text-gray-900">
                    {formatCurrency(item.price * item.qty)}
                  </p>
                </div>
              ))}
              
              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-blue-600">{formatCurrency(subtotal)}</span>
                </div>
              </div>
            </div>

            {/* Info adicional */}
            <div className="mt-6 p-4 bg-blue-50 rounded-md">
              <p className="text-sm text-blue-800">
                <strong>Nota:</strong> Esta es una simulación. Los productos y precios son de ejemplo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;