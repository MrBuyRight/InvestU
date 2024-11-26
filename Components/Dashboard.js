import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

function Dashboard({ user }) {
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [investmentSummary, setInvestmentSummary] = useState(null);

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      // Fetch appointments
      const { data: appointments } = await supabase
        .from('appointments')
        .select('*')
        .eq('user_id', user.id)
        .gte('appointment_date', new Date().toISOString())
        .order('appointment_date', { ascending: true })
        .limit(3);

      setUpcomingAppointments(appointments || []);

      // Fetch recent documents
      const { data: docs } = await supabase
        .from('documents')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      setDocuments(docs || []);

      // Fetch investment summary
      const { data: summary } = await supabase
        .from('investment_summary')
        .select('*')
        .eq('user_id', user.id)
        .single();

      setInvestmentSummary(summary);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  if (!user) {
    return <div>Please log in to view your dashboard</div>;
  }

  return (
    <div className="dashboard">
      <h1>Welcome Back, {user.full_name}</h1>
      
      <div className="dashboard-grid">
        {/* Quick Actions */}
        <div className="dashboard-card">
          <h2>Quick Actions</h2>
          <div className="quick-actions">
            <button onClick={() => window.location.href='/appointments/new'}>
              Schedule Appointment
            </button>
            <button onClick={() => window.location.href='/documents/upload'}>
              Upload Document
            </button>
            <button onClick={() => window.location.href='/questionnaire'}>
              Update Profile
            </button>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="dashboard-card">
          <h2>Upcoming Appointments</h2>
          {upcomingAppointments.length > 0 ? (
            <ul className="appointments-list">
              {upcomingAppointments.map(appointment => (
                <li key={appointment.id}>
                  <div className="appointment-date">
                    {new Date(appointment.appointment_date).toLocaleDateString()}
                  </div>
                  <div className="appointment-type">{appointment.type}</div>
                </li>
              ))}
            </ul>
          ) : (
            <p>No upcoming appointments</p>
          )}
        </div>

        {/* Investment Summary */}
        {investmentSummary && (
          <div className="dashboard-card">
            <h2>Investment Summary</h2>
            <div className="summary-stats">
              <div className="stat">
                <label>Total Investment</label>
                <value>${investmentSummary.total_invested?.toLocaleString()}</value>
              </div>
              <div className="stat">
                <label>Current Value</label>
                <value>${investmentSummary.current_value?.toLocaleString()}</value>
              </div>
              <div className="stat">
                <label>Return</label>
                <value className={investmentSummary.return_percentage >= 0 ? 'positive' : 'negative'}>
                  {investmentSummary.return_percentage}%
                </value>
              </div>
            </div>
          </div>
        )}

        {/* Recent Documents */}
        <div className="dashboard-card">
          <h2>Recent Documents</h2>
          {documents.length > 0 ? (
            <ul className="documents-list">
              {documents.map(doc => (
                <li key={doc.id}>
                  <i className="document-icon"></i>
                  <span>{doc.name}</span>
                  <small>{new Date(doc.created_at).toLocaleDateString()}</small>
                </li>
              ))}
            </ul>
          ) : (
            <p>No documents uploaded yet</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
