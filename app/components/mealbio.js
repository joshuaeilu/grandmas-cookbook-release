export default function MealBio(props) {
    return (
            <div className="flex ml-3">
                <img src={props.svg} alt="region" className="w-6 h-6"/>
            <span className="ml-2 text-gray-800">{props.bio}</span>
            </div>
    )

}