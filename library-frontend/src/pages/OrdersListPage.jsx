import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getOrders } from '../services/orderService';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';

const OrdersListPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    loadOrders();
    
    // Mostrar mensaje de éxito si viene del checkout
    if (location.state?.message) {
      setSuccessMessage(location.state.message);
      // Limpiar el estado para evitar que se muestre en futuras navegaciones
      navigate('/orders', { replace: true });
    }
  }, [location.state, navigate]);

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const ordersData = await getOrders();
      setOrders(ordersData);
    } catch (err) {
      setError('Error al cargar las órdenes');
      console.error('Error loading orders:', err);
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
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN'
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Cargando órdenes...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <p className="text-red-600 mb-4">{error}</p>
              <Button onClick={loadOrders}>Reintentar</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestión de Órdenes</h1>
          <p className="text-gray-600">Lista de todas las órdenes de compra</p>
        </div>

        {/* Mensaje de éxito */}
        {successMessage && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-md p-4">
            <p className="text-green-600 font-medium">{successMessage}</p>
          </div>
        )}

        <div className="mb-6 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Total: {orders.length} órdenes
          </div>
          <div className="flex gap-3">
            <Button onClick={() => navigate('/checkout')}>
              Nueva Orden
            </Button>
            <Button onClick={loadOrders} variant="outline">
              Actualizar
            </Button>
          </div>
        </div>

        <div className="grid gap-6">
          {orders.map((order) => (
            <Card key={order.orderId} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg font-semibold">
                      Orden #{order.orderId}
                    </CardTitle>
                    <p className="text-gray-600 mt-1">{order.customerName}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                    <p className="text-sm text-gray-500 mt-1">
                      {formatDate(order.orderDate)}
                    </p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Detalles de la Orden</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total:</span>
                        <span className="font-medium">{formatCurrency(order.totalAmount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Método de Pago:</span>
                        <span>{order.paymentMethod}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tipo de Entrega:</span>
                        <span>{order.deliveryType === 'DeliveryADomicilio' ? 'Delivery a Domicilio' : 'Recojo en Sede'}</span>
                      </div>
                      {order.deliveryAddress && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Dirección:</span>
                          <span className="text-right max-w-xs">{order.deliveryAddress}</span>
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
                            {item.title} x{item.quantity}
                          </span>
                          <span className="font-medium">
                            {formatCurrency(item.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {orders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No hay órdenes disponibles</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersListPage;