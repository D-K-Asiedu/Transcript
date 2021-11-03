import axios from "axios"
import { message } from "antd"

const PostData = (url, data)=> {

    axios.post(url, data)
    .then(res => {
        console.log(res.status)
        if (res.status == 200){
            
            return res
        }
        else{
            throw Error("Could not post data to source")
        }
    })
    .catch(err => {
        message.error(err.message)
    })

}

export default PostData