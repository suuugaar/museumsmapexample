import { OrderType } from '../../redux/cardSlice';
import styles from './Order.module.css';
export default function Order({ order }: OrderType): JSX.Element {
  return (
    <div className={styles.wrapper}>
      <div>Идентификатор пользователя: {order.userId}</div>
      <div>Имя пользователя: {order.userName}</div>
      <div>Адрес: {order.address}</div>
    </div>
  );
}
