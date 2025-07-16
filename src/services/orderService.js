// Simulación de API para órdenes
const USE_MOCK_API = true;

// Datos simulados de órdenes
const mockOrders = [
  {
    id: 'ORD-001',
    customerName: 'Juan Pérez',
    total: 85.00,
    status: 'Pagado',
    paymentMethod: 'Yape',
    deliveryType: 'Delivery',
    address: 'Av. Javier Prado 123, Lima',
    date: '2025-01-15T10:30:00',
    items: [
      { name: 'JavaScript Avanzado', price: 25.00, qty: 1 },
      { name: 'React Fundamentals', price: 30.00, qty: 2 }
    ]
  },
  {
    id: 'ORD-002',
    customerName: 'María García',
    total: 45.00,
    status: 'Pendiente',
    paymentMethod: 'Transferencia',
    deliveryType: 'Recojo',
    address: null,
    date: '2025-01-15T14:15:00',
    items: [
      { name: 'Node.js Patterns', price: 15.00, qty: 1 },
      { name: 'CSS Grid Layout', price: 30.00, qty: 1 }
    ]
  },
  {
    id: 'ORD-003',
    customerName: 'Carlos López',
    total: 120.00,
    status: 'Enviado',
    paymentMethod: 'Visa',
    deliveryType: 'Delivery',
    address: 'Jr. de la Unión 456, Lima',
    date: '2025-01-14T16:45:00',
    items: [
      { name: 'Python Data Science', price: 40.00, qty: 2 },
      { name: 'Machine Learning', price: 40.00, qty: 1 }
    ]
  }
];

// Obtener todas las órdenes
export const getOrders = async () => {
  if (USE_MOCK_API) {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockOrders;
  }
  // Aquí iría la llamada real a la API
  // const response = await fetch('/api/orders');
  // return response.json();
};

// Crear nueva orden
export const createOrder = async (orderData) => {
  if (USE_MOCK_API) {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newOrder = {
      id: `ORD-${Date.now().toString().slice(-3)}`,
      customerName: orderData.customerName,
      total: 55.00, // Precio fijo para demo
      status: 'Pagado',
      paymentMethod: orderData.paymentMethod,
      deliveryType: orderData.deliveryType,
      address: orderData.deliveryType === 'Delivery' ? orderData.address : null,
      date: new Date().toISOString(),
      items: [
        { name: 'JavaScript Avanzado', price: 25.00, qty: 1 },
        { name: 'React Fundamentals', price: 30.00, qty: 1 }
      ]
    };
    
    // Agregar a la lista mock
    mockOrders.unshift(newOrder);
    return newOrder;
  }
  
  // Aquí iría la llamada real a la API
  // const response = await fetch('/api/orders', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(orderData)
  // });
  // return response.json();
};