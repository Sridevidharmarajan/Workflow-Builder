🧩 Workflow Builder UI
A React-based workflow builder application that allows users to create, edit, and manage workflow diagrams using different node types and connections through an intuitive visual interface.
🚀 Features
Interactive Workflow Design
Build workflows visually with an easy-to-use drag-style interface.
Multiple Node Types
Start Node – Entry point of the workflow
Action Node – Represents a single operation
Branch Node – Decision point with true/false paths
End Node – Workflow termination point
Edit Functionality
Modify node labels and properties easily.
Smart Delete Management
Delete nodes with automatic reconnection where applicable.
Save & Export
Export the workflow data structure to the console.
Modern UI
Clean, responsive design with smooth animations.
🛠 Tech Stack
Frontend: React 18.2.0
Build Tool: Create React App (react-scripts 5.0.1)
Styling: CSS3 (Flexbox & Grid)
Deployment: Vercel-ready configuration
⚡ Quick Start
Prerequisites
Node.js 14+
npm or yarn
📦 Installation
Clone the repository
Copy code
Bash
git clone https://github.com/Sridevidharmarajan/Workflow-Builder.git
cd Workflow-Builder
Install dependencies
Copy code
Bash
npm install
Start the development server
Copy code
Bash
npm start
Open your browser and navigate to:
👉 http://localhost:3000
🧭 How to Use
Create Workflow:
Start with the default Start Node
Add Nodes:
Click the + button on any node
Choose Node Types:
Action, Branch, or End
Edit Nodes:
Click the Edit button to update labels
Delete Nodes:
Click the Delete button to remove nodes
Save Workflow:
Click Save Workflow to export the workflow structure to the console
📁 Project Structure
Copy code

src/
│
├── App.jsx                # Main application component
├── App.css                # Global styles
├── index.js               # Application entry point
│
├── components/
│   ├── WorkflowCanvas.jsx # Main workflow display area
│   ├── AddNodeMenu.jsx    # Node selection menu
│   ├── Node.jsx           # Individual node component
│
├── *.css                  # Component-specific styles
🔗 Node Type Rules
Start Node
Entry point of the workflow
Can have exactly one child
❌ Cannot be deleted
Action Node
Represents a single action or step
Can have zero or one child
✅ Can be edited and deleted
Branch Node
Decision point with true/false paths
Each branch can have one child
✅ Can be edited and deleted
End Node
Workflow termination point
❌ Cannot have children
✅ Can be edited and deleted
🌍 Deployment
This project is configured for easy deployment on Vercel:
Connect your GitHub repository to Vercel
Vercel automatically detects the React app
Deploy using default settings
Your app will be live on a Vercel domain 🎉
🤝 Contributing
Fork the repository
Create a feature branch
Copy code
Bash
git checkout -b feature/amazing-feature
Commit your changes
Copy code
Bash
git commit -m "Add some amazing feature"
Push to the branch
Copy code
Bash
git push origin feature/amazing-feature
Open a Pull Request
📜 License
This project is part of a frontend internship assignment.
Please contact the repository owner for usage permissions.
🙌 Acknowledgments
React team for the amazing framework
Vercel for seamless deployment
Create React App for project setup




