import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiPlus, FiMinus, FiShoppingBag, FiTrash2 } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2000;
  backdrop-filter: blur(5px);
`;

const Sidebar = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 450px;
  height: 100%;
  background: white;
  z-index: 2001;
  display: flex;
  flex-direction: column;
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Header = styled.div`
  padding: 30px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px 0;
`;

const EmptyCart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 40px;
  text-align: center;
  color: #666;
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 20px;
  opacity: 0.3;
`;

const EmptyText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 10px;
`;

const EmptySubtext = styled.p`
  font-size: 0.9rem;
  opacity: 0.7;
`;

const CartItem = styled(motion.div)`
  padding: 20px 30px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  gap: 15px;
`;

const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 10px;
  background: #f8f9fa;
`;

const ItemDetails = styled.div`
  flex: 1;
`;

const ItemName = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 5px;
  color: #333;
  line-height: 1.3;
`;

const ItemVariant = styled.p`
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 10px;
`;

const ItemPrice = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 10px;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const QuantityButton = styled.button`
  width: 30px;
  height: 30px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #667eea;
    color: white;
    border-color: #667eea;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Quantity = styled.span`
  font-weight: 600;
  min-width: 30px;
  text-align: center;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #ff4757;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 71, 87, 0.1);
  }
`;

const Footer = styled.div`
  padding: 30px;
  border-top: 1px solid #eee;
  background: #f8f9fa;
`;

const Summary = styled.div`
  margin-bottom: 20px;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: ${props => props.total ? '1.2rem' : '1rem'};
  font-weight: ${props => props.total ? '700' : '400'};
  color: ${props => props.total ? '#333' : '#666'};
`;

const CheckoutButton = styled(motion.button)`
  width: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 15px;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
  }
`;

const ContinueShoppingButton = styled.button`
  width: 100%;
  background: none;
  color: #667eea;
  border: 2px solid #667eea;
  padding: 12px;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;
  transition: all 0.3s ease;
  
  &:hover {
    background: #667eea;
    color: white;
  }
`;

const CartSidebar = () => {
  const { 
    isOpen, 
    items, 
    toggleCart, 
    updateQuantity, 
    removeFromCart, 
    getTotalItems, 
    getTotalPrice 
  } = useCart();

  const handleOverlayClick = () => {
    toggleCart();
  };

  const handleSidebarClick = (e) => {
    e.stopPropagation();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleOverlayClick}
        >
          <Sidebar
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            onClick={handleSidebarClick}
          >
            <Header>
              <Title>
                <FiShoppingBag />
                Shopping Cart ({getTotalItems()})
              </Title>
              <CloseButton onClick={toggleCart}>
                <FiX />
              </CloseButton>
            </Header>

            <Content>
              {items.length === 0 ? (
                <EmptyCart>
                  <EmptyIcon>🛒</EmptyIcon>
                  <EmptyText>Your cart is empty</EmptyText>
                  <EmptySubtext>Add some products to get started</EmptySubtext>
                </EmptyCart>
              ) : (
                items.map((item) => (
                  <CartItem
                    key={item.cartId}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ItemImage src={item.images[0]} alt={item.name} />
                    <ItemDetails>
                      <ItemName>{item.name}</ItemName>
                      <ItemVariant>
                        {item.selectedColor} • {item.selectedSize}
                      </ItemVariant>
                      <ItemPrice>${item.price.toFixed(2)}</ItemPrice>
                      <QuantityControls>
                        <QuantityButton
                          onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <FiMinus />
                        </QuantityButton>
                        <Quantity>{item.quantity}</Quantity>
                        <QuantityButton
                          onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                        >
                          <FiPlus />
                        </QuantityButton>
                        <RemoveButton
                          onClick={() => removeFromCart(item.cartId)}
                        >
                          <FiTrash2 />
                        </RemoveButton>
                      </QuantityControls>
                    </ItemDetails>
                  </CartItem>
                ))
              )}
            </Content>

            {items.length > 0 && (
              <Footer>
                <Summary>
                  <SummaryRow>
                    <span>Subtotal ({getTotalItems()} items)</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </SummaryRow>
                  <SummaryRow>
                    <span>Shipping</span>
                    <span>Free</span>
                  </SummaryRow>
                  <SummaryRow total>
                    <span>Total</span>
                    <span>${getTotalPrice().toFixed(2)}</span>
                  </SummaryRow>
                </Summary>
                
                <CheckoutButton
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Proceed to Checkout
                </CheckoutButton>
                
                <ContinueShoppingButton onClick={toggleCart}>
                  Continue Shopping
                </ContinueShoppingButton>
              </Footer>
            )}
          </Sidebar>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;