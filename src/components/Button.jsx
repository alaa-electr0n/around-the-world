function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="rounded-[4px] border-transparent bg-white px-2 py-1 text-4xl font-bold dark:bg-slate-900 dark:text-slate-100"
    >
      {children}
    </button>
  );
}

export default Button;
