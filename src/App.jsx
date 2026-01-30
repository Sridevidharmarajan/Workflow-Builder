import React, { useState, useCallback } from 'react';
import WorkflowCanvas from './components/WorkflowCanvas';
import AddNodeMenu from './components/AddNodeMenu';
import './App.css';


const NODE_TYPES = {
  START: 'start',
  ACTION: 'action',
  BRANCH: 'branch',
  END: 'end'
};


const initialWorkflow = {
  nodes: {
    'start': {
      id: 'start',
      type: NODE_TYPES.START,
      label: 'Start',
      children: []
    }
  },
  rootId: 'start'
};

function App() {
  const [workflow, setWorkflow] = useState(initialWorkflow);
  const [showAddMenu, setShowAddMenu] = useState(null);
  const [editingNode, setEditingNode] = useState(null);


  const generateId = () => `node_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;


  const validateNodeAddition = useCallback((parentId, nodeType, branchName = null) => {
    const parent = workflow.nodes[parentId];
    
    if (!parent) {
      return { valid: false, message: 'Parent node not found' };
    }
    

    if (parent.type === NODE_TYPES.END) {
      return { valid: false, message: 'End nodes cannot have any children' };
    }
    

    if (parent.type === NODE_TYPES.ACTION && parent.children.length > 0 && !branchName) {
      return { valid: false, message: 'Action nodes can have only one child' };
    }
    
  
    if (parent.type === NODE_TYPES.BRANCH && !branchName) {
      return { valid: false, message: 'Branch nodes require adding to a specific branch (true/false)' };
    }
    
    return { valid: true, message: '' };
  }, [workflow.nodes]);

  
  const addNode = useCallback((parentId, nodeType, branchName = null, position = 0) => {
    const validation = validateNodeAddition(parentId, nodeType, branchName);
    
    if (!validation.valid) {
      alert(validation.message);
      return;
    }
    
    const newNodeId = generateId();
    const newNode = {
      id: newNodeId,
      type: nodeType,
      label: nodeType === NODE_TYPES.ACTION ? 'New Action' : 
             nodeType === NODE_TYPES.BRANCH ? 'New Condition' : 
             nodeType === NODE_TYPES.END ? 'End' : 'Node',
      children: nodeType !== NODE_TYPES.BRANCH ? [] : [],
      branches: nodeType === NODE_TYPES.BRANCH ? {
        'true': null,
        'false': null
      } : null
    };

    setWorkflow(prev => {
      const newWorkflow = { ...prev };
      const parent = { ...newWorkflow.nodes[parentId] };
      
      if (parent.type === NODE_TYPES.BRANCH && branchName) {
       
        parent.branches = { ...parent.branches };
        parent.branches[branchName] = newNodeId;
      } else {
    
        parent.children = [...parent.children];
        parent.children.splice(position, 0, newNodeId);
      }
      
      newWorkflow.nodes = { ...newWorkflow.nodes };
      newWorkflow.nodes[parentId] = parent;
      newWorkflow.nodes[newNodeId] = newNode;
      
      return newWorkflow;
    });
    
    setShowAddMenu(null);
  }, [validateNodeAddition]);

  const deleteNode = useCallback((nodeId) => {
    if (nodeId === 'start') {
      alert('Start node cannot be deleted');
      return;
    }
    
    setWorkflow(prev => {
      const newWorkflow = { ...prev };
      const nodeToDelete = newWorkflow.nodes[nodeId];
      
      if (!nodeToDelete) return prev;
      

      const parentEntries = Object.entries(newWorkflow.nodes).filter(([id, node]) => {
        if (node.type === NODE_TYPES.BRANCH) {
          return Object.values(node.branches || {}).includes(nodeId);
        }
        return node.children.includes(nodeId);
      });
      
  
      parentEntries.forEach(([parentId, parent]) => {
        const updatedParent = { ...parent };
        
        if (parent.type === NODE_TYPES.BRANCH) {

          
          updatedParent.branches = { ...updatedParent.branches };
          const branchName = Object.keys(updatedParent.branches).find(
            key => updatedParent.branches[key] === nodeId
          );
          if (branchName) {
      
            updatedParent.branches[branchName] = nodeToDelete.children[0] || null;
          }
        } else {
         
          const index = updatedParent.children.indexOf(nodeId);
          if (index > -1) {
            updatedParent.children = [...updatedParent.children];
          
            updatedParent.children.splice(index, 1, ...nodeToDelete.children);
          }
        }
        
        newWorkflow.nodes[parentId] = updatedParent;
      });
      
    
      const { [nodeId]: removed, ...remainingNodes } = newWorkflow.nodes;
      newWorkflow.nodes = remainingNodes;
      
      return newWorkflow;
    });
  }, []);

  const editNode = useCallback((nodeId, newLabel) => {
    setWorkflow(prev => {
      const newWorkflow = { ...prev };
      const node = { ...newWorkflow.nodes[nodeId] };
      node.label = newLabel;
      newWorkflow.nodes = { ...newWorkflow.nodes };
      newWorkflow.nodes[nodeId] = node;
      return newWorkflow;
    });
    setEditingNode(null);
  }, []);

  
  const saveWorkflow = useCallback(() => {
 
    const validation = validateWorkflowIntegrity();
    
    if (!validation.valid) {
      alert(`Workflow validation failed: ${validation.message}`);
      return;
    }
    
    const workflowData = {
      ...workflow,
      metadata: {
        nodeCount: Object.keys(workflow.nodes).length,
        maxDepth: calculateWorkflowDepth(),
        hasBranches: Object.values(workflow.nodes).some(node => node.type === NODE_TYPES.BRANCH),
        hasEndNodes: Object.values(workflow.nodes).some(node => node.type === NODE_TYPES.END),
        savedAt: new Date().toISOString()
      }
    };
    
    console.log('=== WORKFLOW DATA STRUCTURE ===');
    console.log(JSON.stringify(workflowData, null, 2));
    console.log('=== WORKFLOW SUMMARY ===');
    console.log(`Total Nodes: ${workflowData.metadata.nodeCount}`);
    console.log(`Max Depth: ${workflowData.metadata.maxDepth}`);
    console.log(`Has Branches: ${workflowData.metadata.hasBranches}`);
    console.log(`Has End Nodes: ${workflowData.metadata.hasEndNodes}`);
    
    alert('Workflow data logged to console! Check browser dev tools (F12).');
  }, [workflow]);


  const validateWorkflowIntegrity = useCallback(() => {
    const nodes = workflow.nodes;
    const rootId = workflow.rootId;
    
  
    if (!nodes[rootId]) {
      return { valid: false, message: 'Root node not found' };
    }
    

    const referencedNodes = new Set([rootId]);
    Object.values(nodes).forEach(node => {
      if (node.children) {
        node.children.forEach(childId => referencedNodes.add(childId));
      }
      if (node.branches) {
        Object.values(node.branches).forEach(childId => {
          if (childId) referencedNodes.add(childId);
        });
      }
    });
    
    const allNodeIds = new Set(Object.keys(nodes));
    const orphanedNodes = [...allNodeIds].filter(id => !referencedNodes.has(id));
    
    if (orphanedNodes.length > 0) {
      return { valid: false, message: `Orphaned nodes found: ${orphanedNodes.join(', ')}` };
    }
    
 
    for (const [nodeId, node] of Object.entries(nodes)) {

      if (node.type === NODE_TYPES.END) {
        if ((node.children && node.children.length > 0) || 
            (node.branches && Object.values(node.branches).some(v => v !== null))) {
          return { valid: false, message: `End node '${nodeId}' has children` };
        }
      }
      
    
      if (node.type === NODE_TYPES.ACTION && node.children && node.children.length > 1) {
        return { valid: false, message: `Action node '${nodeId}' has multiple children` };
      }
    }
    
    return { valid: true, message: 'Workflow is valid' };
  }, [workflow]);


  const calculateWorkflowDepth = useCallback(() => {
    const calculateDepth = (nodeId, currentDepth = 0) => {
      const node = workflow.nodes[nodeId];
      if (!node) return currentDepth;
      
      if (node.type === NODE_TYPES.BRANCH) {
        const branchDepths = Object.values(node.branches || {})
          .filter(childId => childId !== null)
          .map(childId => calculateDepth(childId, currentDepth + 1));
        return Math.max(0, ...branchDepths, currentDepth);
      }
      
      if (node.children && node.children.length > 0) {
        const childDepths = node.children.map(childId => calculateDepth(childId, currentDepth + 1));
        return Math.max(...childDepths);
      }
      
      return currentDepth;
    };
    
    return calculateDepth(workflow.rootId);
  }, [workflow]);

  return (
    <div className="App">
      <div className="app-header">
        <h1>Workflow Builder</h1>
        <button className="save-btn" onClick={saveWorkflow}>
          💾 Save Workflow
        </button>
      </div>
      <WorkflowCanvas 
        workflow={workflow}
        onAddNode={setShowAddMenu}
        onDeleteNode={deleteNode}
        onEditNode={setEditingNode}
      />
      
      {showAddMenu && (
        <AddNodeMenu 
          parentId={showAddMenu.parentId}
          branchName={showAddMenu.branchName}
          position={showAddMenu.position}
          onAddNode={addNode}
          onClose={() => setShowAddMenu(null)}
        />
      )}
      
      {editingNode && (
        <EditNodeModal 
          nodeId={editingNode}
          currentNode={workflow.nodes[editingNode]}
          onEditNode={editNode}
          onClose={() => setEditingNode(null)}
        />
      )}
    </div>
  );
}


function EditNodeModal({ nodeId, currentNode, onEditNode, onClose }) {
  const [label, setLabel] = useState(currentNode.label);

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditNode(nodeId, label);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Edit Node</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            autoFocus
          />
          <div className="modal-buttons">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
