import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Package, Truck, Home } from 'lucide-react';
import { Button } from '../components/ui/button';

const PagoExitoso = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [orden, setOrden] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const ordenId = searchParams.get('orden');

  useEffect(() => {
    if (ordenId) {
      // Aquí podrías hacer una llamada a la API para obtener los detalles de la orden
      // Por ahora simulamos que todo está bien
      setOrden({
        _id: ordenId,
        numeroOrden: `ORD-${Date.now()}`,
        total: 0,
        estadoPago: 'completado',
        estadoEnvio: 'pendiente'
      });
      setLoading(false);
    } else {
      setError('No se encontró información de la orden');
      setLoading(false);
    }
  }, [ordenId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Verificando pago...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <Package className="w-16 h-16 mx-auto" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Error</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button onClick={() => navigate('/')}>
            <Home className="w-4 h-4 mr-2" />
            Volver al Inicio
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        {/* Icono de éxito */}
        <div className="mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            ¡Pago Exitoso!
          </h1>
          <p className="text-gray-600">
            Tu orden ha sido procesada correctamente
          </p>
        </div>

        {/* Detalles de la orden */}
        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Número de Orden:</span>
              <span className="font-medium text-gray-900">{orden?.numeroOrden}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Estado del Pago:</span>
              <span className="font-medium text-green-600 capitalize">
                {orden?.estadoPago}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Estado del Envío:</span>
              <span className="font-medium text-blue-600 capitalize">
                {orden?.estadoEnvio}
              </span>
            </div>
          </div>
        </div>

        {/* Próximos pasos */}
        <div className="mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">Próximos pasos:</h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center">
              <Package className="w-4 h-4 mr-2 text-blue-500" />
              <span>Preparando tu pedido</span>
            </div>
            <div className="flex items-center">
              <Truck className="w-4 h-4 mr-2 text-green-500" />
              <span>Enviando a tu dirección</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
              <span>Entrega en 2-3 días hábiles</span>
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="space-y-3">
          <Button 
            onClick={() => navigate('/')}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            <Home className="w-4 h-4 mr-2" />
            Volver al Inicio
          </Button>
          
          <Button 
            variant="outline" 
            onClick={() => navigate('/historial-compras')}
            className="w-full"
          >
            Ver Historial de Compras
          </Button>
        </div>

        {/* Información adicional */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Recibirás un email de confirmación con los detalles de tu orden.
            Si tienes alguna pregunta, contáctanos.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PagoExitoso; 