import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Input, Button, Checkbox, Typography } from 'antd'
import { UserContext } from '../App'

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
}
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
}

const Signup = () => {
  const [error, setError] = useState(null)
  const { setUser, firebaseAuth } = useContext(UserContext)
  let history = useHistory()
  const onFinish = ({ email, password }) => {
    firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        setError(null)
        setUser(res.user)
        localStorage.setItem('user', JSON.stringify(res.user))
        history.push('/')
      })
      .catch((err) => setError(err.message))
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
    setError('Please input a valid email and password')
  }
  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your email',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>
      <Form.Item {...tailLayout}>
        {error && (
          <>
            <Typography.Text type="danger">{error}</Typography.Text>
            <br />
          </>
        )}
        <Button type="primary" htmlType="submit">
          Sign Up
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Signup
