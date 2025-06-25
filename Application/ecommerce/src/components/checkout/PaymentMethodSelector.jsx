import React from 'react';
import { CreditCard } from 'lucide-react';

const PaymentMethodSelector = ({ selectedMethod, onMethodChange }) => {
  const methods = [
    {
      id: 'card',
      name: 'Tarjeta de Crédito/Débito',
      icon: CreditCard,
      description: 'Paga con tu tarjeta de forma segura',
      color: 'from-orange-600 to-amber-600',
      hoverColor: 'from-orange-700 to-amber-700'
    }
  ];

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Selecciona tu método de pago
      </h3>
      
      <div className="grid grid-cols-1 gap-3">
        {methods.map((method) => {
          const Icon = method.icon;
          const isSelected = selectedMethod === method.id;
          
          return (
            <button
              key={method.id}
              onClick={() => onMethodChange(method.id)}
              className={`relative p-4 border-2 rounded-xl transition-all duration-300 text-left ${
                isSelected
                  ? `border-transparent bg-gradient-to-r ${method.color} text-white shadow-lg`
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md text-gray-700'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  isSelected 
                    ? 'bg-white/20' 
                    : 'bg-gray-100'
                }`}>
                  <Icon className={`w-6 h-6 ${
                    isSelected ? 'text-white' : 'text-gray-600'
                  }`} />
                </div>
                
                <div className="flex-1">
                  <h4 className={`font-medium ${
                    isSelected ? 'text-white' : 'text-gray-900'
                  }`}>
                    {method.name}
                  </h4>
                  <p className={`text-sm ${
                    isSelected ? 'text-white/90' : 'text-gray-600'
                  }`}>
                    {method.description}
                  </p>
                </div>
                
                {isSelected && (
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-gradient-to-r from-orange-600 to-amber-600 rounded-full"></div>
                  </div>
                )}
              </div>
              
              {isSelected && (
                <div className="absolute inset-0 bg-gradient-to-r opacity-10 rounded-xl"></div>
              )}
            </button>
          );
        })}
      </div>
      
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>💡 Consejo:</strong> El pago con tarjeta es seguro y rápido. 
          Tus datos están protegidos con encriptación SSL.
        </p>
      </div>
    </div>
  );
};

export default PaymentMethodSelector; 