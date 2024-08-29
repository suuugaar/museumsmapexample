import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import {
  fetchCardInfo,
  addNewCard,
  updateCardValidity,
} from '../../redux/thunkActionsCard';
import './paymentForm.style.css';
import styles from './PaymentForm.module.css';

const PaymentForm = () => {
  const { t, i18n } = useTranslation();
  const stripe = useStripe();
  const elements = useElements();
  const { handleSubmit } = useForm();
  const [message, setMessage] = useState<string>('');
  const [cardComplete, setCardComplete] = useState<boolean>(false);
  const [processing, setProcessing] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector((store) => store.userSlice.user);
  const cardInfo = useAppSelector((store) => store.cardSlice.cardInfo);

  useEffect(() => {
    if (user.id) {
      dispatch(fetchCardInfo(user.id));
    }
  }, [user.id, dispatch, i18n.language]);

  const onSubmit = async () => {
    if (!stripe || !elements || !cardComplete) {
      setMessage(t('enterAllData'));
      return;
    }

    setProcessing(true);
    try {
      if (cardInfo) {
        await dispatch(updateCardValidity({ userId: user.id, cardInfo }));
      } else {
        await dispatch(addNewCard(user.id));
      }
      setMessage(t('paymentSuccess'));
      elements.getElement(CardElement)?.clear();
    } catch (error) {
      console.error(t('error'), error);
      setMessage(t('paymentError'));
    } finally {
      setProcessing(false);
    }
  };

  const handleCardChange = (event) => {
    setCardComplete(event.complete);
  };

  return (
    <div className={styles.wrapper}>
      {cardInfo ? (
        <>
          <div className={styles.cardInfoWrapper}>
            <p>
              {t('cardNumber')} {cardInfo.id}
            </p>
            <p>
              {t('validity')} {new Date(cardInfo.validity).toLocaleDateString()}
            </p>
            <h2 className={styles.renewCard}>{t('renewCard')}</h2>
          </div>
        </>
      ) : (
        <>
          <div className={styles.noCardWrapper}>
            <h2 className={styles.noCard}>{t('noCard')}</h2>
            <h2>{t('buyCard')}</h2>
          </div>
        </>
      )}
      <div className="card-container">
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <label>
            <p>
              {t('oneYearCard')}
              <br />
              {t('totalSum')}
            </p>
          </label>
          <label>
            <CardElement
              className="card-element"
              options={{ hidePostalCode: true }}
              onChange={handleCardChange}
            />
          </label>
          <button
            className={styles.button}
            type="submit"
            disabled={!stripe || processing}
          >
            {t('buy')}
          </button>
        </form>
      </div>
      <div className={styles.successPay}>{message && <p>{message}!</p>}</div>
    </div>
  );
};

export default PaymentForm;
