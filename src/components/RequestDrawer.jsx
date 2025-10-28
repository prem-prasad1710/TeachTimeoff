import React, { useState } from 'react';

export default function RequestDrawer({ open, onClose }) {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [leaveType, setLeaveType] = useState('');
  const [note, setNote] = useState('');
  const [notify, setNotify] = useState('');

  const handleRequest = async () => {
    if (!note.trim()) {
      alert('⚠️ Please enter a reason for leave.');
      return;
    }

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

      // 🧠 Display your AI’s result clearly
      if (data.error) {
        alert(`❌ Error: ${data.error}`);
      } else {
        let msg = `✅ Leave request submitted!\n\nAI Prediction:\n`;
        msg += `Keyword Urgency: ${data.keyword_urgency}\n`;
        msg += `Sentiment Urgency: ${data.sentiment_urgency}\n`;
        msg += `Sentiment Score: ${data.sentiment_score}\n`;

        if (data.popup_message) {
          msg += `\n⚠️ ${data.popup_message}`;
        }

        alert(msg);
      }

      // Reset form + close drawer
      setFromDate('');
      setToDate('');
      setLeaveType('');
      setNote('');
      setNotify('');
      onClose();

    } catch (error) {
      console.error('Error submitting request:', error);
      alert('❌ Something went wrong. Please try again.');
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
            <option>Select</option>
            <option>Earned Leave</option>
            <option>Marriage Leave</option>
            <option>Paternity Leave</option>
          </select>
        </div>

        <div style={{ marginTop: 12 }}>
          <label>Note</label>
          <textarea
            placeholder="Enter reason for leave"
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
          <button className="btn btn-primary" onClick={handleRequest}>Request</button>
        </div>
      </div>
    </div>
  );
}
