import { useState } from 'react';

export default function AddApplicationModal({ onClose, onAdd }) {
  const today = new Date().toISOString().split('T')[0];

  const [form, setForm] = useState({
    company: '',
    role: '',
    status: 'Applied',
    appliedDate: today,
    salary: '',
    interviewDate: '',
    notes: '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onAdd(form);
    setLoading(false);
    onClose();
  };

  const inputStyle = {
    width: '100%',
    padding: '11px 14px',
    background: '#f9fafb',
    border: '1px solid #e5e7eb',
    borderRadius: '10px',
    fontSize: '14px',
    color: '#111827',
    outline: 'none',
    fontFamily: 'inherit',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '12px',
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: '6px',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  };

  const focus = e => {
    e.target.style.border = '1px solid #2563eb';
    e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.1)';
  };
  const blur = e => {
    e.target.style.border = '1px solid #e5e7eb';
    e.target.style.boxShadow = 'none';
  };

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: 'rgba(0,0,0,0.45)',
      backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 50, padding: '16px',
    }}>
      <div style={{
        background: '#ffffff',
        borderRadius: '20px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
        width: '100%', maxWidth: '520px',
        maxHeight: '90vh', overflowY: 'auto',
        animation: 'slideUp 0.25s ease',
      }}>
        <div style={{
          padding: '24px 28px 0',
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        }}>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#111827', margin: 0 }}>
              Add Application
            </h2>
            <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '4px' }}>
              Track a new job opportunity
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              width: '32px', height: '32px', borderRadius: '8px',
              border: '1px solid #e5e7eb', background: '#f9fafb',
              cursor: 'pointer', fontSize: '16px', color: '#6b7280',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >✕</button>
        </div>

        <div style={{ height: '1px', background: '#f3f4f6', margin: '20px 0 0' }} />

        <form onSubmit={handleSubmit} style={{ padding: '24px 28px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>

            <div>
              <label style={labelStyle}>Company *</label>
              <input
                placeholder="e.g. Google"
                value={form.company}
                onChange={e => setForm({ ...form, company: e.target.value })}
                required style={inputStyle}
                onFocus={focus} onBlur={blur}
              />
            </div>

            <div>
              <label style={labelStyle}>Job Role *</label>
              <input
                placeholder="e.g. SDE Intern"
                value={form.role}
                onChange={e => setForm({ ...form, role: e.target.value })}
                required style={inputStyle}
                onFocus={focus} onBlur={blur}
              />
            </div>

            <div>
              <label style={labelStyle}>Status</label>
              <select
                value={form.status}
                onChange={e => setForm({ ...form, status: e.target.value })}
                style={{ ...inputStyle, cursor: 'pointer' }}
              >
                <option>Applied</option>
                <option>Interview</option>
                <option>Offer</option>
                <option>Rejected</option>
              </select>
            </div>

            <div>
              <label style={labelStyle}>Salary / Stipend</label>
              <input
                placeholder="e.g. ₹12 LPA"
                value={form.salary}
                onChange={e => setForm({ ...form, salary: e.target.value })}
                style={inputStyle} onFocus={focus} onBlur={blur}
              />
            </div>

            <div>
              <label style={labelStyle}>Applied Date *</label>
              <input
                type="date"
                value={form.appliedDate}
                onChange={e => setForm({ ...form, appliedDate: e.target.value })}
                required style={inputStyle}
                onFocus={focus} onBlur={blur}
              />
            </div>

            <div>
              <label style={labelStyle}>Interview Date</label>
              <input
                type="date"
                value={form.interviewDate}
                onChange={e => setForm({ ...form, interviewDate: e.target.value })}
                style={inputStyle} onFocus={focus} onBlur={blur}
              />
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={labelStyle}>Notes</label>
              <textarea
                placeholder="Any notes about this application..."
                value={form.notes}
                onChange={e => setForm({ ...form, notes: e.target.value })}
                rows={3}
                style={{ ...inputStyle, resize: 'vertical' }}
                onFocus={focus} onBlur={blur}
              />
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
            <button
              type="button" onClick={onClose}
              style={{
                flex: 1, padding: '12px',
                background: '#f9fafb', border: '1px solid #e5e7eb',
                borderRadius: '12px', fontSize: '14px', fontWeight: '600',
                color: '#6b7280', cursor: 'pointer',
              }}
            >Cancel</button>

            <button
              type="submit" disabled={loading}
              style={{
                flex: 2, padding: '12px',
                background: loading ? '#93c5fd' : '#2563eb',
                border: 'none', borderRadius: '12px',
                fontSize: '14px', fontWeight: '700',
                color: '#ffffff', cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 12px rgba(37,99,235,0.3)',
              }}
            >
              {loading ? 'Adding...' : '+ Add Application'}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}