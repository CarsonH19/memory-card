// import { useEffect } from "react";

// function Grid({ cards, onClick }) {
//   let imagesArray = [];

//   useEffect(() => {
//     fetchImages();
//   }, []);

//   const fetchImages = async () => {
//     try {
//       const response = await fetch(
//         "https://images-api.nasa.gov/search?q=nebula&media_type=image"
//       );
//       const data = await response.json();
//       const items = data.collection.items;
//       const images = items.map((item) => {
//         return item.links[0].href;
//       });
//       imagesArray = getRandomImages(images, 50);
//     } catch (error) {
//       console.error("Error fetching images:", error);
//     }
//   };

//   const getRandomImages = (array, numImages) => {
//     const shuffled = array.sort(() => 0.5 - Math.random());
//     return shuffled.slice(0, numImages);
//   };

//   const gridGridImages = () => {
//     let gridImages = [];
//     do {
//       gridImages = getRandomImages(imagesArray, 8);
//       console.log(gridImages);
//     } while (gridImages.every(image => cards.includes(image)));
    
//     return gridImages;
//   };
  

//   return (
//     <div className="grid">
//       {gridGridImages().map((image, index) => (
//         <img
//           className="card"
//           onClick={onClick}
//           key={index}
//           src={image}
//           alt={`Image ${index + 1}`}
//         />
//       ))}
//     </div>
//   );
// }

// export default Grid;

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';

function Grid({ cards, onClick }) {
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
      const imagesFromApi = items.map((item) => {
        return item.links[0].href;
      });
      setImages(imagesFromApi);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const getRandomImages = (array, numImages) => {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numImages);
  };

  const renderImages = () => {
    const selectedImages = getRandomImages(images, 8);
    return selectedImages.map((image) => (
      <img
        className="card"
        onClick={onClick}
        key={uuidv4()}
        src={image}
      />
    ));
  };

  return (
    <div className="grid">
      {renderImages()}
    </div>
  );
}

export default Grid;
