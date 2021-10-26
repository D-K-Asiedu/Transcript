import React, { useState, useEffect, useRef } from 'react';
import { Form, Input, InputNumber, Modal, Button, message } from 'antd';
import axios from 'axios';

import { useHistory } from 'react-router-dom';


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


const RequestForm = ({ visible, onCancel, setVisible }) => {
    const [form] = Form.useForm();
    const history = useHistory();

    useResetFormOnCloseModal({
        form,
        visible,
    });

    const onOk = () => {
        form.submit();
        console.log(form.getFieldValue);
        const data = form.getFieldValue()
        axios.post("http://localhost:3001/request-transcript", data)
        .then(res => {
            console.log(res.status)
            setVisible(false)
            history.push('/')

        })
        .catch(err => {
            message.error(err.message)
        })
    };

    return (
        <div>
            <Modal title="Request Transcript" visible={visible} onCancel={onCancel}
            footer={[
                <Button key="back" onClick={onCancel}>
                  Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={onOk}>
                  Submit
                </Button>,]}
            >
                <Form form={form} layout="vertical" name="request-form">
                    <Form.Item label="Index Number" name="index-number" rules={[{ required: true, message: 'Please input your index number!', },]}>
                        <Input type="number" placeholder="Index Number" size="medium" />
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
                    <Form.Item label="Address" name="address" rules={[{ required: true, message: 'Please input your last address!', },]}>
                        <Input type="text" placeholder="Last Name" size="medium" />
                    </Form.Item>
                    <Form.Item name="Number of Copies" label="Number of Copies" >
                        <InputNumber />
                    </Form.Item>
                </Form>
            </Modal>
        </div>

    );
};

export default RequestForm;