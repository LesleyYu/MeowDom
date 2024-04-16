import { useParams, useSearchParams, Link } from "react-router-dom"
import {Breadcrumb, Button, Card, Input, Form, Space} from "antd";
import './index.scss'
import {useEffect, useState} from "react";


const PostNow = () => {

    const [posts, setPosts] = useState([{}])
    const [categories, setCategories] = useState([])

    // const categories = ["Laptop", "Phone", "Clothes", "Jewelry", "Sports", "other"]

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

    // 前端暴力获取所有 categories
    // useEffect(() => {
    //     getCategories();
    // }, [posts])
    //
    // function getCategories() {
    //     let newCategories = [...categories]
    //     console.log("categories", categories)
    //     posts.forEach((post, index) => {
    //         const thisCategory = post.category
    //         console.log("thisCategory", thisCategory)
    //         if ((thisCategory) && !newCategories.includes(thisCategory)) {
    //             newCategories.push(thisCategory)
    //         }
    //     })
    //     setCategories(newCategories)
    // }

  return (
      <div className="post-now">

          <Card
              title={
                  <Breadcrumb items={[
                      {title: <Link to={'/'}>Home</Link>},
                      {title: 'Post Now'}
                  ]}/>
              }
              style={{width: '70%'}}
          >
              <Form>
                  <Form.Item
                      label="Username"
                      name='username'
                      rules={[{required: true, message: "Please enter title"}]}
                  >
                      <Input placeholder='Please enter your username' style={{width: '90%'}}/>
                  </Form.Item>
                  <Form.Item
                      label="Item Name"
                      name='itemname'
                      rules={[{required: true, message: "Please enter item name"}]}
                  >
                      <Input placeholder='Please enter item name' style={{width: '90%'}}/>
                  </Form.Item>
                  <Form.Item
                      label="Category"
                      name='category'
                      rules={[{required: true, message: "Please enter item's category"}]}
                  >
                      <Input placeholder="Please enter item's category" style={{width: '90%'}}/>
                  </Form.Item>
                  <Form.Item
                      label="Condition"
                      name='condition'
                      rules={[{required: true, message: "Please enter item's condition"}]}
                  >
                      <Input placeholder="Please enter item's condition" style={{width: '90%'}}/>
                  </Form.Item>
                  <Form.Item
                      label="Brand"
                      name='brand'
                      rules={[{required: true, message: "Please enter item brand"}]}
                  >
                      <Input placeholder='Please enter item name' style={{width: '90%'}}/>
                  </Form.Item>
                  <Form.Item
                      label="Original Price"
                      name='ori-price'
                      rules={[{required: true, message: "Please enter item's original price"}]}
                  >
                      <Input placeholder="Please enter item's original price" style={{width: '90%'}}/>
                  </Form.Item>
                  <Form.Item
                      label="Selling Price"
                      name='selling-price'
                      rules={[{required: true, message: "Please enter your ideal selling price"}]}
                  >
                      <Input placeholder='Please enter your ideal selling price' style={{width: '90%'}}/>
                  </Form.Item>
                  <Form.Item
                      label="Title"
                      name='title'
                      rules={[{required: true, message: "Please enter title"}]}
                  >
                      <Input placeholder='Please enter title' style={{width: '90%'}}/>
                  </Form.Item>
                  <Form.Item
                      label="Content"
                      name='content'
                      rules={[{required: true, message: "Please enter content"}]}
                  >
                      <Input placeholder='Please enter content' style={{width: '90%'}}/>
                  </Form.Item>

                  <Form.Item wrapperCol={{offset: 8}}>
                      <Space>
                          <Button size="large" type="primary" htmlType="submit">
                              Post My Item
                          </Button>
                      </Space>
                  </Form.Item>
              </Form>


          </Card>

          <div className="border-top pt-3">
              <small className="text-muted">
                  Sell your Product Today!
              </small>
          </div>
      </div>
  )
}

export default PostNow