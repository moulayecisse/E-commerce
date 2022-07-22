export default function Select({ data = [], className = "" }) {
  return (
    <>
      <select>
        {data.map((option, index) => (
          <option
            key={index}
            value={option.value}
            className={`${className} h-10 rounded border border-gray-300 px-2 outline-none`}
          >
            {option.name}
          </option>
        ))}
      </select>
    </>
  );
}
