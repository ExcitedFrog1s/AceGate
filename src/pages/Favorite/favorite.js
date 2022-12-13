
import {Box} from '@chakra-ui/react'

import {Row,Col} from 'antd'
import * as React from "react";
import axios from "axios";

import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;


function Favorite(){
    const [names, setNames] = React.useState([]);
    const [papers, setPapers] = React.useState([]);
    const [ids, setIds] = React.useState([]);
    const [items, setItems] = React.useState([])
    React.useEffect(() => {
        var config = {
            method: 'post',
            url: '/user/viewCollectPaper',
            headers: { 
                token: localStorage.getItem("userToken")
            }
        };
        axios(config)
            .then(res => {
            console.log(res.data.data);
            res.data.data.forEach((item, index)=>{
               names.push(item.name)
               ids.push(item.id)
               papers.push(item.list)
               items.push({label:item.name, key:item.id})
            });
            setNames(names)
            setIds(ids);
            setPapers(papers)
            setItems(items)
            console.log(names)
            
        })
        .catch(function (error) {
            console.log(error);
        });
        
    },[])

    return (
        <Box>
         
            <div>{names[0]}</div>

            {/* {items.map((item, index) => (
                <div key={index}> {item.key} </div>
            ))} */}

        </Box>

    )
}




export default Favorite;
