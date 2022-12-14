/**
 * @author AboveParadise 2022/11/12
 */
import {
    Box,
    HStack,
    Text,
    Divider,
    Select,
    Link,
    UnorderedList,
    ListItem,
    StatGroup,
    Stat,
    StatLabel, StatNumber, StatHelpText, StatArrow
} from "@chakra-ui/react";
import React, {Component} from 'react';
import ReactECharts from 'echarts-for-react';
import Chart from 'react-apexcharts'
import axios from "axios";
import PubSub from 'pubsub-js'

function separator(numb) {
    var str = numb.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return str.join(".");
}
// import * as React from "react";
function Data(prop) {

    const s = {
        color:'#000000',
        marginLeft:25
    }
    const [Pdata,setPdata] = React.useState()
    const [Fields,setFields] = React.useState()
    const [isLoading, setLoading] = React.useState(true)
    const handleClick = (value) => {
        window.open('/advancedSearch?label=' + value)
    }
    PubSub.subscribe('comment',data =>{
        const formData = new FormData()
        formData.append('PID', prop.pid)
        // console.log(formData)
        axios.post("/paper/Details", formData)
            .then(function (res){
                setPdata(res.data.data)
                console.log('pppp',Pdata)

            })
        console.log("传来的数据：",data);
    })
    PubSub.subscribe('collect',data =>{
        const formData = new FormData()
        formData.append('PID', prop.pid)
        // console.log(formData)
        axios.post("/paper/Details", formData)
            .then(function (res){
                setPdata(res.data.data)
                console.log('pppp',Pdata)
                
            })
        console.log("传来的数据：",data);
    })
    React.useEffect( () => {
        let mark = 0
        const formData = new FormData()
        formData.append('PID', prop.pid)
        // console.log(formData)
        axios.post("/paper/Details", formData)
            .then(function (res){
                setPdata(res.data.data)
                console.log('pppp',Pdata)
                setLoading(false)
            })
    },[])
    if(isLoading){
        return <></>
    }
    else{
        const options= {
            chart: {
              type: 'area',
              zoom: {
                enabled: false
              }
            },
            dataLabels: {
              enabled: false
            },
            colors:['#728fea'],
            stroke: {
              curve: 'smooth'
            },
            xaxis: {
                categories: [2018,2019,2020,2021,2022]
            },
        }
        const option = {
            xAxis: {
                type: 'category',
                data: Pdata.citeyears,
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: Pdata.citeNums,
                type: 'line'
            }],
            lineStyle: {
                color: '#6f60f7',
                lineWidth: 4,
            },
        };
        return(
            <Box
                width={'100%'} borderWidth={'5'} borderRadius={'20'} borderStyle={'solid'}
                boxShadow={'4px 4px 15px 0 rgba(0,0,0,0.1)'}
                backgroundColor={'#ffffff'}
                padding="20px">

                <StatGroup mt={8} mb={5} textAlign={'center'}>
                    <Stat>
                        <StatLabel fontWeight='bold' fontSize="18px" color="#4A5568">引用量</StatLabel>
                        <StatNumber color={'frog.500'}>{separator(Pdata.citeNum)}</StatNumber>
                        {/*<StatHelpText>*/}
                        {/*    <StatArrow type='increase' />*/}
                        {/*    23.36%*/}
                        {/*</StatHelpText>*/}
                    </Stat>

                    <Stat>
                        <StatLabel fontWeight='bold' fontSize="18px" color="#4A5568">被引用量</StatLabel>
                        <StatNumber  color={'frog.500'}>{separator(Pdata.beCitedNum)}</StatNumber>
                        {/*<StatHelpText>*/}
                        {/*    <StatArrow type='decrease' />*/}
                        {/*    9.05%*/}
                        {/*</StatHelpText>*/}
                    </Stat>
                    <Stat>
                        <StatLabel fontWeight='bold' fontSize="18px" color="#4A5568">收藏量</StatLabel>
                        <StatNumber color={"frog.500"}>{separator(Pdata.collectNum)}</StatNumber>
                        {/*<StatHelpText>*/}
                        {/*    <StatArrow type='increase' />*/}
                        {/*    23.36%*/}
                        {/*</StatHelpText>*/}
                    </Stat>

                    <Stat>
                        <StatLabel fontWeight='bold' fontSize="18px" color="#4A5568">评论量</StatLabel>
                        <StatNumber color={"frog.500"}>{separator(Pdata.commentNum)}</StatNumber>
                        {/*<StatHelpText>*/}
                        {/*    <StatArrow type='decrease' />*/}
                        {/*    9.05%*/}
                        {/*</StatHelpText>*/}
                    </Stat>
                </StatGroup>
                <Divider/>
                <Box ml={8} mt={5} mb={5}>
                    <Text as={'b'} fontSize={20} fontWeight='550' color="#4A5568">
                        领域
                    </Text>
                    <UnorderedList mt={5} color={'frog.500'}>
                        {prop.fields.map((value, key) => {
                            if(key <= 7){
                                if(value[0] === 'C' && isNaN(Number(value[1],10)) === false && isNaN(Number(value[2],10)) === false){

                                }
                                else{
                                    return(<ListItem key={key} mb={2}><Link onClick={()=>handleClick(value)} fontWeight="bold" as='em'> {value}
                                    </Link></ListItem>)
                                }
                            }

                        })}
                    </UnorderedList>
                </Box>

                <Divider/>
                <Box sx={{ minWidth: 120, width:'100%'}}>
                    <HStack mt={30}>
                        <Text  textDecoration={'none'}
                               fontSize={'20'} fontWeight='550' color="#4A5568"
                               ml={8}
                               mr={20}
                               whiteSpace={'normal'}
                               align={'center'} as={'b'}>
                            热度分析
                        </Text>
                        {/*<Select placeholder='Keywords' width={60} color={'#000000'} cursor={'pointer'}>{*/}
                        {/*    */}
                        {/*        return (*/}
                        {/*            <option key={key} value={value} cursor={'pointer'}*/}
                        {/*                    onClick={(e) => select(e)}>{value}</option>*/}
                        {/*        );*/}
                        {/*    }*/}

                        {/*</Select>*/}



                    </HStack>
                </Box>
                <div>
                    {Pdata.citeyears.length !== 0 && 
                            <Chart options={options} 
                            series={[{data:Pdata.citeNums, name:'热度'}]} 
                            type="area" height={250} />}
                    {Pdata.citeyears.length === 0 && <Text ml={10} mt={10} mb={20} className={'ft'}>暂无数据</Text>}
                </div>



            </Box>
        )
    }
}


export default Data;