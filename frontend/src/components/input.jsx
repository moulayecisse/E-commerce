export default function Input({ disabled = false, className = "", ...props }) {
  return (
    <input
      disabled={disabled}
      className={`${className} h-10 rounded border border-gray-200 px-2 outline-none`}
      {...props}
    />
  );
}
