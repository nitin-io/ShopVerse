import SideBar from "../components/layout/SideBar";
import { Layout } from "../components/layout/Layout";
import ProductContainer from "../components/layout/ProductContainer";

function Home() {
  return (
    <>
      <Layout>
        <div className="middle-container">
          <SideBar />
          <ProductContainer />
        </div>
      </Layout>
    </>
  );
}

export default Home;
