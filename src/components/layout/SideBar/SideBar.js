import React from "react";
import { slide as Menu } from "react-burger-menu";

export const SideBar = (props) => {
  return (
    <Menu>
      <a className="menu-item" href="/intentions">
        Lista intencija
      </a>
      <a className="menu-item" href="/newintention">
        Nova intencija
      </a>
      <a className="menu-item" href="/pizzas">
        Pizzas
      </a>
      <a className="menu-item" href="/desserts">
        Desserts
      </a>
    </Menu>
  );
};
