import React from "react";
import { CloseOutlined } from "@ant-design/icons";
import { CREATE_USER } from "../../../reducers/index";
import axios from "axios";
import { Link } from "react-router-dom";
import "./NewAccount.scss";
import {
  Form,
  Input,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
} from "antd";
import { useDispatch } from "react-redux";
import { getUsers, createUser } from "../../../sever/apis";
const residences = [
  {
    value: "zhejiang",
    label: "Zhejiang",
    children: [
      {
        value: "hangzhou",
        label: "Hangzhou",
        children: [
          {
            value: "xihu",
            label: "West Lake",
          },
        ],
      },
    ],
  },
  {
    value: "jiangsu",
    label: "Jiangsu",
    children: [
      {
        value: "nanjing",
        label: "Nanjing",
        children: [
          {
            value: "zhonghuamen",
            label: "Zhong Hua Men",
          },
        ],
      },
    ],
  },
  {
    value: "VietNam",
    label: "VietNam",
    children: [
      {
        value: "City/Province",
        label: ["HaNoi"],
        children: [
          {
            value: "District",
            label: ["Hai Ba Trung"],
          },
        ],
      },
    ],
  },
];
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};
const { Option } = Select;
const $ = document.querySelector.bind(document);

function NewAccount() {
  const dispatch = useDispatch();
  const validatePassword = (password) => {
    return password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/);
  };
  const handleBlur = (value) => {
    const error_username = $(".username_taken");
    const input = $("input#register_usename");
    console.log(value.target.value);
    getUsers()
      .then((response) => response.data)
      .then((data) => {
        return data.some((user) => user.usename === value.target.value);
      })
      .then((user) => {
        console.log(user);
        error_username.classList.toggle("error_username", user);
        input.classList.toggle("error", user);
      })

      .catch(function (err) {
        console.log(err);
      });
  };
  const handelNotice = (e) => {
    if (validatePassword(e.target.value)) {
    } else {
      console.log("Please enter correct email address!");
    }
  };
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    getUsers()
      .then((response) => response.data)
      .then((data) => {
        return data.find((user) => user.usename === values.username);
      })
      .then((user) => {
        if (!user) {
          createUser({
            usename: values.usename,
            password: values.password,
            email: values.email,
            residence: values.residence,
            phone: values.phone,
            gender: values.gender,
          })
            .then(function (account) {
              console.log("upadte", account);
              if (account.data) {
                dispatch(
                  CREATE_USER({
                    name: account.data.name,
                    password: account.data.password,
                    email: account.data.email,
                    residence: account.data.residence,
                    phone: account.data.phone,
                    gender: account.data.gender,
                  })
                );
              }
            })
            .catch(function (error) {
              console.error("error");
            });
        }
      })

      .catch(function (error) {
        console.error("error");
      });
  };
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="83">+83</Option>
        <Option value="84">+84</Option>
        <Option value="85">+85</Option>
        <Option value="86">+86</Option>
        <Option value="87">+87</Option>
        <Option value="89">+89</Option>
      </Select>
    </Form.Item>
  );
  return (
    <div className="background_login">
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          residence: ["VietNam", "City/Province", "District"],
          prefix: "84",
        }}
        scrollToFirstError
      >
        <div className="close">
          <Link to="/">
            <CloseOutlined />
          </Link>
        </div>
        <div className="create_form">
          <div className="create_title">
            <h1>Create Account</h1>
          </div>
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (validatePassword(value)) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    Error(
                      "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number"
                    )
                  );
                },
              }),
            ]}
            hasFeedback
          >
            <Input.Password onBlur={handelNotice} />
          </Form.Item>
          <Form.Item
            name="confirm"
            label="Confirm Password"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="usename"
            label="Username"
            tooltip="What do you want login by name?"
            rules={[
              {
                required: true,
                message: "Please input your usename!",
                whitespace: true,
              },
            ]}
          >
            <Input onBlur={handleBlur} />
          </Form.Item>
          <div className="username_taken">
            This username has been taken. Please try another
          </div>
          <Form.Item
            name="residence"
            label="Address"
            rules={[
              {
                type: "array",
                required: true,
                message: "Please select your Address!",
              },
            ]}
          >
            <Cascader options={residences} />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              {
                required: true,
                message: "Please input your phone number!",
              },
            ]}
          >
            <Input
              addonBefore={prefixSelector}
              style={{
                width: "100%",
              }}
            />
          </Form.Item>

          <Form.Item
            name="gender"
            label="Gender"
            rules={[
              {
                required: true,
                message: "Please select gender!",
              },
            ]}
          >
            <Select placeholder="select your gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Captcha"
            extra="We must make sure that your are a human."
          >
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item
                  name="captcha"
                  noStyle
                  rules={[
                    {
                      required: true,
                      message: "Please input the captcha you got!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Button>Get captcha</Button>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error("Should accept agreement")),
              },
            ]}
            {...tailFormItemLayout}
          >
            <Checkbox>
              I have read the <a href="">agreement</a>
            </Checkbox>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Create Account
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}

export default NewAccount;
