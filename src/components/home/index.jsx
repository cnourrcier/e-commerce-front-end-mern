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
            <a href="#"><img src="https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Bed/thumbnail.png" alt="image" /></a>
            <a href="#"><img src="https://cdn.dummyjson.com/products/images/home-decoration/Decoration%20Swing/thumbnail.png" alt="image" /></a>
            <a href="#"><img src="https://cdn.dummyjson.com/products/images/fragrances/Gucci%20Bloom%20Eau%20de/thumbnail.png" alt="image" /></a>
            <a href="#"><img src="https://cdn.dummyjson.com/products/images/kitchen-accessories/Bamboo%20Spatula/thumbnail.png" alt="image" /></a>
            <a href="#"><img src="https://cdn.dummyjson.com/products/images/womens-jewellery/Green%20Crystal%20Earring/thumbnail.png" alt="image" /></a>
          </div>
          <div className="column">
            <a href="#"><img src="https://cdn.dummyjson.com/products/images/kitchen-accessories/Plate/thumbnail.png" alt="image" /></a>
            <a href="#"><img src="https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Bed/thumbnail.png" alt="image" /></a>
            <a href="#"><img src="https://cdn.dummyjson.com/products/images/laptops/Apple%20MacBook%20Pro%2014%20Inch%20Space%20Grey/thumbnail.png" alt="image" /></a>
            <a href="#"><img src="https://cdn.dummyjson.com/products/images/mens-shirts/Blue%20&%20Black%20Check%20Shirt/thumbnail.png" alt="image" /></a>
            <a href="#"><img src="https://cdn.dummyjson.com/products/images/womens-shoes/Black%20&%20Brown%20Slipper/thumbnail.png" alt="image" /></a>
            <a href="#"><img src="https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Sofa/thumbnail.png" alt="image" /></a>
            <a href="#"><img src="https://cdn.dummyjson.com/products/images/mens-shoes/Nike%20Air%20Jordan%201%20Red%20And%20Black/thumbnail.png" alt="image" /></a>
            <a href="#"><img src="https://cdn.dummyjson.com/products/images/mens-watches/Brown%20Leather%20Belt%20Watch/thumbnail.png" alt="image" /></a>
          </div>
          <div className="column">
            <a href="#"><img src="https://cdn.dummyjson.com/products/images/mobile-accessories/Amazon%20Echo%20Plus/thumbnail.png" alt="image" /></a>
            <a href="#"><img src="https://cdn.dummyjson.com/products/images/womens-dresses/Corset%20Leather%20With%20Skirt/thumbnail.png" alt="image" /></a>
            <a href="#"><img src="https://cdn.dummyjson.com/products/images/womens-bags/Blue%20Women's%20Handbag/thumbnail.png" alt="image" /></a>
            <a href="#"><img src="https://cdn.dummyjson.com/products/images/groceries/Juice/thumbnail.png" alt="image" /></a>
            <a href="#"><img src="https://cdn.dummyjson.com/products/images/fragrances/Calvin%20Klein%20CK%20One/thumbnail.png" alt="image" /></a>
            <a href="#"><img src="https://cdn.dummyjson.com/products/images/furniture/Knoll%20Saarinen%20Executive%20Conference%20Chair/thumbnail.png" alt="image" /></a>
            <a href="#"><img src="https://cdn.dummyjson.com/products/images/skin-care/Attitude%20Super%20Leaves%20Hand%20Soap/thumbnail.png" alt="image" /></a>
            <a href="#"><img src="https://cdn.dummyjson.com/products/images/groceries/Kiwi/thumbnail.png" alt="image" /></a>
          </div>
          <div className="column">
            <a href="#"><img src="https://cdn.dummyjson.com/products/images/womens-watches/Rolex%20Cellini%20Moonphase/thumbnail.png" alt="image" /></a>
            <a href="#"><img src="https://cdn.dummyjson.com/products/images/furniture/Wooden%20Bathroom%20Sink%20With%20Mirror/thumbnail.png" alt="image" /></a>
            <a href="#"><img src="https://cdn.dummyjson.com/products/images/smartphones/iPhone%205s/thumbnail.png" alt="image" /></a>
            <a href="#"><img src="https://cdn.dummyjson.com/products/images/sports-accessories/American%20Football/thumbnail.png" alt="image" /></a>
            <a href="#"><img src="https://cdn.dummyjson.com/products/images/sunglasses/Black%20Sun%20Glasses/thumbnail.png" alt="image" /></a>
            <a href="#"><img src="https://cdn.dummyjson.com/products/images/smartphones/iPhone%206/thumbnail.png" alt="image" /></a>
            <a href="#"><img src="https://cdn.dummyjson.com/products/images/tops/Blue%20Frock/thumbnail.png" alt="image" /></a>
            <a href="#"><img src="https://cdn.dummyjson.com/products/images/tablets/Samsung%20Galaxy%20Tab%20S8%20Plus%20Grey/thumbnail.png" alt="image" /></a>
          </div>
        </div>
      </div>
      <div className='slogan-container'>
        <h2>More Choices, Better Prices</h2>
      </div>
    </>
  );
}