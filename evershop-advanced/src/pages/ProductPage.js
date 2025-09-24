import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiStar, FiHeart, FiShare2, FiShoppingCart, FiTruck, FiShield, FiRotateCcw } from 'react-icons/fi';
import { useParams } from 'react-router-dom';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

import { products } from '../data/products';
import { useCart } from '../context/CartContext';

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 20px;
`;

const ProductContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  margin-bottom: 80px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const ImageSection = styled.div`
  .image-gallery {
    border-radius: 20px;
    overflow: hidden;
  }
  
  .image-gallery-slide img {
    border-radius: 20px;
  }
  
  .image-gallery-thumbnail img {
    border-radius: 10px;
  }
`;

const ProductInfo = styled.div`
  padding: 20px 0;
`;

const Brand = styled.div`
  color: #667eea;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 10px;
`;

const ProductName = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  color: #333;
  margin-bottom: 20px;
  line-height: 1.2;
`;

const RatingSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 30px;
`;

const Stars = styled.div`
  display: flex;
  gap: 3px;
`;

const Star = styled(FiStar)`
  width: 18px;
  height: 18px;
  fill: ${props => props.filled ? '#ffd700' : 'none'};
  color: ${props => props.filled ? '#ffd700' : '#ddd'};
`;

const Rating = styled.span`
  font-weight: 600;
  color: #333;
`;

const ReviewCount = styled.span`
  color: #666;
  font-size: 14px;
`;

const PriceSection = styled.div`
  margin-bottom: 30px;
`;

const CurrentPrice = styled.div`
  font-size: 2.5rem;
  font-weight: 800;
  color: #333;
  margin-bottom: 10px;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const OriginalPrice = styled.span`
  font-size: 1.5rem;
  color: #999;
  text-decoration: line-through;
`;

const Discount = styled.span`
  background: #ff4757;
  color: white;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #666;
  margin-bottom: 30px;
`;

const Features = styled.div`
  margin-bottom: 30px;
`;

const FeatureTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 15px;
  color: #333;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
`;

const FeatureItem = styled.li`
  padding: 8px 0;
  color: #666;
  position: relative;
  padding-left: 20px;
  
  &:before {
    content: '✓';
    position: absolute;
    left: 0;
    color: #2ed573;
    font-weight: bold;
  }
`;

const VariantSection = styled.div`
  margin-bottom: 30px;
`;

const VariantTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 15px;
  color: #333;
`;

const ColorOptions = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
`;

const ColorOption = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${props => props.color === 'Black' ? '#333' : 
                      props.color === 'White' ? '#fff' :
                      props.color === 'Silver' ? '#c0c0c0' :
                      props.color === 'Rose Gold' ? '#e8b4a0' :
                      props.color === 'Brown' ? '#8b4513' :
                      props.color === 'Tan' ? '#d2b48c' : '#667eea'};
  border: 3px solid ${props => props.selected ? '#667eea' : '#ddd'};
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  
  &:hover {
    transform: scale(1.1);
  }
  
  &:after {
    content: '${props => props.color}';
    position: absolute;
    bottom: -25px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 12px;
    color: #666;
    white-space: nowrap;
  }
`;

const SizeOptions = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const SizeOption = styled.button`
  padding: 10px 20px;
  border: 2px solid ${props => props.selected ? '#667eea' : '#ddd'};
  background: ${props => props.selected ? '#667eea' : 'white'};
  color: ${props => props.selected ? 'white' : '#333'};
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #667eea;
  }
`;

const QuantitySection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
`;

const QuantityLabel = styled.span`
  font-weight: 600;
  color: #333;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  border: 2px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
`;

const QuantityButton = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  background: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &:hover {
    background: #f8f9fa;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const QuantityInput = styled.input`
  width: 60px;
  height: 40px;
  border: none;
  text-align: center;
  font-weight: 600;
  font-size: 16px;
  
  &:focus {
    outline: none;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
`;

const AddToCartButton = styled(motion.button)`
  flex: 1;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const WishlistButton = styled(motion.button)`
  width: 60px;
  height: 60px;
  border: 2px solid #ddd;
  background: white;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: #666;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #ff4757;
    color: #ff4757;
  }
`;

const ShareButton = styled(motion.button)`
  width: 60px;
  height: 60px;
  border: 2px solid #ddd;
  background: white;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: #666;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #667eea;
    color: #667eea;
  }
`;

const StockInfo = styled.div`
  padding: 20px;
  background: ${props => props.inStock ? '#f0fff4' : '#fff5f5'};
  border: 1px solid ${props => props.inStock ? '#c6f6d5' : '#fed7d7'};
  border-radius: 12px;
  margin-bottom: 30px;
`;

const StockText = styled.div`
  color: ${props => props.inStock ? '#2ed573' : '#ff4757'};
  font-weight: 600;
  margin-bottom: 5px;
`;

const StockCount = styled.div`
  color: #666;
  font-size: 14px;
`;

const ServiceFeatures = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 40px;
`;

const ServiceFeature = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 12px;
`;

const ServiceIcon = styled.div`
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.2rem;
`;

const ServiceText = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #333;
`;

const ProductPage = () => {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id)) || products[0];
  
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const { addToCart } = useCart();

  const images = product.images.map(img => ({
    original: img,
    thumbnail: img
  }));

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star key={i} filled={i <= Math.floor(rating)} />
      );
    }
    return stars;
  };

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1 && newQuantity <= product.stockCount) {
      setQuantity(newQuantity);
    }
  };

  return (
    <Container>
      <ProductContainer>
        <ImageSection>
          <ImageGallery 
            items={images}
            showPlayButton={false}
            showFullscreenButton={true}
            showNav={true}
            autoPlay={false}
          />
        </ImageSection>

        <ProductInfo>
          <Brand>{product.brand}</Brand>
          <ProductName>{product.name}</ProductName>
          
          <RatingSection>
            <Stars>{renderStars(product.rating)}</Stars>
            <Rating>{product.rating}</Rating>
            <ReviewCount>({product.reviews} reviews)</ReviewCount>
          </RatingSection>

          <PriceSection>
            <CurrentPrice>${product.price}</CurrentPrice>
            <PriceRow>
              {product.originalPrice > product.price && (
                <>
                  <OriginalPrice>${product.originalPrice}</OriginalPrice>
                  <Discount>{discount}% OFF</Discount>
                </>
              )}
            </PriceRow>
          </PriceSection>

          <Description>{product.description}</Description>

          <Features>
            <FeatureTitle>Key Features</FeatureTitle>
            <FeatureList>
              {product.features.map((feature, index) => (
                <FeatureItem key={index}>{feature}</FeatureItem>
              ))}
            </FeatureList>
          </Features>

          <VariantSection>
            <VariantTitle>Color</VariantTitle>
            <ColorOptions>
              {product.colors.map(color => (
                <ColorOption
                  key={color}
                  color={color}
                  selected={selectedColor === color}
                  onClick={() => setSelectedColor(color)}
                />
              ))}
            </ColorOptions>

            <VariantTitle>Size</VariantTitle>
            <SizeOptions>
              {product.sizes.map(size => (
                <SizeOption
                  key={size}
                  selected={selectedSize === size}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </SizeOption>
              ))}
            </SizeOptions>
          </VariantSection>

          <QuantitySection>
            <QuantityLabel>Quantity:</QuantityLabel>
            <QuantityControls>
              <QuantityButton
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
              >
                -
              </QuantityButton>
              <QuantityInput
                type="number"
                value={quantity}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                min="1"
                max={product.stockCount}
              />
              <QuantityButton
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= product.stockCount}
              >
                +
              </QuantityButton>
            </QuantityControls>
          </QuantitySection>

          <StockInfo inStock={product.inStock}>
            <StockText inStock={product.inStock}>
              {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
            </StockText>
            <StockCount>
              {product.inStock ? `${product.stockCount} items available` : 'Currently unavailable'}
            </StockCount>
          </StockInfo>

          <ActionButtons>
            <AddToCartButton
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              <FiShoppingCart />
              Add to Cart
            </AddToCartButton>
            
            <WishlistButton
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsWishlisted(!isWishlisted)}
            >
              <FiHeart fill={isWishlisted ? '#ff4757' : 'none'} />
            </WishlistButton>
            
            <ShareButton
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FiShare2 />
            </ShareButton>
          </ActionButtons>

          <ServiceFeatures>
            <ServiceFeature>
              <ServiceIcon><FiTruck /></ServiceIcon>
              <ServiceText>Free Shipping</ServiceText>
            </ServiceFeature>
            <ServiceFeature>
              <ServiceIcon><FiShield /></ServiceIcon>
              <ServiceText>2 Year Warranty</ServiceText>
            </ServiceFeature>
            <ServiceFeature>
              <ServiceIcon><FiRotateCcw /></ServiceIcon>
              <ServiceText>30 Day Returns</ServiceText>
            </ServiceFeature>
          </ServiceFeatures>
        </ProductInfo>
      </ProductContainer>
    </Container>
  );
};

export default ProductPage;