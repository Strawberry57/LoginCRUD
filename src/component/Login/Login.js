import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Input, Button, Checkbox } from "antd";
import axios from "axios";

import "./Login.scss";
const $ = document.querySelector.bind(document);
function Login() {
  let navigate = useNavigate();
  const onFinish = (values) => {
    console.log("Success:", values);
    const errorLogin = $(".error");
    axios
      .get("https://62396f2d043817a543e26d2a.mockapi.io/login/account")
      .then(function (account) {
        const data = account.data;
        let loginCheck = data.some((e) => {
          if (
            e.id &&
            e.usename === values.username &&
            e.password === values.password
          ) {
            return true;
          } else {
            return false;
          }
        });
        errorLogin.classList.toggle("error_login", !loginCheck);
        if (loginCheck) {
          console.log("login true");
          return navigate("/Manager");
        } else {
          console.log("login that bai");
        }
      })

      .catch(function (error) {
        console.log(error);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <div className="background_login">
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div>
            <div className="login_form">
              <div className="login_title">
                <h1>ACCOUNT LOGIN</h1>
              </div>
              <Form.Item
                label="USERNAME"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="PASSWORD"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Checkbox>Remember me</Checkbox>
                <Link to="/login/forgotPassword">Forgot Password?</Link>
              </Form.Item>
              <Form.Item
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  LOG IN
                </Button>
              </Form.Item>
              <div className="error">
                Login failed: username or password is incorrect.
              </div>
              <div className="Create_account">
                <Link to="/login/create_account">Not a account?</Link>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
