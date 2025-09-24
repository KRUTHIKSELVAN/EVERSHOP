import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartSidebar from './components/CartSidebar';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    line-height: 1.6;
    color: #333;
    background: #f8f9fa;
    overflow-x: hidden;
  }

  html {
    scroll-behavior: smooth;
  }

  button {
    font-family: inherit;
  }

  input, textarea {
    font-family: inherit;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  .slick-dots {
    bottom: 20px;
  }

  .slick-dots li button:before {
    color: white;
    font-size: 12px;
  }

  .slick-dots li.slick-active button:before {
    color: #667eea;
  }

  .slick-prev, .slick-next {
    z-index: 1;
    width: 50px;
    height: 50px;
  }

  .slick-prev:before, .slick-next:before {
    font-size: 30px;
    color: #667eea;
  }

  .slick-prev {
    left: 25px;
  }

  .slick-next {
    right: 25px;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%);
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
`;

function App() {
  return (
    <CartProvider>
      <Router>
        <GlobalStyle />
        <AppContainer>
          <Header />
          <MainContent>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/product/:id" element={<ProductPage />} />
            </Routes>
          </MainContent>
          <CartSidebar />
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            toastStyle={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white'
            }}
          />
        </AppContainer>
      </Router>
    </CartProvider>
  );
}

export default App;