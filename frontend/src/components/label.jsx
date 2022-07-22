export default function Label({ className = "", ...props }) {
  return (
    <label className={`${className} block text-gray-600`} {...props}></label>
  );
}
