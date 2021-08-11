import React, { useEffect, useState, useRef } from "react"
import { Row, Col, Slider, message, Tag, Button, notification } from "antd"
import {

    BankTwoTone,
    HeartFilled,
    CarTwoTone
} from '@ant-design/icons';
import GoogleMapReact from "google-map-react"
import { getDrivers } from "../Controller/Drivers";
import { findNearest, getDistance, computeDestinationPoint } from 'geolib'




export default function Maps() {
    const thisMap = useRef(null)
    const offices = [{
        name: "Singapore Office",
        lat: 1.285194, lng: 103.8522982
    },
    { name: "London Office", lat: 51.5049375, lng: -0.0964509 }
    ]
    const [myloc, setmyLoc] = useState({ lat: 0, lng: 0 })
    const [curLoc, setcurLoc] = useState(null)

    const [zoom, configmyZoom] = useState(13)
    const [limit, setLimit] = useState(null)

    const [loc, setLoc] = useState(null)
    const [drivers, setDrivers] = useState([])
    const [showdrivers, setshowDrivers] = useState([])
    const Pin = () => {
        configmyZoom(20)
        setcurLoc(loc)

    }
    useEffect(() => {
        initLoc()
    }, [])
    useEffect(() => {

        if (limit >= 0 && drivers.length > 0) {
            let allDrivers = drivers
            setshowDrivers([...allDrivers.slice(0, limit)])
        }
    }, [limit])
    useEffect(() => {
        if (loc) {
            initDriver()
        }

    }, [loc])

    function initLoc() {
        configmyZoom(13)
        message.loading("initiating location", () => {
            navigator.permissions.query({ name: 'geolocation' }).then((perm) => {
                if (perm.state !== "granted") {
                    notification.warning({
                        key: "locdisabled",
                        message: "Location not enabled",
                        description:
                            <div>
                                <p>
                                    This page could not work well without location access.
                                </p>
                                <br />
                                <b>
                                    We are using your location info to:
                                </b>
                                <ul>
                                    <li>
                                        Determine the closest office to you
                                    </li>
                                </ul>
                                <ul>
                                    <li>
                                        Find you Taxis around you
                                    </li>
                                </ul>
                                <b>
                                    Please allow location access for this browser
                                </b>
                            </div>,
                        placement: "bottomRight",
                        duration: 0
                    })

                }
                else {
                    navigator.geolocation.getCurrentPosition(function (position, err) {
                        if (position) {
                            setmyLoc({ lat: position.coords.latitude, lng: position.coords.longitude })
                            configmyZoom(13)
                            message.loading("finding closest office from you", () => {
                                const nearest = findNearest({ latitude: position.coords.latitude, longitude: position.coords.longitude }, offices.map(office => { return { latitude: office.lat, longitude: office.lng } }))
                                setLoc({ lat: nearest.latitude, lng: nearest.longitude })
                                setcurLoc({ lat: nearest.latitude, lng: nearest.longitude })
                                configmyZoom(5)
                                message.success("done")
                            })
                        }
                    });

                }
            })

        })
    }
    const initDriver = async (n) => {
        let result = await getDrivers(n)
        await result.forEach(driver => {
            const br = driver.location.bearing
            const finalPoint = computeDestinationPoint(
                { latitude: loc.lat, longitude: loc.lng },
                br,
                br)
            // console.log(finalPoint)
            driver.location = { lat: finalPoint.latitude, lng: finalPoint.longitude }
            driver.distance = getDistance({ latitude: loc.lat, longitude: loc.lng }, { latitude: driver.location.lat, longitude: driver.location.lng })
        });
        // console.log(result)

        result.sort((a, b) => {
            return a.distance
                >
                b.distance ?
                1 : -1

        })
        setDrivers([...result])
        setLimit(result.length)
    }




    return (
        <React.Fragment>
            <Row justify="center">
                <div
                    style={{ height: "85vh", width: "85vw" }}
                >
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: "AIzaSyD1HslB_ebiLf9MNyZUFTomNMK9eqmTZVk" }}
                        ref={thisMap}
                        yesIWantToUseGoogleMapApiInternals
                        zoom={zoom ? zoom : 13}
                        center={curLoc ? curLoc : { lat: 51.5049375, lng: -0.0964509 }}
                    >
                        {
                            offices.map(office =>
                                <Tag
                                    onClick={() => {
                                        configmyZoom()
                                        setcurLoc({ lat: office.lat, lng: office.lng })
                                    }}
                                    icon={<BankTwoTone />}
                                    lat={office.lat}
                                    lng={office.lng}
                                >{`${office.name} ${(loc && office.lat === loc.lat && office.lng === loc.lng) ? " - CLOSEST OFFICE" : ""}`}</Tag>
                            )
                        }
                        {
                            showdrivers &&
                            showdrivers.map((driver, i) =>
                                <Tag icon={<CarTwoTone
                                />}
                                    onClick={() => {
                                        configmyZoom(10)
                                        setLoc()
                                    }}
                                    lat={driver.location.lat}
                                    lng={driver.location.lng}
                                > {`Taxi[${i}]--[${driver.distance} m away]`} </Tag>



                            )
                        }

                        <Tag color="red" icon={<HeartFilled />}
                            lat={myloc.lat}
                            lng={myloc.lng}
                        >{"I'm here"}</Tag>

                    </GoogleMapReact>
                </div>

            </Row>
            <Row justify="center">
                <Col span={10}>

                    {
                        drivers && drivers.length > 0 ?
                            <React.Fragment>
                                <span>Showing {limit}/{drivers.length} taxis nearest to you</span>
                                <Slider
                                    tooltipVisible
                                    onChange={(n) => { setLimit(n) }}
                                    value={limit} max={drivers.length} />
                            </React.Fragment>
                            : null
                    }
                </Col>
                <Col span={3}>
                    {
                        loc ?
                            <Button onClick={Pin}>
                                Go to office
                            </Button>
                            : null
                    }
                </Col>
            </Row>
        </React.Fragment >)

}