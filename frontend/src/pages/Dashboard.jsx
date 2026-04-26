import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import ApplicationCard from '../components/ApplicationCard';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Dashboard.css';

const COLORS = ['#2563EB','#F59E0B','#10B981','#EF4444'];
const STATUSES = ['All','Applied','Interview','Offer','Rejected'];

export default function Dashboard() {
  const [applications, setApplications] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  const { token } = useAuth();
  const navigate = useNavigate();

  // ✅ FIX: wait for token before fetching
  useEffect(() => {
    if (token) {
      fetchApplications();
    }
  }, [token]);

  const fetchApplications = async () => {
    try {
      if (!token) return;

      setLoading(true);

      const res = await axios.get(
        'http://localhost:5000/api/applications',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setApplications(res.data);
    } catch (err) {
      console.error('Error fetching applications', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/applications/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      fetchApplications();
    } catch (err) {
      console.error('Delete error', err);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(
        `https://job-tracker-1-5afr.onrender.com/api/applications/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      fetchApplications();
    } catch (err) {
      console.error('Status update error', err);
    }
  };

  const filtered =
    filter === 'All'
      ? applications
      : applications.filter(a => a.status === filter);

  const chartData = ['Applied','Interview','Offer','Rejected']
    .map(s => ({
      name: s,
      value: applications.filter(a => a.status === s).length
    }))
    .filter(d => d.value > 0);

  return (
    <div className="dashboard">
      <Navbar />

      <div className="dashboard-container">

        {/* HEADER */}
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <button onClick={() => navigate('/add-job')}>
            + Add Job
          </button>
        </div>

        {/* STATS */}
        <div className="stats-grid">
          {[
            { label:'Total Applications', value: applications.length,                                  bg:'#eff6ff', color:'#2563eb' },
            { label:'Interviews',         value: applications.filter(a=>a.status==='Interview').length, bg:'#fffbeb', color:'#d97706' },
            { label:'Offers Received',    value: applications.filter(a=>a.status==='Offer').length,     bg:'#f0fdf4', color:'#16a34a' },
            { label:'Rejected',           value: applications.filter(a=>a.status==='Rejected').length,  bg:'#fff1f2', color:'#e11d48' },
          ].map(stat => (
            <div
              key={stat.label}
              className="stat-card"
              style={{
                background: stat.bg,
                borderLeft: `4px solid ${stat.color}`
              }}>
              <p style={{
                color: stat.color,
                fontWeight: '600',
                fontSize: '13px',
                margin: 0
              }}>
                {stat.label}
              </p>
              <h2 style={{
                color: stat.color,
                fontSize: '36px',
                fontWeight: '800',
                margin: '8px 0 0'
              }}>
                {stat.value}
              </h2>
            </div>
          ))}
        </div>

        <div className="main-grid">

          {/* LEFT */}
          <div className="applications">

            {/* FILTERS */}
            <div className="filters">
              {STATUSES.map(s => (
                <button
                  key={s}
                  onClick={() => setFilter(s)}
                  className={filter === s ? 'active' : ''}>
                  {s}
                  {s !== 'All' && (
                    <span style={{
                      marginLeft: '6px',
                      fontSize: '11px',
                      background: filter === s ? 'rgba(255,255,255,0.3)' : '#e5e7eb',
                      color: filter === s ? '#fff' : '#6b7280',
                      padding: '1px 6px',
                      borderRadius: '999px',
                    }}>
                      {applications.filter(a => a.status === s).length}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* LIST */}
            {loading ? (
              <p className="empty">Loading...</p>
            ) : filtered.length === 0 ? (
              <p className="empty">No applications found</p>
            ) : (
              filtered.map(app => (
                <ApplicationCard
                  key={app._id}
                  app={app}
                  onDelete={handleDelete}
                  onStatusChange={handleStatusChange}
                />
              ))
            )}
          </div>

          {/* RIGHT CHART */}
          <div className="chart-card">
            <h3>Application Breakdown</h3>
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={chartData} dataKey="value" outerRadius={80}>
                    {chartData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="empty">No data yet. Add applications to see chart.</p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}