export default function Button({ className = "", ...props }) {
  return (
    <button
      className={`${className} ring- rounded-md border border-indigo-500 bg-transparent py-2 px-4 text-sm text-indigo-500 transition-all hover:bg-indigo-500 hover:text-white`}
      {...props}
    />
  );
}
