function SearchField() {
    const searchBox = {
        width: "80%",
        height: "30px",
        fontSize: "1rem"
    }
    return <>
        <input type="text" placeholder="Search" style={searchBox}/>
    </>
}

export default SearchField;