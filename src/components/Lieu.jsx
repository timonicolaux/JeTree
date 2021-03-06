/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import style from "../styles/lieu.module.css";
import iconStyle from '../styles/selection.module.css'
import { FaTrash, FaTshirt } from 'react-icons/fa';
import { RiPlantFill } from 'react-icons/ri';
import { GiBrokenBottle } from 'react-icons/gi';

export const Lieu = ({ categorie, voie, code_postal, commune, markersRef, id, nom}) => {
  let image = null;
  if (categorie === 'Verre') {
    image = <section className={iconStyle.verreContainer}>
              <button className={iconStyle.verreBackground}>
                <GiBrokenBottle
                  className={iconStyle.button}
                />
              </button>
            </section>
  }
  if (categorie === 'Compost') {
    image = <section className={iconStyle.decheterieContainer}>
              <button className={iconStyle.decheterieBackground}>
                <RiPlantFill
                  className={iconStyle.button}
                />
              </button>
            </section>
  }
  if (categorie === 'Vetements') {
    image = <section className={iconStyle.vetementContainer}>
              <button className={iconStyle.vetementBackground}>
                <FaTshirt
                  className={iconStyle.button}
                />
              </button>
            </section>
  }
  if (categorie === 'Decheterie') {
    image = <section className={iconStyle.compostContainer}>
              <button className={iconStyle.compostBackground}>
                <FaTrash
                  className={iconStyle.button}
                />
              </button>
            </section>
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // for smoothly scrolling
    });
  };

  return (
    <>
    <div className={style.lieu} key={voie} onClick={() => markersRef.current[id].fire('click') && scrollToTop()}>
      <div className={style.lieuImage}>{image}</div>
      <div className={style.lieuDescription}>
        <h1 className={style.titre}>{nom}</h1>
        <p className={style.lieuText}>{voie}</p>
        <p className={style.lieuText}>{code_postal}</p>
        <p className={style.lieuText}>{commune}</p>
      </div>
    </div>
    </>
  );
};
