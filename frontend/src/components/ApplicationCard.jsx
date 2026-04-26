import { useState } from 'react';

const STATUS_CONFIG = {
  Applied:   { bg: '#eff6ff', color: '#2563eb', border: '#bfdbfe', dot: '#2563eb' },
  Interview: { bg: '#f0fdf4', color: '#059669', border: '#a7f3d0', dot: '#059669' },
  Offer:     { bg: '#fffbeb', color: '#d97706', border: '#fde68a', dot: '#d97706' },
  Rejected:  { bg: '#fef2f2', color: '#dc2626', border: '#fecaca', dot: '#dc2626' },
};

export default function ApplicationCard({ app, onDelete, onStatusChange }) {
  const [hovered, setHovered] = useState(false);
  const status        = app.status        || 'Applied';
  const config        = STATUS_CONFIG[status] || STATUS_CONFIG['Applied'];
  const company       = app.company       || '';
  const role          = app.role          || '';
  const salary        = app.salary        || '';
  const notes         = app.notes         || '';
  const interviewDate = app.interviewDate || '';
  const appliedDate   = app.appliedDate   || '';
  const id            = app._id;

  const cardStyle = {
    background: '#ffffff',
    borderRadius: '16px',
    padding: '20px 24px',
    marginBottom: '12px',
    border: hovered ? '1px solid #d1d5db' : '1px solid #e5e7eb',
    boxShadow: hovered ? '0 8px 24px rgba(0,0,0,0.08)' : '0 2px 8px rgba(0,0,0,0.04)',
    transition: 'all 0.2s ease',
  };

  const avatarStyle = {
    width: '46px',
    height: '46px',
    borderRadius: '12px',
    background: config.color + '22',
    border: '1px solid ' + config.border,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    fontWeight: '700',
    color: config.color,
    flexShrink: 0,
  };

  const badgeStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    background: config.bg,
    border: '1px solid ' + config.border,
    borderRadius: '999px',
    padding: '5px 12px',
    flexShrink: 0,
  };

  const dotStyle = {
    width: '7px',
    height: '7px',
    borderRadius: '50%',
    background: config.dot,
  };

  const selectStyle = {
    padding: '8px 12px',
    background: '#f9fafb',
    border: '1px solid #e5e7eb',
    borderRadius: '10px',
    fontSize: '13px',
    color: '#374151',
    cursor: 'pointer',
    outline: 'none',
    fontFamily: 'inherit',
    fontWeight: '500',
  };

  const deleteBtnStyle = {
    padding: '8px 14px',
    background: '#fef2f2',
    border: '1px solid #fecaca',
    borderRadius: '10px',
    fontSize: '13px',
    fontWeight: '600',
    color: '#dc2626',
    cursor: 'pointer',
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'short', year: 'numeric',
    });
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={cardStyle}
    >
      {/* TOP ROW */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1, minWidth: '200px' }}>
          <div style={avatarStyle}>
            {company.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#111827', margin: 0 }}>
              {company}
            </h3>
            <p style={{ fontSize: '13px', color: '#6b7280', margin: '2px 0 0' }}>
              {role}
            </p>
            {salary && (
              <p style={{ fontSize: '12px', color: '#9ca3af', margin: '2px 0 0' }}>
                💰 {salary}
              </p>
            )}
          </div>
        </div>

        <div style={badgeStyle}>
          <div style={dotStyle} />
          <span style={{ fontSize: '13px', fontWeight: '600', color: config.color }}>
            {status}
          </span>
        </div>
      </div>

      {/* MIDDLE ROW — Dates + Notes */}
      <div style={{ marginTop: '12px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
        {appliedDate && (
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '5px',
            background: '#f0f9ff', border: '1px solid #bae6fd',
            borderRadius: '8px', padding: '5px 10px',
            fontSize: '12.5px', color: '#0369a1', fontWeight: '500',
          }}>
            📨 Applied: {formatDate(appliedDate)}
          </div>
        )}

        {interviewDate && (
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '5px',
            background: '#f0fdf4', border: '1px solid #a7f3d0',
            borderRadius: '8px', padding: '5px 10px',
            fontSize: '12.5px', color: '#059669', fontWeight: '500',
          }}>
            📅 Interview: {formatDate(interviewDate)}
          </div>
        )}

        {notes && (
          <div style={{
            background: '#f8fafc', border: '1px solid #e2e8f0',
            borderLeft: '3px solid #2563eb',
            borderRadius: '8px', padding: '7px 12px',
            fontSize: '12.5px', color: '#64748b',
            fontStyle: 'italic', width: '100%',
          }}>
            📝 {notes}
          </div>
        )}
      </div>

      {/* BOTTOM ROW — Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '14px', flexWrap: 'wrap' }}>
        <select
          value={status}
          onChange={(e) => onStatusChange(id, e.target.value)}
          style={selectStyle}
        >
          <option>Applied</option>
          <option>Interview</option>
          <option>Offer</option>
          <option>Rejected</option>
        </select>

        <button
          onClick={() => onDelete(id)}
          style={deleteBtnStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#dc2626';
            e.currentTarget.style.color = '#ffffff';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#fef2f2';
            e.currentTarget.style.color = '#dc2626';
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}