import React, { useState } from 'react';
import { Button, Empty } from 'antd';
import RequestForm from './RequestForm'


const RequestTranscript = () => {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const hideUserModal = () => {
    setVisible(false);
  };

  const styles = {
    button: {
      margin: "15px 0",
      display: "block",
      marginLeft: "auto"
    }
  }

  return (
    <>
      <Button type="primary" onClick={showModal} style={styles.button}>Request Transcript</Button>
      <RequestForm visible={visible} setVisible={setVisible} onCancel={hideUserModal} />
    </>
  );
};

export default RequestTranscript