import { Card, Container, Form } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '@/store/store'
import { NextPage } from 'next/types'
import { basketActions } from '@/store/reducers/basketSlice'
import Link from 'next/link'

const Basket: NextPage = () => {
  const basket = useSelector((state: RootState) => state.basket.products)
  const dispatch = useAppDispatch()
  const totalPrice = basket.reduce((acc, obj) => acc + obj.price * obj.count, 0)
  if (basket.length === 0) {
    return (
      <div className="d-flex justify-content-center align-items-center flex-column">
        <h1>Go back to the shop</h1>
        <Link href="/">Shop</Link>
      </div>
    )
  }
  return (
    <Container className="d-flex">
      <Card
        className="sticky-top"
        style={{
          width: '20rem',
          height: '27em',
          padding: '1em',
          margin: '2em',
        }}
      >
        <Card.Body>
          <h3>Total price</h3>
          <Card.Text>{totalPrice}$</Card.Text>
          <Link href="/summary" className="m-3 btn btn-primary">
            Next step
          </Link>
        </Card.Body>
      </Card>
      <div className="d-flex">
        {basket.map((obj) => (
          <Card key={obj.id} style={{ width: '15em' }} className="m-3">
            <Card.Img src={obj.images} alt="product" />
            <Card.Body>
              <Card.Title>{obj.title}</Card.Title>
              <Card.Text>Price: {obj.price * obj.count}$</Card.Text>
              <Button
                className="m-3"
                variant="primary"
                onClick={(): void => {
                  dispatch(basketActions.incrementProduct(obj.id))
                }}
              >
                +
              </Button>
              {obj.count}
              <Button
                className="m-3"
                variant="primary"
                onClick={(): void => {
                  dispatch(basketActions.decrementProduct(obj.id))
                }}
              >
                -
              </Button>
              <Button
                variant="primary"
                onClick={(): void => {
                  dispatch(basketActions.removeProduct(obj.id))
                }}
              >
                Delete
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </Container>
  )
}

export default Basket
