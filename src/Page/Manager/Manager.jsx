import "./Manager.scss";
import React, { useState, useRef, useEffect } from "react";
import { Table, Input, InputNumber, Popconfirm, Form, Typography } from "antd";
import { Routes, Route, Navigate } from "react-router-dom";
import { LogoutOutlined } from "@ant-design/icons";
import Login from "../Login/Login/Login";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { CREATE_USER, selectUser, UPDATE_USER } from "../../reducers/index";
import { deleteUser, getUsers, updateUser, createUser } from "../../sever/apis";

const originalData = [];
const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};
function Manager() {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    getUsers()
      .then(function (account) {
        const data = account.data;
        data.map((e) => {
          originalData.push({
            key: e.id,
            name: e.usename,
            age: e.age,
            address: e.email,
            phone: e.phone,
          });
        });
        setData(originalData);
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);
  if (Object.keys(user).length === 0) {
    return <Navigate to="/login" />;
  }
  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      age: "",
      address: "",
      phone: "",
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };
  const Delete = async (key) => {
    try {
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      deleteUser(key)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
      if (index > -1) {
        const item = newData[index];
        const removed = newData.splice(index, 1);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        const check = newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        updateUser(key, {
          usename: newData[index].name,
          phone: newData[index].phone,
          email: newData[index].address,
        })
          .then((response) => response.data)
          .then((data) => {
            dispatch(
              UPDATE_USER({
                name: data.usename,
                email: data.email,
                phone: data.phone,
                age: data.age,
              })
            );
          })
          .catch((err) => {
            console.log(err);
          });
        setEditingKey("");
      } else {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      width: "20%",
      editable: true,
    },
    {
      title: "Age",
      dataIndex: "age",
      width: "20%",
      editable: true,
    },
    {
      title: "Email",
      dataIndex: "address",
      width: "20%",
      editable: true,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      width: "20%",
      editable: true,
    },
    {
      title: "Operation",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm
              title="Sure to Delete?"
              onClick={() => Delete(record.key)}
            >
              <a>Delete </a>
            </Popconfirm>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };
  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    createUser({
      usename: name,
      email: address,
      phone: phone,
      age: age,
    })
      .then(function (account) {
        console.log("upadte", account);
        if (account.data) {
          dispatch(
            CREATE_USER({
              name: account.data.name,
              email: account.data.address,
              phone: account.data.phone,
              age: account.data.age,
            })
          );
        }
      })
      .catch(function (error) {
        console.error("error");
      });

    setData((pre) => {
      setName("");
      setPhone("");
      setAddress("");
      setAge("");
      inputRef.current.focus();

      return [
        ...pre,
        {
          key: pre[pre.length - 1].key + 1,
          name: name,
          age: age,
          address: address,
          phone: phone,
        },
      ];
    });
  };
  return (
    <div className="Manager">
      <div className="manager_background">
        <div className="header">
          <div className="manager_header">
            <h1>QUẢN LÝ NGƯỜI DÙNG</h1>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ padding: "1rem" }}>Hello, {user.name} </div>
              <a href="/login">
                <LogoutOutlined />
              </a>
            </div>
          </div>
        </div>
        <div className="manager">
          <h2>Form đăng ký người dùng</h2>
        </div>
        <div className="form_input">
          <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input
              ref={inputRef}
              name="name"
              value={name}
              onChange={handleNameChange}
            />
            <label>Age</label>
            <input
              name="age"
              value={age}
              onChange={handleAgeChange}
              type="number"
            />
            <label>Email</label>
            <input
              name="email"
              value={address}
              onChange={handleAddressChange}
            />
            <label>Phone Number</label>
            <input name="phone" value={phone} onChange={handlePhoneChange} />
            <input type="submit" />
          </form>
        </div>
        <Form form={form} component={false}>
          <Table
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            dataSource={data}
            columns={mergedColumns}
            rowClassName="editable-row"
            pagination={{
              onChange: cancel,
            }}
          />
        </Form>
      </div>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default Manager;
