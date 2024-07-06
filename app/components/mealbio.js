export default function MealBio(props) {
    return (
            <div style={{margin:'10px'}} className="flex">
                <img src={props.svg} alt="region" className="w-6 h-6"/>
            <span style={{fontSize:'18px'}} className="ml-2 text-gray-800">{props.bio}</span>
            </div>
    )

}