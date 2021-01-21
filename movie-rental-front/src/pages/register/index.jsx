import React from "react";
import { Form, Input, Button, Select, Checkbox } from "antd";
import { register as registerUser } from "../../api/user";
import { Link } from "react-router-dom";

const Register = () => {
  const [form] = Form.useForm();

  const register = (values) => {
    console.log("Success", values);
    registerUser(values);
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
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
  const buttonsLayout = {
    wrapperCol: {
      xs: { span: 24 },
      sm: { offset: 8, span: 16 },
    },
  };

  return (
    <Form
      name="register"
      onFinish={register}
      form={form}
      layout="horizontal"
      initialValues={{ size: "default", gender: "female" }}
      size={"default"}
      scrollToFirstError
      style={{ width: "80%", maxWidth: "800px" }}
    >
      <Form.Item
        label="Ad"
        name={["name"]}
        rules={[
          { min: 3, message: "Ad minimum 3 simvoldan ibarət olmalıdır." },
          { max: 25, message: "Ad maksimum 25 simvoldan ibarət ola bilər." },
          { required: true, message: "Ad boş qala bilməz." },
        ]}
        hasFeedback
        {...formItemLayout}
      >
        <Input placeholder="John" />
      </Form.Item>

      <Form.Item
        label="Email"
        name={["email"]}
        rules={[
          { type: "email", message: "Düzgün email tipi deyil." },
          { required: true, message: "Email boş qala bilməz." },
        ]}
        hasFeedback
        {...formItemLayout}
      >
        <Input placeholder="john@mail.com" />
      </Form.Item>

      <Form.Item
        name={["password"]}
        label="Şifrə"
        rules={[
          { required: true, message: "Şifrə boş qala bilməz!" },
          { min: 8, message: "Şifrə minimum 8 simvol ola bilər!" },
          { max: 50, message: "Şifrə maksimum 50 simvol ola bilər!" },
        ]}
        hasFeedback
        {...formItemLayout}
      >
        <Input.Password placeholder="John1996" />
      </Form.Item>

      <Form.Item
        name={["confirm"]}
        label="Təkrarı"
        dependencies={["password"]}
        hasFeedback
        {...formItemLayout}
        rules={[
          {
            required: true,
            message: "Zəhmət olmasa, şifrənin təkrarını yazın!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject("Şifrələr eyni deyil!");
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item label="Cins" name={["gender"]} {...formItemLayout}>
        <Select>
          <Select.Option value="female">Qadın</Select.Option>
          <Select.Option value="male">Kişi</Select.Option>
          <Select.Option value="other">Digər</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject("Razılaşmanı qəbul etməlisiniz."),
          },
        ]}
        {...tailFormItemLayout}
      >
        <Checkbox>
          <a href="#">Razılaşmanı</a> oxudum və qəbul edirəm.
        </Checkbox>
      </Form.Item>

      <Form.Item {...buttonsLayout}>
        <Button
          type="primary"
          htmlType="submit"
          style={{ marginRight: "10px" }}
        >
          Qeydiyyatdan keç
        </Button>
        <Link
          to="/login"
          style={{
            whiteSpace: "nowrap",
            justifySelf: "center",
            alignSelf: "end",
          }}
        >
          Daxil ol
        </Link>
      </Form.Item>
    </Form>
  );
};

export default Register;
