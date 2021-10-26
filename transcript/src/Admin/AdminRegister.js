import { Form, Input, InputNumber, Card, Button, Layout, Select } from 'antd';
import { Link } from 'react-router-dom';

const { Content } = Layout;

const AdminRegister = () => {
    const styles = {
        card: {
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            background: "rgba(253, 253, 253, 1)",
            maxWidth: "500px",
            minWidth: "300px",
            margin: "60px auto",
        },

        input: {
            marginTop: "40%",
        },

        button: {
            display: "block",
            marginTop: "10px",
            marginLeft: "auto"
        },

        container: {


        }

    }
    return (
        <Content style={{}}>
            <div style={{ padding: "20px", minHeight: "100vh", background: "rgba(245, 245, 245, 1)" }}>
                <div style={styles.container}>
                    <Card title={"Register"} style={styles.card}>
                        <Form layout="vertical" name="request-form">
                            <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your index email!', },]}>
                                <Input type="text" placeholder="Email" size="medium" />
                            </Form.Item>
                            <Form.Item label="First Name" name="first-name" rules={[{ required: true, message: 'Please input your first name!', },]}>
                                <Input type="text" placeholder="First Name" size="medium" />
                            </Form.Item>
                            <Form.Item label="Middle Name" name="middle-name" rules={[{ required: true, message: 'Please input your middle name!', },]}>
                                <Input type="text" placeholder="Middle Name" size="medium" />
                            </Form.Item>
                            <Form.Item label="last Name" name="last-name" rules={[{ required: true, message: 'Please input your last name!', },]}>
                                <Input type="text" placeholder="Last Name" size="medium" />
                            </Form.Item>
                            <Form.Item label="Account Type" name="address" rules={[{ required: true, message: 'Please input your last address!', },]}>
                                <Select>
                                    <Select.Option value="demo">Accademics</Select.Option>
                                    <Select.Option value="demo">Finance</Select.Option>
                                </Select>                            
                            </Form.Item>
                            <p>Payment has to be made to complete request.</p>
                            <Button type="primary" htmlType="submit" style={styles.button}>Register</Button>
                        </Form>
                    </Card>
                </div>
            </div>
        </Content>

    );
}

export default AdminRegister;

