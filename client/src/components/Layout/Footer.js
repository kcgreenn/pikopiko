import React from "react";

export default function Footer(props) {
  return (
    <footer className="footer fixed-bottom bg-dark text-white mt-5 pt-1 text-center">
      <p>
        <small>&copy; {new Date().getFullYear()} Face-Bot</small>
      </p>
    </footer>
  );
}
