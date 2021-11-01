import { Table, Select, Space, message } from 'antd';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../AuthContext';

const Requests = (props) => {
    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          render: text => <a>{text}</a>,
        },
        {
          title: 'Index Number',
          dataIndex: 'indexNumber',
          key: 'indexNumber',
        },
        {
          title: 'Contact',
          dataIndex: 'contact',
          key: 'contact',
        },
        {
          title: 'Copies',
          dataIndex: 'copies',
          key: 'copies',
        },
        {
          title: 'Status',
          key: 'status',
          dataIndex: 'status',
          render: (text, record) => (
            <>
            <Select defaultValue={record.status} onSelect={(value)=>handleSelect(record.name, record.key, value)}>
                <Select.Option value="pending">Pending</Select.Option>
                <Select.Option value="processing" disabled={false}>Processing</Select.Option>
                <Select.Option value="printed">Printed</Select.Option>
                <Select.Option value="shipped">Shipped</Select.Option>
            </Select>
            </>
          ),
        },
        
      ];

      

      const FinanceColumn = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
          },
          {
            title: 'Index Number',
            dataIndex: 'indexNumber',
            key: 'indexNumber',
          },
          {
            title: 'Contact',
            dataIndex: 'contact',
            key: 'contact',
          },
          {
            title: 'Copies',
            dataIndex: 'copies',
            key: 'copies',
          },
      ]

      const {url} = useContext(AuthContext)

      const handleSelect = (name, key, value)=>{
        axios.post(url+"/admin/set-status", {"id": key, "status": value})
        .then(res => {
          message.success("status set successfully")
        })
        .catch(err => {
          message.error(err.message)
        })
      }

      const [results, setResults] = useState()
       let data = []

      useEffect(
        ()=> {
          axios.get("http://127.0.0.1:5000/admin/transcripts")
          .then(res => {
            setResults(res.data)
            console.log(results)
          })
          .catch(err => {
            message.error(err.message)
          })
        },[])
      
      
     

      if(props.type === "finance"){
          return (<Table columns={FinanceColumn} dataSource={results} />)
      }else{
        return ( 
            <Table columns={columns} dataSource={results} />
         );
      }
    
}
 
export default Requests;