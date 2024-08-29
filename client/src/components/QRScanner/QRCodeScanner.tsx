import React, { useRef, useState, useEffect } from 'react';
import QrScanner from 'qr-scanner';
import axios from 'axios';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  fetchAddVisited,
  fetchVisited,
} from '../../redux/thunkActionsCurrentMuseum';
import { fetchCardInfo } from '../../redux/thunkActionsCard';
import './QrCodeScanner.style.css';
import { useTranslation } from 'react-i18next';
import styles from './QrCodeScanner.module.css';
export interface CardInfoType {
  id: number;
  validity: string;
}

const QrCodeScanner = () => {
  const { t } = useTranslation();

  const videoRef = useRef(null);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.userSlice.user);
  const visitedMuseums = useAppSelector((store) => store.visitedSlice.visited);

  useEffect(() => {
    dispatch(fetchVisited(user.id));
    dispatch(fetchCardInfo(user.id));
  }, [user, scanning]);

  const handleScanClick = () => {
    if (scanning) {
      stopScanning();
    } else {
      startScanning();
    }
  };

  const startScanning = () => {
    if (videoRef.current) {
      QrScanner.hasCamera().then((hasCamera) => {
        if (hasCamera) {
          setScanning(true);
          const qrScanner = new QrScanner(videoRef.current, async (result1) => {
            stopScanning();
            console.log('stop');
            handleScanResult(result1).then(() => {
              setResult('tr');
            });
          });
          qrScanner.start();
        } else {
          alert('No camera found.');
        }
      });
    }
  };

  const stopScanning = () => {
    setScanning(false);
    if (videoRef.current) {
      const stream = videoRef.current.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
    }
  };

  const handleScanResult = async (result) => {
    const museumId = parseInt(result);
    if (!isNaN(museumId) && user) {
      try {
        const visitedMuseum = visitedMuseums.find(
          (vis) => vis.museumId === museumId && vis.userId === user.id,
        );
        if (!visitedMuseum) {
          dispatch(fetchAddVisited({ userId: user.id, museumId }));
        }
        await axios.post('http://localhost:3000/api/scans', {
          userId: user.id,
          museumId: museumId,
        });
      } catch (error) {
        console.error('Error validating card:', error);
        setErrorMessage('Ошибка при проверке карты');
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className="container">
        <div className={styles.content}>
          <h2>QR Code Scanner</h2>
          <button className={styles.button} onClick={handleScanClick}>
            {scanning ? 'Stop Scanning' : 'Start Scanning'}
          </button>
          <video ref={videoRef} className="scanner-video" />
          {result && (
            <div className="result">
              <span className="checkmark">✅</span>
              <h3>{t('welcome')}</h3>
            </div>
          )}
          {errorMessage && (
            <div className="error">
              <p>{errorMessage}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QrCodeScanner;
