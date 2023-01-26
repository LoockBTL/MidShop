import { Container } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '@/store/store'
import { NextPage } from 'next/types'
import { ChangeEvent, FormEvent, useState } from 'react'
import { userActions } from '@/store/reducers/userSlice'
import Router from 'next/router'
import ModalConfirm from '@/components/modal'

const Summary: NextPage = () => {
  const status = useSelector((state: RootState) => state.user.status)
  const basket = useSelector((state: RootState) => state.basket.products)
  const dispatch = useAppDispatch()
  const [activeModal, setActiveModal] = useState(false)
  const [name, setName] = useState('')
  const [adress, setAdress] = useState('')
  const [number, setNumber] = useState('')
  const [email, setEmail] = useState('')
  const [pay, setPay] = useState('')
  const [delivary, setDelivary] = useState('')

  if (status === '') {
    setTimeout(() => Router.push('/login'), 3000)
    return <Container>Login to continue</Container>
  }

  return (
    <Container>
      <ModalConfirm
        active={activeModal}
        setActive={setActiveModal}
        title="Confirm order"
        object={{ name, adress, number, email, pay, delivary, basket }}
      />
      <div className="mt-3">
        <h3>Info</h3>
        <InputGroup className="mb-3">
          <InputGroup.Text>Receiver name</InputGroup.Text>
          <Form.Control
            placeholder="Name Surname"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
            }}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>Adress</InputGroup.Text>
          <Form.Control
            placeholder="Street, City, Post-code"
            value={adress}
            onChange={(e) => {
              setAdress(e.target.value)
            }}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>Tel.number</InputGroup.Text>
          <Form.Control
            placeholder="+0000000000"
            value={number}
            onChange={(e) => {
              setNumber(e.target.value)
            }}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>Email</InputGroup.Text>
          <Form.Control
            placeholder="name@mail.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          />
        </InputGroup>
        <h3>Pay method</h3>
        <Form>
          <Form.Check
            type={'radio'}
            label={`Card`}
            name="payMethod"
            value="Card"
            onChange={(e) => {
              setPay(e.target.value)
            }}
          />
          <Form.Check
            type={'radio'}
            label={`Cash`}
            name="payMethod"
            value="Cash"
            onChange={(e) => {
              setPay(e.target.value)
            }}
          />
          <Form.Check
            type={'radio'}
            label={`Send money by mail`}
            name="payMethod"
            value={`Send money by mail`}
            onChange={(e) => {
              setPay(e.target.value)
            }}
          />
        </Form>
        <h3>Delivery</h3>
        <Form>
          <Form.Check
            type={'radio'}
            label={`Receive in the mail`}
            value={`Receive in the mail`}
            name="deliveryMethod"
            onChange={(e) => {
              setDelivary(e.target.value)
            }}
          />
          <Form.Check
            type={'radio'}
            label={`Courier`}
            value="Courier"
            name="deliveryMethod"
            onChange={(e) => {
              setDelivary(e.target.value)
            }}
          />
          <Form.Check
            type={'radio'}
            label={`Pick up at the store`}
            value={`Pick up at the store`}
            name="deliveryMethod"
            onChange={(e) => {
              setDelivary(e.target.value)
            }}
          />
        </Form>
      </div>
      <Button
        onClick={() => {
          setActiveModal(true)
        }}
      >
        Send order
      </Button>
    </Container>
  )
}

export default Summary
