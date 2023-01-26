import { Container } from 'react-bootstrap'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '@/store/store'
import { NextPage } from 'next/types'
import { FormEvent, useState } from 'react'
import { userActions } from '@/store/reducers/userSlice'
import Router from 'next/router'
const ErrorPage: NextPage = () => {
  setTimeout(() => Router.push('/'), 3000)

  return <Container>That page does not exist</Container>
}

export default ErrorPage
