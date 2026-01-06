export default function ThemeToggle({ darkMode, setDarkMode }) {
    return (
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="px-4 py-2 rounded-full border border-slate-300 dark:border-slate-600 text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition"
      >
        {darkMode ? "☀ Light" : "🌙 Dark"}
      </button>
    );
  }
  