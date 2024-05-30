import NavBar from './components/navBar';
import { CurrentTabProvider } from './contexts/CurrentTabContext';
import { ShoppingCartProvider } from './contexts/ShoppingCartContext';
function App() {

  return (
    <CurrentTabProvider>
      <ShoppingCartProvider>
        <div className='background-image'>
          <NavBar />
        </div>
      </ShoppingCartProvider>
    </CurrentTabProvider>
  )
}

export default App;
