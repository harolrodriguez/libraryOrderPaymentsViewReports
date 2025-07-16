import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getOrders } from '../services/orderService';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getOrders();
      setOrders(data);
    } catch (err) {
      setError('Error al cargar las órdenes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'Pagado': 'bg-green-100 text-green-800',
      'Pendiente': 'bg-yellow-100 text-yellow-800',
      'Enviado': 'bg-blue-100 text-blue-800',
      'Cancelado': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-PE', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount) => {
    return `S/ ${amount.toFixed(2)}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando órdenes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={loadOrders}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Órdenes</h1>
          <p className="text-gray-600">Lista de todas las órdenes de compra</p>
        </div>

        {/* Actions */}
        <div className="mb-6 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Total: {orders.length} órdenes
          </div>
          <div className="flex gap-3">
            <Link
              to="/checkout"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            >
              Nueva Orden
            </Link>
            <button
              onClick={loadOrders}
              className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Actualizar
            </button>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6">
              {/* Order Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Orden #{order.id}
                  </h3>
                  <p className="text-gray-600 mt-1">{order.customerName}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                  <p className="text-sm text-gray-500 mt-1">
                    {formatDate(order.date)}
                  </p>
                </div>
              </div>
              
              {/* Order Details */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Detalles</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total:</span>
                      <span className="font-medium">{formatCurrency(order.total)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pago:</span>
                      <span>{order.paymentMethod}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Entrega:</span>
                      <span>{order.deliveryType}</span>
                    </div>
                    {order.address && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Dirección:</span>
                        <span className="text-right max-w-xs">{order.address}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Productos</h4>
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {item.name} x{item.qty}
                        </span>
                        <span className="font-medium">
                          {formatCurrency(item.price * item.qty)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {orders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">No hay órdenes disponibles</p>
            <Link
              to="/checkout"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Crear Primera Orden
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;