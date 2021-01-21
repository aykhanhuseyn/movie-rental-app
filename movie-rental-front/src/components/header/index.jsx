import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices";
import { Typography, Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

const Header = () => {
  const { Title, Text } = Typography;
  const dispatch = useDispatch();
  const user = useSelector((state) => state.credentials.user);
  const onClick = () => {
    dispatch(logout());
  };
  return (
    <>
      <Title level={2} style={{ marginTop: "10px", color: "#f3f3f3" }}>
        MRA
      </Title>
      {user && (
        <div className="nav">
          <Text
            className="nav__name"
            style={{ marginRight: "10px", color: "#f3f3f3" }}
          >
            {user.name}
          </Text>
          <Button
            className="nav__logout"
            type="primary"
            shape="round"
            icon={<LogoutOutlined />}
            size={"middle"}
            onClick={onClick}
          />
        </div>
      )}
    </>
  );
};

export default Header;
