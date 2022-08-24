export default function Button({ className = "", ...props }) {
  return (
    <button
      className={`${className} inline-flex items-center rounded border border-transparent bg-purple-700 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white ring-purple-300 transition duration-150 ease-in-out hover:bg-purple-800 focus:border-purple-900 focus:outline-none focus:ring active:bg-purple-900 disabled:opacity-25`}
      {...props}
    />
  );
}
