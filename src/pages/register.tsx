import { Container } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '@/store/store'
import { NextPage } from 'next/types'
import { FormEvent, useState } from 'react'
import { userActions } from '@/store/reducers/userSlice'

const Register: NextPage = () => {
  const status = useSelector((state: RootState) => state.user.registration)
  const dispatch = useAppDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    dispatch(userActions.register({ email, password, name, surname }))
  }
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            onChange={(e) => {
              setName(e.target.value)
            }}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Surname</Form.Label>
          <Form.Control
            type="text"
            placeholder="Surname"
            onChange={(e) => {
              setSurname(e.target.value)
            }}
          />
          {status}
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  )
}

export default Register
