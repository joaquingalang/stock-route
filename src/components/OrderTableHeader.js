// OrderTableHeader.js
function OrderTableHeader({ columns }) {
  return (
    <div className={`grid grid-cols-${columns.length} gap-1 p-3 mb-3 shadow-2xl rounded-lg items-center bg-[#D9D9D9] border border-[#000000]`}>
      {columns.map((col, idx) => (
        <h1 key={idx} className={"font-semibold text-center"}>
          {col.label || col}
        </h1>
      ))}
    </div>
  );
}

export default OrderTableHeader;