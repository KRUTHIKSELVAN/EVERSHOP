import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHeart, FiShoppingCart, FiEye, FiStar } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const Card = styled(motion.div)`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.15);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  height: 280px;
  overflow: hidden;
  background: #f8f9fa;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  
  ${Card}:hover & {
    transform: scale(1.1);
  }
`;

const Badge = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  background: ${props => props.type === 'sale' ? '#ff4757' : '#2ed573'};
  color: white;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
`;

const ActionButtons = styled(motion.div)`
  position: absolute;
  top: 15px;
  right: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  opacity: 0;
  
  ${Card}:hover & {
    opacity: 1;
  }
`;

const ActionButton = styled(motion.button)`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: rgba(255,255,255,0.9);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #333;
  font-size: 16px;
  transition: all 0.3s ease;
  
  &:hover {
    background: white;
    color: #667eea;
    transform: scale(1.1);
  }
`;

const CardContent = styled.div`
  padding: 20px;
`;

const Brand = styled.div`
  color: #666;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 5px;
`;

const ProductName = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 10px;
`;

const Stars = styled.div`
  display: flex;
  gap: 2px;
`;

const Star = styled(FiStar)`
  width: 14px;
  height: 14px;
  fill: ${props => props.filled ? '#ffd700' : 'none'};
  color: ${props => props.filled ? '#ffd700' : '#ddd'};
`;

const ReviewCount = styled.span`
  font-size: 12px;
  color: #666;
  margin-left: 5px;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
`;

const CurrentPrice = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: #333;
`;

const OriginalPrice = styled.span`
  font-size: 16px;
  color: #999;
  text-decoration: line-through;
`;

const Discount = styled.span`
  background: #ff4757;
  color: white;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
`;

const ColorOptions = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 15px;
`;

const ColorOption = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${props => props.color === 'Black' ? '#333' : 
                      props.color === 'White' ? '#fff' :
                      props.color === 'Silver' ? '#c0c0c0' :
                      props.color === 'Rose Gold' ? '#e8b4a0' :
                      props.color === 'Brown' ? '#8b4513' :
                      props.color === 'Tan' ? '#d2b48c' : '#667eea'};
  border: 2px solid ${props => props.selected ? '#667eea' : '#ddd'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.2);
  }
`;

const AddToCartButton = styled(motion.button)`
  width: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
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

const StockInfo = styled.div`
  font-size: 12px;
  color: ${props => props.inStock ? '#2ed573' : '#ff4757'};
  margin-bottom: 10px;
  font-weight: 500;
`;

const QuickViewModal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
`;

const ModalContent = styled(motion.div)`
  background: white;
  border-radius: 20px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
`;

const ProductCard = ({ product, onQuickView }) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [isLiked, setIsLiked] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const { addToCart } = useCart();

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

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1, selectedColor, product.sizes[0]);
  };

  const handleQuickView = (e) => {
    e.stopPropagation();
    setShowQuickView(true);
  };

  return (
    <>
      <Card
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ y: -10 }}
        onClick={() => onQuickView && onQuickView(product)}
      >
        <ImageContainer>
          <ProductImage src={product.images[0]} alt={product.name} />
          
          {discount > 0 && (
            <Badge type="sale">-{discount}%</Badge>
          )}
          
          <ActionButtons
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <ActionButton
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => {
                e.stopPropagation();
                setIsLiked(!isLiked);
              }}
            >
              <FiHeart fill={isLiked ? '#ff4757' : 'none'} color={isLiked ? '#ff4757' : '#333'} />
            </ActionButton>
            
            <ActionButton
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleQuickView}
            >
              <FiEye />
            </ActionButton>
          </ActionButtons>
        </ImageContainer>
        
        <CardContent>
          <Brand>{product.brand}</Brand>
          <ProductName>{product.name}</ProductName>
          
          <RatingContainer>
            <Stars>{renderStars(product.rating)}</Stars>
            <ReviewCount>({product.reviews})</ReviewCount>
          </RatingContainer>
          
          <PriceContainer>
            <CurrentPrice>${product.price}</CurrentPrice>
            {product.originalPrice > product.price && (
              <>
                <OriginalPrice>${product.originalPrice}</OriginalPrice>
                <Discount>{discount}% OFF</Discount>
              </>
            )}
          </PriceContainer>
          
          <ColorOptions>
            {product.colors.map(color => (
              <ColorOption
                key={color}
                color={color}
                selected={selectedColor === color}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColor(color);
                }}
              />
            ))}
          </ColorOptions>
          
          <StockInfo inStock={product.inStock}>
            {product.inStock ? `${product.stockCount} in stock` : 'Out of stock'}
          </StockInfo>
          
          <AddToCartButton
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            <FiShoppingCart />
            Add to Cart
          </AddToCartButton>
        </CardContent>
      </Card>
    </>
  );
};

export default ProductCard;