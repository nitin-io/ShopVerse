import SideBar from "../layout/SideBar";
import NavBar from "../layout/NavBar";
import ProductContainer from "../layout/ProductContainer";

function Home() {

  return (
    <>
      <NavBar />
      <main>
        <div className="middle-container">
          <SideBar />
          <ProductContainer />
        </div>
      </main>
    </>
  );
}

export default Home;
