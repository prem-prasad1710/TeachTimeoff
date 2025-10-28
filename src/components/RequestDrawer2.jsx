import React, { useState } from 'react';

export default function RequestDrawer({ open, onClose }) {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [leaveType, setLeaveType] = useState('');
  const [note, setNote] = useState('');
  const [notify, setNotify] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRequest = async () => {
    if (!note.trim()) {
      alert('⚠️ Please provide a valid reason for your leave request.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:5000/api/urgency', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: notify || 'employee',
          reason: note
        }),
      });

      const data = await response.json();

      if (data.popup_message) {
        alert(data.popup_message); // 🔔 Admin alert popup
      } else {
        alert(`✅ Leave request submitted.\nAI Prediction: ${data.keyword_urgency}`);
      }

      // Clear form fields
      setFromDate('');
      setToDate('');
      setLeaveType('');
      setNote('');
      setNotify('');
      onClose();
    } catch (err) {
      console.error(err);
      alert('❌ Error submitting leave request.');
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div className="drawer" onClick={e => e.stopPropagation()}>
        <h3 style={{ marginTop: 0 }}>Request Leave</h3>

        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ flex: 1 }}>
            <label>From</label>
            <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} />
          </div>
          <div style={{ flex: 1 }}>
            <label>To</label>
            <input type="date" value={toDate} onChange={e => setToDate(e.target.value)} />
          </div>
        </div>

        <div style={{ marginTop: 12 }}>
          <label>Leave Type</label>
          <select value={leaveType} onChange={e => setLeaveType(e.target.value)}>
            <option value="">Select leave type</option>
            <option value="Earned Leave">Earned Leave</option>
            <option value="Marriage Leave">Marriage Leave</option>
            <option value="Paternity Leave">Paternity Leave</option>
          </select>
        </div>

        <div style={{ marginTop: 12 }}>
          <label>Note</label>
          <textarea
            placeholder="Enter your leave reason"
            value={note}
            onChange={e => setNote(e.target.value)}
            style={{ minHeight: 100 }}
          />
        </div>

        <div style={{ marginTop: 12 }}>
          <label>Notify</label>
          <input
            placeholder="Enter your username"
            value={notify}
            onChange={e => setNotify(e.target.value)}
          />
        </div>

        <div className="drawer-footer">
          <button className="btn btn-ghost" onClick={onClose}>Cancel</button>
          <button
            className="btn btn-primary"
            onClick={handleRequest}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Request'}
          </button>
        </div>
      </div>
    </div>
  );
}
      alert('❌ Error submitting leave request.');