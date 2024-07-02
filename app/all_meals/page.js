import Meals from '../components/meals';
import mealData from '../helpers/data';
export default function AllMeals() {
  
 
  return (
    <div>
      <Meals mData={mealData}  />
    </div>
  );
}