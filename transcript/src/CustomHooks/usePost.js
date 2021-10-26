import { useEffect } from 'react';
import axios from 'axios';
import { message } from 'antd';

const UsePost = (url, data) => {
    axios.post(url, data)
        .then(res => {
            return res
        })

        .catch(err => {
            message.error(err.message)
        })
}
 
export default UsePost;