import { useEffect } from "react"
import "./homepage.css"
import { Layout } from 'antd';
const { Header, Footer, Content } = Layout;
function Homepage(){
    useEffect(()=>{
        let bg = document.querySelector('#bg')
        let moon = document.querySelector('#moon')
        let mountain = document.querySelector('#mountain')
        let road = document.querySelector('#road')
        let text = document.querySelector('#text')
        window.addEventListener('scroll', () => {
            var value = window.scrollY;
            bg.style.top = value * 0.5 + 'px';
            moon.style.left = -value * 0.5 + 'px';
            mountain.style.top = -value * 0.15 + 'px';
            road.style.top = value * 0.15 + 'px';
            text.style.top = value * 1 + 'px';
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
                <h2 id="text">
                    Moon Light
                </h2>
            </section> 

        </div>
    )
}

export default Homepage