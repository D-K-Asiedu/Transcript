import { Card } from 'antd';
import { Input, Button, Layout, Form, message } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import number from '../assets/number.png'
import axios from 'axios'

import UsePost from '../CustomHooks/usePost';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext';

const { Content } = Layout;

const EnterContactCard = () => {
    const styles = {
        card: {
            width: 300,
            margin: "0 auto",
            marginTop: "60px",
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            background: "rgba(253, 253, 253, 1)"
        },

        input: {
            marginTop: "10px",
        },

        cardContent: {
            padding: "40px 20px"
        },

        button: {
            display: "block",
            margin: "20px 0",
            width: "100%"
        },

        title: {
            textAlign: "center",
            color: "rgba(100, 100, 100, 1)",
            fontSize: "16px",
            marginTop: "30px"
        },

        paragraph: {
            textAlign: "center",
            color: "rgba(150, 150, 150, 1)",
            fontWeight: "500",
            marginTop: "20px",
            fontSize: "14px"
        },

        image: {
            height: "70px",
            with: "70px",
            display: "block",
            margin: "0 auto"
        }

    }

    const [form] = Form.useForm()
    const history = useHistory()
    const {login ,setLogin, token,setToken} = useContext(AuthContext)

    const handleClick = () =>{
        form.submit()

    }

    const handleFinish = ()=> {
        const contact = form.getFieldValue()
        console.log(contact)
        axios.post("http://127.0.0.1:5000/", contact)
        .then(res => {
                if (res.data.login == true){
                    setLogin(true)
                    setToken(res.data.token)
                    console.log(res.data)
                    history.push('/dashboard')
                }else{
                    console.log(res.data)
                    history.push('/otp/'+contact.contact)
        
                }
        })

        .catch (err => {
            message.error(err.message)
        })

    }

    const handleFailed = () => {
        console.log("Hello")
    }

    return (
            <Content style={{ }}>
                    <div style={{ padding: "30px",minHeight: "100vh", background: "rgba(245, 245, 245, 1)" }}> 
                    <Card className="card" style={styles.card}>
                        <div style={styles.cardContent}>
                            <img src={number} alt="" style={styles.image}/>
                            <h3 style={styles.title}>Enter your mobile number to create account</h3>
                            <p style={styles.paragraph}>We will send you a one time password(OTP)</p>
                            <Form name="basic" autoComplete="off" layout={"vertical"} form={form} onFinish={handleFinish} onFinishFailed={handleFailed}>
                                <Form.Item name="contact" rules={[{required: true,message: 'Please input your contact!',},]}>
                                    <Input type="number" placeholder="Enter Mobile Number" size="medium" style={styles.input}/>
                                </Form.Item>
                            </Form>
                            <Button type="primary" className="button" style={styles.button} onClick={handleClick}>Next</Button>
                        </div>
                    </Card>,
                </div>
            </Content>


    );
}

export default EnterContactCard;