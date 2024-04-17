import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, Card, Flex, Spin, Avatar, List, Space, Badge, Descriptions } from "antd";
import { DollarOutlined, DollarTwoTone, CalendarOutlined } from "@ant-design/icons"
import './index.scss'


const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

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
                            console.log("data.posts: \n", data.posts);
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
      <Card className="home-card"
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

              <List
                  itemLayout="vertical"
                  size="large"
                  pagination={{
                      onChange: (page) => {
                          console.log(page);
                      },
                      pageSize: 5,
                  }}
                  dataSource={posts}
                  footer={<div></div>}
                  renderItem={(item) => (
                      <List.Item
                          key={item.title}
                          actions={[
                              <IconText icon={DollarOutlined} text={`original price: ${item.original_price}`} className="list-item-original-price" />,
                              <IconText icon={DollarTwoTone} text={`selling price: ${item.selling_price}`} key="list-item-selling-price" />,
                              <IconText icon={CalendarOutlined} text={`${item.post_date}`} key="list-vertical-message" />,
                          ]}
                          extra={
                              <img
                                  height={172}
                                  alt="logo"
                                  src={require("../../assets/meow1.jpg")}
                              />
                          }
                      >
                          <List.Item.Meta
                              avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${item.post_id}`} />}
                              title={
                                  <div>
                                      <span className="user-name">{item.username}</span>
                                      <a href={item.href}>{item.title}</a>
                                  </div>
                              }
                              description={item.content}
                          />
                          {<Descriptions bordered size='small' items={[
                              { key: '1', label: 'Posted In', children: `${item.userCity}, ${item.userState}` },
                              { key: '2', label: "Item Name", children: item.itemName },
                              { key: '3', label: "Brand", children: item.itemBrand},
                              // { key: '4', label: "Brand", children: item.itemBrand},
                              { key: '4', label: 'Condition',
                                    children: <Badge status="processing" text={item.itemCondition} />,
                                    span: 3,
                              },
                          ]} />}
                      </List.Item>
                  )}
              />
          ))}
      </Card>
    </div>
    )
}

export default Home
