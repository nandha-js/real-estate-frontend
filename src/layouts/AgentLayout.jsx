import { Link, useLocation } from "react-router-dom";
import { FaHome, FaPlus, FaList, FaEnvelope, FaCog } from "react-icons/fa";

const AgentLayout = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { path: "/agent/dashboard", label: "Dashboard", icon: <FaHome /> },
    { path: "/agent/properties", label: "My Properties", icon: <FaList /> },
    { path: "/agent/properties/add", label: "Add Property", icon: <FaPlus /> },
    { path: "/agent/inquiries", label: "Inquiries", icon: <FaEnvelope /> },
    { path: "/agent/settings", label: "Settings", icon: <FaCog /> },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white min-h-screen p-4">
        <div className="mb-8 p-4">
          <h2 className="text-xl font-bold">Agent Dashboard</h2>
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-2 p-3 rounded transition-colors ${
                location.pathname === item.path
                  ? "bg-gray-700"
                  : "hover:bg-gray-700"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 bg-gray-50 min-h-screen">{children}</main>
    </div>
  );
};

export default AgentLayout;
