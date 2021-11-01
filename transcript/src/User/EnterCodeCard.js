import { Card } from 'antd';
import { Input, Button, Layout, Form, message } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import authentication from '../assets/authentication.png'
import { useContext } from 'react';

import axios from 'axios';
import { AuthContext } from '../AuthContext';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

const { Content } = Layout;

const EnterCodeCard = () => {
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
    const {setLogin, setToken, url } = useContext(AuthContext)
    const {contact} = useParams()

    const handleClick = () =>{
        form.submit()
        
    }

    const handleFinish = ()=> {
        const otp = form.getFieldValue()

        const data = {
            "contact": contact,
            "otp": otp.otp
        }
        axios.post(url+"/otp", data)
        .then(res => {
            console.log(res.data)
            if (res.data.otp == true){
                setLogin(true)
                setToken(res.data.token)
                history.push('/request-transcript')
                message.success("authentication successful")
            }else{
                message.error("incorrect otp")
            }
        })

        .catch (err => {
            message.error(err.message)
        })
    }

    const handleFailed = () => {
    }
    return (
            <Content style={{ }}>
                    <div style={{ padding: "30px",minHeight: "100vh", background: "rgba(245, 245, 245, 1)" }}> 
                    <Card className="card" style={styles.card}>
                        <div style={styles.cardContent}>
                            <img src={authentication} alt="" style={styles.image}/>
                            <h3 style={styles.title}>Enter verification code</h3>
                            <p style={styles.paragraph}>OTP has been sent to contact <b>{contact}</b></p>
                            <Form name="basic" autoComplete="off" layout={"vertical"} form={form} onFinish={handleFinish} onFinishFailed={handleFailed}>
                                <Form.Item name="otp" rules={[{required: true,message: 'Please input your contact!',},]}>
                                    <Input type="number" placeholder="Enter Mobile Number" size="medium" style={styles.input}/>
                                </Form.Item>
                            </Form>
                            <Button type="primary" className="button" style={styles.button} onClick={handleClick}>Next</Button>                        </div>
                    </Card>,
                </div>
            </Content>


    );
}

export default EnterCodeCard;