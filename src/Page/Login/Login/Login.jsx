import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Input, Button, Checkbox } from "antd";
import { LOGIN_AUTH } from "../../../reducers/index";
import "./Login.scss";
import { useDispatch } from "react-redux";
import { getUsers } from "../../../sever/apis";
const $ = document.querySelector.bind(document);
function Login() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const onFinish = (values) => {
    console.log("Success:", values);
    const errorLogin = $(".error");
    getUsers()
      .then((response) => response.data)
      .then((data) => {
        return data.find(
          (user) =>
            user.usename === values.username &&
            user.password === values.password
        );
      })
      .then((user) => {
        console.log(user);
        errorLogin.classList.toggle("error_login", !user);
        if (user) {
          dispatch(
            LOGIN_AUTH({
              name: values.username,
              password: values.password,
            })
          );
          console.log("Success");
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
