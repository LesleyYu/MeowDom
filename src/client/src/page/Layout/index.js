import { Link, Outlet } from "react-router-dom"
import { Layout, Menu, Popconfirm } from "antd"
import { LogoutOutlined } from "@ant-design/icons"
import {Header} from "antd/es/layout/layout";
// import '../../main.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.scss'

const navItems = []

const MeowLayout = () => {
  return (
      <div className="meow-body">
          <Layout className="layout-content">
              <Header className="header">
                  <div className="logo" />
                  <div className="navbar-nav">
                      <a className="navbar-brand">MEOWDOM</a>
                      <Link className="nav-item nav-link" to="/">Home</Link>
                      <Link className="nav-item nav-link" to="/about">About</Link>
                  </div>
                  <div className="navbar-nav">
                      <Link className="nav-item nav-link" to="/postNow">Post Now</Link>
                      <Link className="nav-item nav-link" to="/Register">Join Us</Link>
                  </div>

                  {/*<div className="logo"/>*/}
                  <div className="user-info">
                      <span className="user-name">UserAAA</span>
                      <span className="user=logout">
                          <Popconfirm title="ConfirmLogout?" oktext="Logout" canceltext="Cancel">
                              <LogoutOutlined/>
                          </Popconfirm>
                          <div>Logout</div> {/* doesn't show*/}
                      </span>
                  </div>
              </Header>

              <Layout className="layout-content" style={{padding: 30}}>
                  <div className="col-md-12 ">
                      <Outlet/>
                  </div>
              </Layout>

              {/*<header className="site-header">*/}
              {/*    <nav className="navbar navbar-expand-md navbar-dark bg-steel fixed-top">*/}
              {/*        <div className="container">*/}
              {/*            <a className="navbar-brand " href="/">MEOWDOM</a>*/}
              {/*            <button className="navbar-toggler" type="button" data-toggle="collapse"*/}
              {/*                    data-target="#navbarToggle" aria-controls="navbarToggle" aria-expanded="false"*/}
              {/*                    aria-label="Toggle navigation">*/}
              {/*                <span className="navbar-toggler-icon"></span>*/}
              {/*            </button>*/}
              {/*            <div className="collapse navbar-collapse" id="navbarToggle">*/}
              {/*                <div className="navbar-nav mr-auto">*/}
              {/*                    <Link className="nav-item nav-link" to="/">Home</Link>*/}
              {/*                    <Link className="nav-item nav-link" to="/about">About</Link>*/}
              {/*                    /!*<a className="nav-item nav-link" href="{{ url_for('home') }}">Home</a>*!/*/}
              {/*                    /!*<a className="nav-item nav-link" href="{{ url_for('about') }}">About</a>*!/*/}
              {/*                </div>*/}
              {/*                <div className="navbar-nav">*/}
              {/*                    <Link className="nav-item nav-link" to="/postNow">Post Now</Link>*/}
              {/*                    /!*<a className="nav-item nav-link" href="{{ url_for('postNow') }}">PostNow</a>*!/*/}
              {/*                    <Link className="nav-item nav-link" to="/Register">Join Us</Link>*/}
              {/*                    /!*<a className="nav-item nav-link" href="{{ url_for('register') }}">JoinUs</a>*!/*/}
              {/*                </div>*/}
              {/*            </div>*/}
              {/*        </div>*/}
              {/*    </nav>*/}
              {/*</header>*/}

              {/*<main role="main" className="container">*/}
              {/*    <div className="row">*/}
              {/*        <div className="col-md-8">*/}
              {/*            <Outlet />*/}

              {/*        </div>*/}

              {/*    </div>*/}
              {/*</main>*/}
          </Layout>
      </div>
  )
}

export default MeowLayout