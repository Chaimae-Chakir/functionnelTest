import React from 'react'
import { Container,Col,Row } from 'reactstrap';

 function Choixsupplémentaire() {
  return (
    <Container>
        <Row>
        <Col>
        <br></br>
        <article className="blog-post">
        <h4 className="blog-post-title mb-1" style={{color:'black', fontWeight: 'bold'}}><cite>CHOIX SUPPLÉMENTAIRE</cite></h4>
        {/*-----------------------*/}
        <br></br>
        <p className="blog-post-meta" style={{fontWeight: 'bold'}}>ASSURANCE</p>
        <button type="button" className="btn btn-success pull-right"  style={{backgroundColor:'#03d6a2',border:'none'}}><i class="fa fa-minus" aria-hidden="true"></i></button>  
        <button type="button" className="btn btn-danger pull-right" style={{backgroundColor:'#da1a54',border:'none'}}><i class="bi bi-plus-lg"></i>
        </button>
        <p style={{color:'black'}}>	<h5 style={{color:'black', fontWeight: 'inherit'}}>Super CDW </h5>
          Super CDW pour réduire la franchise de 50 %. : 75,00MAD                    
          </p>
        <hr></hr>
         {/*-----------------------*/}
         <p style={{color:'black'}}>	<h5 style={{color:'black', fontWeight: 'inherit'}}> SCDW PREMIUM </h5> 
         <button type="button" className="btn btn-success pull-right"  style={{backgroundColor:'#03d6a2',border:'none'}}><i class="fa fa-minus" aria-hidden="true"></i></button>  
        <button type="button" className="btn btn-danger pull-right" style={{backgroundColor:'#da1a54',border:'none'}}><i class="bi bi-plus-lg"></i>
        </button>
        Obtenez une protection complète avec l'assurance Premium. Pour une tranquillité d'esprit totale. Évitez la franchise. : 160,00MAD
      </p>
        <hr></hr>
        <p className="blog-post-meta" style={{fontWeight: 'bold'}}>OPTIONS SUPPLÉMENTAIRES</p> 
        <button type="button" className="btn btn-success pull-right"  style={{backgroundColor:'#03d6a2',border:'none'}}><i class="fa fa-minus" aria-hidden="true"></i></button>  
        <button type="button" className="btn btn-danger pull-right" style={{backgroundColor:'#da1a54',border:'none'}}><i class="bi bi-plus-lg"></i>
        </button>
        <p style={{color:'black'}}>	<h5 style={{color:'black', fontWeight: 'inherit'}}>Système de navigation par satellite - GPS </h5>
        Système de navigation par satellite - GPS : 500,00MAD
       </p>
        <hr></hr>
         {/*-----------------------*/}
         <p style={{color:'black'}}>	<h5 style={{color:'black', fontWeight: 'inherit'}}>Supplément jeune conducteur</h5> 
         <button type="button" className="btn btn-success pull-right"  style={{backgroundColor:'#03d6a2',border:'none'}}><i class="fa fa-minus" aria-hidden="true"></i></button>  
        <button type="button" className="btn btn-danger pull-right" style={{backgroundColor:'#da1a54',border:'none'}}><i class="bi bi-plus-lg"></i>
        </button>
        Supplément jeune conducteur : 150,00MAD
       </p>
        <hr></hr>
         {/*-----------------------*/}
         <p style={{color:'black'}}>	<h5 style={{color:'black', fontWeight: 'inherit'}}>Siège pour enfant</h5>
         <button type="button" className="btn btn-success pull-right"  style={{backgroundColor:'#03d6a2',border:'none'}}><i class="fa fa-minus" aria-hidden="true"></i></button>  
        <button type="button" className="btn btn-danger pull-right" style={{backgroundColor:'#da1a54',border:'none'}}><i class="bi bi-plus-lg"></i>
        </button>
         Siège pour enfant : 500 MAD
        </p>
        <hr></hr>
        {/*-----------------------*/}
        <p style={{color:'black'}}>	<h5 style={{color:'black', fontWeight: 'inherit'}}> Conducteur supplémentaire</h5>
        <button type="button" className="btn btn-success pull-right"  style={{backgroundColor:'#03d6a2',border:'none'}}><i class="fa fa-minus" aria-hidden="true"></i></button>  
        <button type="button" className="btn btn-danger pull-right" style={{backgroundColor:'#da1a54',border:'none'}}><i class="bi bi-plus-lg"></i>
        </button>
       Ajoutez vos passagers à la réservation afin qu'ils puissent partager la conduite avec vous. : 300,00MAD
      </p>
        <hr></hr>
         {/*-----------------------*/}
         <p style={{color:'black'}}>	<h5 style={{color:'black', fontWeight: 'inherit'}}>Enregistrement rapide</h5>
         <button type="button" className="btn btn-success pull-right"  style={{backgroundColor:'#03d6a2',border:'none'}}><i class="fa fa-minus" aria-hidden="true"></i></button>  
        <button type="button" className="btn btn-danger pull-right" style={{backgroundColor:'#da1a54',border:'none'}}><i class="bi bi-plus-lg"></i>
        </button>
         Vous pouvez profiter du service d'enregistrement rapide pour gagner du temps à votre arrivée. : 200,00MAD
       </p>
        
    </article>
   </Col>
   </Row>
   </Container>
  )
}
export default  Choixsupplémentaire;
