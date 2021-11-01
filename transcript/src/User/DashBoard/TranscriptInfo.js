import { Card, Descriptions, Tag } from "antd";
import {
    SyncOutlined,

  } from '@ant-design/icons';

const CardTitle = ({ status }) => {
    const styles = {
        display: "flex",
        justifyContent: "space-between"
    }
    return ( 
        <div style={styles}>
            <div className="title">
                Transcript detail
            </div>
            <div className="status">
                Status: <Tag icon={<SyncOutlined spin />} color="processing">{status}</Tag>
            </div>
        </div>
     );
}

const TranscriptInfo = ({ details }) => {
    const styles ={
        minWidth: "300px",
        maxWidth: "600px",
        margin: "0 auto",
        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px", 
        background: "rgba(253, 253, 253, 1)",
        marginBottom: "20px"
    }
    return (
        <>
        {details.map((detail) => (
            <Card title={<CardTitle  status={detail.status}/>} bordered={false} style={styles}>
            <Descriptions column={1} >
                <Descriptions.Item label={<b>First Name</b>}>{detail.first_name}</Descriptions.Item>
                <Descriptions.Item label={<b>Middle Name</b>}>{detail.middle_name}</Descriptions.Item>
                <Descriptions.Item label={<b>Last Name</b>}>{detail.last_name}</Descriptions.Item>
                <Descriptions.Item label={<b>Index Number</b>}>{detail.index_number}</Descriptions.Item>
                <Descriptions.Item label={<b>Telephone</b>}>0557270470</Descriptions.Item>
                <Descriptions.Item label={<b>Address</b>}>
                    {detail.address}
                </Descriptions.Item>
                <Descriptions.Item label={<b>Copies</b>}>{detail.copies}</Descriptions.Item>
            </Descriptions>
        </Card>
        ))}
        </>
    );
}

export default TranscriptInfo;