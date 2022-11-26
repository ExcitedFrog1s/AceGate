import {Box, Flex, Link, Spacer, Text, VStack} from "@chakra-ui/react";

function queryRecommendVenues(subject){
    let ret = []
    if (subject === "ComputerVision"){
        ret = [
            {
                key: 1,
                abbrName: 'CVPR',
                fullName: 'IEEE/CVF Conference on Computer Vision and Pattern Recognition',
                hIndex: 408
            },
            {
                key: 2,
                abbrName: 'ICCV',
                fullName: 'IEEE/CVF International Conference on Computer Vision',
                impactFactor: '10.0',
                hIndex: 280
            },
            {
                key: 3,
                abbrName: 'ECCV',
                fullName: 'European Conference on Computer Vision',
                impactFactor: '10.0',
                hIndex: 186
            },
            {
                key: 4,
                abbrName: 'TPAMI',
                fullName: 'IEEE Transactions on Pattern Analysis and Machine Intelligence',
                impactFactor: '10.0',
                hIndex: 165
            },
            {
                key: 5,
                abbrName: 'TIP',
                fullName: 'IEEE Transactions on Image Processing',
                impactFactor: '10.0',
                hIndex: 128
            }
        ]
    }

    return ret
}


function getDisplaySubjectName(subject){
    let dict = {
        ComputerVision: '计算机视觉'
    }

    return dict[subject]
}


function RecommendVenuesCard({subject}){

    const result = queryRecommendVenues(subject)

    const displaySubjectName = getDisplaySubjectName(subject)

    const layout_result = result.map(entry => {
            let fullName = entry.fullName
            if(entry.fullName.length >= 42){
                fullName = entry.fullName.substring(0, 42)
                fullName = fullName + "..."
            }
            return (
                <Box
                    key={entry.key}

                    height={'19%'}
                >
                    <Flex>
                        <Text fontSize='15px'>{entry.abbrName}</Text>
                        <Spacer />
                        <Text fontSize='15px'>{entry.hIndex} H-Index</Text>
                    </Flex>

                    <Text fontSize='11px' color='grey'>{fullName}</Text>
                </Box>
                )
        }
    )

    return (
        <Box
            backgroundColor='white'
            borderRadius='3px'
            boxShadow='md'

            height='350px'
            width='20vw'
            padding='15px 15px 20px 20px'
        >
            <Box
                height={'15%'}
            >
                <Text fontSize='20px'>{displaySubjectName} 热门出版物</Text>
            </Box>

            <Box
                height={'85%'}
            >
                {layout_result}
                <Link color='#0087FF' href='#'>探索更多 {displaySubjectName} 出版物...</Link>
            </Box>

        </Box>
    )
}

export default RecommendVenuesCard;
