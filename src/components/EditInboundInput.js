function EditInboundInput({ label, value, type = "text", onChange }) {
  return (
    <input
      type={type}
      placeholder={label}
      value={value}
      onChange={onChange}
      className="w-full p-2 border rounded"
    />
  );
}

export default EditInboundInput;