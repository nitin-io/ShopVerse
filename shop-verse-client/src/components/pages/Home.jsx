import { Layout } from "../layout/Layout";
import ProductContainer from "../layout/ProductContainer";
import { useAuth } from "../context/auth.jsx";

function Home() {
  const [auth, setAuth] = useAuth();

  return (
    <>
      <Layout>
        <ProductContainer />
      </Layout>
    </>
  );
}

export default Home;
