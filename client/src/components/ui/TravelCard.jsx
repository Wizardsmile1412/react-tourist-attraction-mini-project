import { Card } from "../../components/ui/card";
import { truncateDescription } from "../../utils/stringUtils";
import "../../assets/styles/Typography.css"

const TravelCard = ({ title, description, mainImage, thumbnails, url }) => {
  return (
    <Card className="flex overflow-hidden flex-col items-center gap-7 md:flex-row">
      <div className="max-h-85 h-70 md:w-1/3">
        <img
          src={mainImage}
          alt={title}
          className="w-full h-full object-cover rounded-4xl"
        />
      </div>
      <div className="p-3 md:w-2/3 ">
        <h2 className="font-semibold text-gray-800 mb-4">{title}</h2>
        <p className="text-gray-600 mb-2">{truncateDescription(description)}</p>
        <a
          href={url}
          target="_blank" rel="noopener noreferrer"
          className="inline-block underline mb-4 text-blue-500 hover:text-blue-700"
        >
          อ่านต่อ
        </a>
        <div className="flex space-x-8">
          {thumbnails.map((thumb, index) => (
            <img
              key={index}
              src={thumb}
              alt={`Thumbnail ${index + 1}`}
              className="w-20 h-20 object-cover rounded-3xl md:w-30 md:h-30 lg:w-40 lg:h-40"
            />
          ))}
        </div>
      </div>
    </Card>
  );
};

export default TravelCard;
