/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import styles from '../styles/formulaire.module.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Formulaire = ({ abortForm }) => {
  const [nomForm, setNomForm] = useState('');
  const [voieForm, setVoieForm] = useState('');
  const [codePostalForm, setCodePostalForm] = useState('');
  const [latForm, setLatForm] = useState('');
  const [longForm, setLongForm] = useState('');
  const [infoForm, setInfoForm] = useState('');

  const notify = () => {
    if (
      nomForm === '' ||
      voieForm === '' ||
      codePostalForm === '' ||
      latForm === '' ||
      longForm === ''
    ) {
      toast.error(
        'Tu dois renseigner tous les champs avant de soumettre un point',
        {
          position: 'top-right',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    } else {
      toast("🌳 Merci d'avoir renseigné un nouveau point !", {
        position: 'top-right',
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const nameToCategorie = {
    'Recup Verre': 'Verre',
    Decheterie: 'Decheterie',
    'Collecte vetements': 'Vetements',
    Compost: 'Compost',
  };

  const codePostalToArrondissement = {
    69001: 'Lyon 1e arrondissement',
    69002: 'Lyon 2e arrondissement',
    69003: 'Lyon 3e arrondissement',
    69004: 'Lyon 4e arrondissement',
    69005: 'Lyon 5e arrondissement',
    69006: 'Lyon 6e arrondissement',
    69007: 'Lyon 7e arrondissement',
    69008: 'Lyon 8e arrondissement',
    69009: 'Lyon 9e arrondissement',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const source = axios.CancelToken.source();

    axios
      .post(`${process.env.REACT_APP_API_URL_POINT}`, {
        nom: nomForm,
        categorie: nameToCategorie[nomForm],
        voie: voieForm,
        code_postal: codePostalForm,
        commune: codePostalToArrondissement[codePostalForm],
        lat: latForm,
        lon: longForm,
        info: infoForm || '-',
      })
      .then(() => setTimeout(abortForm, 1700))
      .catch((err) => {
        console.error(err.response.data);
      });
   

    return () => {
      source.cancel('Component got unmounted');
    };
  };

  return (
    <div className={styles.popup_inn}>
      <div className={styles.popup}>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <img src='https://cdn-icons-png.flaticon.com/512/1828/1828843.png' className={styles.abort} onClick={abortForm} />
          <h1 className={styles.h1Form}>ajout d&apos;une borne</h1>

          <select
            id="namePoint"
            value={nomForm}
            onChange={(e) => setNomForm(e.target.value)}
            className={styles.selectOption}
            required
          >
            <option value="" disabled>
              nom du point
            </option>
            <option value={'Recup Verre'}>Recup Verre</option>
            <option value={'Decheterie'}>Décheterie</option>
            <option value={'Collecte vetements'}>Collecte vêtements</option>
            <option value={'Compost'}>Compost</option>
          </select>

          <input
            type="text"
            name="rue"
            id="ruePoint"
            placeholder="adresse du point"
            autoComplete="off"
            className={styles.inputOption}
            value={voieForm}
            onChange={(e) => setVoieForm(e.target.value)}
            required
          />

          <input
            type="text"
            name="lat"
            id="codePoint"
            placeholder="code postal du point"
            autoComplete="off"
            className={styles.inputOption}
            value={codePostalForm}
            onChange={(e) => setCodePostalForm(e.target.value)}
            required
          />

          <input
            type="text"
            name="lat"
            id="latPoint"
            placeholder="latitude du point"
            autoComplete="off"
            className={styles.inputOption}
            value={latForm}
            onChange={(e) => setLatForm(e.target.value)}
            required
          />

          <input
            type="text"
            name="lat"
            id="longPoint"
            placeholder="longitude du point"
            autoComplete="off"
            className={styles.inputOption}
            value={longForm}
            onChange={(e) => setLongForm(e.target.value)}
            required
          />

          <textarea
            name="lat"
            id="infoPoint"
            placeholder="info sur le point"
            autoComplete="off"
            className={styles.inputOption}
            value={infoForm}
            onChange={(e) => setInfoForm(e.target.value)}
          />

          <button type="submit" className={styles.button} onClick={notify}>
            ENVOYER
          </button>
          <ToastContainer />
        </form>
      </div>
    </div>
  );
};
