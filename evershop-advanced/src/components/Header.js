import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiShoppingCart, FiUser, FiMenu, FiX, FiHeart } from 'react-icons/fi';
import { useCart } from '../context/CartContext';

const HeaderContainer = styled.header`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
`;

const TopBar = styled.div`
  background: rgba(0,0,0,0.1);
  padding: 8px 0;
  font-size: 14px;
  text-align: center;
`;

const MainHeader = styled.div`
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1400px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Logo = styled(motion.div)`
  font-size: 2rem;
  font-weight: 800;
  background: linear-gradient(45deg, #fff, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  cursor: pointer;
`;

const SearchContainer = styled.div`
  flex: 1;
  max-width: 500px;
  margin: 0 2rem;
  position: relative;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 50px 12px 20px;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  background: rgba(255,255,255,0.9);
  backdrop-filter: blur(10px);
  
  &:focus {
    outline: none;
    background: white;
    box-shadow: 0 0 20px rgba(255,255,255,0.3);
  }
`;

const SearchButton = styled.button`
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  background: linear-gradient(45deg, #667eea, #764ba2);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-50%) scale(1.1);
  }
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const ActionButton = styled(motion.button)`
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  position: relative;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255,255,255,0.1);
  }
`;

const Badge = styled(motion.span)`
  position: absolute;
  top: -5px;
  right: -5px;
  background: #ff4757;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  z-index: 2000;
  padding: 2rem;
  display: flex;
  flex-direction: column;
`;

const MobileMenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const MobileSearchContainer = styled.div`
  margin-bottom: 2rem;
  position: relative;
`;

const NavMenu = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const NavLink = styled(motion.a)`
  color: white;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 500;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(255,255,255,0.1);
  
  &:hover {
    color: #f0f0f0;
  }
`;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { getTotalItems, toggleCart } = useCart();

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <HeaderContainer>
      <TopBar>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          🚚 Free shipping on orders over $99 | 🎉 Use code SAVE20 for 20% off
        </motion.div>
      </TopBar>
      
      <MainHeader>
        <Logo
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          EverShop
        </Logo>
        
        <SearchContainer>
          <form onSubmit={handleSearch}>
            <SearchInput
              type="text"
              placeholder="Search for products, brands, categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <SearchButton type="submit">
              <FiSearch />
            </SearchButton>
          </form>
        </SearchContainer>
        
        <NavActions>
          <ActionButton
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiHeart />
          </ActionButton>
          
          <ActionButton
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiUser />
          </ActionButton>
          
          <ActionButton
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleCart}
          >
            <FiShoppingCart />
            <AnimatePresence>
              {getTotalItems() > 0 && (
                <Badge
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  {getTotalItems()}
                </Badge>
              )}
            </AnimatePresence>
          </ActionButton>
          
          <ActionButton
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(true)}
            style={{ display: 'none' }}
            className="mobile-menu-btn"
          >
            <FiMenu />
          </ActionButton>
        </NavActions>
      </MainHeader>
      
      <AnimatePresence>
        {isMenuOpen && (
          <MobileMenu
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <MobileMenuHeader>
              <Logo>EverShop</Logo>
              <ActionButton onClick={() => setIsMenuOpen(false)}>
                <FiX />
              </ActionButton>
            </MobileMenuHeader>
            
            <MobileSearchContainer>
              <SearchInput
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </MobileSearchContainer>
            
            <NavMenu>
              <NavLink href="#" whileHover={{ x: 10 }}>Home</NavLink>
              <NavLink href="#" whileHover={{ x: 10 }}>Categories</NavLink>
              <NavLink href="#" whileHover={{ x: 10 }}>Deals</NavLink>
              <NavLink href="#" whileHover={{ x: 10 }}>New Arrivals</NavLink>
              <NavLink href="#" whileHover={{ x: 10 }}>Brands</NavLink>
              <NavLink href="#" whileHover={{ x: 10 }}>Support</NavLink>
            </NavMenu>
          </MobileMenu>
        )}
      </AnimatePresence>
      
      <style jsx>{`
        @media (max-width: 768px) {
          .mobile-menu-btn {
            display: flex !important;
          }
        }
      `}</style>
    </HeaderContainer>
  );
};

export default Header;