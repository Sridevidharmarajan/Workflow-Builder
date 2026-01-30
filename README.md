"Workflow Builder UI

A React-based workflow builder application that allows users to create, edit, and manage workflow diagrams with different node types and connections.

Features

Interactive Workflow Design: Create workflows with intuitive interface
Multiple Node Types: 
Start Nodes: Entry points for workflows
Action Nodes: Single-step operations
Branch Nodes: Decision points with true/false paths
End Nodes: Workflow termination points
Edit Functionality: Modify node labels and properties
Delete Management: Smart node deletion with automatic reconnection
Save Export: Export workflow data structure to console
Modern UI: Clean, responsive design with smooth animations

Tech Stack

Frontend: React 18.2.0
Build Tool: Create React App (react-scripts 5.0.1)
Styling: CSS3 with modern flexbox/grid layouts
Deployment: Vercel-ready configuration

Quick Start

Prerequisites
Node.js 14+ installed
npm or yarn package manager

Installation

1. Clone the repository:
   git clone https://github.com/Sridevidharmarajan/Workflow-Builder.git
   cd Workflow-Builder

2. Install dependencies:
   npm install

3. Start the development server:
   npm start

4. Open your browser and navigate to http://localhost:3000

How to Use

1. Create Workflows: Start with the default Start node
2. Add Nodes: Click the + button on any node to add new steps
3. Choose Node Types: Select from Action, Branch, or End nodes
4. Edit Nodes: Click the edit button to modify node labels
5. Delete Nodes: Click the delete button to remove nodes
6. Save Workflows: Click Save Workflow to export data structure

Project Structure

src/
App.jsx              # Main application component
App.css              # Global styles
index.js             # Application entry point
components/
WorkflowCanvas.jsx    # Main workflow display area
AddNodeMenu.jsx       # Node selection menu
Node.jsx              # Individual node component
*.css                 # Component-specific styles

Node Types Rules

Start Node
Entry point of workflow
Can have exactly one child
Cannot be deleted

Action Node
Represents a single action/step
Can have zero or one child
Can be edited and deleted

Branch Node
Decision point with two paths
Has true and false branches
Each branch can have one child
Can be edited and deleted

End Node
Workflow termination point
Cannot have any children
Can be edited and deleted

Deployment

This project is configured for easy deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect the React app
3. Deploy with default settings
4. Your app will be live on Vercel's domain

Contributing

1. Fork the repository
2. Create a feature branch (git checkout -b feature/amazing-feature)
3. Commit your changes (git commit -m 'Add some amazing feature')
4. Push to the branch (git push origin feature/amazing-feature)
5. Open a Pull Request

License

This project is part of a frontend internship assignment. Please contact the repository owner for usage permissions.

Acknowledgments

React team for the amazing framework
Vercel for seamless deployment
Create React App for the projApp setup"


