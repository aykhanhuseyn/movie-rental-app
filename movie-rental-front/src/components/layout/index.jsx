import React from "react";
import { Layout as AntLayout } from "antd";
import Header from "../header";
import Copy from "../copy";
import "./style.scss";

const Layout = ({ children }) => {
  return (
    <AntLayout>
      <AntLayout.Header>
        <Header />
      </AntLayout.Header>
      <AntLayout.Content
        style={{
          minHeight: "calc(100vh - 183px)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {children}
      </AntLayout.Content>
      <AntLayout.Footer>
        <Copy />
      </AntLayout.Footer>
    </AntLayout>
  );
};

export default Layout;
