import React from 'react'
import { Container, Form, Button, Row, Col, Spinner } from 'react-bootstrap'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import {
  login,
  selectAuthFirebaseState,
  selectAuthLoginStatus,
} from './authSlice'
import { isEmpty, isLoaded } from 'react-redux-firebase'
import { useHistory } from 'react-router'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

const schema = yup.object().shape({
  email: yup
    .string()
    .required('Введите почту')
    .email('Введите верную почту example@example.com'),
  password: yup
    .string()
    .min(6, 'Пароль должен быть не менее 6 символов')
    .required(),
})

const Login = () => {
  // Selector for loader
  const loginStatus = useSelector(selectAuthLoginStatus)
  const authFirebaseState = useSelector(selectAuthFirebaseState)
  const history = useHistory()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })
  const dispatch = useDispatch()

  !isEmpty(authFirebaseState) && history.push('/')

  const onSubmit = (formData) => {
    dispatch(login(formData))
  }

  return (
    <Container >
      <Form onSubmit={handleSubmit(onSubmit)} >
        <Row className="justify-content-center align" >
          <Col sm={6} >
            <Form.Group controlId="email" >
              <Form.Label >Почта</Form.Label >
              <Form.Control
                type="email"
                placeholder="Enter email"
                {...register('email')}
                isInvalid={errors.email}
              />
              <Form.Control.Feedback type="invalid" >
                {errors.email?.message}
              </Form.Control.Feedback >
            </Form.Group >
          </Col >
        </Row >
        <Row className="justify-content-center" >
          <Col sm={6} >
            <Form.Group controlId="password" >
              <Form.Label >Пароль</Form.Label >
              <Form.Control
                type="password"
                placeholder="Password"
                {...register('password')}
                isInvalid={errors.password}
              />
              <Form.Control.Feedback type="invalid" >
                {errors.password?.message}
              </Form.Control.Feedback >
            </Form.Group >
          </Col >
        </Row >
        <Row className="justify-content-center" >
          <Col sm={6} >
            <Button variant="primary" type="submit" >
              {loginStatus === 'pending' && <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />}
              <span className="sr-only" >Loading...</span >
              Войти
            </Button >
          </Col >
        </Row >
      </Form >
    </Container >
  )
}

export default Login
