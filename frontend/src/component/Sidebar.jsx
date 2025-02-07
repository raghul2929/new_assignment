import { Home, Grid, List, Package, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [active, setActive] = useState("Dashboard");
  const navigate = useNavigate();

  const menuItems = [
    { name: "Dashboard", icon: <Home />, path: "/contains/" },
    { name: "Category", icon: <Grid />, path: "/contains/category" },
    { name: "Subcategory", icon: <List />, path: "/contains/subcategory" },
    { name: "Products", icon: <Package />, path: "/contains/products" },
  ];

  const handleNavigation = (name, path) => {
    setActive(name);
    navigate(path);
  };

  return (
    <div className="w-60 h-screen bg-gray-100 p-4 shadow-md mt-2">
      <ul>
        {menuItems.map((item) => (
          <li
            key={item.name}
            onClick={() => handleNavigation(item.name, item.path)}
            className={`flex items-center justify-between p-3 my-2 rounded-lg cursor-pointer transition-all ${
              active === item.name ? "bg-yellow-200" : "hover:bg-gray-200"
            }`}
          >
            <div className="flex items-center gap-3">
              {item.icon}
              <span>{item.name}</span>
            </div>
            <ChevronRight className="text-gray-400" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
