import React from "react";
import { Divider, Typography } from "antd";

const Copy = () => {
  const { Text } = Typography;
  return (
    <>
      <Divider />
      <Text type="secondary">Copyright &copy; {new Date().getFullYear()}.</Text>
    </>
  );
};

export default Copy;
