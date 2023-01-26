import { NextPage } from 'next/types'
import { Button, Container } from 'react-bootstrap'
import { GetServerSideProps } from 'next'
import $axios from '@/utils/axios'
import axios, { AxiosResponse } from 'axios'
import { CommentsInterface, ProductInterface } from '@/types/product-types'
import Card from 'react-bootstrap/Card'
import { useState } from 'react'
import Carousel from 'react-bootstrap/Carousel'
import Form from 'react-bootstrap/Form'
import Image from 'react-bootstrap/Image'
import { RootState, useAppDispatch } from '@/store/store'
import { useSelector } from 'react-redux'
import { basketActions } from '@/store/reducers/basketSlice'

// https://api.escuelajs.co/api/v1/categories?offset=5&limit=5

interface CategoryInterface {
  product: ProductInterface
  comments: CommentsInterface[]
}

export const getServerSideProps: GetServerSideProps<CategoryInterface> = async (
  context
) => {
  const productRes: AxiosResponse<ProductInterface> = await $axios.get(
    `/products/${context.params?.productId}`
  )
  const commentsRes: AxiosResponse<CommentsInterface[]> = await axios.get(
    'https://jsonplaceholder.typicode.com/comments?postId=1'
  )
  const comments: CommentsInterface[] = commentsRes.data
  const product: ProductInterface = productRes.data
  return {
    props: {
      product,
      comments,
    },
  }
}

const Category: NextPage<CategoryInterface> = ({ product, comments }) => {
  const user = useSelector((state: RootState) => state.user.status)
  const dispatch = useAppDispatch()
  const [commentText, setCommentText] = useState('')
  const hadleAddComment = () => {
    const payload: CommentsInterface = {
      postId: product.id,
      id: product.id,
      name: user === 'Login' ? 'Jack' : 'Anonim',
      body: commentText,
    }
    if (commentText.length !== 0) {
      comments = [...comments, payload]
    } else {
      alert('Write a comment')
    }
  }
  const handleAddProductToBusket = () => {
    dispatch(
      basketActions.addProduct({
        id: product.id,
        title: product.title,
        price: parseInt(product.price),
        images: product.images[0],
        count: 1,
      })
    )
  }
  return (
    <Container>
      <Container className="d-flex flex-wrap mt-3">
        <div style={{ width: '50%' }}>
          <Carousel style={{ width: '100%' }}>
            {product.images.map((img) => (
              <Carousel.Item key={img}>
                <Image className="d-block w-100" src={img} alt={img} />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
        <Card style={{ width: '40%' }} className="m-3" border="info">
          <Card.Body>
            <Card.Title>{product.title}</Card.Title>
            <Card.Text>{product.description}</Card.Text>
            <Card.Text>Price: {product.price}$</Card.Text>
            <Button onClick={handleAddProductToBusket}>Buy</Button>
          </Card.Body>
          <Card.Footer>Category: {product.category.name}</Card.Footer>
        </Card>
      </Container>
      <h1 className="mt-2">Comments</h1>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Your comment</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            style={{
              resize: 'none',
            }}
            value={commentText}
            onChange={(e) => {
              setCommentText(e.target.value)
            }}
          />
          <Button className="mt-2" onClick={hadleAddComment}>
            Send comment
          </Button>
        </Form.Group>
      </Form>
      {comments.map((obj) => (
        <Card key={obj.name} className="mb-2">
          <Card.Body>
            <Card.Title>{obj.name}</Card.Title>
            <Card.Text>{obj.body}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </Container>
  )
}

export default Category
