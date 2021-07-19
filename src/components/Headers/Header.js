/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState, useEffect } from "react";

// reactstrap components
import { DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown, Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

import { useQuery } from '@apollo/client';
import { GET_CLIENTS } from "queries.js";

export default function Header({sendAbonnement, facturation, impayees, reglements}){
  const numClient = JSON.parse(window.localStorage.getItem('authUser')).uid;
  const clients = useQuery(GET_CLIENTS, {variables: {"numclient": {"_eq": numClient}}})
  console.log(clients.data.test_clients)
  const [abonnementFilter, setAbonnementFilter] = useState(clients.data.test_clients[0].numbranchement)

  console.log(facturation)

  sendAbonnement(abonnementFilter)

  function selectAbonnement(e, filter) {
    e.preventDefault()
    sendAbonnement(filter)
    setAbonnementFilter(filter)
  }

  const abonnementSelection = clients.data.test_clients.filter(abonnement => abonnement.numbranchement == abonnementFilter)
  console.log(abonnementSelection)

  console.log("depuis header ", abonnementFilter)

    return (
      <>
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
          <Container fluid>
            <div className="header-body">
              <Row className="pb-3">
                <Col>
                  <UncontrolledDropdown>
                    <DropdownToggle caret color="secondary">
                      Abonnement
                    </DropdownToggle>
                    <DropdownMenu>
                      {
                        clients.data.test_clients.map(client => 
                          {
                            return (
                              <DropdownItem onClick={e => {selectAbonnement(e, client.numbranchement)}}>
                                <DropdownItem divider />
                                {String(client.numbranchement)}
                              </DropdownItem>
                            )
                          }
                        )
                      }
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Col>
              </Row>
              {/* Card stats */}
              <Row>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            N° Client {abonnementSelection[0].numclient}
                          </CardTitle>
                          <span className="h2 font-weight-bold mb-0">
                            {abonnementSelection[0].nomclient}
                          </span>
                          <br></br>
                          <span className="h4 font-weight-bold mb-0">
                            {abonnementSelection[0].adressebranchement}
                          </span>
                          <br></br>
                          <span className="mt-3 h5 font-weight-bold mb-0 text-nowrap danger">N° Branchement: {abonnementSelection[0].numbranchement}</span>
                        </div>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0" color="info">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-white mb-0"
                          >
                            FACTURATION
                          </CardTitle>
                          <span className="h4 font-weight-bold mb-0">
                            Nombres Factures : {facturation.facture}
                          </span><br></br>
                          <span className="h4 font-weight-bold mb-0">
                            Total Facturation :  {facturation.total} Fcfa
                          </span>
                        </div>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0" color="danger">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-white mb-0"
                          >
                            IMPAYEES
                          </CardTitle>
                          <span className="h4 font-weight-bold mb-0">
                            Nombres Factures : {impayees.facture}
                          </span><br></br>
                          <span className="h4 font-weight-bold mb-0">
                            Montant Dette :  {impayees.total} Fcfa
                          </span>
                        </div>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
                <Col lg="6" xl="3">
                  <Card className="card-stats mb-4 mb-xl-0" color="success">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-white mb-0"
                          >
                            REGLEMENTS
                          </CardTitle>
                          <span className="h4 font-weight-bold mb-0">
                            Nombres Factures : {reglements.facture}
                          </span><br></br>
                          <span className="h4 font-weight-bold mb-0">
                            Montant Règlement : {reglements.total} Fcfa
                          </span>
                        </div>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </div>
          </Container>
        </div>
      </>
    );
}

