import {useEffect, useState} from "react";
import { useParams, useSearchParams, Link } from "react-router-dom"
import {
    Button, Card, Input, Form, Space, Breadcrumb, AutoComplete, Select
} from "antd";
const { Option } = Select;
// import './index.scss'

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 10,
        },
    },
};

const Register = () => {

    const [form] = Form.useForm();
    const onFinish = async (formValues) => {
        console.log('Received values of form: ', formValues);

        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formValues)
            });

            if (response.ok) {
                // Registration successful, handle success (e.g., redirect user)
            } else {
                // Registration failed, handle error
                const data = await response.json();
                // Display error messages to the user
            }
        } catch (error) {
            // Handle network errors or other unexpected errors
            console.error('Error:', error);
        }

    };

    // const categories = ["Laptop", "Phone", "Clothes", "Jewelry", "Sports", "other"]

    const [posts, setPosts] = useState([{}])
    const [categories, setCategories] = useState([])
    const [autoCompleteResult, setAutoCompleteResult] = useState([]);


    const onWebsiteChange = (value) => {
        if (!value) {
            setAutoCompleteResult([]);
        } else {
            setAutoCompleteResult(['@gmail.com', '@outlook.com', '@yahoo.com', '@hotmail.com'].map((domain) => `${value}${domain}`));
        }
    };

    const websiteOptions = autoCompleteResult.map((website) => ({
        label: website,
        value: website,
    }));

    // contact phone number prefix selector
    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select
                style={{
                    width: 70,
                }}
            >
                <Option value="United States, Canada" key="1">+1</Option> <Option value="China" key="86">+86</Option> <Option value="India" key="91">+91</Option> <Option value="Japan" key="81">+81</Option> <Option value="Indonesia" key="62">+62</Option> <Option value="Brazil" key="55">+55</Option> <Option value="Pakistan" key="92">+92</Option> <Option value="Germany" key="49">+49</Option> <Option value="Italy" key="39">+39</Option> <Option value="Russia" key="7">+7</Option> <Option value="Iran" key="98">+98</Option> <Option value="Nigeria" key="234">+234</Option> <Option value="Mexico" key="1">+1</Option> <Option value="United Kingdom" key="44">+44</Option> <Option value="France" key="33">+33</Option> <Option value="Bangladesh" key="880">+880</Option> <Option value="Greece" key="30">+30</Option> <Option value="Vietnam" key="84">+84</Option> <Option value="Mexico" key="52">+52</Option> <Option value="Philippines" key="63">+63</Option>
            </Select>
        </Form.Item>
    );

    useEffect(() => {
        try {
            async function fetchRegister() {
                fetch("/register")
                    .then(
                        response => response.json()
                    )
                    .then(
                        data => {
                            setPosts(data);
                            // console.log("data.posts: \n", data.posts);
                        }
                    )
            }

            fetchRegister()
        } catch (error) {
            console.log(error)
        }
    }, [])

    return (
        <div className="post-now">

            <Card
                title='Register'
                style={{width: '70%'}}
            >
                <Form
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    style={{
                        maxWidth: 600,
                    }}
                    scrollToFirstError
                >
                    <Form.Item
                        label="Username"
                        name='username'
                        rules={[{required: true, message: "Please enter title"}]}
                    >
                        <Input placeholder='Please enter your username' style={{width: '90%'}}/>
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="E-mail"
                        rules={[{
                                required: true,
                                message: 'Please enter your email',
                            }, ]}
                    >
                        <AutoComplete options={websiteOptions} onChange={onWebsiteChange} placeholder="Please enter Your E-mail">
                            <Input style={{ width: '90%' }}/>
                        </AutoComplete>
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label="Phone Number"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your phone number',
                            },
                        ]}
                    >
                        <Input addonBefore={prefixSelector}
                               placeholder="Please enter your contact number"
                               style={{ width: '90%' }}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Address"
                        name='address'
                        rules={[{required: true, message: "Please enter your address"}]}
                    >
                        <Input.TextArea placeholder='Please enter your address' style={{width: '90%'}}/>
                    </Form.Item>
                    <Form.Item
                        label="City"
                        name='city'
                        rules={[{required: true, message: "Please enter your current city"}]}
                    >
                        <Input placeholder='Please enter your city' style={{width: '90%'}}/>
                    </Form.Item>
                    <Form.Item
                        label="State"
                        name='state'
                        rules={[{required: true, message: "Please enter your state"}]}
                    >
                        <Input placeholder='Please enter your state' style={{width: '90%'}}/>
                    </Form.Item>
                    <Form.Item
                        label="Zipcode"
                        name='zipcode'
                        rules={[{required: true, message: "Please enter zipcode"}]}
                    >
                        <Input placeholder='Please enter zipcode' style={{width: '90%'}}/>
                    </Form.Item>
                    <Form.Item  {...tailFormItemLayout}>
                        <Space>
                            <Button size="large" type="primary" htmlType="submit">
                                Sign Up
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



