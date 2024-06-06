import { useEffect } from 'react';
import './styles.css';

export default function Home() {

  useEffect(() => {
    const columns = document.querySelectorAll('.column');
    columns.forEach(column => {
      column.style.setProperty('--animation', 'slide');
      column.style.setProperty('height', '200%');
      column.innerHTML = column.innerHTML + column.innerHTML;
    });
  }, []);

  return (
    <>
      <div className='image-slider-wrapper'>
        <div className='home-header-container'>
          <h1 className='home-header'>Cardinal Goods</h1>
        </div>
        <div className='image-slider-container'>
          <div className="column">
            <a href="#"><img src="https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png" alt="image" /></a>
            <a href="#"><img src="https://cdn.dummyjson.com/products/images/fragrances/Dolce%20Shine%20Eau%20de/thumbnail.png" alt="image" /></a>
            <a href="#"><img src="https://cdn.dummyjson.com/products/images/groceries/Beef%20Steak/thumbnail.png" alt="image" /></a>
            <a href="#"><img src="https://cdn.dummyjson.com/products/images/groceries/Green%20Bell%20Pepper/thumbnail.png" alt="image" /></a>
          </div>
          <div className="column">
            <a href="#"><img src="https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/thumbnail.png" alt="image" /></a>
            <a href="#"><img src="https://cdn.dummyjson.com/products/images/fragrances/Gucci%20Bloom%20Eau%20de/thumbnail.png" alt="image" /></a>
            <a href="#"><img src="https://cdn.dummyjson.com/products/images/groceries/Cat%20Food/thumbnail.png" alt="image" /></a>
            <a href="#"><img src="https://cdn.dummyjson.com/products/images/groceries/Green%20Chili%20Pepper/thumbnail.png" alt="image" /></a>
          </div>
          <div className="column">
            <a href="#"><img src="https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/thumbnail.png" alt="image" /></a>
            <a href="#"><img src="https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Bed/thumbnail.png" alt="image" /></a>
            <a href="#"><img src="https://cdn.dummyjson.com/products/images/groceries/Chicken%20Meat/thumbnail.png" alt="image" /></a>
            <a href="#"><img src="https://cdn.dummyjson.com/products/images/groceries/Honey%20Jar/thumbnail.png" alt="image" /></a>
          </div>
          <div className="column">
            <a href="#"><img src="https://cdn.dummyjson.com/products/images/beauty/Red%20Lipstick/thumbnail.png" alt="image" /></a>
            <a href="#"><img src="https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Sofa/thumbnail.png" alt="image" /></a>
            <a href="#"><img src="https://cdn.dummyjson.com/products/images/groceries/Cooking%20Oil/thumbnail.png" alt="image" /></a>
            <a href="#"><img src="https://cdn.dummyjson.com/products/images/groceries/Ice%20Cream/thumbnail.png" alt="image" /></a>
          </div>
          <div className="column">
            <a href="#"><img src="https://cdn.dummyjson.com/products/images/beauty/Red%20Nail%20Polish/thumbnail.png" alt="image" /></a>
            <a href="#"><img src="https://cdn.dummyjson.com/products/images/furniture/Bedside%20Table%20African%20Cherry/thumbnail.png" alt="image" /></a>
            <a href="#"><img src="https://cdn.dummyjson.com/products/images/groceries/Cucumber/thumbnail.png" alt="image" /></a>
            <a href="#"><img src="https://cdn.dummyjson.com/products/images/groceries/Juice/thumbnail.png" alt="image" /></a>
          </div>
          <div className="column">
            <a href="#"><img src="https://cdn.dummyjson.com/products/images/fragrances/Calvin%20Klein%20CK%20One/thumbnail.png" alt="image" /></a>
            <a href="#"><img src="https://cdn.dummyjson.com/products/images/furniture/Knoll%20Saarinen%20Executive%20Conference%20Chair/thumbnail.png" alt="image" /></a>
            <a href="#"><img src="https://cdn.dummyjson.com/products/images/groceries/Dog%20Food/thumbnail.png" alt="image" /></a>
            <a href="#"><img src="https://cdn.dummyjson.com/products/images/groceries/Kiwi/thumbnail.png" alt="image" /></a>
          </div>
          <div className="column">
            <a href="#"><img src="https://cdn.dummyjson.com/products/images/fragrances/Chanel%20Coco%20Noir%20Eau%20De/thumbnail.png" alt="image" /></a>
            <a href="#"><img src="https://cdn.dummyjson.com/products/images/furniture/Wooden%20Bathroom%20Sink%20With%20Mirror/thumbnail.png" alt="image" /></a>
            <a href="#"><img src="https://cdn.dummyjson.com/products/images/groceries/Eggs/thumbnail.png" alt="image" /></a>
            <a href="#"><img src="https://cdn.dummyjson.com/products/images/groceries/Lemon/thumbnail.png" alt="image" /></a>
          </div>
          <div className="column">
            <a href="#"><img src="https://cdn.dummyjson.com/products/images/fragrances/Dior%20J'adore/thumbnail.png" alt="image" /></a>
            <a href="#"><img src="https://cdn.dummyjson.com/products/images/groceries/Apple/thumbnail.png" alt="image" /></a>
            <a href="#"><img src="https://cdn.dummyjson.com/products/images/groceries/Fish%20Steak/thumbnail.png" alt="image" /></a>
            <a href="#"><img src="https://cdn.dummyjson.com/products/images/groceries/Milk/thumbnail.png" alt="image" /></a>
          </div>
        </div>
      </div>
    </>
  );
}






{/* <div className="column">
            <a href="#"><img src="https://picsum.photos/300/300?image=890" alt="image" /></a>
            <a href="#"><img src="https://picsum.photos/300/300?image=891" alt="image" /></a>
            <a href="#"><img src="https://picsum.photos/300/300?image=892" alt="image" /></a>
            <a href="#"><img src="https://picsum.photos/300/300?image=893" alt="image" /></a>
          </div>
          <div className="column">
            <a href="#"><img src="https://picsum.photos/300/300?image=894" alt="image" /></a>
            <a href="#"><img src="https://picsum.photos/300/300?image=885" alt="image" /></a>
            <a href="#"><img src="https://picsum.photos/300/300?image=896" alt="image" /></a>
            <a href="#"><img src="https://picsum.photos/300/300?image=887" alt="image" /></a>
          </div>
          <div className="column">
            <a href="#"><img src="https://picsum.photos/300/300?image=898" alt="image" /></a>
            <a href="#"><img src="https://picsum.photos/300/300?image=889" alt="image" /></a>
            <a href="#"><img src="https://picsum.photos/300/300?image=910" alt="image" /></a>
            <a href="#"><img src="https://picsum.photos/300/300?image=911" alt="image" /></a>
          </div>
          <div className="column">
            <a href="#"><img src="https://picsum.photos/300/300?image=871" alt="image" /></a>
            <a href="#"><img src="https://picsum.photos/300/300?image=872" alt="image" /></a>
            <a href="#"><img src="https://picsum.photos/300/300?image=873" alt="image" /></a>
            <a href="#"><img src="https://picsum.photos/300/300?image=874" alt="image" /></a>
          </div>
          <div className="column">
            <a href="#"><img src="https://picsum.photos/300/300?image=861" alt="image" /></a>
            <a href="#"><img src="https://picsum.photos/300/300?image=862" alt="image" /></a>
            <a href="#"><img src="https://picsum.photos/300/300?image=863" alt="image" /></a>
            <a href="#"><img src="https://picsum.photos/300/300?image=864" alt="image" /></a>
          </div>
          <div className="column">
            <a href="#"><img src="https://picsum.photos/300/300?image=851" alt="image" /></a>
            <a href="#"><img src="https://picsum.photos/300/300?image=852" alt="image" /></a>
            <a href="#"><img src="https://picsum.photos/300/300?image=853" alt="image" /></a>
            <a href="#"><img src="https://picsum.photos/300/300?image=855" alt="image" /></a>
          </div>
          <div className="column">
            <a href="#"><img src="https://picsum.photos/300/300?image=841" alt="image" /></a>
            <a href="#"><img src="https://picsum.photos/300/300?image=842" alt="image" /></a>
            <a href="#"><img src="https://picsum.photos/300/300?image=845" alt="image" /></a>
            <a href="#"><img src="https://picsum.photos/300/300?image=844" alt="image" /></a>
          </div>
          <div className="column">
            <a href="#"><img src="https://picsum.photos/300/300?image=831" alt="image" /></a>
            <a href="#"><img src="https://picsum.photos/300/300?image=832" alt="image" /></a>
            <a href="#"><img src="https://picsum.photos/300/300?image=833" alt="image" /></a>
            <a href="#"><img src="https://picsum.photos/300/300?image=834" alt="image" /></a>
          </div> */}