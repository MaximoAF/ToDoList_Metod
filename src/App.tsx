import { Route, Routes } from 'react-router-dom';
import { Home } from './components/pages/Home/Home';
import { Sprint } from './components/pages/Sprint/Sprint';
function App() {

  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/sprint/:id" element={<Sprint/>} />
    </Routes>
    
  )
}

export default App
