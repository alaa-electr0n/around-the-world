import { Outlet } from "react-router-dom";
import Header from "./Header";

function AppLayout() {
  return (
    <div className="font-inter min-h-screen w-full bg-gray-100 dark:bg-gray-900 dark:text-gray-100">
      <Header />
      <Outlet />
    </div>
  );
}

export default AppLayout;
