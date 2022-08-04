import React, { useState, useEffect  } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../config';
import { Link } from 'react-router-dom';
import { getAllVehicles } from '../redux/actions/index';
import { BiRightArrowAlt, BiLeftArrowAlt } from 'react-icons/bi'
import s from './Styles/Slider.module.css';
import ReactPlayer from 'react-player';

function Slider() {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getAllVehicles());
    }, [])
    const vehicles = useSelector((state:any) => state && state.vehicles).sort((a:any,b:any) => b.price - a.price).slice(0, 4);;
    const [current, setCurrent] = useState(0);
    const length = vehicles.length

    const nextSlide = () => {
        setCurrent(current === length - 1 ? 0 : current + 1)
    }
    const prevSlide = () => {
        setCurrent(current === 0 ? length - 1 : current -1)
    }

    if(!Array.isArray(vehicles) || vehicles.length <= 0){
        return null;
    }

  return (
    <div className = {s.container}>
    <BiLeftArrowAlt className = {s.leftArrow} onClick={prevSlide}/>
    {
      vehicles && vehicles.map((v, i) => {
        if(i === current){
          const styledBut = {
            backgroundImage: `url("${v?.photo[0]}")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: v?.photo[0]? 'cover' : 'contain',
            outlineOffset: v?.photo[0]? '-8px' : '0px',
            width: "50%",
            height: "100%",
            transition: '.2s',
          }
          return (
            <div className = {i === current ? s.main2ContainActive : s.main2Contain}>
                <div className = {s.main2Text}>
                  <h1>{v.title.toUpperCase()}</h1>
                  <p>{v.description}</p>
                  <br/>
                  <br/>
                  {
                    vehicles?.length &&
                    <Link to = {`/vehicles/${v.id}`}>
                      <button>CONOCE MÁS</button>
                    </Link>
                  }
                </div>
                <div style={styledBut} className={s.img}>
                  
                </div>
                {/* <img src={v.photo[0]} className = {s.img}></img> */}
            </div>
          )
        }
      })
    }
    <BiRightArrowAlt className = {s.rightArrow} onClick={nextSlide}/>
    </div>
  )
}

export default Slider