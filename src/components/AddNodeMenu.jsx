import React, { useState } from 'react';
import './AddNodeMenu.css';

const AddNodeMenu = ({ parentId, branchName, position, onAddNode, onClose }) => {
  const [selectedType, setSelectedType] = useState('');

  const handleAdd = () => {
    if (selectedType) {
      onAddNode(parentId, selectedType, branchName, position);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="add-node-menu">
        <h3>Add Node</h3>
        
        <div className="node-types">
          <label className="node-type-option">
            <input
              type="radio"
              name="nodeType"
              value="action"
              checked={selectedType === 'action'}
              onChange={(e) => setSelectedType(e.target.value)}
            />
            <div className="type-card">
              <h4>Action</h4>
              <p>Single step with one connection</p>
            </div>
          </label>
          
          <label className="node-type-option">
            <input
              type="radio"
              name="nodeType"
              value="branch"
              checked={selectedType === 'branch'}
              onChange={(e) => setSelectedType(e.target.value)}
            />
            <div className="type-card">
              <h4>Branch</h4>
              <p>Decision with multiple paths</p>
            </div>
          </label>
          
          <label className="node-type-option">
            <input
              type="radio"
              name="nodeType"
              value="end"
              checked={selectedType === 'end'}
              onChange={(e) => setSelectedType(e.target.value)}
            />
            <div className="type-card">
              <h4>End</h4>
              <p>Final step with no connections</p>
            </div>
          </label>
        </div>
        
        <div className="menu-buttons">
          <button 
            className="add-btn"
            onClick={handleAdd}
            disabled={!selectedType}
          >
            Add
          </button>
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNodeMenu;
