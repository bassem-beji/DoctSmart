import React, { useState } from 'react';
import axios from 'axios';
import './tbib.css';
import log from '../../assets/log1.png'

import reg from '../../assets/reg.png'
import { message, Form, Input, Button } from 'antd'
import { useHistory } from 'react-router-dom';
import  {useDispatch} from'react-redux'
import { showLoading,hideLoading } from '../../redux/features/alertSlice';

function Tbib() {

  const navigate = useHistory()
  const dispatch =useDispatch()
  const [isSignUp, setIsSignUp] = useState(false);
  const [passShow, setPassShow] = useState(false)

  const handleSignInClick = () => {
    setIsSignUp(false);
  }

  const handleSignUpClick = () => {
    setIsSignUp(true);
  }

  const onFinish = async (values) => {
    try {
      dispatch(showLoading())
      const res = await axios.post('/docregister', values)
      dispatch(hideLoading())
      if (res.data.success) {
        message.success('Register Successfully')
        setIsSignUp(false);
      } else {
        message.error(res.data.message)
      }
    } catch (error) {
      dispatch(hideLoading())
      console.log(error)
      message.error('Something Went Wrong')
    }
  }
  const onFinishHandler=async(values)=>{
     try {
        dispatch(showLoading())
        const res=await axios.post('/doclogin',values)
        dispatch(hideLoading())
        if(res.data.success){
          localStorage.setItem('token',res.data.token)
          message.success('Login Successfully')
          navigate.push('/doctorapp/patients')
        }else{
          message.error(res.data.message)
        }
     } catch (error) {
        dispatch(hideLoading())
        console.log(error)
        message.error('something went wrong')
     }
  }

  return (
    <div className={`container12 ${isSignUp ? 'sign-up-mode' : ''}`} >
      <div className="formss-container">
        <div className="signin-signup">
          <Form className="form sign-in-form" onFinish={onFinishHandler} >
            <h2 className="title">Sign in</h2>
            <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
              <Input className='Doctorinput' prefix={<i className="fas fa-user" />} placeholder="your email" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
              <Input.Password className='Doctorinput' prefix={<i className="fas fa-lock" />} placeholder="Password" />
            </Form.Item>
            <Button type="primary" htmlType="submit" className="btinn solid">
              Login
            </Button>
          </Form>
          <Form className="form sign-up-form" onFinish={onFinish}>
            <h2 className="title">Sign up</h2>
            <Form.Item name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
              <Input className='Doctorinput' prefix={<i className="fas fa-user" />} placeholder="Username" />
            </Form.Item>
            <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
              <Input className='Doctorinput' prefix={<i className="fas fa-envelope" />} placeholder="Email" />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
              <Input.Password className='Doctorinput' prefix={<i className="fas fa-lock" />} placeholder="Password" />
            </Form.Item>
            
        <Button type="primary" htmlType="submit" className="btinn">
          {isSignUp ? 'Sign up' : 'Login'}
        </Button>
        
      </Form>
    </div>
  </div>
  <div className="panels-container">
    <div className="panel left-panel">
      <div className="content">
        <h3>New here ?</h3>
        <p>
        "Medicine is not only a science; it is also an art. It does not consist of compounding pills and plasters; it deals with the very processes of life, which must be understood before they may be guided." - Paracelsus        </p>
        <button className="btinn transparent" onClick={handleSignUpClick}>
          Sign up
        </button>
      </div>
      <a href='/logincard'><img src={reg} className="imagereg"  alt="Register" /></a>
      
    </div>
    <div className="panel right-panel">
      <div className="content">
        <h3>One of us ?</h3>
        <p>
          
"Health is a state of complete physical, mental, and social well-being, not merely the absence of disease or infirmity." - World Health Organization
        </p>
        <button className="btinn transparent" onClick={handleSignInClick}>
          Sign in
        </button>
      </div>
      <a href='/logincard'>
      <img src={log} className="imagetbib" alt="Login" />
      </a>
      
    </div>
  </div>
</div>
);
}

export default Tbib;

