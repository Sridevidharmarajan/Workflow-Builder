import React from 'react';
import './Node.css';

const Node = ({ node, onAddNode, onDeleteNode, onEditNode }) => {
  const getNodeStyle = () => {
    switch (node.type) {
      case 'start':
        return 'node-start';
      case 'action':
        return 'node-action';
      case 'branch':
        return 'node-branch';
      case 'end':
        return 'node-end';
      default:
        return 'node-default';
    }
  };

  // Strict rules for add button visibility
  const canAddChild = node.type !== 'end';
  const hasChildSlot = node.type === 'action' ? node.children.length === 0 : 
                      node.type === 'branch' ? true : 
                      node.type === 'start' ? true : false;
  
  // For branch nodes, we don't show add button here - it's handled in WorkflowCanvas
  const showAddButton = canAddChild && hasChildSlot && node.type !== 'branch';

  return (
    <div className={`node ${getNodeStyle()}`}>
      <div className="node-header">
        <h3 className="node-title">{node.label}</h3>
        <div className="node-actions">
          {showAddButton && (
            <button 
              className="add-btn"
              onClick={() => onAddNode({ parentId: node.id, position: node.children.length })}
              title="Add node after this"
            >
              ➕
            </button>
          )}
          <button 
            className="edit-btn"
            onClick={() => onEditNode(node.id)}
            title="Edit node"
          >
            ✏️
          </button>
          {node.id !== 'start' && (
            <button 
              className="delete-btn"
              onClick={() => onDeleteNode(node.id)}
              title="Delete node"
            >
              🗑️
            </button>
          )}
        </div>
      </div>
      
      <div className="node-type">
        {node.type.charAt(0).toUpperCase() + node.type.slice(1)}
      </div>
      
      {/* Connection indicator - only for nodes that can have outgoing connections */}
      {node.type !== 'end' && (
        <div className="connection-point">
          <div className="connection-line"></div>
        </div>
      )}
    </div>
  );
};

export default Node;
