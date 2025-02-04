import React from "react";
import { Outlet } from "react-router-dom";
import Menu from "./Menu";
import Header from "./Header";

function Layout() {
  return (
    <main>
      <Header />
      <Outlet />
      <Menu />
    </main>
  );
}

export default Layout;
