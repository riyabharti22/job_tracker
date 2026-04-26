import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './AddJob.css';

export default function AddJob() {
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

  const { token } = useAuth();
  const navigate = useNavigate();

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://job-tracker-1-5afr.onrender.com/api/applications', form, config);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="addjob-page">
      <div className="addjob-box">

        {/* LEFT */}
        <div className="addjob-left">
          <div className="addjob-left-content">
            <div className="addjob-left-icon">💼</div>
            <h2>Track Your Journey</h2>
            <p>Add every job application and stay organised throughout your placement journey.</p>
            <div className="addjob-tips">
              <div className="tip">✅ Track all applications</div>
              <div className="tip">📅 Set interview reminders</div>
              <div className="tip">📊 Visualise your progress</div>
              <div className="tip">🎯 Land your dream job</div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="addjob-right">

          <div className="addjob-header">
            <h2>Add New Job</h2>
            <p>Fill in the details below</p>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="row">
              <div className="field">
                <label>Company Name *</label>
                <input
                  placeholder="e.g. Google"
                  value={form.company}
                  onChange={e => setForm({...form, company: e.target.value})}
                  required
                />
              </div>
              <div className="field">
                <label>Job Role *</label>
                <input
                  placeholder="e.g. SDE Intern"
                  value={form.role}
                  onChange={e => setForm({...form, role: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="row">
              <div className="field">
                <label>Status</label>
                <select
                  value={form.status}
                  onChange={e => setForm({...form, status: e.target.value})}>
                  <option>Applied</option>
                  <option>Interview</option>
                  <option>Offer</option>
                  <option>Rejected</option>
                </select>
              </div>
              <div className="field">
                <label>Salary / Stipend</label>
                <input
                  placeholder="e.g. ₹8 LPA"
                  value={form.salary}
                  onChange={e => setForm({...form, salary: e.target.value})}
                />
              </div>
            </div>

            <div className="row">
              <div className="field">
                <label>Applied Date *</label>
                <input
                  type="date"
                  value={form.appliedDate}
                  onChange={e => setForm({...form, appliedDate: e.target.value})}
                  required
                />
              </div>
              <div className="field">
                <label>Interview Date</label>
                <input
                  type="date"
                  value={form.interviewDate}
                  onChange={e => setForm({...form, interviewDate: e.target.value})}
                />
              </div>
            </div>

            <div className="field">
              <label>Notes</label>
              <textarea
                placeholder="Any notes about this application..."
                value={form.notes}
                onChange={e => setForm({...form, notes: e.target.value})}
              />
            </div>

            <div className="btns">
              <button type="submit" className="btn-primary">
                ✓ Add Job
              </button>
              <button
                type="button"
                className="btn-cancel"
                onClick={() => navigate('/dashboard')}>
                Cancel
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
}