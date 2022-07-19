export default function Select({ data = [], className = "" }) {
  return (
    <>
      <select>
        {data.map((option) => (
          <option
            value={option.value}
            className={`${className} outline-none border rounded border-gray-200 h-10 px-2`}
          >
            {option.name}
          </option>
        ))}
      </select>
    </>
  );
}
