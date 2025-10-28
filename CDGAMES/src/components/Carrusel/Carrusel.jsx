import Carousel from 'react-bootstrap/Carousel';
import './Carrusel.css'

export function Carrusel() {
  return (
    <Carousel className="carousel">
      <Carousel.Item>
        <img className="slider-item" src="https://www.hd-tecnologia.com/imagenes/articulos/2015/11/Blackops3.jpg"></img>
        <Carousel.Caption>
          <h3>CD GAMES</h3>
          <p>¡Juegos baratos en formato CD!</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="slider-item" src="https://gaming-cdn.com/images/news/articles/10928/cover/1000x563monster-hunter-wilds-se-lleva-unas-notas-de-infarto-cover67bc90db5a65a.jpg"></img>
        <Carousel.Caption>
          <h3>Busca el juego que desees</h3>
          <p>Catalogo amplio de juegos en CD</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="slider-item" src="https://cdn2.unrealengine.com/egs-mortalkombat1defintiveedition-netherrealmstudiosqloc-editions-g1a-00-1920x1080-4de805dffaf7.jpg"></img>
        <Carousel.Caption>
          <h3>Compra Ya!</h3>
          <p>
            No pierdas el tiempo y compra uno!
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}