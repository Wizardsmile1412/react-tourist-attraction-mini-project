import { Card } from "../../components/ui/card"
import {truncateDescription} from "../../utils/stringUtils"

const TravelCard = ({ title, description, mainImage, thumbnails }) => {

  return (
    <Card className="flex overflow-hidden">
      <div className="w-1/2">
        <img 
          src={mainImage} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-1/2 p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">{title}</h2>
        <p className="text-gray-600 mb-4">{truncateDescription(description)}</p>
        <div className="flex space-x-2">
          {thumbnails.map((thumb, index) => (
            <img 
              key={index}
              src={thumb} 
              alt={`Thumbnail ${index + 1}`} 
              className="w-16 h-16 object-cover rounded"
            />
          ))}
        </div>
      </div>
    </Card>
  );
};

export default TravelCard;