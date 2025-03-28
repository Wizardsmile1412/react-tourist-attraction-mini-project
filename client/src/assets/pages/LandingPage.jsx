import { useState, useEffect } from "react";
import axios from "axios";
import TravelCard from "@/components/ui/TravelCard";

const LandingPage = () => {
  const [placeInfo, setPlaceInfo] = useState([]);
  const [inputText, setInputText] = useState("");

  async function getPlaceInfo(){
    try{
        const response = await axios.get(`http://localhost:4001/trips?keywords=${inputText}`);
        setPlaceInfo(response.data.data)
    } catch(error){
        console.error(`Fetching data is error: ${error}`)
    }
  }

  useEffect(()=>{
    getPlaceInfo();
  },[inputText])

  function handleInputText(e){
    setInputText(e.target.value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">เที่ยวไหนดี</h1>
      
      <div className="max-w-xl mx-auto mb-12">
        <input 
          type="text" 
          placeholder="ค้นหาสถานที่ท่องเที่ยว" 
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={inputText}
          onChange={handleInputText}
        />
      </div>

      <div className="space-y-8">
        {placeInfo.map((place) => (
          <TravelCard 
            key={place.eid}
            title={place.title}
            description={place.description}
            mainImage={place.photos[0]}
            thumbnails={place.photos.slice(1,4)}
          />
        ))}
      </div>
    </div>
  );
};

export default LandingPage;