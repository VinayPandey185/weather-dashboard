import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-gray-800 text-white p-4 flex justify-between">
      <h1 className="font-bold">Weather App</h1>
      <div className="space-x-4">
        <Link to="/">Dashboard</Link>
        <Link to="/analytics">Analytics</Link>
      </div>
    </div>
  );
};

export default Navbar;