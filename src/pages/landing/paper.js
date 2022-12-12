import { useEffect } from "react"
import "./homepage.css"
import { Row, Col, List } from 'antd';
import { Box, Text, Heading, Link } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { ImFire } from "react-icons/im";

function separator(numb) {
    if(!numb) return ""
    var str = numb.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return str.join(".");
}

function Papers(props){
    const [data, setData] = useState([])
    const [cname, setCname] = useState([])
    const getData = ()=>{
        axios({
          method: "get",
          url: '/recommendPapers',
        })
        .then(res => {
            console.log(res.data)
            setData(res.data.data.paperResults)
            setCname(res.data.data.cName)
          }
        )
      }
    useEffect(() =>{
    getData()
    }, [])
    return (
        <Box boxShadow='xs' rounded='md'
            borderRadius='25px' border='2px' borderColor='gray.200'
            className='pbox'>
                <Row>
                    <ImFire className="chart-icon"></ImFire>
                    <Heading className="title">
                        {props.title + (cname != null ? (": " + cname): "")}
                    </Heading>
                </Row>
                <List
                    bordered={true}
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={(item) => (
                    <List.Item >
                        <div className="listitem">
                        <Row>
                       <Link href={"/paperDetails?PID=" + item.pID} isExternal>
                            <Text fontWeight={'bold'} fontSize="18px" className="pName">{item.pName}</Text>
                       </Link>
                       </Row>
                       <Row>
                       <Text as='em' fontSize="16px" fontWeight={'normal'}  className="PVname">{"from venue: " + (item.pVName == null? "unknown": item.pVName)}</Text>
                       </Row>
                       </div>
                    </List.Item>
                    )}
                />
        </Box>    
    )
}

export default Papers