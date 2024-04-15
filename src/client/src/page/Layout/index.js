import { Link, Outlet } from "react-router-dom"
// import 'bootstrap/dist/css/bootstrap.min.css';
// 引入这个bootstrap css之后会无法显示一些标签。先学scss，再尝试把bootstrap引进scss

const Layout = () => {
  return (
    <div>
      我是一级路由layout组件
      <Link to="/">面板</Link>
      <Link to="/about">关于</Link>
      {/* 配置二级路由的出口 */}
      <Outlet />

      <header class="site-header">
        <nav class="navbar navbar-expand-md navbar-dark bg-steel fixed-top">
          <div class="container">
            <a class="navbar-brand mr-4" href="/">MEOWDOM</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggle" aria-controls="navbarToggle" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarToggle">
              <div class="navbar-nav mr-auto">
                <a class="nav-item nav-link" href="{{ url_for('home') }}">Home</a>
                <a class="nav-item nav-link" href="{{ url_for('about') }}">About</a>
              </div>
              {/* <!-- Navbar Right Side --> */}
              <div class="navbar-nav">
                  <a class="nav-item nav-link" href="{{ url_for('postNow') }}">PostNow</a>
                  <a class="nav-item nav-link" href="{{ url_for('register') }}">JoinUs</a>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <main role="main" class="container">
        <div class="row">
          <div class="col-md-8">
            <div class="navbar-nav">hiiii!!!!!!!!!</div>
            {/* {% with messages = get_flashed_messages(with_categories=true) %}
              {% if messages %}
                {% for category, message in messages %}
                  <div class="alert alert-{{ category }}">
                    {{ message }}
                  </div>
                {% endfor %}
              {% endif %}
            {% endwith %}
            {% block content %}{% endblock %} */}
          </div>
          <div class="col-md-4">
            <div class="content-section">
              <h3>Our Sidebar</h3>
              <p class='text-muted'>You can put any information here you'd like.
                <ul class="list-group">
                  <li class="list-group-item list-group-item-light">Latest Posts</li>
                  <li class="list-group-item list-group-item-light">Announcements</li>
                  <li class="list-group-item list-group-item-light">Calendars</li>
                  <li class="list-group-item list-group-item-light">etc</li>
                </ul>
              </p>
            </div>
          </div>
        </div>
      </main>


    </div>
  )
}

export default Layout