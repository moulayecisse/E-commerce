export default function Select({ data = [], className = "" }) {
  return (
    <>
      <select>
        {data.map((option) => (
          <option
            value={option.value}
            className={`${className} h-10 rounded border border-gray-200 px-2 outline-none`}
          >
            {option.name}
          </option>
        ))}
      </select>
    </>
  );
}
