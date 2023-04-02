import { Layout } from "../components/layout/Layout";
import ProductContainer from "../components/layout/ProductContainer";
import { useAuth } from "./../components/context/auth.jsx";

function Home() {
  const [auth, setAuth] = useAuth();

  return (
    <>
      <Layout>
        <h2>{`Hello Nitin`}</h2>
        <ProductContainer />
      </Layout>
    </>
  );
}

export default Home;
