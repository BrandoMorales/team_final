export default function SearchFilter({
  query,
  onQueryChange,
  authors,
  filterAuthor,
  onFilterAuthor,
}) {
  return (
    <div className="search-filter">
      <input
        type="text"
        placeholder="🔍 Buscar por autor o texto..."
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
      />
      <select
        value={filterAuthor}
        onChange={(e) => onFilterAuthor(e.target.value)}
      >
        <option value="">Filtrar por autor (todos)</option>
        {authors.map((a) => (
          <option key={a} value={a}>
            {a}
          </option>
        ))}
      </select>
      <button onClick={() => { onQueryChange(""); onFilterAuthor(""); }}>
        ❌ Limpiar
      </button>
    </div>
  )
}
