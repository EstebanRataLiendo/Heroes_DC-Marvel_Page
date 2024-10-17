import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getHeroesById } from "../helpers";
import { useMemo } from "react";

export const HeroPage = () => {

  const {id} = useParams();
  const navigate = useNavigate()

  const hero = useMemo(() =>getHeroesById(id), [id])
  // const hero = getHeroesById(id);

  const onReturn= () => {
    navigate(-1)
  } 
  


  if(!hero){
    return <Navigate to="/dc"/>
  }
    return (
      <div className="row mt-5">
        <div className="col-4">
            <h1> {hero.superhero} </h1>
          <img 
            src={`/assets/heroes/${id}.jpg`} 
            alt={hero.superhero} 
            className="img-thumbnail animate__animated animate__fadeInLeft"
          />
        </div>
        <div className="col-8">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <b>Alter ego:</b> {hero.alter_ego}
            </li>
            <li className="list-group-item">
              <b>Publisher:</b> {hero.publisher}
            </li>
            <li className="list-group-item">
              <b>First Appearance:</b> {hero.first_appearance}
            </li>
          </ul>
          <h5 className="mt-3">Characters</h5>
          <p> {hero.characters} </p>
          <button 
            className="btn-primary btn"
            onClick={onReturn}
          >Atras</button>
        </div>
      </div>

    )
  }
  