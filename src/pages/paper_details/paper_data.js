/**
 * @author AboveParadise 2022/11/12
 */
import {Box, HStack, Text, Divider} from "@chakra-ui/react";

import {} from "@chakra-ui/react";
import {FormControl, InputLabel, MenuItem,Select} from "@mui/material";
import * as React from "react";
function Data() {
    const property = {
        para: [100,9888,1231,33333]
    }
    const s = {left:200}
    const r = {left:10, color:'#161616'}
    const [kw, setKw] = React.useState('');

    const handleChange = (event) => {
        setKw(event.target.value);
    };

    return(
        <Box
            height={'600'}
            width={'35%'}
            borderWidth={'5'}
            borderRadius={'12'}
            borderStyle={'solid'}
            marginLeft={'60%'}
            mr={20}
            color={'#E2E8F0'}
            position={'absolute'}
            boxShadow={'0 2px 10px rgb(0 0 0 / 10%)'}
        >

            <HStack>

                <Box width={125}>
                    <Text textDecoration={'none'}
                          color={'#c42525'}
                          fontSize={'25'}

                          whiteSpace={'normal'}
                          align={'center'}
                    >
                        引用量
                    </Text>
                    <Text color={'#161616'}
                          fontSize={'25'}
                          m={8}
                          mt={20}
                          whiteSpace={'normal'}
                          align={'center'}>3333</Text>
                </Box>
                <Box width={125} m={8}>
                    <Text textDecoration={'none'}
                          color={'#34ea04'}
                          fontSize={'25'}

                          whiteSpace={'normal'}
                          align={'center'}
                    >
                        被引用量
                    </Text>
                    <Text color={'#161616'}
                          fontSize={'25'}
                          m={8}
                          mt={20}
                          whiteSpace={'normal'}
                          align={'center'}>3333</Text>
                </Box>
                <Box width={125} m={8}>
                    <Text textDecoration={'none'}
                          color={'#175bb4'}
                          fontSize={'25'}

                          whiteSpace={'normal'}
                          align={'center'}
                    >
                        收藏量
                    </Text>
                    <Text color={'#161616'}
                          fontSize={'25'}
                          m={8}
                          mt={20}
                          whiteSpace={'normal'}
                          align={'center'}>3333</Text>
                </Box>
                <Box width={125} m={8}>
                    <Text textDecoration={'none'}
                          color={'#faf14b'}
                          fontSize={'25'}

                          whiteSpace={'normal'}
                          align={'center'}
                    >
                        评论量
                    </Text>
                    <Text color={'#161616'}
                          fontSize={'25'}
                          m={8}
                          mt={20}
                          whiteSpace={'normal'}
                          align={'center'}>3333</Text>

                </Box>
            </HStack>
            <hr style={r}/>
            <Box sx={{ minWidth: 120, width:'100%'}}>
                <HStack>
                <Text mt={30} textDecoration={'none'}
                      color={'#000000'}
                      fontSize={'20'}

                      whiteSpace={'normal'}
                      align={'center'}>
                    关键词分析
                </Text>
                    <div style={s}>


                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-label">关键词</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={kw}
                    label="kw"
                    onChange={handleChange}
                >
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
                    </div>
                </HStack>
            </Box>

        </Box>
    )
}


export default Data;