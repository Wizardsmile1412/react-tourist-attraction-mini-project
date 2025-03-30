import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import _ from "lodash";
import TravelCard from "@/components/ui/TravelCard";
import "../../assets/styles/Typography.css"

const LandingPage = () => {
  const [placeInfo, setPlaceInfo] = useState([]);
  const [inputText, setInputText] = useState("");

  // Create a debounced function using Lodash
  const debouncedFetch = useMemo(
    () =>
      _.debounce(async (searchTerm) => {
        try {
          const response = await axios.get(
            `http://localhost:4001/trips?keywords=${searchTerm}`
          );
          setPlaceInfo(response.data.data);
        } catch (error) {
          console.error(`Fetching data error: ${error}`);
        }
      }, 500),
    [] // Empty dependency array ensures the debounced function is created only once
  );

  // Effect to trigger debounced fetch when input changes
  useEffect(() => {
    debouncedFetch(inputText);

    // Cleanup function to cancel any pending debounced calls
    return () => {
      debouncedFetch.cancel();
    };
  }, [inputText, debouncedFetch]);

  function handleInputText(e) {
    setInputText(e.target.value);
  }

  // Function to handle tag clicks
  const handleTagClick = (tag) => {
    // Check if tag is already in inputText
    const currentTags = inputText.split(" ").filter(t => t.trim());
    if (!currentTags.includes(tag)) {
      // Add tag to existing input
      const newInputText = inputText.trim() ? `${inputText} ${tag}` : tag;
      setInputText(newInputText);
    }
  };

  return (
    <div className="container px-5 py-8 md:mx-10 ">
      <h1 className="font-bold text-center text-gray-800 mb-8">
        เที่ยวไหนดี
      </h1>

      <div className="max-w-4xl mx-auto mb-12">
        <label htmlFor="search" className="px-2">
          ค้นหาที่เที่ยว
        </label>
        <input
          id="search"
          type="text"
          placeholder="หาที่เที่ยวแล้วไปกัน ..."
          className="w-full px-4 py-3 mt-2 text-center border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-500"
          value={inputText}
          onChange={handleInputText}
        />
      </div>

      <div className="space-y-10">
        {placeInfo.map((place) => (
          <TravelCard
            key={place.eid}
            title={place.title}
            description={place.description}
            mainImage={place.photos[0]}
            thumbnails={place.photos.slice(1, 4)}
            url={place.url}
            tags={place.tags}
            onTagClick={handleTagClick}
          />
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
