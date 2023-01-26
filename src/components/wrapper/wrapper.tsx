import { ReactNode } from 'react'
import Header from './header/header'
import Footer from './footer/footer'
import { NextPage } from 'next/types'

//https://fakeapi.platzi.com/en/rest/categories

interface WrapperProps {
  children?: ReactNode
}
const Wrapper: NextPage<WrapperProps> = ({ children }) => {
  return (
    <>
      <Header />
      <div style={{ minHeight: '100vh' }}>{children}</div>
      <Footer />
    </>
  )
}

export default Wrapper
