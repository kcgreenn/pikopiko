import React from "react";

export default function Footer(props) {
  return (
    <footer className="footer bg-dark mt-auto text-white py-1 text-center">
      <p>
        <small>&copy; {new Date().getFullYear()} Face-Bot</small>
      </p>
    </footer>
  );
}
