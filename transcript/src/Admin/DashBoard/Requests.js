import { Table, Select, Space } from 'antd';

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
          render: tags => (
            <>
            <Select defaultValue={"pending"}>
                <Select.Option value="pending">Pending</Select.Option>
                <Select.Option value="processing">Processing</Select.Option>
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
      
      const data = [
        {
          key: '1',
          name: 'John Brown',
          indexNumber: 3580918,
          contact: '0557270470',
          copies: 1
        },
        {
          key: '2',
          name: 'John Brown',
          indexNumber: 3580918,
          contact: '0557270470',
          copies: 5
        },
        {
          key: '3',
          name: 'John Brown',
          indexNumber: 3580918,
          contact: '0557270470',
          copies: 4
        },
        {
          key: '4',
          name: 'John Brown',
          indexNumber: 3580918,
          contact: '0557270470',
          copies: 2
        },
        
      ];

      if(props.type === "finance"){
          return (<Table columns={FinanceColumn} dataSource={data} />)
      }else{
        return ( 
            <Table columns={columns} dataSource={data} />
         );
      }
    
}
 
export default Requests;