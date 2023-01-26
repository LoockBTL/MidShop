import { Container } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '@/store/store'
import { NextPage } from 'next/types'
import { loginCallApi } from '@/store/reducers/userSlice'
import { FormEvent, useState } from 'react'

const Loggin: NextPage = () => {
  const status = useSelector((state: RootState) => state.user.status)
  const dispatch = useAppDispatch()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const hadleSubmit = (e: FormEvent) => {
    e.preventDefault()
    dispatch(loginCallApi({ email, password }))
      .unwrap()
      .then((e) => {
        console.log(e)
      })
      .catch((e) => {
        console.log(e)
      })
  }
  return (
    <Container>
      <Form onSubmit={hadleSubmit}>
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
          {status}
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  )
}

export default Loggin
