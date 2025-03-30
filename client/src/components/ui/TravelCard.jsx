import { useState } from "react";
import { Card } from "../../components/ui/card";
import CopyIcon from "../../assets/icon/Copy.png";
import "../../assets/styles/Typography.css";

const TravelCard = ({ title, description, mainImage, thumbnails, url, tags, onTagClick }) => {
  // State for copy tooltip visibility
  const [showTooltip, setShowTooltip] = useState(false);

  const truncateDescription = (description, maxLength = 100) => {
    return (description.length > maxLength ? description.slice(0, maxLength) + ' ...' : description)
  };

  // Function to render tags with only "and" before the last tag
  const renderTags = (tags) => {
    if (!tags || tags.length === 0) return null;
    if (tags.length === 1) {
      return (
        <span 
          key={tags[0]} 
          onClick={() => onTagClick && onTagClick(tags[0])}
          className="cursor-pointer hover:text-blue-500"
        >
          {tags[0]}
        </span>
      );
    }
    
    return tags.map((tag, index) => {
      if (index === tags.length - 1) {
        // Last tag, add "and" before it
        return (
          <span key={tag}>
            {" and "}
            <span 
              onClick={() => onTagClick && onTagClick(tag)}
              className="cursor-pointer hover:text-blue-500"
            >
              {tag}
            </span>
          </span>
        );
      } else {
        // All other tags 
        return (
          <span key={tag}>
            {index > 0 ? " " : ""}
            <span 
              onClick={() => onTagClick && onTagClick(tag)}
              className="cursor-pointer hover:text-blue-500"
            >
              {tag}
            </span>
          </span>
        );
      }
    });
  };


  
  // This could be any text you want to copy - for example, the URL
  const textToCopy = url;
  
  // Function to handle copy
  const handleCopy = () => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      // Show tooltip after copy
      setShowTooltip(true);
      
      // Hide tooltip after 2 seconds
      setTimeout(() => {
        setShowTooltip(false);
      }, 2000);
    }).catch(err => {
      console.error('Could not copy text: ', err);
    });
  };

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
        <h2 className="font-semibold text-gray-800 mb-4">
        <a 
            href={url}
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:text-blue-600 cursor-pointer"
          >
            {title}
          </a>
        </h2>
        <p className="text-gray-600 mb-2">{truncateDescription(description)}</p>
        <a
          href={url}
          target="_blank" rel="noopener noreferrer"
          className="inline-block underline mb-4 text-blue-500 hover:text-blue-700"
        >
          อ่านต่อ
        </a>
        <div className="tag-group mb-4">
          <p className="inline-block mr-2">หมวด</p>
          {renderTags(tags)}
        </div>
        <div className="flex justify-between items-center pr-25">
        <div className="flex space-x-8">
          {thumbnails.map((thumb, index) => (
            <img
              key={index}
              src={thumb}
              alt={`Thumbnail ${index + 1}`}
              className="w-20 h-20 object-cover rounded-3xl md:w-30 md:h-30"
            />
          ))}
        </div>
        <div className="relative">
        <img 
          src={CopyIcon} 
          alt="copy clipboard icon" 
          className="w-12 h-12 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity" 
          onClick={handleCopy}
        />
        {/* Tooltip */}
        {showTooltip && (
              <div className="absolute -top-8 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                Copied!
              </div>
            )}
          </div>
      </div>
    </div>
    </Card>
  );
};

export default TravelCard;
