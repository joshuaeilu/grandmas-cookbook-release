import styles from '../page.module.css';
export default function MealCard(props) {
return (
    

    <div  className={styles.mealcard}>
    <img src={props.imgSrc} alt="Meal" className={styles.mealimage} height="200px" width="200px" />
    <h3 className={styles.mealtitle}>{props.title}</h3>
</div>

)
}