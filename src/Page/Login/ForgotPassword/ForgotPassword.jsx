import React from "react";
import { Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import { CloseOutlined } from "@ant-design/icons";
import "./ForgotPassword.scss";
function ForgotPassword() {
  const onFinish = (values) => {
    console.log("Success:", values);
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
          <div className="close">
            <Link to="/">
              <CloseOutlined />
            </Link>
          </div>
          <div className="forgot_form">
            <div className="login_title">
              <h1>Forgot password?</h1>
              <p>
                Please enter your email address or usename and we will email you
                a link to reset your password
              </p>
            </div>
            <Form.Item
              label=""
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username or email !",
                },
              ]}
            >
              <Input placeholder="Email address or username" />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Link to="/">
                <Button type="primary" htmlType="submit">
                  Request password reset email
                </Button>
              </Link>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default ForgotPassword;
