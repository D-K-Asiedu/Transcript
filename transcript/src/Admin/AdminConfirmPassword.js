import { Card,Form, Input, Button, Checkbox, message } from 'antd';
import { Layout } from 'antd'
import { MailOutlined } from '@ant-design/icons';
import password from '../assets/password_icon.png'
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

const { Content } = Layout;

const AdminConfirmPassword = () => {
    const styles = {
        card: {
            width: "300px",
            margin: "0 auto",
            marginTop: "80px",
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            background: "rgba(253, 253, 253, 1)"
        },

        cardContent: {
            padding: "30px 15px"
        },

        title: {
            textAlign: "center",
            color: "rgba(100, 100, 100, 1)",
            fontSize: "22px",
            marginBottom: "40px"

        },

        paragraph: {
            textAlign: "center",
            color: "rgba(150, 150, 150, 1)",
            fontWeight: "500",
            fontSize: "15px",
            marginBottom: "30px"
        },

        button: {
            width: "100%"
        }

    }

    const history = useHistory()
    const {id} = useParams()


    const onFinish = (values) => {
        axios.post("http://127.0.0.1:5000/admin/set-password", {"id": id,...values})
        .then(res => {
            history.push("/admin")
        })
        .catch(err => {
            message.error(err.message)
        })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Content style={{}}>
            <div style={{ padding: "30px", minHeight: "100vh", background: "rgba(245, 245, 245, 1)" }}>
                <Card className="card" style={styles.card}>
                    <div style={styles.cardContent}>
                        <h2 style={styles.title}>Reset Password</h2>
                        <Form name="basic" initialValues={{remember: true,}} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off" layout={"vertical"}>

                            <Form.Item name="password" rules={[{required: true,message: 'Please input your password!', }, ]}>
                                <Input.Password placeholder={"Enter your password"} prefix={<img src={password} style={{ width: "16px", height: "16px" }}/>}/>
                            </Form.Item>
                            <Form.Item name="confirm-password" rules={[{required: true,message: 'Please input your password!', }, ]}>
                                <Input.Password placeholder={"Confirm password"} prefix={<img src={password} style={{ width: "16px", height: "16px" }}/>}/>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" style={styles.button}>
                                    Next
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Card>,
            </div>
        </Content>


    );
}

export default AdminConfirmPassword;