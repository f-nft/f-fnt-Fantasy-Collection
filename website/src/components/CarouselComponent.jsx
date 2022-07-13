import React from 'react'
import { Carousel } from 'react-bootstrap';
import {Container} from 'react-bootstrap'
function CarouselComponent() {
  return (
   
                    <Carousel indicators="light" variant="light" data-bs-interval="3000" style={{width:"95%"}}>
                        <Carousel.Item>
                            <img className="d-block w-100" src="https://media.discordapp.net/attachments/945707668398567424/993388829627129866/1.gif" alt="39usd" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img className="d-block w-100" src="https://media.discordapp.net/attachments/945707668398567424/993388829920735322/2.gif" alt="69usd" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img className="d-block w-100" src="https://media.discordapp.net/attachments/945707668398567424/993388830667325460/3.gif" alt="239usd" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img className="d-block w-100" src="https://media.discordapp.net/attachments/945707668398567424/993388831061585950/4.gif" alt="799usd" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img className="d-block w-100" src="https://media.discordapp.net/attachments/945707668398567424/993388831522947183/5.gif" alt="1999usd" />
                        </Carousel.Item>
                    </Carousel >
  )
}

export default CarouselComponent