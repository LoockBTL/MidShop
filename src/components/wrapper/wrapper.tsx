import { ReactNode } from "react";
import Header from "./header/header";
import Footer from "./footer/footer";
import { NextPage } from "next/types";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

//https://fakeapi.platzi.com/en/rest/categories

interface WrapperProps {
  children?: ReactNode;
}
const Wrapper: NextPage<WrapperProps> = ({ children }) => {
  const theme = useSelector((state: RootState) => state.user.theme);

  return (
    <>
      <Header />
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: theme === "dark" ? "#292929" : "#ffffff",
        }}
      >
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Wrapper;
