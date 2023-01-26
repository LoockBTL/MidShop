import Wrapper from '@/components/wrapper/wrapper'
import { NextPage } from 'next/types'
import { Container } from 'react-bootstrap'
import { GetServerSideProps } from 'next'
import $axios from '@/utils/axios'
import { AxiosResponse } from 'axios'
import { CategoryInterface, ProductInterface } from '@/types/product-types'
import Card from 'react-bootstrap/Card'
import Link from 'next/dist/client/link'
// https://api.escuelajs.co/api/v1/categories?offset=5&limit=5

interface HomeInterface {
  categories: CategoryInterface[]
  products: ProductInterface[]
}

export const getServerSideProps: GetServerSideProps<
  HomeInterface
> = async () => {
  const categoriesRes: AxiosResponse<CategoryInterface[]> = await $axios.get(
    '/categories?offset=5&limit=5'
  )
  const productRes: AxiosResponse<ProductInterface[]> = await $axios.get(
    '/products?offset=0&limit=10'
  )
  const products: ProductInterface[] = productRes.data
  const categories: CategoryInterface[] = categoriesRes.data
  return {
    props: {
      categories,
      products,
    },
  }
}

const Home: NextPage<HomeInterface> = ({ categories, products }) => {
  return (
    <Container className="mt-3">
      <h3>Products</h3>
      <div className="d-flex flex-wrap">
        {products.map((obj) => (
          <Link
            key={obj.id}
            href={`/product/${obj.id}`}
            style={{ textDecoration: 'none' }}
          >
            <Card style={{ width: '15rem', height: '18em' }} className="m-2">
              <Card.Img variant="left" src={obj.images[0]} />
              <Card.Body>
                <Card.Title>{obj.title}</Card.Title>
                <Card.Text>Price: {obj.price}$</Card.Text>
              </Card.Body>
            </Card>
          </Link>
        ))}
      </div>
      <h3>Categories</h3>
      <div className="d-flex flex-wrap">
        {categories.map((obj) => (
          <Link
            key={obj.id}
            href={`/categories/${obj.id}`}
            style={{ textDecoration: 'none' }}
          >
            <Card style={{ width: '15rem', height: '17em' }} className="m-2">
              <Card.Img variant="top" src={obj.image} height={200} />
              <Card.Body>
                <Card.Title>{obj.name}</Card.Title>
              </Card.Body>
            </Card>
          </Link>
        ))}
      </div>
    </Container>
  )
}

export default Home
