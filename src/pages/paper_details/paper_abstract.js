/**
 * @author AboveParadise 2022/11/11
 */
import {Box, HStack, Link, LinkOverlay, Text} from '@chakra-ui/react'
import "./test.css"
import Op from "./paper_op";
function Keywords(prop){
    const property = {
        kw:["马克思","中国化","方法论",,"中国化","方法论",,"中国化","方法论",,"中国化","方法论方法论","中国化","方法论",],
        kw1:['sadfsd afsa','serypw eppp','eoooooop'],
        keywords: ["马克思","中国化","方法论"],
    }
    // count记录关键词总长度，防止超出width
    let count = 0
    return (
        <Box>
        <HStack className="kw" mr={8} mt={5}>
            <Text textDecoration={'none'}
                  color={'#161616'}
                  as={'b'}
                  ml={8} mt={5} mb={5}
                  fontFamily={'宋体'}
                  fontSize={18}>关键词：</Text>
            {prop.kw.map((value,key) => {

                if(count < 30){
                    count += value.length
                    return (
                        <Link mt={5} key={key} style={{ textDecoration:'none'}}>
                        <Text textDecoration={'none'}
                              color={'#161616'}
                              mr={5}
                              // fontFamily={'Times New Roman'}
                              fontSize={18}>{value}</Text>
                        </Link>
                    )
                }
                if(key === prop.kw.length - 1 && count >= 33){
                    return (

                            <Text textDecoration={'none'}
                                  color={'#161616'}
                                  key={key}
                                  mt={5}
                                  fontFamily={'Times New Roman'}
                                  fontSize={18}>.....</Text>

                    )
                }

            })}
             </HStack>
        </Box>

    )

}
function Abstract(prop) {
    const property = {
        abs:'摘要',
        kw:'关键词：',
        keywords: ["马克思","中国化","方法论"],
        ab: "近年来，人工智能临床应用研究进展迅猛，有望为提升疾病防控水平，促进健康中国建设提供重要支撑。本文基于文献研究、专题研讨、专家访谈，从战略布局、研发实力、产品创新、临床应用等方面分析我国人工智能临床应用研究进展。研究发现：我国在该领域研发实力显著增强，学术产出与技术创新水平进入国际第一方阵。其中，申请、公开的专利数分别由2011年的137项、26项增长至2021年的2484项和2909项，均跃居全球首位。发表论文数由2011年的43篇逐年快速增长至2021年的4597篇，仅次于美国。我国医疗人工智能产品研究不断取得创新突破，相关产品的智能化程度不断提高，正在从研究阶段走向应用层面，支撑临床实践提质增效。我国在人工智能临床研究领域也存在一定的问题和短板，主要包括：1)重大原创成果较少，核心技术、关键设备受制于人；2)产品研发临床驱动不足，临床应用场景单一；3)医疗数据质量不高，数据标准与共享机制不健全；4)评价与监管体系不健全，伦理制度与法律法规待完善。对此，提出建议，包括：1)加强顶层设计，统筹国家科技计划系统布局；2)规范数据标准，培育医疗数据建设与共享新业态；3)完善法律法规，优化认证评估与安全监管体系；4)加强人才培育，打造医学人工智能复合型人才团队"

    }
    console.log(prop.kw)
    return(

        <Box
            width={'55%'}
            minH={280}
            borderWidth={'5'}
            borderRadius={'12'}
            borderStyle={'solid'}
            marginLeft={'3%'}
            color={'#E2E8F0'}
            boxShadow={'0 2px 10px rgb(0 0 0 / 10%)'}
            position={'absolute'}

        >
            <Text textDecoration={'none'}
                  color={'#161616'}
                  fontSize={25} fontFamily={'宋体'}
                  m={3}
                  mt={5}
                  ml={8}
                  fontWeight={'bold'}
            >
                摘要
            </Text>
            <Box minH={75} mt={3}>
            <Text ml={8} color={'#161616'} fontFamily={'宋体'}
                  fontSize={15} noOfLines={8}
            maxW={850} mr={8}>{property.ab}</Text>
            </Box>
            {/*<Keywords kw={prop.kw}/>*/}


        </Box>

    )
}


export default Abstract;