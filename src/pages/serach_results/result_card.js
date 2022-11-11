import {Box, Link, Text} from '@chakra-ui/react'

function Title({title}) {
    return (
        <div>
            <text>
                <Link href={'/'}
                      textDecoration={'none'}
                      color={'#161616'}
                      fontSize={'30'}
                >
                    {title}
                </Link>
            </text>
        </div>
    )

}

function Author({authors}) {
    return(
        <stack direction='row'> {
                authors.map((value, key) => {
                    return (
                        <Link key={key} href={'/'}
                              textDecoration={'none'}
                              color={'#83a7cf'}
                              m={5}
                        >
                            {value}
                        </Link>
                    );
                })
            }
        </stack>
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

function ResultCard() {
    let title = 'test title'
    let authors = ['maple','AboveParadise','frog']
    let time = '2022'
    let organ = 'BUAA'
    return(
        <Box
            height={'200'}
            borderWidth={'5'}
            borderRadius={'12'}
            borderStyle={'solid'}
            marginLeft={'30%'}
            color={'#E2E8F0'}
            boxShadow={'0 2px 10px rgb(0 0 0 / 10%)'}
        >
            <Title title={title}/>
            <Author authors={authors}/>
            <TimeOrgan time={time} organ={organ}/>
        </Box>
    )
}


export default ResultCard;
