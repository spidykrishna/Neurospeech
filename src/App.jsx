
import { useEffect,useState } from "react";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [organization, setOrganization] = useState("");
  const [dashboard, setDashboard] = useState(false);
  const [activePage, setActivePage] = useState("Dashboard");
  const [showCreateAgent, setShowCreateAgent] = useState(false);
const [agentName, setAgentName] = useState("");
const [agentLanguage, setAgentLanguage] = useState("English");
const [agentTimezone, setAgentTimezone] = useState("Asia/Kolkata");
const [settingsSaved, setSettingsSaved] = useState(false);
const [totalDocuments, setTotalDocuments] = useState(2);
const [editingAgent, setEditingAgent] = useState(null);
const [editAgentName, setEditAgentName] = useState("");
const [editAgentLanguage, setEditAgentLanguage] = useState("English");
const [editAgentTimezone, setEditAgentTimezone] = useState("Asia/Kolkata");
const [demoCallStatus, setDemoCallStatus] = useState("Idle");
const [demoCallNumber, setDemoCallNumber] = useState("");
const [callHistory, setCallHistory] = useState(() => {
  const savedCalls = localStorage.getItem("neurospeech_calls");

  return savedCalls
    ? JSON.parse(savedCalls)
    : [
        {
          id: 1,
          number: "+91 9876543210",
          status: "Completed",
          duration: "02:14",
        },
        {
          id: 2,
          number: "+91 9123456780",
          status: "Completed",
          duration: "01:42",
        },
      ];
});
const [agents, setAgents] = useState(() => {
  const savedAgents = localStorage.getItem("neurospeech_agents");

  return savedAgents ? JSON.parse(savedAgents) : [];
});
useEffect(() => {
  localStorage.setItem(
    "neurospeech_calls",
    JSON.stringify(callHistory)
  );
}, [callHistory]);


  const handleLogin = (event) => {
    event.preventDefault();

    if (!email || !password) {
      setMessage("Please enter email and password.");
      return;
    }

    setMessage("");
    setLoggedIn(true);
  };



const handleOrganization = (event) => {
  event.preventDefault();

  if (!organization) {
    setMessage("Please select an organization.");
    return;
  }

  setMessage("");
  setDashboard(true);
};

if (dashboard) {
  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <h2>NeuroSpeech</h2>


<nav>
<a
  className={activePage === "Dashboard" ? "active-link" : ""}
  onClick={() => setActivePage("Dashboard")}
>
  Dashboard
</a>

<a
  className={activePage === "Agents" ? "active-link" : ""}
  onClick={() => setActivePage("Agents")}
>
  Agents
</a>

<a
  className={activePage === "Calls" ? "active-link" : ""}
  onClick={() => setActivePage("Calls")}
>
  Calls
</a>

<a
  className={activePage === "Knowledge" ? "active-link" : ""}
  onClick={() => setActivePage("Knowledge")}
>
  Knowledge
</a>

<a
  className={activePage === "Settings" ? "active-link" : ""}
  onClick={() => setActivePage("Settings")}
>
  Settings
</a>
</nav>
<button
  className="logout-button"
  onClick={() => {
    setLoggedIn(false);
    setDashboard(false);
    setOrganization("");
    setActivePage("Dashboard");
  }}
>
  Logout
</button>
      </aside>


<main className="dashboard-main">
  {activePage === "Agents" ? (
    <>
      <header className="dashboard-header">
        <div>
          <h1>Agents</h1>
          <p>Manage your AI voice agents.</p>
          <p className="agent-count">
  Total Agents: {agents.length}
</p>
        </div>

<button onClick={() => setShowCreateAgent(true)}>
  + Create Agent
</button>
      </header>

      <div className="agent-grid">
        {showCreateAgent && (
  <div className="create-agent-panel">
    <h2>Create New Agent</h2>

<form
  onSubmit={(event) => {
    event.preventDefault();

    if (!agentName.trim()) {
      alert("Please enter agent name.");
      return;
    }

const newAgent = {
  id: Date.now(),
  name: agentName,
  language: agentLanguage,
  timezone: agentTimezone,
  status: "Draft",
};
    setAgents([...agents, newAgent]);

    setAgentName("");
    setAgentLanguage("English");
    setAgentTimezone("Asia/Kolkata");
    setShowCreateAgent(false);
  }}
>
      <label>Agent Name</label>

      <input
        type="text"
        placeholder="Enter agent name"
        value={agentName}
        onChange={(event) => setAgentName(event.target.value)}
      />

      <label>Language</label>

      <select
        value={agentLanguage}
        onChange={(event) => setAgentLanguage(event.target.value)}
      >
        <option value="English">English</option>
        <option value="Hindi">Hindi</option>
        <option value="Hinglish">Hinglish</option>
      </select>

      <label>Timezone</label>

      <select
        value={agentTimezone}
        onChange={(event) => setAgentTimezone(event.target.value)}
      >
        <option value="Asia/Kolkata">Asia/Kolkata</option>
        <option value="UTC">UTC</option>
        <option value="America/New_York">
          America/New_York
        </option>
      </select>

      <button type="submit">Create Agent</button>

      <button
        type="button"
        onClick={() => setShowCreateAgent(false)}
      >
        Cancel
      </button>
    </form>
  </div>
)}
{editingAgent && (
  <div className="create-agent-panel">
    <h2>Edit Agent</h2>

    <form
      onSubmit={(event) => {
        event.preventDefault();

        if (!editAgentName.trim()) {
          alert("Agent name is required");
          return;
        }

        setAgents(
          agents.map((item) =>
            item.id === editingAgent.id
              ? {
                  ...item,
                  name: editAgentName,
                  language: editAgentLanguage,
                  timezone: editAgentTimezone,
                }
              : item
          )
        );

        setEditingAgent(null);
        setEditAgentName("");
      }}
    >
      <label>Agent Name</label>
      <input
        type="text"
        value={editAgentName}
        onChange={(event) => setEditAgentName(event.target.value)}
        placeholder="Enter agent name"
      />

      <label>Language</label>
      <select
        value={editAgentLanguage}
        onChange={(event) => setEditAgentLanguage(event.target.value)}
      >
        <option value="English">English</option>
        <option value="Hindi">Hindi</option>
        <option value="Hinglish">Hinglish</option>
      </select>

      <label>Timezone</label>
      <select
        value={editAgentTimezone}
        onChange={(event) => setEditAgentTimezone(event.target.value)}
      >
        <option value="Asia/Kolkata">Asia/Kolkata</option>
        <option value="UTC">UTC</option>
        <option value="America/New_York">America/New_York</option>
      </select>

      <button type="submit">Save Changes</button>

      <button
        type="button"
        className="secondary-button"
        onClick={() => setEditingAgent(null)}
      >
        Cancel
      </button>
    </form>
  </div>
)}
{agents.length === 0 ? (
  <div className="empty-state">
    <h3>No agents yet</h3>
    <p>Create your first AI voice agent to get started.</p>
  </div>
) : (
  agents.map((agent) => (
    <div className="agent-card" key={agent.id}>
      <div className="agent-card-top">
        <h3>{agent.name}</h3>
<span className="agent-status">{agent.status}</span>
<button
  className="secondary-button"
  onClick={() => {
    setEditingAgent(agent);
    setEditAgentName(agent.name);
    setEditAgentLanguage(agent.language);
    setEditAgentTimezone(agent.timezone);
  }}
>
  Edit
</button>
      </div>

      <p>{agent.language} Voice Agent</p>
      <p>Timezone: {agent.timezone}</p>

      <div className="agent-actions">
<button
  className="secondary-button"
  onClick={() => {
    setEditingAgent(agent);
    setEditAgentName(agent.name);
    setEditAgentLanguage(agent.language);
    setEditAgentTimezone(agent.timezone);
  }}
>
  Edit
</button>
<button
  className="secondary-button"
  onClick={() => {
    setAgents(
      agents.map((item) =>
        item.id === agent.id
          ? {
              ...item,
              status: item.status === "Active" ? "Inactive" : "Active",
            }
          : item
      )
    );
  }}
>
  {agent.status === "Active" ? "Deactivate" : "Activate"}
</button>

        <button
onClick={() => {
  const confirmed = window.confirm(
    `Are you sure you want to delete ${agent.name}?`
  );

  if (confirmed) {
    setAgents(agents.filter((item) => item.id !== agent.id));
  }
}}
        >
          Delete
        </button>
      </div>
    </div>
  ))
)}
      </div>
    </>
  ) : activePage === "Calls" ? (
    <>
      <header className="dashboard-header">
        <div>
          <h1>Calls</h1>
          <p>View and manage your voice call history.</p>
        </div>
      </header>

 <div className="calls-card">
  <h3>Recent Calls</h3>
  <div className="demo-call-panel">
  <h2>Demo Call</h2>
  <p>Test your AI voice agent call flow.</p>

  <input
    type="text"
    placeholder="Enter caller number"
    value={demoCallNumber}
    onChange={(event) => setDemoCallNumber(event.target.value)}
  />

  <p className="call-status">
    Status: <strong>{demoCallStatus}</strong>
  </p>

  <button
    onClick={() => {
      if (!demoCallNumber.trim()) {
        alert("Please enter a caller number");
        return;
      }

      setDemoCallStatus("Calling...");
    }}
  >
    Start Demo Call
  </button>

<button
  className="secondary-button"
  onClick={() => {
    if (!demoCallNumber.trim()) {
      alert("Please enter a caller number");
      return;
    }

    const newCall = {
      id: Date.now(),
      number: demoCallNumber,
      status: "Completed",
      duration: "00:30",
    };

    setCallHistory([newCall, ...callHistory]);
    setDemoCallStatus("Completed");
  }}
>
  Complete Call
</button>

  <button
    className="secondary-button"
    onClick={() => {
      setDemoCallStatus("Idle");
      setDemoCallNumber("");
    }}
  >
    Reset
  </button>
</div>

  <table className="calls-table">
    <thead>
      <tr>
        <th>Caller</th>
        <th>Agent</th>
        <th>Duration</th>
        <th>Status</th>
      </tr>
    </thead>

 <tbody>
  {callHistory.map((call) => (
    <tr key={call.id}>
      <td>{call.number}</td>
      <td>{call.status}</td>
      <td>{call.duration}</td>
    </tr>
  ))}
</tbody>
  </table>
</div>
    </>
  ) : activePage === "Knowledge" ? (
    <>
      <header className="dashboard-header">
        <div>
          <h1>Knowledge Base</h1>
          <p>Manage documents for your AI voice agents.</p>
        </div>
      </header>

<div className="knowledge-card">
  <div className="knowledge-header">
    <div>
      <h3>Knowledge Documents</h3>
      <p>Documents available for your AI agents.</p>
    </div>

<button
  className="primary-button"
  onClick={() => alert("Document upload feature coming soon!")}
>
  Upload Document
</button>
  </div>

  <div className="document-item">
    <div>
      <h4>Clinic Information.pdf</h4>
      <p>PDF Document • 2.4 MB</p>
    </div>

    <span className="document-status">Ready</span>
  </div>

  <div className="document-item">
    <div>
      <h4>Appointment Guidelines.pdf</h4>
      <p>PDF Document • 1.8 MB</p>
    </div>

    <span className="document-status">Ready</span>
  </div>
</div>
    </>
) : activePage === "Settings" ? (
    <>
      <header className="dashboard-header">
        <div>
          <h1>Settings</h1>
          <p>Manage your organization settings.</p>
        </div>
      </header>

<div className="settings-card">
  <h3>Organization Settings</h3>

  <label>Organization Name</label>
  <input
    type="text"
    value={organization}
    readOnly
  />

  <label>Organization Type</label>
  <input
    type="text"
    value="Healthcare Clinic"
    readOnly
  />

<button
  className="primary-button"
  onClick={() => setSettingsSaved(true)}
>
  Save Settings
</button>

{settingsSaved && (
  <p className="success-message">
    Settings saved successfully!
  </p>
)}
</div>
    </>
  ) : (
    <>
      <header className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Welcome to your NeuroSpeech workspace.</p>
        </div>

        <span className="organization-badge">
          {organization}
        </span>
      </header>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Agents</h3>
          <h2>{agents.length}</h2>
          <p>Your AI voice agents</p>
        </div>
        <div className="stat-card">
  <h3>Active Agents</h3>
  <p>
    {agents.filter((agent) => agent.status === "Active").length}
  </p>
</div>

        <div className="stat-card">
          <h3>Total Calls</h3>
          <h2>{callHistory.length}</h2>
          <p>Recorded calls</p>
        </div>

        <div className="stat-card">
          <h3>Knowledge Base</h3>
          <h2>{totalDocuments}</h2>
          <p>Documents uploaded</p>
        </div>
      </div>

<div className="welcome-panel">
  <h2>Get started with NeuroSpeech</h2>

  <p>
    Create your first AI voice agent to begin.
  </p>

  <button
    onClick={() => {
      setActivePage("Agents");
      setShowCreateAgent(true);
    }}
  >
    Create Agent
  </button>
</div>

<div className="activity-panel">
  <h2>Recent Activity</h2>

  <div className="activity-item">
    <div>
      <h4>AI Voice Agent Created</h4>
      <p>Your agent workspace is ready.</p>
    </div>
    <span>Today</span>
  </div>

  <div className="activity-item">
    <div>
      <h4>Knowledge Base Updated</h4>
      <p>Clinic documents are available.</p>
    </div>
    <span>Today</span>
  </div>

  <div className="activity-item">
    <div>
      <h4>Call History Viewed</h4>
      <p>Recent call records are available.</p>
    </div>
    <span>Today</span>
  </div>
</div>
    </>
  )}
</main>
    </div>
  );
}

  if (loggedIn) {
    return (
      <div className="app">
        <div className="login-card">
          <h1>Welcome to NeuroSpeech</h1>
          <p className="subtitle">
            Select your organization to continue.
          </p>


<form onSubmit={handleOrganization}>
  <label>Choose Organization</label>

  <div className="organization-list">
    <div
      className={`organization-card ${
        organization === "ABC Clinic" ? "selected" : ""
      }`}
      onClick={() => {
        setOrganization("ABC Clinic");
        setMessage("");
      }}
    >
      <div className="organization-icon">🏥</div>

      <div className="organization-info">
        <h3>ABC Clinic</h3>
        <p>Healthcare Organization</p>
      </div>

      <div className="organization-radio">
        {organization === "ABC Clinic" ? "●" : "○"}
      </div>
    </div>
  </div>

  <button type="submit">Continue</button>

  {message && <p className="message">{message}</p>}
</form>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="login-card">
        <h1>NeuroSpeech</h1>
        <p className="subtitle">Sign in to your organization</p>

        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <button type="submit">Login</button>

          {message && <p className="message">{message}</p>}
        </form>
      </div>
    </div>
  );
}

export default App;