import { Form, Input, InputNumber, Card, Button, Layout, message } from 'antd';
import axios from 'axios';
import { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const { Content } = Layout;

const RequestFormCard = () => {
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

    const [form] = Form.useForm();
    const history = useHistory()
    const {token} = useContext(AuthContext)

    const handleSubmit = () => {
        form.submit()
    }

    const handleFinish = () => {
        console.log("finished")
        const _data = form.getFieldValue()

        const data = {
            "token": token,
            ..._data
        }

        axios.post("http://127.0.0.1:5000/request-transcript", data)
        .then(res => {
            console.log(res.status)
            history.push('/dashboard')
        })
        .catch(err => {
            message.error(err.message)
        })

    }

    const handleFail = () => {
        console.log("Error")
    }

    return (
        <Content style={{}}>
            <div style={{ padding: "20px", minHeight: "100vh", background: "rgba(245, 245, 245, 1)" }}>
                <div style={styles.container}>
                    <Card title={"Request Transcript"} style={styles.card}>
                        <Form layout="vertical" name="request-form" form={form} onFinish={handleFinish} onFinishFailed={handleFail}>
                            <Form.Item label="Index Number" name="index-number" rules={[{ required: true, message: 'Please input your index number!', },]}>
                                <Input type="number" placeholder="Index Number" size="medium" />
                            </Form.Item>
                            <Form.Item label="First Name" name="first-name" rules={[{ required: true, message: 'Please input your first name!', },]}>
                                <Input type="text" placeholder="First Name" size="medium" />
                            </Form.Item>
                            <Form.Item label="Middle Name" name="middle-name" >
                                <Input type="text" placeholder="Middle Name" size="medium" />
                            </Form.Item>
                            <Form.Item label="last Name" name="last-name" rules={[{ required: true, message: 'Please input your last name!', },]}>
                                <Input type="text" placeholder="Last Name" size="medium" />
                            </Form.Item>
                            <Form.Item label="Address" name="address" rules={[{ required: true, message: 'Please input your last address!', },]}>
                                <Input type="text" placeholder="Last Name" size="medium" />
                            </Form.Item>
                            <Form.Item name="Number of Copies" label="Number of Copies" name="copies">
                                <InputNumber />
                            </Form.Item>
                            <p>Payment has to be made to complete request.</p>
                            <Button type="primary" style={styles.button} onClick={handleSubmit}>Pay</Button>
                        </Form>
                    </Card>
                </div>
            </div>
        </Content>

    );
}

export default RequestFormCard;

