//to find the position of the star in the sky from observer's viewpoint you need to:
//0. convert rightAscension & declination to altitude & azimuth- may need to use libs like eeusjs or astronomia.js
//1. calculate hour angle(HA) of the star = LST(local sidereal time, calculated from observer lon & time) - RA
//2. convert HA/Dec to Altitude & Azimuth
// const astro = require('astronomia')
const { radToDeg, degToRad } = require('./angleMath')

function calcAltAz(star,viewpoint){
    const { rightAscension, declination } = star
    const { latitude, longitude, time } = viewpoint
    
    const hourAngle = calcHa(rightAscension, time, longitude)
    
    const haRad = conv.degToRad(hourAngle)
    const decRad = conv.degToRad(declination)
    const latRad = conv.degToRad(latitude)

    const altitude = calcAlt(hourAngle, declination, latitude)
    const azimuth = calcAz(hourAngle,declination, latitude, altitude) 
    
}

function calcAlt(haRad, decRad, latRad){
    const sinAlt = Math.sin(decRad) * Math.sin(latRad) + Math.cos(decRad) * Math.cos(latRad) * Math.cos(haRad)

    return radToDeg(Math.asin(sinAlt))
}

function calcAz(haRad, decRad, latRad, altitude){
    const sinAz = (-Math.cos(decRad) * Math.sin(haRad)) / Math.cos(degToRad(altitude))
    const cosAz = (Math.sin(decRad) - Math.sin(degToRad(altitude)) * Math.sin(latRad)) / (Math.cos(degToRad(altitude)) * Math.cos(latRad))

    let azimuth = radToDeg(Math.atan2(sinAz,cosAz))

    if(azimuth < 0) azimuth += 360

    return azimuth
}

function Star(name,rightAscension,declination,distance){
    this.name = name
    this.rightAscension = rightAscension
    this.declination = declination
    this.distance = distance
}

function EarthViewPoint(latitude, longitude, elevation){
    this.latitude = latitude
    this.longitude = longitude
    this.elevation = elevation
    this.time = new Date()
}

const Venus = new Star(
    'Venus',
    359.9,
     180.0,
     175 * Math.pow(10,3)
)

const observer = new EarthViewPoint(999,222,1111)
