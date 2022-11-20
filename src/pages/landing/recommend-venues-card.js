import {Box, Text} from "@chakra-ui/react";

function queryRecommendVenues(subject){
    let ret = []
    if (subject === "Artificial Intelligence"){
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
        <div>
            <Text fontSize='18px'>{entry.name}</Text>
            <Text fontSize='14px'>{entry.impactFactor}</Text>
        </div>
    )

    return (
        <Box
            backgroundColor='white'
            borderRadius='3px'
            boxShadow='md'

            minH='25vh'
            minW='15vw'
            padding='10px'
        >

            {layout_result}
        </Box>
    )
}

export default RecommendVenuesCard;
