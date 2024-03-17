import { useState, useEffect } from "react";


function Grid() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchPlanetImages();
  }, []);

  const fetchPlanetImages = async () => {
    try {
      const response = await fetch(
        "https://images-api.nasa.gov/search?q=planet&media_type=image"
      );
      const data = await response.json();
      const items = data.collection.items;
      const planetImages = items.map((item) => {
        return item.links[0].href;
      });
      // Select 50 random images
      const randomImages = getRandomImages(planetImages, 50);
      setImages(randomImages);
    } catch (error) {
      console.error("Error fetching planet images:", error);
    }
  };

  const getRandomImages = (array, numImages) => {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numImages);
  };

  return (
    <div>
      <h2>Random Planet Images</h2>
      <div className="cards">
        {images.map((image, index) => (
          <img key={index} src={image} alt={`Planet ${index + 1}`} />
        ))}
      </div>
    </div>
  );
}

export default Grid;