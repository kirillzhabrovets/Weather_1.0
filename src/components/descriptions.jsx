import React from 'react'
import './descriptions.css'

import { FaArrowUp, FaArrowDown, FaWind} from "react-icons/fa";
import { BiHappy } from "react-icons/bi";
import { MdCompress, MdOutlineWaterDrop } from "react-icons/md";

const Descriptions = ( {weather, units}) => {

    const tempUnit = units === 'metric' ? '°C' : '°F'
    const windUnit = units === 'metric' ? 'm/s' : 'm/h'

    const cards = [
        {
            id:1,
            icon: <FaArrowDown />,
            title: "Минимальная температура",
            data: weather.temp_min.toFixed(),
            unit: tempUnit,
        },
        {
            id:2,
            icon: <FaArrowUp />,
            title: "Максимальная температура",
            data: weather.temp_max.toFixed(),
            unit: tempUnit,
        },
        {
            id:3,
            icon: <BiHappy />,
            title: "Ощущущается как",
            data: weather.feels_like.toFixed(),
            unit: tempUnit,
        },
        {
            id:4,
            icon: <MdCompress />,
            title: "Давление",
            data: weather.pressure,
            unit: "мм Рт.Ст.",
        },
        {
            id:5,
            icon: <MdOutlineWaterDrop />,
            title: "Влажность",
            data: weather.humidity,
            unit: "%",
        },
        {
            id:1,
            icon: <FaWind />,
            title: "Скорость ветра",
            data: weather.speed.toFixed(),
            unit: windUnit,
        },
    ];
  return (
    <div className="section section_descriptions">
        {cards.map(({id, icon, title, data, unit}) => (
            <div key={id} className="card">
            <div className="description__card-icon">
                {icon}
                <small>{title}</small>
            </div>
            <h2>{`${data} ${unit}`}</h2>
        </div>
        ))}
    </div>
  );
};


export default Descriptions;