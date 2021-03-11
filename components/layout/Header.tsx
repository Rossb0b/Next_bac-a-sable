import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  let logoContainer = (
    <div className="logo_container">
      <Link href="/">
        <a className="bold" data-active={isActive("/")}>
          Home
        </a>
      </Link>
    </div>
  );

  let menuContainer = (
    <div className="menu_container">
      <Link href="/">
        <a className="bold" data-active={isActive("/")}>
          First <br/> redirection
        </a>
      </Link>
      <Link href="/">
        <a className="bold" data-active={isActive("/")}>
          Second <br/> redirection
        </a>
      </Link>
      <Link href="/">
        <a className="bold" data-active={isActive("/")}>
          Third <br/> redirection
        </a>
      </Link>
      <style jsx>{`
        a {
          padding: 0 12px;
        }
      `}</style>
    </div>
  )

  let userContainer = (
    <div className="user_container">
      <Link href="/">
        <a className="bold" data-active={isActive("/")}>
          Login
        </a>
      </Link>
      <Link href="/">
        <a className="bold" data-active={isActive("/")}>
          Sign in
        </a>
      </Link>
    </div>
  );

  return (
    <nav>
      {logoContainer}
      {menuContainer}
      {userContainer}
      <style jsx global>{`
        nav {
          display: flex;
          flex-wrap: wrap;
          flex-direction: row;
          justify-content: space-between;
          padding: 12px;
          text-align: center;
        }
        .bold {
          font-weight: bold;
        }

        a {
          text-decoration: none;
          color: #000;
          display: inline-block;
        }

        a[data-active="true"] {
          color: gray;
        }

        a + a {
          margin-left: 1rem;
        }
      `}</style>
    </nav>
  );
};

export default Header;
