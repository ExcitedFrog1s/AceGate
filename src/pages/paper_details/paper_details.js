/**
* @author AboveParadise 2022/11/11
*/
import Abstract from "./paper_abstract";
import Data from "./paper_data";
import Op from "./paper_op"
import Reference from "./paper_reference";
import moment from "moment";
import {Box, HStack, Link, Tag, TagLabel, TagLeftIcon, Text} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";

function PaperDetails() {
    const property = {
        title: "独白与对话:马克思主义中国化的方法论思考",
        author: ["Maple826"],
        keywords: [],
        abstract: "MG 是面向团队的专业 UI/UX 设计工具。多人同时编辑、随时在线评审、设计一键交付，让想法更快实现",
        isstarred:true,
    }
    return(
        <Box>
            <Info/>
            <Abstract/>
            <Data/>
            <Op isstarred={property.isstarred}/>
            <Reference/>
        </Box>
    )
}
function Authors(){
    const property = {
        authors: ["Maple826","AboveParadise","euphoria"],
    }
    return (
        property.authors.map((value, key) => {
            return (
                <Link key={key} href={'/'} fontSize={15}
                      textDecoration={'none'}
                      color={'#0b1075'}
                      mr={7}
                >
                    {value}
                </Link>
            );
        })

   )
}

function Info(){
    const property = {
        title: "独白与对话:马克思主义中国化的方法",
        source: "云南社会科学",
        date: moment("20070112").format('YYYY-MM-DD'),
        tags:['jdg', '马克思', 'lggggg'],
    }
    const addTag = () => {


    }
    return(
        <Box ml={'3%'} mb={5}>
            <Box>
            <Text fontSize={30} fontFamily={'宋体'}>
                {property.title}
            </Text>
            </Box>
            <HStack>
                <Text mt={3} mb={3} mr={5} fontSize={17}  fontFamily={"Times New Roman"}>
                    {property.date}
                </Text>
                <Text fontFamily={'宋体'} fontSize={17}>
                    {property.source}
                </Text>
            </HStack>

            <Authors/>

        </Box>
    )
}


export default PaperDetails;