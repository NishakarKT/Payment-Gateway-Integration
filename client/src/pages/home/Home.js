import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./Home.css";
// material-ui
import { Button } from "@mui/material";
// constants
import { BANK_SCENE_PNG, CLOUDS_PNG, BANK_CENTRE_PNG } from "../../constants/images";
import { TRANSACTIONS_PATH, CUSTOMERS_PATH, DONATE_PATH } from "../../constants/routes";
// components
import Footer from "../../components/footer/Footer";
// variables
const DEVICE_WIDTH = window.innerWidth;
const DEVICE_HEIGHT = window.innerHeight;
const MAX_CARS_LIMIT = 2;
let carsCountInterval;
let carsMotionInterval;
let carType = 0;

const Home = () => {
    const history = useHistory();
    const [cars, setCars] = useState([]);

    useEffect(() => {
        window.addEventListener("scroll", scrollHandler)
        window.scrollTo(0, 0);
        return () => {
            window.removeEventListener("scroll", scrollHandler)
        }
    }, []);

    useEffect(() => {
        clearInterval(carsMotionInterval);
        carsMotionInterval = setInterval(() => {
            setCars(cars => {
                let trueCars = [];
                trueCars = cars.map(car => {
                    if (car.dir === 1) {
                        if (car.pos.x >= -150)
                            car.pos.x -= car.speed;
                        else
                            return null;
                    }
                    else {
                        if (car.pos.x <= DEVICE_WIDTH)
                            car.pos.x += car.speed;
                        else
                            return null;
                    }
                    return car;
                });
                return trueCars.filter(trueCar => trueCar !== null);
            });
        }, 50);

        clearInterval(carsCountInterval);
        carsCountInterval = setInterval(() => {
            setCars(cars => {
                if (cars.length < MAX_CARS_LIMIT)
                    return [...cars, generateCar()];
                return cars;
            });
        }, 3000);
    }, []);

    const generateCar = () => {
        const type = (++carType % 3) + 1;
        const dir = Math.ceil(Math.random() * 2);
        const pos = { x: dir === 1 ? DEVICE_WIDTH : -150, y: dir === 1 ? 3 * DEVICE_HEIGHT - 65 : 3 * DEVICE_HEIGHT - 120 }
        const speed = Math.ceil(Math.random() * 2 + 3);
        const car = { type, dir, pos, speed };
        return car;
    };

    const scrollHandler = () => {
        if (window.scrollY < 2 * DEVICE_HEIGHT) {
            const clouds = Array.from(document.getElementsByClassName("home__cloud"));
            clouds.map(cloud => cloud.style.top = `${DEVICE_HEIGHT + window.scrollY / 2}px`);
        }
    };

    return (
        <div className="home">
            <div className="home__intro">
                <h1 style={{ animation: "home__introAppear 0.5s ease-out 1 forwards" }}>Welcome to Sparks Bank!</h1>
                <p style={{ animation: "home__introAppear 0.5s ease-out 0.25s 1 forwards" }}><b>Sparks Bank</b> is created by Nishakar Kumar as an Internship task for <b>The Sparks Foundation</b>.The website allows users to create a bank account, transact money online and many more. Hope you like it :)</p>
                <div className="home__introBtns">
                    <Button onClick={() => window.scrollTo(0, 3 * DEVICE_HEIGHT)} style={{ animation: "home__introAppear 0.5s ease-out 0.5s 1 forwards" }}>Get Started</Button>
                    <Button onClick={() => window.open(DONATE_PATH, "_blank")} style={{ animation: "home__introAppear 0.5s ease-out 0.75s 1 forwards" }}>Donate Now</Button>
                </div>
            </div>
            <img className="home__cloud" src={CLOUDS_PNG} alt="" style={{ left: "-250px", transform: "scaleX(-1)" }} />
            <img className="home__cloud" src={CLOUDS_PNG} alt="" />
            <img className="home__bankScene" src={BANK_SCENE_PNG} alt="" />
            {cars.map((car, index) => <img key={index} className="home__car" src={"/images/home/car" + car.type + ".png"} alt="" style={{ left: `${car.pos.x}px`, top: `${car.pos.y}px`, transform: `scaleX(${car.dir === 1 ? "-1" : "1"})` }} />)}
            <div className="home__shapeDivider1" style={{ top: "calc(200vh - 60px)" }}>
                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
                </svg>
            </div>
            <div className="home__content">
                <h1>How may we help you?</h1>
                <div className="home__buttons">
                    <Button onClick={() => history.push(TRANSACTIONS_PATH)}>Transaction</Button>
                    <Button onClick={() => window.open(DONATE_PATH, "blank")}>Donate</Button>
                    <Button onClick={() => history.push(CUSTOMERS_PATH)}>Customers</Button>
                </div>
                <h2>Choose an option and you will be redirected to your required destination.</h2>
                <h2>Thank you for using <b>Sparks Bank</b> :)</h2>
                <img className="home__bankCentre" src={BANK_CENTRE_PNG} alt="" />
                <div className="home__shapeDivider2">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="shape-fill"></path>
                    </svg>
                </div>
            </div>
            <div style={{ marginTop: "100vh" }}>
                <Footer />
            </div>
        </div>
    );
};

export default Home;
