import { Layout, Menu, Divider, message, notification } from 'antd';
import { HomeOutlined, LogoutOutlined, ContactsOutlined } from '@ant-design/icons';
import RequestTranscript from './RequestTranscript/RequestTranscript';
import TranscriptInfo from './TranscriptInfo';
import { Link, useHistory } from 'react-router-dom';

import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../AuthContext';

const { Content, Sider } = Layout;

const Dashboard = () => {
    const style = {
    }

    const [details, setDetails] = useState()
    const {url, token, setToken, setLogin} = useContext(AuthContext)
    const history = useHistory()

    const fetchTranscripts = ()=> {
        console.log(token)
        axios.post(url+"/transcripts", {"token": token})
        .then(res => {
            console.log(res.data)
            setDetails(res.data)
        })
        .catch(err => {
            message.error(err.message)
        })
    }

    const recordChange = (transcriptsID)=> {
        axios.post(url+"/record-change", transcriptsID)
        .then(res => {
            console.log(res.data)
        })
        .catch(err => {
            message.error(err.message)
        })
    }

    const checkUpdate = () => {
        axios.post(url+"/status-change", {"token": token})
        .then(res => {
            const data = res.data
            const transcriptsID = []
            data.map((d) => {
                transcriptsID.push(d.id)
            })
            console.log(transcriptsID)
            notification.info({
                key: 1,
                message: "Transcript Change...",
                description:  "Transcript status has changed",
                duration: 30,
                placement:"bottomRight"
            })
            recordChange(transcriptsID)
            checkUpdate()
            fetchTranscripts()
        })
        .catch(err => {
            message.error(err.message)
        })
    }


    useEffect(()=>{
        fetchTranscripts()
        setTimeout(
            ()=> {
            console.log("starting......")
            checkUpdate()

            }
        ,5000)
    },[])

    const logout = ()=>{
        setLogin(false)
        setToken(null)
        history.push('/')
    }

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
                        
                        
                        <Menu.Item key="2" icon={<LogoutOutlined />} onClick={logout}>
                            Logout
                        </Menu.Item>

                    </Menu>
                </Sider>
                <Content>
                    <div className="site-layout-background" style={{ padding: 30, marginTop: "50px",minHeight: "100vh", background: "rgba(245, 245, 245, 1)" }}> 
                        <RequestTranscript setDetails={setDetails}/>
                        {details && <TranscriptInfo details={details}/>}
                    </div>
                </Content>
            </Layout>
    );
}

export default Dashboard;