import { Modal, Button, Form, Select } from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useState } from 'react';

const PrintTransactions = () => {
  const styles = {
    button: {
      marginBottom: "10px",
      display: "block",
      marginLeft: "auto"
    }
  }
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    form.submit();
    console.log(form.getFieldValue())
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [form] = Form.useForm();

  return (
    <>
      <Button type="primary" onClick={showModal} style={styles.button}>
        Print Transactions
      </Button>
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical" name="print">
          <Form.Item label={"Select File Format"} name="format">
          <Select>
              <Select.Option value="pdf">PDF</Select.Option>
              <Select.Option value="excel">Excell</Select.Option>
              <Select.Option value="csv">CSV</Select.Option>
          </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default PrintTransactions;