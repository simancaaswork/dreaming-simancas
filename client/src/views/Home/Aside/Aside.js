import UserOnline from './UserOnline'
import SuggestPeople from './SuggestPeople'
import Author from './Author'

const Aside = () => {
    return ( 
        <aside className="wrapper-aside-home">
            <UserOnline />
            <SuggestPeople />
            <Author />
        </aside>
     );
}
 
export default Aside;
