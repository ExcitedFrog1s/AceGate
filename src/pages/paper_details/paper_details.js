/**
* @author AboveParadise 2022/11/11
*/
import Abstract from "./paper_abstract";
import moment from "moment";
import {Box, Link, Text} from "@chakra-ui/react";

function PaperDetails() {
    const property = {
        title: "独白与对话:马克思主义中国化的方法论思考",
        author: ["Maple826"],
        keywords: [],
        abstract: "MG 是面向团队的专业 UI/UX 设计工具。多人同时编辑、随时在线评审、设计一键交付，让想法更快实现",

    }
    return(
        <Box>
            <Info/>
            <Abstract/>
        </Box>
    )
}
function Authors(){
    const property = {
        authors: ["Maple826","AboveParadise","euphoria"],
    }
    return (<stack direction='row'> {
        property.authors.map((value, key) => {
            return (
                <Link key={key} href={'/'}
                      textDecoration={'none'}
                      color={'#83a7cf'}
                      mr={10}
                >
                    {value}
                </Link>
            );
        })
    }
    </stack>)



}

function Info(){
    const property = {
        title: "独白与对话:马克思主义中国化的方法论思考",
        source: "云南社会科学",
        date: moment("20070112").format('YYYY-MM-DD'),
        keywords: [],
        abstract: "MG 是面向团队的专业 UI/UX 设计工具。多人同时编辑、随时在线评审、设计一键交付，让想法更快实现",

    }
    return(
        <Box ml={'3%'} mb={20}>
            <Text height={40} fontSize={30} mb={10}>
                {property.title}
            </Text>
            <Text  ml={2} mt={10} mb={10}>
                {property.date}&nbsp;&nbsp;&nbsp;{property.source}
            </Text>
            <Authors/>

        </Box>
    )
}


export default PaperDetails;