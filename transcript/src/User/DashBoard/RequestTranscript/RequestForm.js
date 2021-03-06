import React, { useState, useEffect, useRef, useContext } from 'react';
import { Form, Input, InputNumber, Modal, Button, message } from 'antd';
import axios from 'axios';

import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../../AuthContext';


const useResetFormOnCloseModal = ({ form, visible }) => {
    const prevVisibleRef = useRef();
    useEffect(() => {
        prevVisibleRef.current = visible;
    }, [visible]);
    const prevVisible = prevVisibleRef.current;
    useEffect(() => {
        if (!visible && prevVisible) {
            form.resetFields();
        }
    }, [visible]);
}


const RequestForm = ({ visible, onCancel, setVisible, setDetails }) => {
    const [form] = Form.useForm();
    const history = useHistory();
    const {url, token} = useContext(AuthContext)
    const [loading, setLoading] = useState(false)

    useResetFormOnCloseModal({
        form,
        visible,
    });

    const onOk = () => {
        form.submit();        
        
    };

    const finish = ()=>{
        setLoading(true)

        const _data = form.getFieldValue()

        const data = {
            "token": token,
            ..._data
        }

        axios.post(url+"/request-transcript", data)
        .then(res => {
            console.log(res.status)
            setVisible(false)

        })
        .catch(err => {
            setLoading(false)
            message.error(err.message)
        })

        setTimeout(()=> {
            axios.post(url+"/transcripts", {"token": token})
        .then(res => {
            console.log(res.data)
            setDetails(res.data)
            
        })
        .catch(err => {
            message.error(err.message)
        })
        }, 3000)
    }

    return (
        <div>
            <Modal title="Request Transcript" visible={visible} onCancel={onCancel}
            footer={[
                <Button key="back" onClick={onCancel}>
                  Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={onOk} loading={loading}>
                  Submit
                </Button>,]}
            >
                <Form form={form} layout="vertical" name="request-form" onFinish={finish}>
                    <Form.Item label="Index Number" name="index-number" rules={[{ required: true, message: 'Please input your index number!', },]}>
                        <Input type="number" placeholder="Index Number" size="medium" />
                    </Form.Item>
                    <Form.Item label="First Name" name="first-name" rules={[{ required: true, message: 'Please input your first name!', },]}>
                        <Input type="text" placeholder="First Name" size="medium" />
                    </Form.Item>
                    <Form.Item label="Middle Name" name="middle-name">
                        <Input type="text" placeholder="Middle Name" size="medium" />
                    </Form.Item>
                    <Form.Item label="last Name" name="last-name" rules={[{ required: true, message: 'Please input your last name!', },]}>
                        <Input type="text" placeholder="Last Name" size="medium" />
                    </Form.Item>
                    <Form.Item label="Address" name="address" rules={[{ required: true, message: 'Please input your last address!', },]}>
                        <Input type="text" placeholder="Last Name" size="medium" />
                    </Form.Item>
                    <Form.Item name="copies" label="Number of Copies" >
                        <InputNumber />
                    </Form.Item>
                </Form>
            </Modal>
        </div>

    );
};

export default RequestForm;