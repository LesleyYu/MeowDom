import { useParams, useSearchParams, Link } from "react-router-dom"
import {Breadcrumb, Button, Card, Input, Form, Space} from "antd";
// import './index.scss'
import {useEffect, useState} from "react";


const Register = () => {

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

export default Register


//
//
// const {
//     AutoComplete,
//     Button,
//     Cascader,
//     Checkbox,
//     Col,
//     Form,
//     Input,
//     InputNumber,
//     Row,
//     Select,
// } = antd;
// const { Option } = Select;
// const residences = [
//     {
//         value: 'zhejiang',
//         label: 'Zhejiang',
//         children: [
//             {
//                 value: 'hangzhou',
//                 label: 'Hangzhou',
//                 children: [
//                     {
//                         value: 'xihu',
//                         label: 'West Lake',
//                     },
//                 ],
//             },
//         ],
//     },
//     {
//         value: 'jiangsu',
//         label: 'Jiangsu',
//         children: [
//             {
//                 value: 'nanjing',
//                 label: 'Nanjing',
//                 children: [
//                     {
//                         value: 'zhonghuamen',
//                         label: 'Zhong Hua Men',
//                     },
//                 ],
//             },
//         ],
//     },
// ];
// const formItemLayout = {
//     labelCol: {
//         xs: {
//             span: 24,
//         },
//         sm: {
//             span: 8,
//         },
//     },
//     wrapperCol: {
//         xs: {
//             span: 24,
//         },
//         sm: {
//             span: 16,
//         },
//     },
// };
// const tailFormItemLayout = {
//     wrapperCol: {
//         xs: {
//             span: 24,
//             offset: 0,
//         },
//         sm: {
//             span: 16,
//             offset: 8,
//         },
//     },
// };
// const App = () => {
//     const [form] = Form.useForm();
//     const onFinish = (values) => {
//         console.log('Received values of form: ', values);
//     };
//     const prefixSelector = (
//         <Form.Item name="prefix" noStyle>
//             <Select
//                 style={{
//                     width: 70,
//                 }}
//             >
//                 <Option value="86">+86</Option>
//                 <Option value="87">+87</Option>
//             </Select>
//         </Form.Item>
//     );
//     const suffixSelector = (
//         <Form.Item name="suffix" noStyle>
//             <Select
//                 style={{
//                     width: 70,
//                 }}
//             >
//                 <Option value="USD">$</Option>
//                 <Option value="CNY">¥</Option>
//             </Select>
//         </Form.Item>
//     );
//     const [autoCompleteResult, setAutoCompleteResult] = useState([]);
//     const onWebsiteChange = (value) => {
//         if (!value) {
//             setAutoCompleteResult([]);
//         } else {
//             setAutoCompleteResult(['.com', '.org', '.net'].map((domain) => `${value}${domain}`));
//         }
//     };
//     const websiteOptions = autoCompleteResult.map((website) => ({
//         label: website,
//         value: website,
//     }));
//     return (
//         <Form
//             {...formItemLayout}
//             form={form}
//             name="register"
//             onFinish={onFinish}
//             initialValues={{
//                 residence: ['zhejiang', 'hangzhou', 'xihu'],
//                 prefix: '86',
//             }}
//             style={{
//                 maxWidth: 600,
//             }}
//             scrollToFirstError
//         >
//             <Form.Item
//                 name="email"
//                 label="E-mail"
//                 rules={[
//                     {
//                         type: 'email',
//                         message: 'The input is not valid E-mail!',
//                     },
//                     {
//                         required: true,
//                         message: 'Please input your E-mail!',
//                     },
//                 ]}
//             >
//                 <Input />
//             </Form.Item>
//
//             <Form.Item
//                 name="password"
//                 label="Password"
//                 rules={[
//                     {
//                         required: true,
//                         message: 'Please input your password!',
//                     },
//                 ]}
//                 hasFeedback
//             >
//                 <Input.Password />
//             </Form.Item>
//
//             <Form.Item
//                 name="confirm"
//                 label="Confirm Password"
//                 dependencies={['password']}
//                 hasFeedback
//                 rules={[
//                     {
//                         required: true,
//                         message: 'Please confirm your password!',
//                     },
//                     ({ getFieldValue }) => ({
//                         validator(_, value) {
//                             if (!value || getFieldValue('password') === value) {
//                                 return Promise.resolve();
//                             }
//                             return Promise.reject(new Error('The new password that you entered do not match!'));
//                         },
//                     }),
//                 ]}
//             >
//                 <Input.Password />
//             </Form.Item>
//
//             <Form.Item
//                 name="nickname"
//                 label="Nickname"
//                 tooltip="What do you want others to call you?"
//                 rules={[
//                     {
//                         required: true,
//                         message: 'Please input your nickname!',
//                         whitespace: true,
//                     },
//                 ]}
//             >
//                 <Input />
//             </Form.Item>
//
//             <Form.Item
//                 name="residence"
//                 label="Habitual Residence"
//                 rules={[
//                     {
//                         type: 'array',
//                         required: true,
//                         message: 'Please select your habitual residence!',
//                     },
//                 ]}
//             >
//                 <Cascader options={residences} />
//             </Form.Item>
//
//             <Form.Item
//                 name="phone"
//                 label="Phone Number"
//                 rules={[
//                     {
//                         required: true,
//                         message: 'Please input your phone number!',
//                     },
//                 ]}
//             >
//                 <Input
//                     addonBefore={prefixSelector}
//                     style={{
//                         width: '100%',
//                     }}
//                 />
//             </Form.Item>
//
//             <Form.Item
//                 name="donation"
//                 label="Donation"
//                 rules={[
//                     {
//                         required: true,
//                         message: 'Please input donation amount!',
//                     },
//                 ]}
//             >
//                 <InputNumber
//                     addonAfter={suffixSelector}
//                     style={{
//                         width: '100%',
//                     }}
//                 />
//             </Form.Item>
//
//             <Form.Item
//                 name="website"
//                 label="Website"
//                 rules={[
//                     {
//                         required: true,
//                         message: 'Please input website!',
//                     },
//                 ]}
//             >
//                 <AutoComplete options={websiteOptions} onChange={onWebsiteChange} placeholder="website">
//                     <Input />
//                 </AutoComplete>
//             </Form.Item>
//
//             <Form.Item
//                 name="intro"
//                 label="Intro"
//                 rules={[
//                     {
//                         required: true,
//                         message: 'Please input Intro',
//                     },
//                 ]}
//             >
//                 <Input.TextArea showCount maxLength={100} />
//             </Form.Item>
//
//             <Form.Item
//                 name="gender"
//                 label="Gender"
//                 rules={[
//                     {
//                         required: true,
//                         message: 'Please select gender!',
//                     },
//                 ]}
//             >
//                 <Select placeholder="select your gender">
//                     <Option value="male">Male</Option>
//                     <Option value="female">Female</Option>
//                     <Option value="other">Other</Option>
//                 </Select>
//             </Form.Item>
//
//             <Form.Item label="Captcha" extra="We must make sure that your are a human.">
//                 <Row gutter={8}>
//                     <Col span={12}>
//                         <Form.Item
//                             name="captcha"
//                             noStyle
//                             rules={[
//                                 {
//                                     required: true,
//                                     message: 'Please input the captcha you got!',
//                                 },
//                             ]}
//                         >
//                             <Input />
//                         </Form.Item>
//                     </Col>
//                     <Col span={12}>
//                         <Button>Get captcha</Button>
//                     </Col>
//                 </Row>
//             </Form.Item>
//
//             <Form.Item
//                 name="agreement"
//                 valuePropName="checked"
//                 rules={[
//                     {
//                         validator: (_, value) =>
//                             value ? Promise.resolve() : Promise.reject(new Error('Should accept agreement')),
//                     },
//                 ]}
//                 {...tailFormItemLayout}
//             >
//                 <Checkbox>
//                     I have read the <a href="">agreement</a>
//                 </Checkbox>
//             </Form.Item>
//             <Form.Item {...tailFormItemLayout}>
//                 <Button type="primary" htmlType="submit">
//                     Register
//                 </Button>
//             </Form.Item>
//         </Form>
//     );
// };
