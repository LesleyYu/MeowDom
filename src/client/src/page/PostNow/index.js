import {useParams, useSearchParams, Link, useNavigate} from "react-router-dom"
import {Breadcrumb, Button, Card, Input, Form, Space, InputNumber, Select, Alert} from "antd";
import './index.scss'
import {useEffect, useState} from "react";

const { Option } = Select;

const PostNow = () => {
    const navigate = useNavigate();

    const [posts, setPosts] = useState([{}])
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('error')
    const [categories, setCategories] = useState([])

    const [form] = Form.useForm();
    const onFinish = async (formValues) => {
        console.log('Received values of form: ', formValues);
        delete formValues.suffix;
        try {
            const response = await fetch('/postNow', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formValues)
            });

            if (response.ok) {
                setAlertType("success")
                setAlertMessage('Successfully posted!');
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);
                    // Registration successful, handle success (e.g., redirect user)
                    navigate('/');
                }, 3000);
            } else {
                // Registration failed, handle error
                // const data = await response.json();  // cause error
                // Display error messages to the user
                // if (data.error === 'Username already taken') {
                    setAlertMessage('Not a Moewdomer? Please be a member with us first!');
                    setAlertType("error")
                    setShowAlert(true);
                // }
            }
        } catch (error) {
            // Handle network errors or other unexpected errors
            console.error('Error:', error);
        }

    };

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

    const suffixSelector = (
        <Form.Item name="suffix" noStyle>
            <Select
                style={{
                    width: 70,
                }}
            >
                <Option value="USD">$</Option>
                {/*<Option value="CNY">¥</Option>*/}
                {/*<Option value="GBP">£</Option>*/}
                {/*<Option value="other">..</Option>*/}
            </Select>
        </Form.Item>
    );

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
              <Form
                  form={form}
                  name="PostNow"
                  onFinish={onFinish}
              >
                  {showAlert && (
                      <Alert
                          message={alertMessage}
                          type={alertType}
                          closable
                          onClose={() => setShowAlert(false)}
                          style={{ marginBottom: '16px' }}
                      />
                  )}
                  <Form.Item
                      label="Username"
                      name='username'
                      rules={[{required: true, message: "Please enter title"}]}
                  >
                      <Input placeholder='Please enter your username' style={{width: '90%'}}/>
                  </Form.Item>
                  <Form.Item
                      label="Item Name"
                      name='name'
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
                      <Input placeholder='Please enter item brand' style={{width: '90%'}}/>
                  </Form.Item>
                  <Form.Item
                      label="Original Price"
                      name='original_price'
                      rules={[{required: true, message: "Please enter item's original price"}]}
                  >
                      <InputNumber addonAfter={suffixSelector} placeholder="Please enter item's original price" style={{width: '90%'}} />
                  </Form.Item>
                  <Form.Item
                      label="Selling Price"
                      name='selling_price'
                      rules={[{required: true, message: "Please enter your ideal selling price"}]}
                  >
                      <InputNumber addonAfter={suffixSelector} placeholder='Please enter your ideal selling price' style={{width: '90%'}} />
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
                      <Input.TextArea showCount placeholder='Please enter content' style={{width: '90%'}} maxLength={1000}/>
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