import NavBar from './components/navBar';
import { ShoppingCartProvider } from './contexts/ShoppingCartContext';
function App() {

  return (
    <ShoppingCartProvider>
      <div className='background-image'>
        <NavBar />
      </div>
    </ShoppingCartProvider>
  )
}

export default App;
