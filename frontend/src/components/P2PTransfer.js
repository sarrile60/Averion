// P2P Transfer Component
import React, { useState } from 'react';
import api from '../api';
import { useToast } from './Toast';

export function P2PTransferForm({ onSuccess }) {
  const toast = useToast();
  const [formData, setFormData] = useState({
    to_email: '',
    amount: '',
    reason: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post('/transfers/p2p', {
        to_email: formData.to_email,
        amount: parseInt(formData.amount),
        reason: formData.reason || 'P2P Transfer'
      });
      toast.success('Transfer completed successfully!');
      setFormData({ to_email: '', amount: '', reason: '' });
      onSuccess && onSuccess();
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Transfer failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-6">
      <h3 className="text-lg font-semibold mb-4">Send Money to Another Customer</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Recipient Email</label>
          <input
            type="email"
            value={formData.to_email}
            onChange={(e) => setFormData({...formData, to_email: e.target.value})}
            required
            className="input-field"
            placeholder="customer@example.com"
            data-testid="transfer-email"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Amount (€)</label>
          <input
            type="number"
            value={formData.amount}
            onChange={(e) => setFormData({...formData, amount: e.target.value})}
            required
            min="1"
            className="input-field"
            placeholder="100.00"
            data-testid="transfer-amount"
          />
          {formData.amount && (
            <p className="text-xs text-gray-500 mt-1">= €{(parseInt(formData.amount) / 100).toFixed(2)}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Reason (Optional)</label>
          <input
            type="text"
            value={formData.reason}
            onChange={(e) => setFormData({...formData, reason: e.target.value})}
            className="input-field"
            placeholder="Payment for..."
            data-testid="transfer-reason"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary"
          data-testid="submit-transfer"
        >
          {loading ? 'Sending...' : 'Send Money'}
        </button>
      </form>
    </div>
  );
}
