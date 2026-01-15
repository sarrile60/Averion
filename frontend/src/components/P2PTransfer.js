// Professional Bank-Style P2P Transfer
import React, { useState, useEffect } from 'react';
import api from '../api';
import { useToast } from './Toast';

export function P2PTransferForm({ onSuccess }) {
  const toast = useToast();
  const [beneficiaries, setBeneficiaries] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [formData, setFormData] = useState({
    to_email: '',
    to_name: '',
    amount: '',
    reason: '',
    reference: ''
  });
  const [loading, setLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [transactionResult, setTransactionResult] = useState(null);
  const [validating, setValidating] = useState(false);
  const [recipientValid, setRecipientValid] = useState(null);
  const [showReference, setShowReference] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);

  useEffect(() => {
    fetchBeneficiaries();
    fetchAccounts();
  }, []);

  const fetchBeneficiaries = async () => {
    try {
      const response = await api.get('/beneficiaries');
      setBeneficiaries(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchAccounts = async () => {
    try {
      const response = await api.get('/accounts');
      setAccounts(response.data);
      if (response.data.length > 0) {
        setSelectedAccount(response.data[0]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const validateRecipient = async () => {
    if (!formData.to_email) return;
    
    setValidating(true);
    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(formData.to_email)) {
        setRecipientValid(true);
      } else {
        setRecipientValid(false);
        toast.error('Invalid email format');
      }
    } catch (err) {
      setRecipientValid(false);
      toast.error('Recipient validation failed');
    } finally {
      setValidating(false);
    }
  };

  const availableBalance = selectedAccount?.balance || 0;
  // Convert euro input to cents for comparison
  const transferAmountCents = Math.round(parseFloat(formData.amount || 0) * 100);
  const hasEnoughBalance = transferAmountCents > 0 && transferAmountCents <= availableBalance;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!hasEnoughBalance) {
      toast.error('Insufficient balance');
      return;
    }
    
    setLoading(true);

    try {
      // Convert euros to cents for API
      const amountInCents = Math.round(parseFloat(formData.amount) * 100);
      
      const result = await api.post('/transfers/p2p', {
        to_email: formData.to_email,
        amount: amountInCents,
        reason: formData.reason || 'P2P Transfer'
      });
      setTransactionResult({...result.data, amount: amountInCents});
      setShowConfirmation(true);
      setTimeout(() => {
        setFormData({ to_email: '', to_name: '', amount: '', reason: '', reference: '' });
        setShowConfirmation(false);
        setRecipientValid(null);
        onSuccess && onSuccess();
      }, 3000);
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Transfer failed');
    } finally {
      setLoading(false);
    }
  };

  const selectBeneficiary = (beneficiary) => {
    setFormData({
      ...formData, 
      to_email: beneficiary.recipient_email, 
      to_name: beneficiary.recipient_name || beneficiary.nickname
    });
    setRecipientValid(true);
  };

  const formatIBAN = (iban) => {
    if (!iban) return 'No IBAN';
    return iban.replace(/(.{4})/g, '$1 ').trim();
  };

  if (showConfirmation && transactionResult) {
    return (
      <div className="max-w-lg mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">Payment Successful!</h3>
          <p className="text-3xl font-bold text-gray-900 mb-2">€{(transactionResult.amount / 100).toFixed(2)}</p>
          <p className="text-gray-600 mb-6">sent to {transactionResult.recipient}</p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-xs text-gray-500 mb-1">Transaction ID</p>
            <p className="text-sm font-mono text-gray-700">{transactionResult.transaction_id}</p>
          </div>
          <div className="flex items-center justify-center text-green-600">
            <svg className="animate-spin mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Redirecting...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header with Bank Icon */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-8 text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-white">Send Money</h2>
          <p className="text-red-100 text-sm mt-1">Transfer funds securely</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Recipient Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Send money to
            </label>
            <input
              type="text"
              value={formData.to_name}
              onChange={(e) => setFormData({...formData, to_name: e.target.value})}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
              placeholder="Recipient name"
              data-testid="transfer-name"
            />
          </div>

          {/* Recipient Account/Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Recipient account
            </label>
            <div className="relative">
              <input
                type="email"
                value={formData.to_email}
                onChange={(e) => {
                  setFormData({...formData, to_email: e.target.value});
                  setRecipientValid(null);
                }}
                onBlur={validateRecipient}
                required
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 transition-colors ${
                  recipientValid === true ? 'border-green-500 bg-green-50' : 
                  recipientValid === false ? 'border-red-500 bg-red-50' : 
                  'border-gray-300'
                }`}
                placeholder="recipient@email.com"
                data-testid="transfer-email"
              />
              {recipientValid === true && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
            {validating && <p className="text-xs text-gray-500 mt-1">Validating...</p>}
            {recipientValid === true && <p className="text-xs text-green-600 mt-1">✓ Valid recipient</p>}
            {recipientValid === false && <p className="text-xs text-red-600 mt-1">✗ Invalid email format</p>}
          </div>

          {/* Saved Recipients */}
          {beneficiaries.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Or select from saved recipients
              </label>
              <div className="flex flex-wrap gap-2">
                {beneficiaries.slice(0, 4).map(b => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => selectBeneficiary(b)}
                    className={`px-3 py-2 text-sm rounded-full border transition-colors ${
                      formData.to_email === b.recipient_email
                        ? 'border-red-600 bg-red-50 text-red-700'
                        : 'border-gray-300 hover:border-red-300 hover:bg-red-50'
                    }`}
                  >
                    {b.nickname || b.recipient_name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Pay From Account */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pay from
            </label>
            <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
              {selectedAccount ? (
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-900">Current Account</p>
                    <p className="text-sm text-gray-500 font-mono">{formatIBAN(selectedAccount.iban)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Available</p>
                    <p className="font-semibold text-gray-900">€{(availableBalance / 100).toFixed(2)}</p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">No account available</p>
              )}
            </div>
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amount
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg font-medium">€</span>
              <input
                type="number"
                step="0.01"
                min="0.01"
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors text-lg"
                placeholder="0.00"
                data-testid="transfer-amount"
              />
            </div>
            {formData.amount && (
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-500">
                  {hasEnoughBalance ? (
                    <span className="text-green-600">✓ Sufficient balance</span>
                  ) : (
                    <span className="text-red-600">✗ Insufficient balance</span>
                  )}
                </span>
                <span className="text-xs text-gray-500">
                  Remaining: €{((availableBalance - transferAmountCents) / 100).toFixed(2)}
                </span>
              </div>
            )}
          </div>

          {/* Quick Amounts */}
          <div className="flex gap-2">
            {[10, 25, 50, 100, 250].map(euro => (
              <button
                key={euro}
                type="button"
                onClick={() => setFormData({...formData, amount: euro.toString()})}
                className={`flex-1 py-2 text-sm rounded-lg border transition-colors ${
                  parseFloat(formData.amount) === euro
                    ? 'border-red-600 bg-red-50 text-red-700 font-medium'
                    : 'border-gray-300 hover:border-red-300 text-gray-700'
                }`}
              >
                €{euro}
              </button>
            ))}
          </div>

          {/* Payment Details */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Details
            </label>
            <textarea
              value={formData.reason}
              onChange={(e) => setFormData({...formData, reason: e.target.value})}
              rows={2}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors resize-none"
              placeholder="What is this payment for? (optional)"
              data-testid="transfer-reason"
            />
            <p className="text-xs text-gray-500 mt-1">
              💡 These details will be visible to the recipient
            </p>
          </div>

          {/* Reference Number Toggle */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="showReference"
              checked={showReference}
              onChange={(e) => setShowReference(e.target.checked)}
              className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
            />
            <label htmlFor="showReference" className="ml-2 text-sm text-gray-700">
              Add a reference number
            </label>
          </div>

          {showReference && (
            <div>
              <input
                type="text"
                value={formData.reference}
                onChange={(e) => setFormData({...formData, reference: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                placeholder="Reference number (e.g., INV-2024-001)"
                data-testid="transfer-reference"
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !recipientValid || !hasEnoughBalance || !formData.amount || !formData.to_email}
            className="w-full py-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            data-testid="submit-transfer"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Make Payment
              </>
            )}
          </button>

          {/* Save as Draft */}
          <button
            type="button"
            className="w-full py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            Save as Draft
          </button>
        </form>
      </div>
    </div>
  );
}
