import React from "react";
import { useDispatch } from "react-redux";
import { login as loginRedux } from "../../redux/slices";
import { Form, Input, Button, Checkbox } from "antd";
import { Link } from "react-router-dom";
import { login } from "../../api/user";
import { checkTokenNotExpired } from "../../utils";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      offset: 8,
      span: 16,
    },
  },
};
const buttonsLayout = {
  wrapperCol: {
    xs: { span: 24 },
    sm: { offset: 8, span: 16 },
  },
};

const Login = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = (values) => {
    console.log("Success:", values);
    login(values).then((json) => {
      const { user, token } = json;
      if (user && token && checkTokenNotExpired(token)) {
        dispatch(loginRedux({ user, token }));
      }
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      form={form}
      {...layout}
      name="login"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      style={{ width: "80%", maxWidth: "800px" }}
    >
      <Form.Item
        label="İstifadəçi adı"
        name="email"
        rules={[
          {
            required: true,
            message: "Email boş ola bilməz!",
          },
          {
            type: "email",
            message: "Email düzgün deyil!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Şifrə"
        name="password"
        rules={[
          {
            required: true,
            message: "Şifrə boş ola bilməz!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" {...tailLayout}>
        <Checkbox>Məni xatırla</Checkbox>
      </Form.Item>

      <Form.Item {...buttonsLayout}>
        <Button
          type="primary"
          htmlType="submit"
          style={{ marginRight: "10px" }}
        >
          Daxil ol
        </Button>
        <Link
          to="/register"
          style={{
            whiteSpace: "nowrap",
            justifySelf: "center",
            alignSelf: "end",
          }}
        >
          Qeydiyyat
        </Link>
      </Form.Item>
    </Form>
  );
};

export default Login;
