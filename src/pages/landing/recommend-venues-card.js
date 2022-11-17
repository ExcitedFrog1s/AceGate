import {Box, Text} from "@chakra-ui/react";

function queryRecommendVenues(subject){
    let ret = []
    if (subject.equals("Artificial Intelligence")){
        ret = [
            {
                name: 'ICCV',
                impactFactor: '10.0'
            },
            {
                name: 'ECCV',
                impactFactor: '6.0'
            }
        ]
    }

    return ret
}



function RecommendVenuesCard({subject}){

    const result = queryRecommendVenues(subject)

    const layout_result = result.map(entry =>
        <Box>
            <Text fontSize='18px'>{entry.name}</Text>
            <Text fontSize='14px'>{entry.impactFactor}</Text>
        </Box>
    )

    return (
        <div>
            {layout_result}
        </div>
    )
}

export default RecommendVenuesCard;
