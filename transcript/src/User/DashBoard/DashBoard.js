import { Layout, Menu, Divider, message } from 'antd';
import { HomeOutlined, LogoutOutlined, ContactsOutlined } from '@ant-design/icons';
import RequestTranscript from './RequestTranscript/RequestTranscript';
import TranscriptInfo from './TranscriptInfo';
import { Link } from 'react-router-dom';

import axios from 'axios';
import { useEffect, useState } from 'react';

const { Content, Sider } = Layout;

const Dashboard = () => {
    const style = {
    }

    const [details, setDetails] = useState()

    useEffect(()=>{
        axios.get("http://localhost:3001/transcripts")
        .then(res => {
            console.log(res.data)
            setDetails(res.data)
            
        })
        .catch(err => {
            message.error(err.message)
        })
    },[])

    return (
            <Layout>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={broken => {
                        console.log(broken);
                    }}
                    onCollapse={(collapsed, type) => {
                        console.log(collapsed, type);
                    }}
                    style={{background: "rgba(231, 233, 235, 1)"}}
                >
                    <Menu mode="inline" style={{background: "rgba(231, 233, 235, 1)", marginTop: "80px"}} defaultSelectedKeys={"1"}>
                        <Menu.Item key="1" icon={<HomeOutlined />}>
                            Home
                        </Menu.Item>
                        <Menu.SubMenu title="Contact" icon={<ContactsOutlined />}>
                            <Menu.Item disabled={true} style={{background: "rgba(231, 233, 235, 1)", margin: 0}}>0552795442</Menu.Item>
                        </Menu.SubMenu>
                        
                        
                        <Menu.Item key="2" icon={<LogoutOutlined />}>
                        <Link to="/">
                            Logout
                            </Link>
                        </Menu.Item>

                    </Menu>
                </Sider>
                <Content>
                    <div className="site-layout-background" style={{ padding: 30, marginTop: "50px",minHeight: "100vh", background: "rgba(245, 245, 245, 1)" }}> 
                        <RequestTranscript />
                        {details && <TranscriptInfo details={details}/>}
                    </div>
                </Content>
            </Layout>
    );
}

export default Dashboard;