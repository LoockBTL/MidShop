import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Link from 'next/link'
import { NextPage } from 'next/types'
import { RootState, useAppDispatch } from '@/store/store'
import { useSelector } from 'react-redux'
import { userActions } from '@/store/reducers/userSlice'
import Badge from 'react-bootstrap/Badge'

const Header: NextPage = () => {
  const dispatch = useAppDispatch()
  const status = useSelector((state: RootState) => state.user.status)
  const basketCount = useSelector(
    (state: RootState) => state.basket.products.length
  )

  return (
    <Navbar bg="primary" expand="lg">
      <Container fluid>
        <Link className="link m-2" href="/">
          MidShop
        </Link>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Form className="d-flex">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
        </Form>
        <Link className="link me-2" href="/basket">
          Basket<Badge bg="secondary">{basketCount}</Badge>
        </Link>
        <Navbar.Collapse id="navbarScroll" className="justify-content-end">
          {status === 'Login' ? (
            <Button
              className="me-2"
              variant="danger"
              onClick={() => {
                dispatch(userActions.logout())
              }}
            >
              Exit
            </Button>
          ) : (
            <Link className="link me-2" href="/login">
              Login
            </Link>
          )}
          <Link className="link btn btn-success" href="/register">
            Register
          </Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
