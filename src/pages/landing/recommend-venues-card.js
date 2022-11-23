import {Box, Link, Text, VStack} from "@chakra-ui/react";

function queryRecommendVenues(subject){
    let ret = []
    if (subject === "ComputerVision"){
        ret = [
            {
                key: 1,
                abbrName: 'CVPR',
                fullName: 'IEEE/CVF Conference on Computer Vision and Pattern Recognition',
                impactFactor: '10.0',
                hIndex: 389
            },
            {
                key: 2,
                abbrName: 'ICCV',
                fullName: 'IEEE/CVF International Conference on Computer Vision',
                impactFactor: '10.0',
                hIndex: 239
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
            if(entry.fullName.length >= 32){
                fullName = entry.fullName.substring(0, 32)
                fullName = fullName + "..."
            }
            return (
                <Box
                    key={entry.key}

                    height={'19%'}
                >
                    <Text fontSize='15px'>{entry.abbrName}｜H5-Index {entry.hIndex}</Text>
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
            width='18vw'
            maxW='260px'
            padding='15px 15px 20px 15px'
        >
            <Box
                height={'15%'}
            >
                <Text fontSize='20px'>{displaySubjectName} 推荐期刊</Text>
            </Box>

            <Box
                height={'85%'}
            >
                {layout_result}
                <Link color='#0087FF' href='#'>探索更多 {displaySubjectName} 期刊...</Link>
            </Box>

        </Box>
    )
}

export default RecommendVenuesCard;
