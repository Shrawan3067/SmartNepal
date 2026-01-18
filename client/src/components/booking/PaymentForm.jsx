import { useState } from 'react'
import { PAYMENT_METHODS } from '../../utils/constants'
import Button from '../ui/Button'
import Input from '../ui/Input'

const PaymentForm = ({ onSubmit, loading }) => {
  const [paymentMethod, setPaymentMethod] = useState('esewa')
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    name: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      method: paymentMethod,
      ...(paymentMethod === 'card' && { cardDetails }),
      amount: 1500 // This should come from booking context
    })
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Select Payment Method</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {PAYMENT_METHODS.map(method => (
            <button
              key={method.id}
              type="button"
              onClick={() => setPaymentMethod(method.id)}
              className={`p-3 border rounded-lg text-center ${
                paymentMethod === method.id 
                  ? 'border-blue-600 bg-blue-50' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="font-medium">{method.name}</div>
            </button>
          ))}
        </div>
      </div>

      {paymentMethod === 'card' && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Card Details</h3>
          <Input
            label="Card Number"
            type="text"
            placeholder="1234 5678 9012 3456"
            value={cardDetails.cardNumber}
            onChange={(e) => setCardDetails({...cardDetails, cardNumber: e.target.value})}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Expiry Date"
              type="text"
              placeholder="MM/YY"
              value={cardDetails.expiry}
              onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
            />
            <Input
              label="CVV"
              type="text"
              placeholder="123"
              value={cardDetails.cvv}
              onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
            />
          </div>
          <Input
            label="Cardholder Name"
            type="text"
            placeholder="John Doe"
            value={cardDetails.name}
            onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
          />
        </div>
      )}

      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="font-bold text-lg mb-2">Payment Summary</h3>
        <div className="flex justify-between mb-1">
          <span>Seats (2)</span>
          <span>Rs. 3000</span>
        </div>
        <div className="flex justify-between mb-1">
          <span>Service Fee</span>
          <span>Rs. 100</span>
        </div>
        <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t">
          <span>Total Amount</span>
          <span>Rs. 3100</span>
        </div>
      </div>

      <Button
        type="submit"
        variant="primary"
        disabled={loading}
        className="w-full"
      >
        {loading ? 'Processing...' : 'Pay Now'}
      </Button>
    </form>
  )
}

export default PaymentForm