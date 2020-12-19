import Posts from './Posts'
import Aside from './Aside'
import NavDiscover from './NavDiscover'

const Home = () => {
    return ( 
        <main className="wrapper-home-principal">
            <NavDiscover />
            <Posts />
            <Aside />
        </main>
     );
}
 
export default Home;