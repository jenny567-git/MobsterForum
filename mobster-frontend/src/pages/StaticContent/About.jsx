import React from 'react';
import './About-styles.css';
import { Card, Container, Row, Col, Image } from 'react-bootstrap';

export const About = () => {
  return <div>
      

    <Container fluid className='about-container'>
        <Row>
              <div className="about-header">
                  <h1>La nostra storia</h1>
                  <p>
                      <em>"Even gangsters need some damn peace and quiet." - Abraham Lincoln</em>
                  </p>
                  <p>
                      That's the philosophy behind the mobster forum. This is where you go to keep your business just that - <em>your</em> business!
                      Ain't nobody gonna come sniffin around here. Cops? Fuhgeddaboutit! Follow the rules, respect your bosses, pay your dues.
                  </p>
              </div>
        </Row>
        <Row>
            <Col>
                <Card className='single-card' >
                      <Card.Img variant="top" src="https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTgwMjk3NzQ0OTI0MDI2MDA2/-al-capone-smokes-a-cigar-on-the-train-carrying-him-to-the-federal-penitentiary-in-atlanta-where-he-will-start-serving-an-eleven-year-sentence.jpg" />
                    <Card.Body>
                        <Card.Title>Jen The Blade</Card.Title>
                        <Card.Text className="aboutme">
                            The sharpest of them all.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>

            <Col>
                  <Card className='single-card'>
                      <Card.Img variant="top" src="https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTgwMzIxMTA3MTMwMTk3MTQy/john-gotti-arrives-at-manhattan-supreme-court-where-he-is-on-trial-on-charges-of-conspiracy-and-assault-for-the-1986-shooting-of-a-carpenters-union-official-photo-by-willie-andersonny-daily-news-archi.jpg" />
                    <Card.Body>
                        <Card.Title>Danny The Strangler</Card.Title>
                        <Card.Text className="aboutme">
                            Beware the wet suit...
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>

            <Col>
                  <Card className='single-card'>
                      <Card.Img variant="top" src="https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTgwNzg0ODI0NTQ4NTk5MTQ0/gettyimages-155761690.jpg" />
                    <Card.Body>
                        <Card.Title>'Deathbringer' Yahya</Card.Title>
                        <Card.Text className="aboutme">
                            Looks *can* kill.
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </Row>

          <Row>
              <Col>
                  <Card className='single-card'>
                      <Card.Img variant="top" src="https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTgwOTY5OTg3MDMxMTgwNjQ4/alcatraz-inmates-meyer-mickey-cohen-gettyimages-515351718.jpg" />
                      <Card.Body>
                          <Card.Title>Elin 'Bottlecracker' Corleone</Card.Title>
                          <Card.Text className="aboutme">
                              Bribe her with bubbles.
                          </Card.Text>
                      </Card.Body>
                  </Card>
              </Col>

              <Col>
                  <Card className='single-card'>
                      <Card.Img variant="top" src="https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTE5NDg0MDU1MjIxODYzOTUx/henry-hill-9542499-1-402.jpg" />
                      <Card.Body>
                          <Card.Title>Johan The Pirate</Card.Title>
                          <Card.Text className="aboutme">
                              Don't ask about his eye patch.
                          </Card.Text>
                      </Card.Body>
                  </Card>
              </Col>

              <Col>
                  <Card className='single-card'>
                      <Card.Img variant="top" src="https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTE5NDg0MDU0ODM3ODg4NTI3/anthony-spilotro.jpg" />
                      <Card.Body>
                          <Card.Title>Christiano The Trigger</Card.Title>
                          <Card.Text className="aboutme">
                              Has pieces hidden everywhere.
                          </Card.Text>
                      </Card.Body>
                  </Card>
              </Col>
          </Row>
    </Container> 
     
  </div>;
};
