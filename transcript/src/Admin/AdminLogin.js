import { Card,Form, Input, Button, Checkbox, message } from 'antd';
import { Layout } from 'antd'
import { MailOutlined } from '@ant-design/icons';
import password from '../assets/password_icon.png'
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';


const { Content } = Layout;

const AdminLogin = () => {
    const styles = {
        card: {
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            background: "rgba(253, 253, 253, 1)"
        },

        cardContent: {
            padding: "30px 15px"
        },

        title: {
            textAlign: "center",
            color: "rgba(100, 100, 100, 1)",
            fontSize: "20px",
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
    const {setAdminLogin, setAdmin, url} = useContext(AuthContext)
    const history = useHistory()

    const onFinish = (values) => {
        axios.post(url+"/admin/login", values)
        .then(res => {
            if (res.data.login == true){
                setAdminLogin(true)
                setAdmin(res.data.admin)
                history.push("/admin/dashboard/"+res.data.type)
            }
            else{
                message.error(res.data.msg)
            }
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
                <div style={{margin: "80px auto", width: "300px"}}>
                <Card className="card" style={styles.card}>
                    <div style={styles.cardContent}>
                        <h2 style={styles.title}>Welcome Back</h2>
                        <p style={styles.paragraph}>Enter your cridentials to login</p>
                        <Form name="basic" initialValues={{remember: true,}} onFinish={onFinish} onFinishFailed={onFinishFailed} layout={"vertical"}>
                            <Form.Item name="email" rules={[{required: true,message: 'Please input your username!',},]}>
                                <Input placeholder="Enter your email" prefix={<MailOutlined />}/>
                            </Form.Item>

                            <Form.Item name="password" rules={[{required: true,message: 'Please input your password!', }, ]}>
                                <Input.Password placeholder={"Enter your password"} prefix={<img src={password} style={{ width: "16px", height: "16px" }}/>}/>
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit" style={styles.button}>
                                    Login
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </Card>,
                <p>Create Account <Link to="/admin/register">Here</Link></p>
                </div>
            </div>
        </Content>


    );
}

export default AdminLogin;