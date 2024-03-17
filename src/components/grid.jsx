import { useState, useEffect } from "react";

function Grid({ onClick }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch(
        "https://images-api.nasa.gov/search?q=nebula&media_type=image"
      );
      const data = await response.json();
      const items = data.collection.items;
      const images = items.map((item) => {
        return item.links[0].href;
      });
      const randomImages = getRandomImages(images, 50);
      setImages(randomImages);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const getRandomImages = (array, numImages) => {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numImages);
  };

  return (
    <div className="grid">
      {images.slice(0, 8).map((image, index) => (
        <img
          className="card"
          onClick={onClick}
          key={index}
          src={image}
          alt={`Image ${index + 1}`}
        />
      ))}
    </div>
  );
}

export default Grid;

