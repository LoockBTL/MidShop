import Wrapper from "@/components/wrapper/wrapper";
import { NextPage } from "next/types";
import { Container } from "react-bootstrap";
import { GetServerSideProps } from "next";
import $axios from "@/utils/axios";
import { AxiosResponse } from "axios";
import { ProductInterface } from "@/types/product-types";
import Card from "react-bootstrap/Card";
import Link from "next/dist/client/link";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useState } from "react";

// https://api.escuelajs.co/api/v1/categories?offset=5&limit=5

interface CategoryInterface {
  products: ProductInterface[];
}

export const getServerSideProps: GetServerSideProps<CategoryInterface> = async (
  context
) => {
  const res: AxiosResponse<ProductInterface[]> = await $axios.get(
    `/products/?categoryId=${context.params?.categoryId}`
  );
  const products: ProductInterface[] = res.data;
  return {
    props: {
      products,
    },
  };
};

const Category: NextPage<CategoryInterface> = ({ products }) => {
  const [searchParams, setSearchParams] = useState("");
  const [maxValue, setMax] = useState("1000");
  const [minValue, setMin] = useState("0");
  return (
    <Container className="d-flex">
      <Card className="sticky-top">
        <h3>Search</h3>
        <Form.Control
          value={searchParams}
          onChange={(e) => {
            setSearchParams(e.target.value);
          }}
          placeholder="Search for..."
        />

        <h3>Price</h3>
        <Form>
          <Form.Check
            type={"radio"}
            label={`Less then 75$`}
            name="price"
            onChange={() => {
              setMax("75");
            }}
          />
          <Form.Check
            type={"radio"}
            label={`75$ to 150$`}
            name="price"
            onChange={() => {
              setMax("150");
              setMin("75");
            }}
          />
          <Form.Check
            type={"radio"}
            label={`150$ to 300$`}
            name="price"
            onChange={() => {
              setMax("300");
              setMin("150");
            }}
          />
          <Form.Check
            type={"radio"}
            label={`300$ to 450$`}
            name="price"
            onChange={() => {
              setMax("450");
              setMin("300");
            }}
          />
          <Form.Check
            type={"radio"}
            label={`More then 450$`}
            name="price"
            onChange={() => {
              setMin("450");
            }}
          />
        </Form>
        <div className="d-flex ">
          <FloatingLabel label="From" className="me-3">
            <Form.Control
              min={0}
              type="number"
              placeholder="Min price"
              onChange={(e) => {
                setMin(e.target.value);
              }}
            />
          </FloatingLabel>

          <FloatingLabel label="To">
            <Form.Control
              min={0}
              type="number"
              placeholder="Max price"
              onChange={(e) => {
                setMax(e.target.value);
              }}
            />
          </FloatingLabel>
        </div>
      </Card>
      <Container className="d-flex flex-wrap me-3">
        {products
          .filter((obj) =>
            obj.title.toLowerCase().includes(searchParams.toLowerCase())
          )
          .filter((obj) => {
            if (obj.price >= minValue && obj.price <= maxValue) {
              return obj;
            } else {
              return false;
            }
          })
          .map((obj) => (
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
              <Card style={{ width: "15rem", height: "18em" }} className="m-2">
                <Card.Img variant="left" src={obj.images[0]} />
                <Card.Body>
                  <Card.Title>{obj.title}</Card.Title>
                  <Card.Text>Price: {obj.price}$</Card.Text>
                </Card.Body>
              </Card>
            </Link>
          ))}
      </Container>
    </Container>
  );
};

export default Category;
