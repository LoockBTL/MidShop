import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Link from "next/link";
import { NextPage } from "next/types";
import { RootState, useAppDispatch } from "@/store/store";
import { useSelector } from "react-redux";
import { userActions } from "@/store/reducers/userSlice";
import Badge from "react-bootstrap/Badge";

const Header: NextPage = () => {
  const dispatch = useAppDispatch();
  const theme = useSelector((state: RootState) => state.user.theme);
  const status = useSelector((state: RootState) => state.user.status);
  const basketCount = useSelector(
    (state: RootState) => state.basket.products.length
  );

  return (
    <Navbar bg={theme === "dark" ? "secondary" : "primary"} expand="lg">
      <Container fluid>
        <Link className="link m-2" href="/">
          MidShop
        </Link>
        <Navbar.Toggle aria-controls="navbarScroll" />

        <Link className="link me-2" href="/basket">
          Basket<Badge bg="secondary">{basketCount}</Badge>
        </Link>
        <Navbar.Collapse id="navbarScroll" className="justify-content-end">
          <Button
            className="me-2"
            variant={theme === "dark" ? "light" : "dark"}
            onClick={() => {
              dispatch(userActions.changeTheme());
            }}
          >
            {theme === "dark" ? "Light" : "Dark"}
          </Button>
          {status === "Login" ? (
            <Button
              className="me-2"
              variant="danger"
              onClick={() => {
                dispatch(userActions.logout());
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
  );
};

export default Header;
