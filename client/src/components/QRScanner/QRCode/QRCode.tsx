import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import emailjs from 'emailjs-com';
import { Button } from '@chakra-ui/react';
import styles from './QRCode.module.css';

const QrCodeGenerator = () => {
  const [text, setText] = useState('');
  const [qrValue, setQrValue] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleGenerateClick = () => {
    setQrValue(text);
    setText('');
  };

  const handleSendEmailClick = () => {
    if (!qrValue || !email) {
      setMessage('Please generate a QR code and enter an email address.');
      return;
    }

    const canvas = document.querySelector('canvas');
    const qrCodeDataUrl = canvas.toDataURL('image/png');

    const emailParams = {
      to_email: email,
      qr_code: qrCodeDataUrl,
    };

    emailjs
      .send(
        'service_06b9fyb',
        'template_lw66k39',
        emailParams,
        'pcSU7CXUZlx1r5HnZ',
      )
      .then((response) => {
        setMessage('QR код отправлен в музей');
        setEmail('');
      })
      .catch((error) => {
        console.error('Failed to send QR code:', error);
        setMessage('Failed to send QR code.');
      });
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Создать QR код для музея</h2>
      <input
        className={styles.museumId}
        type="text"
        placeholder="Введите текст"
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ padding: '10px', fontSize: '16px', width: '300px' }}
      />

      <Button
        variant="solid"
        colorScheme="blue"
        cursor="pointer"
        onClick={handleGenerateClick}
      >
        Сгенерировать
      </Button>

      {qrValue && (
        <div style={{ marginTop: '20px' }}>
          <QRCode value={qrValue} />
        </div>
      )}

      <div className={styles.sendToEmail} style={{ marginTop: '20px' }}>
        <input
          type="email"
          placeholder="Введите email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: '10px', fontSize: '16px', width: '300px' }}
        />

        <Button
          width="100px"
          variant="solid"
          colorScheme="blue"
          cursor="pointer"
          onClick={handleSendEmailClick}
        >
          Отправить
        </Button>
      </div>

      {message && (
        <p
          className={styles.messageSuccess}
          style={{
            marginTop: '20px',
            color: 'rgba(255, 255, 255, 0.802)',
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default QrCodeGenerator;
