import React from "react";
import { elastic as Menu } from "react-burger-menu";

export const SideBar = (props) => {
  return (
    <div>
      <Menu isOpen={props.isOpen}>
        <a className="menu-item" href="/intentions">
          Lista intencija
        </a>
        <a className="menu-item" href="/calendar">
          Kalendar intencija
        </a>
        <a className="menu-item" href="/newintention">
          Nova intencija
        </a>
      </Menu>
    </div>
  );
};
