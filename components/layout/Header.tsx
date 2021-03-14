import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/client";

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const [session, loading] = useSession();

  const logoContainer = (
    <div className="logo_container">
      <Link href="/">
        <a className="bold" data-active={isActive("/")}>
          Home
        </a>
      </Link>
    </div>
  );

  const menuContainer = (
    <div className="menu_container">
      <Link href="/checkout">
        <a className="bold" data-active={isActive("/checkout")}>
          Checkout
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

  let userContainer = null;

  if (loading) {
    userContainer = (
      <div className="right">
        <p>Validating session ...</p>
        <style jsx>{`
          .right {
            margin-left: auto;
          }
        `}</style>
      </div>
    )
  }

  if (!session) {
    userContainer = (
      <div className="user_container">
        <Link href="/api/auth/signin">
          <a className="bold" data-active={isActive("/sign-in")}>
            Sign-in
          </a>
        </Link>
        <Link href="/auth/signup">
          <a className="bold" data-active={isActive("/sign-up")}>
            Sign-up
          </a>
        </Link>
      </div>
    );
  }

  if (session) {
    userContainer = (
      <div className="right">
        <p>
          {session.user.name} ({session.user.email})
        </p>
        <button onClick={() => signOut()}>
          <a>Log out</a>
        </button>
        <style jsx>{`
          a {
            text-decoration: none;
            color: #000;
            display: inline-block;
          }

          p {
            display: inline-block;
            font-size: 13px;
            padding-right: 1rem;
          }

          a + a {
            margin-left: 1rem;
          }

          button {
            border: none;
          }
        `}</style>
      </div>
    )
  }

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
