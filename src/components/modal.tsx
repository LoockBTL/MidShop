import Button from 'react-bootstrap/Button'
import { NextPage } from 'next/types'
import ModalWindow from 'react-bootstrap/Modal'
import { SummaryOrder } from '@/types/product-types'
import Router from 'next/router'
import { Card } from 'react-bootstrap'
import { useAppDispatch } from '@/store/store'
import { basketActions } from '@/store/reducers/basketSlice'

interface ModalProps {
  active: boolean
  setActive: any
  title: string
  object: SummaryOrder
}

const ModalConfirm: NextPage<ModalProps> = ({
  active,
  setActive,
  title,
  object,
}) => {
  const totalPrice = object.basket.reduce(
    (acc, obj) => acc + obj.price * obj.count,
    0
  )
  const dispatch = useAppDispatch()
  return (
    <ModalWindow show={active} centered>
      <ModalWindow.Header>
        <ModalWindow.Title>{title}</ModalWindow.Title>
      </ModalWindow.Header>
      <ModalWindow.Body>
        <div className="mb-3">
          <h4>Name:</h4>
          <div>{object.name}</div>
          <h4>Email:</h4>
          <div>{object.email}</div>
          <h4>Tel. number:</h4>
          <div>{object.number}</div>
          <h4>Adress:</h4>
          <div>{object.adress}</div>
          <h4>Delivery:</h4>
          <div>{object.delivary}</div>
          <h4>Pay Method:</h4>
          <div>{object.pay}</div>
        </div>
        <div className="d-flex">
          {object.basket.map((obj) => (
            <Card key={obj.id} style={{ width: '150px' }} className="m-2">
              <Card.Img src={obj.images} />
              <Card.Body>
                <Card.Title style={{ fontSize: '15px' }}>
                  {obj.title}
                </Card.Title>
                <Card.Text style={{ fontSize: '15px' }}>
                  Count: {obj.count * obj.count}
                </Card.Text>
              </Card.Body>
              <Card.Footer>Price: {obj.price}$</Card.Footer>
            </Card>
          ))}
        </div>
        <h3>Total price: {totalPrice}$</h3>
      </ModalWindow.Body>
      <ModalWindow.Footer>
        <Button
          variant="danger"
          onClick={() => {
            setActive(false)
          }}
        >
          Close
        </Button>
        <Button
          value="success"
          onClick={() => {
            dispatch(basketActions.clearBusket())
            Router.push('/')
            setActive(false)
          }}
        >
          Confirm
        </Button>
      </ModalWindow.Footer>
    </ModalWindow>
  )
}

export default ModalConfirm
