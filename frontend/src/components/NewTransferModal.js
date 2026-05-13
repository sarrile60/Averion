// Transfer Modal - Matching Reference Design with Multi-Method Support (SEPA + BSB)
import React, { useState, useEffect } from 'react';
import api from '../api';
import { useToast } from './Toast';
import { formatCurrency } from '../utils/currency';

export function NewTransferModal({ onClose, onSuccess }) {
  const toast = useToast();
  const [step, setStep] = useState(1); // 1: Form, 2: Success
  const [accounts, setAccounts] = useState([]);
  const [recipients, setRecipients] = useState([]);
  const [recipientValid, setRecipientValid] = useState(null);
  const [formData, setFormData] = useState({
    from_account_id: '',
    beneficiary_name: '',
    beneficiary_email: '',
    beneficiary_iban: '',
    beneficiary_bsb: '',
    beneficiary_account_number: '',
    amount: '',
    details: '',
    reference_number: '',
    transfer_method: 'SEPA'
  });

  useEffect(() => {
    api.get('/accounts').then(r => {
      setAccounts(r.data);
      if (r.data.length > 0) setFormData(f => ({...f, from_account_id: r.data[0].id}));
    });
    api.get('/recipients').then(r => setRecipients(r.data.data || [])).catch(() => {});
  }, []);

  const validateRecipient = async () => {
    if (!formData.beneficiary_email) return;
    try {
      const res = await api.get(`/users/lookup?email=${formData.beneficiary_email}`);
      if (res.data && res.data.first_name) {
        setRecipientValid(true);
        setFormData(f => ({...f, beneficiary_name: `${res.data.first_name} ${res.data.last_name || ''}`.trim()}));
      } else {
        setRecipientValid(false);
      }
    } catch {
      setRecipientValid(false);
    }
  };

  const handleSubmit = async () => {
    const payload = {
      from_account_id: formData.from_account_id,
      beneficiary_name: formData.beneficiary_name,
      amount: parseInt(formData.amount),
      currency: 'EUR',
      details: formData.details,
      reference_number: formData.reference_number || null,
      transfer_method: formData.transfer_method
    };

    if (formData.transfer_method === 'SEPA') {
      payload.beneficiary_iban = formData.beneficiary_iban;
    } else if (formData.transfer_method === 'BSB') {
      payload.beneficiary_bsb = formData.beneficiary_bsb;
      payload.beneficiary_account_number = formData.beneficiary_account_number;
    }

    try {
      await api.post('/transfers', payload);
      setStep(2);
      setTimeout(() => {
        onSuccess && onSuccess();
        onClose();
      }, 2000);
    } catch (err) {
      const detail = err.response?.data?.detail;
      toast.error(typeof detail === 'string' ? detail : (detail?.message || 'Transfer failed'));
    }
  };

  const isFormValid = () => {
    const base = formData.beneficiary_name && formData.amount && formData.details && formData.from_account_id;
    if (formData.transfer_method === 'SEPA') {
      return base && formData.beneficiary_iban;
    } else if (formData.transfer_method === 'BSB') {
      return base && formData.beneficiary_bsb && formData.beneficiary_account_number;
    }
    return false;
  };

  if (step === 2) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg p-8 max-w-md w-full text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-3xl font-bold mb-3">Transfer completed!</h3>
          <p className="text-gray-600 mb-8">Your payment has been sent.</p>
          <button onClick={() => { onSuccess(); onClose(); }} className="btn-primary w-full">Close</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-semibold">New Payment</h3>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-900 text-2xl">&times;</button>
        </div>

        <div className="space-y-5">
          {/* Transfer Method Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Transfer Method</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData({...formData, transfer_method: 'SEPA', beneficiary_bsb: '', beneficiary_account_number: ''})}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                  formData.transfer_method === 'SEPA' 
                    ? 'border-red-500 bg-red-50 text-red-700' 
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                </svg>
                <span className="font-medium">SEPA / IBAN</span>
              </button>
              <button
                type="button"
                onClick={() => setFormData({...formData, transfer_method: 'BSB', beneficiary_iban: ''})}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                  formData.transfer_method === 'BSB' 
                    ? 'border-red-500 bg-red-50 text-red-700' 
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                <span className="font-medium">BSB</span>
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-1.5">
              {formData.transfer_method === 'SEPA' ? 'For EU/international transfers using IBAN' : 'For Australian transfers using BSB + Account Number'}
            </p>
          </div>

          {/* Beneficiary Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Beneficiary Email</label>
            <input
              value={formData.beneficiary_email}
              onChange={(e) => {
                setFormData({...formData, beneficiary_email: e.target.value});
                setRecipientValid(null);
              }}
              onBlur={validateRecipient}
              className={`input-field ${recipientValid === true ? 'border-green-500' : recipientValid === false ? 'border-red-500' : ''}`}
              placeholder="recipient@example.com"
            />
            {recipientValid === true && <p className="text-xs text-green-600 mt-1">&#10003; Recipient verified</p>}
            {recipientValid === false && <p className="text-xs text-red-600 mt-1">&#10007; Recipient not found</p>}
          </div>

          {/* SEPA: Beneficiary IBAN */}
          {formData.transfer_method === 'SEPA' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Beneficiary IBAN</label>
              <input
                value={formData.beneficiary_iban}
                onChange={(e) => setFormData({...formData, beneficiary_iban: e.target.value.toUpperCase()})}
                className="input-field font-mono"
                placeholder="e.g. DE89 3704 0044 0532 0130 00"
              />
            </div>
          )}

          {/* BSB: BSB Number + Account Number */}
          {formData.transfer_method === 'BSB' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">BSB Number</label>
                <input
                  value={formData.beneficiary_bsb}
                  onChange={(e) => {
                    let val = e.target.value.replace(/[^\d-]/g, '');
                    // Auto-format: XXX-XXX
                    const digits = val.replace(/-/g, '');
                    if (digits.length > 3 && !val.includes('-')) {
                      val = digits.slice(0, 3) + '-' + digits.slice(3, 6);
                    }
                    if (digits.length <= 6) {
                      setFormData({...formData, beneficiary_bsb: val});
                    }
                  }}
                  className="input-field font-mono"
                  placeholder="e.g. 012-345"
                  maxLength={7}
                />
                <p className="text-xs text-gray-400 mt-1">6-digit BSB code</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
                <input
                  value={formData.beneficiary_account_number}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^\d]/g, '');
                    if (val.length <= 10) {
                      setFormData({...formData, beneficiary_account_number: val});
                    }
                  }}
                  className="input-field font-mono"
                  placeholder="e.g. 123456789"
                  maxLength={10}
                />
                <p className="text-xs text-gray-400 mt-1">6 to 10 digit account number</p>
              </div>
            </>
          )}

          {/* Auto-filled Name */}
          {formData.beneficiary_name && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Beneficiary Name (Auto-filled)</label>
              <input
                value={formData.beneficiary_name}
                readOnly
                className="input-field bg-gray-50"
              />
            </div>
          )}

          {/* Manual Beneficiary Name if not auto-filled */}
          {!formData.beneficiary_name && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Beneficiary Name</label>
              <input
                value={formData.beneficiary_name}
                onChange={(e) => setFormData({...formData, beneficiary_name: e.target.value})}
                className="input-field"
                placeholder="Full name of recipient"
              />
            </div>
          )}

          {/* Pay from Account */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Pay from</label>
            <select
              value={formData.from_account_id}
              onChange={(e) => setFormData({...formData, from_account_id: e.target.value})}
              className="input-field"
            >
              {accounts.map(acc => (
                <option key={acc.id} value={acc.id}>
                  {acc.account_number} - {formatCurrency(acc.balance)}
                </option>
              ))}
            </select>
            {formData.from_account_id && accounts.find(a => a.id === formData.from_account_id) && (
              <p className="text-xs text-gray-500 mt-1">
                IBAN: {accounts.find(a => a.id === formData.from_account_id).iban}
              </p>
            )}
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
            <div className="relative">
              <span className="absolute left-3 top-3.5 text-gray-500">&euro;</span>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({...formData, amount: e.target.value})}
                className="input-field pl-8"
                placeholder="0.00"
              />
            </div>
            {formData.amount && (
              <p className="text-xs text-gray-500 mt-1">= {formatCurrency(parseInt(formData.amount))}</p>
            )}
          </div>

          {/* Details */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Details</label>
            <textarea
              value={formData.details}
              onChange={(e) => setFormData({...formData, details: e.target.value})}
              className="input-field"
              rows={3}
              placeholder="Payment details..."
            />
          </div>

          {/* Reference Number (Optional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Reference number (Optional)</label>
            <input
              value={formData.reference_number}
              onChange={(e) => setFormData({...formData, reference_number: e.target.value})}
              className="input-field"
              placeholder="Reference"
            />
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={!isFormValid()}
            className="w-full btn-primary disabled:opacity-50"
          >
            Make payment
          </button>
        </div>
      </div>
    </div>
  );
}
