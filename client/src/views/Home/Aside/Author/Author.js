import author from '../../../../assets/imgs/developer/simancas.jpg'

const Author = () => {
    return ( 
        <div className="author-dreaming">
            <div className="info-developer">
                <img src={author} alt="" />
                <div className="name-author">
                    <h2>Hector Simancas</h2>
                    <span>Fullstack developer, UI/UX designer</span>
                </div>
            </div>
            <span className="project-name">Dreaming, 2020</span>
        </div>
     );
}
 
export default Author;
