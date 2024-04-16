import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, Card, Flex, Spin Avatar, List, Space } from "antd";
// import { LikeOutlined, MessageOutlined, StarOutlined  } from "icons";
import './index.scss'

const Home = () => {

    const [posts, setPosts] = useState([{}])

    useEffect(() => {
        try {
            async function fetchPosts() {
                fetch("/home")
                    .then(
                        response => response.json()
                    )
                    .then(
                        data => {
                            setPosts(data.posts);
                            // console.log("data.posts: \n", data.posts);
                        }
                    )
            }
            fetchPosts()
        } catch (error) {
            console.log(error)
        }
    }, [])

    return (
    <div>
      <Card
          className="home-card"
          title={
            <Breadcrumb items={[
              {title: <Link to={'/'}>Home</Link>},
            ]}/>
          }
      >
          { (typeof posts === "undefined" ? (
              <Flex align="center" gap="middle">
                  <Spin size="large"/>
              </Flex>
          ) : (
              // <p>Loading...</p>

              posts.map((post, index) => (
                  <p key={index}>{post.itemName}</p>
              ))
          ))}
      </Card>
    </div>
    )
}

export default Home



const data = Array.from({
    length: 23,
}).map((_, i) => ({
    href: 'https://ant.design',
    title: `ant design part ${i}`,
    avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
    description:
        'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
        'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
}));
const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);
const App = () => (
    <List
        itemLayout="vertical"
        size="large"
        pagination={{
            onChange: (page) => {
                console.log(page);
            },
            pageSize: 3,
        }}
        dataSource={data}
        footer={
            <div>
                <b>ant design</b> footer part
            </div>
        }
        renderItem={(item) => (
            <List.Item
                key={item.title}
                actions={[
                    <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                    <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                    <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                ]}
                extra={
                    <img
                        width={272}
                        alt="logo"
                        src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                    />
                }
            >
                <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    title={<a href={item.href}>{item.title}</a>}
                    description={item.description}
                />
                {item.content}
            </List.Item>
        )}
    />
);