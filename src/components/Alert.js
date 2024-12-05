import React, { useContext } from 'react';
import NoteContext from '../context/notes/NoteContext';

export default function Alert() {
  const { alert } = useContext(NoteContext); // Access alert from context

  return (
    <div style={{ height: 50 }}>
      {alert && (
        <div className={`alert alert-${alert.type}`} role="alert">
          <strong>
            {alert.type === 'danger' ? 'Error: ' : alert.type.charAt(0).toUpperCase() + alert.type.slice(1) + ': '}
          </strong>
          {alert.message}
        </div>
      )}
    </div>
  );
}
