import React from 'react';
import Node from './Node';
import './WorkflowCanvas.css';

const WorkflowCanvas = ({ workflow, onAddNode, onDeleteNode, onEditNode }) => {
  const renderNode = (nodeId, level = 0) => {
    const node = workflow.nodes[nodeId];
    if (!node) return null;

    return (
      <div key={nodeId} className="node-level" style={{ marginLeft: `${level * 60}px` }}>
        <Node
          node={node}
          onAddNode={onAddNode}
          onDeleteNode={onDeleteNode}
          onEditNode={onEditNode}
        />
        
        {/* Render children with improved connections */}
        {node.type === 'branch' ? (
          <div className="branch-children">
            {Object.entries(node.branches || {}).map(([branchName, childId]) => (
              <div key={branchName} className="branch">
                <div className="branch-connector">
                  <div className="branch-label">{branchName}</div>
                  <div className="branch-line"></div>
                </div>
                {childId && (
                  <div className="branch-child">
                    {renderNode(childId, level + 1)}
                  </div>
                )}
                {!childId && (
                  <div className="empty-branch">
                    <button 
                      className="add-to-branch-btn"
                      onClick={() => onAddNode({ parentId: node.id, branchName, position: 0 })}
                    >
                      + Add to {branchName} branch
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="children">
            {node.children.map((childId, index) => (
              <div key={childId} className="child-wrapper">
                <div className="child-connector"></div>
                {renderNode(childId, level + 1)}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="workflow-canvas">
      {renderNode(workflow.rootId)}
    </div>
  );
};

export default WorkflowCanvas;
