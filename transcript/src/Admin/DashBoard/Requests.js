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
          render: (text, record) => {
            // let pending = false
            // let processing = false
            // let printed = false

            // if (record.status == "processing"){
            //   pending = true
            // }else if(record.status == "printed"){
            //   pending = true
            //   processing = true
            // }else if(record.status == "shipped"){
            //   pending = true
            //   processing = true
            //   printed = true
            // }

            return(
            <>
            <Select defaultValue={record.status} onSelect={(value)=>handleSelect(record.name, record.key, value)}>
                <Select.Option value="pending" >Pending</Select.Option>
                <Select.Option value="processing" >Processing</Select.Option>
                <Select.Option value="printed">Printed</Select.Option>
                <Select.Option value="shipped">Shipped</Select.Option>
            </Select>
            </>
            )
        },
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
        
        // setTimeout(
        //   ()=> {
        //     axios.get(url+"/admin/transcripts")
        //   .then(res => {
        //     setResults(res.data)
        //   })
        //   .catch(err => {
        //     message.error(err.message)
        //   })
        //   }
        //   ,3000)
        
      }

      const [results, setResults] = useState()
       let data = []

      useEffect(
        ()=> {
          axios.get(url+"/admin/transcripts")
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