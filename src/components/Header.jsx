import React from "react";
import { TbBuildingStore } from "react-icons/tb";
import { Link } from "react-router-dom";
import User from "./User";
import { useUserContext } from "../context/UserContext";
import Button from "./ui/Button";
import CartStatus from "./CartStatus";

export default function Header() {
  const { user, login, logout } = useUserContext();

  return (
    <header className="flex justify-between items-center border-b border-grey p-3 w-full">
      <Link to="/" className="flex items-center text-main gap-2 text-2xl">
        <TbBuildingStore />
        <span>Shoppy</span>
      </Link>
      <div className="flex items-center gap-3">
        <Link to="products">Products</Link>
        {
          <Link to="/cart">
            <CartStatus />
          </Link>
        }
        {user && <User user={user} />}
        {!user && <Button onClick={login} text="Login" />}
        {user && <Button onClick={logout} text="Logout" />}
      </div>
    </header>
  );
}
