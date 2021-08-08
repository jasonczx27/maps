import './App.css';
import "antd/dist/antd.css"
import React from "react"


import { BrowserRouter, Route, Redirect } from "react-router-dom"
import Maps from './Views/Map';
import { Layout, Radio, Row, Col, message } from "antd"
import {
  LinkedinFilled,

} from '@ant-design/icons';


const { Header, Content, Footer } = Layout
message.config({ maxCount: 3 })
function App() {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Header />
      <Content style={{ minHeight: "87vh" }}>
        <BrowserRouter>
          <React.Fragment>
            <Route path="/maps">
              <Maps />
            </Route>
            <Route sensitive path="/">
              <Redirect to="/maps" />
            </Route>
          </React.Fragment>
        </BrowserRouter>

      </Content>
      <Footer>
        <Row>
          <Col>
            <a href="https://www.linkedin.com/in/zhe-xuan-chong/" target="_blank">
              <LinkedinFilled />
              {" "} Follow my Linkedin
            </a>
          </Col>
        </Row>
      </Footer>
    </Layout>
  );
}

export default App;
