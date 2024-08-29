import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchOrders } from '../../redux/thunkActionsCard';
import Order from '../Order/Order';
import styles from './UserOrders.module.css';

export default function UserOrders() {
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((store) => store.cardSlice);

  useEffect(() => {
    dispatch(fetchOrders());
    console.log(orders);
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.secondWrapper}>
        <h3>Запросы на получение пластиковых музейных карт:</h3>
        <div className={styles.ordersWrapper}>
          {orders.length ? (
            orders.map((order) => <Order key={order.id} order={order} />)
          ) : (
            <h3>Нет новых заявок на получение пластиковой музейной карты</h3>
          )}
        </div>
      </div>
    </div>
  );
}
