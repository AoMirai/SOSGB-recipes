function SearchInput({ value, onChange, placeholder = 'Search...' }) {
  return (
    <input
      type='text'
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: '100%',
        padding: '8px',
        fontSize: '14px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        boxSizing: 'border-box',
        marginBottom: '10px'
      }}
    />
  );
}

export default SearchInput;
