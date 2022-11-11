/**
 * @author AboveParadise 2022/11/11
 */
import {Box, Link, Text} from '@chakra-ui/react'

function Title({title}) {
    return (


                <Text textDecoration={'none'}
                      color={'#161616'}
                      fontSize={'25'}
                      m={8}
                >
                    {title}
                </Text>


    )

}



function TimeOrgan({time},{organ}) {
    return(
        <stack direction='row'>
            <Text>
                {time}
            </Text>

            <Link href={'/'}
                  textDecoration={'none'}
                  fontSize={'12'}
            >
                {organ}
            </Link>
        </stack>
    )
}

function Abstract() {
    const property = {
        abs:'摘要',
        keywords: [],
        abstract: "MG 是面向团队的专业 UI/UX 设计工具。多人同时编辑、随时在线评审、设计一键交付，让想法更快实现",

    }

    return(
        <Box
            height={'200'}
            width={'60%'}
            borderWidth={'5'}
            borderRadius={'12'}
            borderStyle={'solid'}
            marginLeft={'3%'}
            color={'#E2E8F0'}
            boxShadow={'0 2px 10px rgb(0 0 0 / 10%)'}
        >
            <Text textDecoration={'none'}
                  color={'#161616'}
                  fontSize={'25'}
                  m={8}
            >
                {property.abs}
            </Text>

            <Text ml={8}>{property.abstract}</Text>
        </Box>
    )
}


export default Abstract;