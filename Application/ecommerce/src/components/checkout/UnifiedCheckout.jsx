import React, { useState } from 'react';
import { X, ArrowLeft } from 'lucide-react';
import StripeCheckout from './StripeCheckout';
import PaymentMethodSelector from './PaymentMethodSelector';

const UnifiedCheckout = ({ isOpen, onClose, onSuccess }) => {
  const [step, setStep] = useState('method'); // method, payment
  const [selectedMethod, setSelectedMethod] = useState(null);

  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
    setStep('payment');
  };

  const handleBack = () => {
    if (step === 'payment') {
      setStep('method');
      setSelectedMethod(null);
    } else {
      onClose();
    }
  };

  const handleSuccess = (orden) => {
    onSuccess(orden);
    // Resetear el estado
    setStep('method');
    setSelectedMethod(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            {step === 'payment' && (
              <button
                onClick={handleBack}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
            )}
            <h2 className="text-xl font-bold text-gray-900">
              {step === 'method' ? 'Método de Pago' : 'Pago con Tarjeta'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          {step === 'method' && (
            <div className="p-6">
              <PaymentMethodSelector
                selectedMethod={selectedMethod}
                onMethodChange={handleMethodSelect}
              />
            </div>
          )}

          {step === 'payment' && selectedMethod === 'card' && (
            <StripeCheckout
              isOpen={true}
              onClose={onClose}
              onSuccess={handleSuccess}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UnifiedCheckout; 