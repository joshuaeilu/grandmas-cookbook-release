import styles from '../page.module.css';
import Image from 'next/image';
export default function MealCard(props) {
return (
    <div  className={styles.mealcard}>
    <Image src={props.imgSrc} alt="Meal" className={styles.mealimage} height={100} width={100} />
    <h3 className={styles.mealtitle}>{props.title}</h3>
</div>

)
}