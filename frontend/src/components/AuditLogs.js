// Audit Log Viewer
import React, { useState, useEffect } from 'react';
import api from '../api';

export function AuditLogViewer() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchLogs();
  }, [filter]);

  const fetchLogs = async () => {
    try {
      const params = filter !== 'all' ? `?entity_type=${filter}` : '';
      const response = await api.get(`/admin/audit-logs${params}`);
      setLogs(response.data);
    } catch (err) {
      console.error('Failed to fetch audit logs:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleString();
  };

  const getActionColor = (action) => {
    if (action.includes('APPROVED') || action.includes('CREATED')) return 'text-green-600';
    if (action.includes('REJECTED') || action.includes('DELETED')) return 'text-red-600';
    if (action.includes('MODIFIED') || action.includes('UPDATED')) return 'text-yellow-600';
    return 'text-blue-600';
  };

  if (loading) {
    return <div className="text-center py-8">Loading audit logs...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Audit Logs</h3>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm"
          data-testid="audit-filter"
        >
          <option value="all">All Events</option>
          <option value="user">User Events</option>
          <option value="kyc_application">KYC Events</option>
          <option value="ledger_transaction">Ledger Events</option>
          <option value="bank_account">Account Events</option>
        </select>
      </div>

      {logs.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-600">No audit logs found</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow">
          <div className="divide-y max-h-[600px] overflow-y-auto">
            {logs.map((log) => (
              <div
                key={log.id}
                className="p-4 hover:bg-gray-50"
                data-testid={`audit-log-${log.id}`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className={`font-medium ${getActionColor(log.action)}`}>
                        {log.action.replace('_', ' ')}
                      </span>
                      <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                        {log.entity_type}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mt-1">{log.description}</p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                      <span>By: {log.performed_by_email || log.performed_by}</span>
                      <span>•</span>
                      <span>{formatDate(log.created_at)}</span>
                      {log.entity_id && (
                        <>
                          <span>•</span>
                          <span className="font-mono">{log.entity_id.substring(0, 12)}...</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
