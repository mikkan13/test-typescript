import { Link } from "react-router-dom";

function Header () {

  return (
    <header className='bg-gray-800 flex justify-between items-center py-5 px-5'>
      <h1 className='text-white text-2xl font-bold'>
        <Link to="/">Blog</Link>
      </h1>
      <p className='text-white font-bold'>
        <Link to="/contact">お問い合わせ</Link>
      </p>
    </header>
  )
}

export default Header