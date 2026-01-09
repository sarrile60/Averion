// Customer Profile Component
import React, { useState, useEffect } from 'react';
import api from '../api';

export function CustomerProfile({ user }) {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    phone: user?.phone || ''
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    setSaving(true);
    setError('');

    try {
      // Note: Update profile endpoint needs to be added to backend
      // await api.patch('/auth/profile', formData);
      alert('Profile update feature to be implemented in backend');
      setEditing(false);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Profile Settings</h2>

      {/* Personal Information */}
      <div className="card-enhanced p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Personal Information</h3>
          {!editing && (
            <button
              onClick={() => setEditing(true)}
              className="text-sm text-blue-600 hover:text-blue-700"
              data-testid="edit-profile-btn"
            >
              Edit
            </button>
          )}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 rounded p-3 text-sm mb-4">
            {error}
          </div>
        )}

        {editing ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  value={formData.first_name}
                  onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                  className="input-enhanced w-full"
                  data-testid="edit-first-name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  value={formData.last_name}
                  onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                  className="input-enhanced w-full"
                  data-testid="edit-last-name"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="input-enhanced w-full"
                data-testid="edit-phone"
              />
            </div>
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <button
                onClick={() => {
                  setEditing(false);
                  setFormData({
                    first_name: user?.first_name || '',
                    last_name: user?.last_name || '',
                    phone: user?.phone || ''
                  });
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="btn-primary btn-glow"
                data-testid="save-profile-btn"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        ) : (
          <dl className="grid grid-cols-2 gap-4">
            <div>
              <dt className="text-sm text-gray-600">First Name</dt>
              <dd className="font-medium mt-1">{user?.first_name}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-600">Last Name</dt>
              <dd className="font-medium mt-1">{user?.last_name}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-600">Email</dt>
              <dd className="font-medium mt-1">{user?.email}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-600">Phone</dt>
              <dd className="font-medium mt-1">{user?.phone || 'Not provided'}</dd>
            </div>
            <div>
              <dt className="text-sm text-gray-600">Account Created</dt>
              <dd className="font-medium mt-1">
                {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
              </dd>
            </div>
            <div>
              <dt className="text-sm text-gray-600">Status</dt>
              <dd className="mt-1">
                <span className={`status-badge ${
                  user?.status === 'ACTIVE' 
                    ? 'bg-green-100 text-green-800 border-green-300'
                    : user?.status === 'DISABLED'
                    ? 'bg-red-100 text-red-800 border-red-300'
                    : 'bg-yellow-100 text-yellow-800 border-yellow-300'
                }`}>
                  {user?.status}
                </span>
              </dd>
            </div>
          </dl>
        )}
      </div>

      {/* Account Summary */}
      <div className="card-enhanced p-6">
        <h3 className="text-lg font-semibold mb-4">Account Summary</h3>
        <dl className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-gray-600">Role</dt>
            <dd className="font-medium mt-1">{user?.role}</dd>
          </div>
          <div>
            <dt className="text-gray-600">Email Verified</dt>
            <dd className="font-medium mt-1">{user?.email_verified ? 'Yes' : 'No'}</dd>
          </div>
          <div>
            <dt className="text-gray-600">MFA Enabled</dt>
            <dd className="font-medium mt-1">{user?.mfa_enabled ? 'Yes' : 'No'}</dd>
          </div>
          <div>
            <dt className="text-gray-600">Last Login</dt>
            <dd className="font-medium mt-1">
              {user?.last_login_at ? new Date(user.last_login_at).toLocaleString() : 'Never'}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
