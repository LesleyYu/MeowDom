import { Breadcrumb, Card } from "antd";
import { Link } from "react-router-dom";
// import './index.scss'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import '../../main.scss'


const About = () => {
    return (
        <div>
            <Card
                // className="home-card"
                title={
                    <Breadcrumb items={[
                        {title: <Link to={'/'}>Home</Link>},
                        {title: 'About'}
                    ]}/>
                }
            >
                <h2>About Us</h2>
                <div className="content">
                    MeowDom is a resource exchange and second-hand trading platform.
                </div>
            </Card>
        </div>
    )
}

export default About