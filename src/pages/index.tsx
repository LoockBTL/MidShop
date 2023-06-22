import Wrapper from "@/components/wrapper/wrapper";
import { NextPage } from "next/types";
import { Container } from "react-bootstrap";
import { GetServerSideProps } from "next";
import $axios from "@/utils/axios";
import { AxiosResponse } from "axios";
import { CategoryInterface, ProductInterface } from "@/types/product-types";
import Card from "react-bootstrap/Card";
import Link from "next/dist/client/link";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
// https://api.escuelajs.co/api/v1/categories?offset=5&limit=5

interface HomeInterface {
  categories: CategoryInterface[];
  products: ProductInterface[];
}

export const getServerSideProps: GetServerSideProps<
  HomeInterface
> = async () => {
  const categoriesRes: AxiosResponse<CategoryInterface[]> = await $axios.get(
    "/categories?offset=5&limit=5"
  );
  const productRes: AxiosResponse<ProductInterface[]> = await $axios.get(
    "/products?offset=0&limit=10"
  );
  const products: ProductInterface[] = productRes.data;
  const categories: CategoryInterface[] = categoriesRes.data;
  return {
    props: {
      categories,
      products,
    },
  };
};

const Home: NextPage<HomeInterface> = ({ categories, products }) => {
  const theme = useSelector((state: RootState) => state.user.theme);

  return (
    <Container className="pt-3">
      <h3
        style={{
          color: theme === "dark" ? "#ffffff" : "#292929",
        }}
      >
        Products
      </h3>
      <div className="d-flex flex-wrap row">
        {products.map((obj) => (
          <Link
            key={obj.id}
            href={`/product/${obj.id}`}
            style={{
              textDecoration: "none",
              display: "flex",
              flex: "row wrap",
            }}
            className="col-xs-6 col-sm-6 col-md-4 col-lg-2"
          >
            <Card className="m-2">
              <Card.Img variant="left" src={obj.images[0]} />
              <Card.Body
                style={{
                  backgroundColor: theme === "dark" ? "#6c757d" : "#ffffff",
                  color: theme === "dark" ? "#ffffff" : "#292929",
                }}
              >
                <Card.Title>{obj.title}</Card.Title>
                <Card.Text>Price: {obj.price}$</Card.Text>
              </Card.Body>
            </Card>
          </Link>
        ))}
      </div>
      <h3
        style={{
          color: theme === "dark" ? "#ffffff" : "#292929",
        }}
      >
        Categories
      </h3>
      <div className="d-flex flex-wrap">
        {categories.map((obj) => (
          <Link
            key={obj.id}
            href={`/categories/${obj.id}`}
            style={{ textDecoration: "none" }}
          >
            <Card style={{ width: "15rem", height: "17em" }} className="m-2">
              <Card.Img variant="top" src={obj.image} height={200} />
              <Card.Body
                style={{
                  backgroundColor: theme === "dark" ? "#6c757d" : "#ffffff",
                  color: theme === "dark" ? "#ffffff" : "#292929",
                }}
              >
                <Card.Title>{obj.name}</Card.Title>
              </Card.Body>
            </Card>
          </Link>
        ))}
      </div>
    </Container>
  );
};

export default Home;
