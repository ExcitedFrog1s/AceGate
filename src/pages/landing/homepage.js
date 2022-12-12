import { useEffect } from "react"
import "./homepage.css"
import { Row, Col } from 'antd';
import { Box, Text } from "@chakra-ui/react";
import Conferences from "./conferences";
function Homepage(){
    useEffect(()=>{
        let bg = document.querySelector('#bg')
        let moon = document.querySelector('#moon')
        let mountain = document.querySelector('#mountain')
        let road = document.querySelector('#road')
        let middle = document.querySelector('#middle')
        window.addEventListener('scroll', () => {
            var value = window.scrollY;
            bg.style.top = value * 0.5 + 'px';
            moon.style.left = -value * 0.5 + 'px';
            mountain.style.top = -value * 0.15 + 'px';
            road.style.top = value * 0.15 + 'px';
            middle.style.top = value * 1 + 'px';
        })
    }, [])
    return(
        <div className="homepage">
            <section>
                <img
                    src={require("../../assets/bg.jpg")}
                    id="bg"
                />
                <img
                    src={require("../../assets/moon.png")}
                    id="moon"
                />
                <img
                    src={require("../../assets/mountain.png")}
                    id="mountain"
                />
                <img
                    src={require("../../assets/road.png")}
                    id="road"
                />
                <div id="middle">
                    <Text className="text1" fontWeight={'extrabold'}>
                        AceGate
                    </Text>
                    <Text className="text2" fontWeight={'extrabold'}>
                        Your Gate Towards Academia.
                    </Text>
                </div>
            </section> 
            <div className="recomand">
                <Conferences></Conferences>  
                
            </div>
        </div>
    )
}

export default Homepage