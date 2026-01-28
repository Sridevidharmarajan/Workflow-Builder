<<<<<<< HEAD
# Workflow Builder UI

Frontend Intern Take-Home Assignment: A visual workflow builder application that allows users to create and edit workflows consisting of nodes and connections.

## 🚀 Features

### Core Functionality
- **Visual Workflow Canvas**: Interactive canvas for building workflows with drag-free node placement
- **Three Node Types**:
  - **Start Node**: Root node (non-deletable) with single outgoing connection
  - **Action Node**: Single step/task with exactly one outgoing connection  
  - **Branch Node**: Decision point with multiple outgoing connections (True/False branches)
  - **End Node**: Final step with zero outgoing connections (no add button)
- **Context-Aware Actions**: Add nodes directly after selected nodes or in specific branch paths
- **Smart Validation**: Prevents invalid actions (deleting Start, adding children to End, multiple children to Action)
- **Workflow Continuity**: Automatic reconnection when nodes are deleted to maintain flow
- **Edit Functionality**: Edit node labels with inline modal
- **Save Feature**: Export complete workflow JSON structure to console

### Visual Design
- Clean, modern UI without external libraries
- Color-coded node types for easy identification
- Continuous visual connector lines between parent-child and branch connections
- Smooth hover effects and transitions
- Responsive layout with proper spacing

## 🛠️ Technology Stack

- **React 18.2.0** (Functional Components + Hooks)
- **JavaScript** (ES6+)
- **CSS3** (No external UI libraries)
- **No animation libraries** - CSS transitions only
- **No workflow/diagram libraries** - Custom implementation

## 📁 Project Structure

```
workflow-builder-ui/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── WorkflowCanvas.jsx
│   │   ├── WorkflowCanvas.css
│   │   ├── Node.jsx
│   │   ├── Node.css
│   │   └── AddNodeMenu.jsx
│   │   └── AddNodeMenu.css
│   ├── App.jsx
│   ├── App.css
│   └── index.js
├── package.json
└── README.md
```

## 🏗️ Data Model

The workflow uses a flat node structure with ID references:

```javascript
const workflowData = {
  nodes: {
    'node-id': {
      id: 'unique-string-id',
      type: 'start|action|branch|end',
      label: 'Node Title',
      children: [], // For non-branch nodes
      branches: {    // For branch nodes only
        'true': 'child-node-id',
        'false': 'child-node-id'
      }
    }
  },
  rootId: 'start-node-id'
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation

1. **Clone or download the project**
2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm start
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

### Available Scripts

- `npm start` - Run development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## 🎯 Usage Guide

### Adding Nodes
1. **Action/Start Nodes**: Click the ➕ button on any non-End node that doesn't already have a child
2. **Branch Nodes**: Click the ➕ button, then select "Branch Node" to create True/False paths
3. **End Nodes**: Add as the final step in any workflow path

### Editing Nodes
1. Click the ✏️ button on any node
2. Edit the label in the modal
3. Click "Save" to confirm

### Deleting Nodes
1. Click the 🗑️ button on any node except Start
2. The parent automatically reconnects to maintain workflow continuity

### Branch Management
1. Add nodes to specific True/False branches using the "+ Add to branch" buttons
2. Each branch can contain its own complete workflow path

### Saving Workflows
1. Click the "💾 Save Workflow" button in the header
2. Check browser console (F12) for the complete JSON structure
3. Copy the JSON for external storage or analysis

## 🔧 Implementation Details

### Key Algorithms

**Add Node Logic**:
```javascript
// Validation prevents invalid operations
if (parent.type === 'end') return; // Can't add to End
if (parent.type === 'action' && parent.children.length > 0) return; // Action has max 1 child
```

**Delete Node Logic**:
```javascript
// Automatic reconnection maintains workflow continuity
if (parent.type === 'branch') {
  // Branch reconnects to deleted node's first child
  parent.branches[branchName] = nodeToDelete.children[0] || null;
} else {
  // Action/Start replaces deleted node with its children
  parent.children.splice(index, 1, ...nodeToDelete.children);
}
```

**Visual Connections**:
- CSS-based connector lines for parent-child relationships
- Branch-specific connectors with arrow indicators
- Continuous lines showing workflow flow direction

### Component Architecture

- **App.jsx**: Main state management and core operations
- **WorkflowCanvas.jsx**: Recursive rendering and layout management
- **Node.jsx**: Individual node rendering with context-aware actions
- **AddNodeMenu.jsx**: Modal for selecting node types

## 🌟 Assignment Requirements Met

✅ **Core Requirements**
- Single-page workflow builder application
- Visual workflow canvas with node representations
- Three distinct node types with proper connection rules
- Add/Delete/Edit functionality with validation
- Workflow continuity maintenance

✅ **Technical Constraints**
- React functional components with Hooks only
- No external UI libraries (Material UI, Chakra, etc.)
- No workflow/diagram libraries (React Flow, GoJS, etc.)
- No animation libraries
- CSS and native JavaScript only

✅ **Data Modeling**
- Scalable JSON structure for nodes and connections
- Proper handling of branches and nested workflows
- Efficient state management with React Hooks

✅ **User Experience**
- Intuitive context-aware node addition
- Clear visual connections between nodes
- Prevents invalid operations with helpful feedback
- Smooth interactions without external dependencies

## 🚀 Deployment

### Vercel Deployment
1. Push code to GitHub repository
2. Connect repository to Vercel
3. Vercel will automatically detect and deploy the React app
4. No build configuration needed

### Netlify Deployment
1. Run `npm run build` to create production build
2. Upload the `build` folder to Netlify
3. Set up continuous deployment from Git repository

### Manual Deployment
1. Run `npm run build`
2. Deploy the `build` folder contents to any static hosting service
3. Ensure the hosting supports client-side routing

## 🎨 Design Principles

- **Simplicity**: Clean interface without unnecessary complexity
- **Clarity**: Visual distinction between node types and connections
- **Intuition**: Context-aware actions that match user expectations
- **Accessibility**: Semantic HTML and keyboard navigation support
- **Performance**: Efficient rendering with React optimization

## 📊 Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🔍 Future Enhancements

Potential improvements beyond assignment scope:
- Undo/Redo functionality
- Drag-and-drop node positioning
- Real-time collaboration
- Workflow templates
- Export to multiple formats (JSON, XML, etc.)
- Advanced validation rules
- Node grouping and sub-workflows

---

**Built with ❤️ for the Frontend Intern Take-Home Assignment**
=======
# Jenkins
>>>>>>> eb165b5bdbb10096215955cdb1b871a54b0d7563
