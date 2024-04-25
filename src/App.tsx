import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header'
import Home from './pages/Home'
import Article from './pages/Article'
import Contact from './pages/Contact'

function App() {
  return (
    <div className="">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="posts/:postId" element={<Article />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}


export default App;
