import './index.css'
import NavBar from '../NavBar'

import RenderPage from '../RenderPage'

const Home = () => (
  <>
    <NavBar />
    <div className="menu-category-container">
      <RenderPage />
    </div>
  </>
)

export default Home