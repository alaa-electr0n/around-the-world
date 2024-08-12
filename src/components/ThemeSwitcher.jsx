import { useEffect } from "react";
import { useState } from "react";

const activeStyle = "flex justify-center items-center w-5 h-5 rounded-full ";

function ThemeSwitcher() {
  const [theme, setTheme] = useState("light");

  useEffect(function () {
    const localTheme = localStorage.getItem("theme") || "light";
    toggleTheme(localTheme);
  }, []);
  function toggleTheme(theme) {
    if (theme === "dark") {
      document.documentElement.classList.add(theme);
    } else {
      document.documentElement.classList.remove("dark");
    }
    setTheme(theme);
    localStorage.setItem("theme", theme);
  }
  return (
    <div className="flex h-8 w-14 items-center justify-around rounded-full bg-[#2e2f33]">
      <button
        className={`${activeStyle} ${theme === "light" ? "bg-white" : ""}`}
        onClick={() => toggleTheme("light")}
      >
        <img src="../src/assets/btn-light.svg" alt="light" />
      </button>

      <button
        className={`${activeStyle} ${theme === "dark" ? "bg-white" : ""}`}
        onClick={() => toggleTheme("dark")}
      >
        <img src="../src/assets/btn-dark.svg" alt="dark" />
      </button>
    </div>
  );
}

export default ThemeSwitcher;
