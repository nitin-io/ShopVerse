function SearchField() {
  const searchBox = {
    height: "30px",
    fontSize: "1rem",
    border: "1px solid #646cff",
    borderRadius: "0.4rem",
    width: "50%",
    outline: "none",
    padding: "0 0.5rem"
  };
  return (
    <>
      <input type="text" placeholder="Search" style={searchBox} />
    </>
  );
}

export default SearchField;
