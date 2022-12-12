import { useEffect } from "react"
import "./homepage.css"
import { Row, Col, List } from 'antd';
import { Box, Text, Heading, Link } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

function Conferences(){
    const [data, setData] = useState([])
    const getData = ()=>{
        axios({
          method: "get",
          url:"/recommendJournals",
        })
        .then(res => {
            console.log(res.data)
            setData(res.data.data.paperResults)
          }
        )
      }
    useEffect(() =>{
    getData()
    }, [])
    return (
        <Box boxShadow='xs' rounded='md'
            borderRadius='25px' border='2px' borderColor='gray.200'
            className='box'>
                <Heading className="title">
                    热门期刊
                </Heading>
                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={(item) => (
                    <List.Item className="listitem">
                       <Link href={"/journal?VID=" + item.vID} isExternal>
                            <Text fontWeight={'bold'} fontSize="18px">{item.vName}</Text>
                       </Link>
                    </List.Item>
                    )}
                />
        </Box>    
    )
}

export default Conferences