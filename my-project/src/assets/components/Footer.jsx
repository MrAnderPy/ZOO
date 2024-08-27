import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-black py-4">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Derechos reservados de Zoo</p>
      </div>
    </footer>
  );
}
