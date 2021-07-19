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
import React, { useState } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
//import Chart from "chart.js";
// react plugin used to create charts
//import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col
} from "reactstrap";

import { useQuery } from '@apollo/client';
import { GET_FACTURES } from "queries";


// core components
/*import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "variables/charts.js";*/

import Header from "components/Headers/Header.js";


function Index() {
    const numClient = JSON.parse(window.localStorage.getItem('authUser')).uid
    const factures = useQuery(GET_FACTURES, {variables: {"numclient": {"_eq": numClient}}})
    const [navPills, setNavPills] = useState(1)
    const [clientFilter, setClientFilter] = useState('')
    const [factureFilter, setFactureFilter] = useState('')
    const [abonnement, setAbonnement] = useState()
    const [paymentFilter, setPaymentFilter] = useState()
    const [abonnementFilter, setAbonnementFilter] = useState()
    let facturation = {facture: 0, total: 0};
    let impayees = {facture: 0, total: 0};
    let reglements = {facture: 0, total: 0};

    console.log("render")

    if(factures.loading) return null;
    if(factures.error) return `Error! ${factures.error}`;

    function getAbonnement(filter){
      setAbonnementFilter(filter)
    }

    let factureSelection = factures.data.test_factures.filter(facture => facture.numbranchement == abonnementFilter)

    facturation.facture = factureSelection.length

    factureSelection.forEach(facture => {
      facturation.total += facture.montantfacture
  
      if(facture.etatfacture == "S"){
        reglements.facture += 1
        reglements.total += parseInt(facture.montantfacture)
      } else {
        reglements.total += parseInt(facture.soldefactures)
      }
    });

    impayees.facture = facturation.facture - reglements.facture;
    impayees.total = facturation.total - reglements.total;

    console.log("Facturation",facturation)
    console.log("Reglement",reglements)
    console.log("Impayéees", impayees)

    console.log("depuis facture ", abonnementFilter)

    if(factureFilter === "payé") factureSelection = factureSelection.filter(facture => facture.etatfacture == "S")
    console.log(factureSelection)

    if(factureFilter ==="impayé") factureSelection = factureSelection.filter(facture => facture.etatfacture != "S")
    console.log(factureSelection)

    {/*const [chartExample1Data, setChartExample1Data] = useState()
      
    
    if (window.Chart) {
      parseOptions(Chart, chartOptions());
    }*/}
    console.log(factureFilter)

    const toggleNavs = (e, activeNav, index, filter) => {
      console.log(factureFilter)
      e.preventDefault()
      setNavPills(index)
      setFactureFilter(filter)
      console.log(factureFilter)
    }

    return (
      <>
        <Header sendAbonnement={getAbonnement} facturation={facturation} impayees={impayees} reglements={reglements} />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
          <Col className="mb-5 mb-xl-0" xl="8">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <Row className="align-items-center">
                    <div className="col">
                      <h3 className="mb-4">Mes Factures</h3>
                    </div>
                  </Row>
                  <Row className="align-items-left">
                  <Nav
                    className="nav-fill flex-column flex-sm-row"
                    id="tabs-text"
                    pills
                    role="tablist"
                  >
                    <NavItem>
                      <NavLink
                        aria-selected={navPills === 1}
                        className={classnames("mb-sm-3 mb-md-0", {
                          active: navPills === 1
                        })}
                        onClick={e => toggleNavs(e, "navPills", 1, "tout")}
                        href="#"
                        role="tab"
                      >
                        Tout
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        aria-selected={navPills === 2}
                        className={classnames("mb-sm-3 mb-md-0", {
                          active: navPills === 2
                        })}
                        onClick={e => toggleNavs(e, "navPills", 2, "payé")}
                        href="#payés"
                        role="tab"
                      >
                        Payés
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                        aria-selected={navPills === 3}
                        className={classnames("mb-sm-3 mb-md-0", {
                          active: navPills === 3
                        })}
                        onClick={e => toggleNavs(e, "navPills", 3, "impayé")}
                        href="#impayés"
                        role="tab"
                      >
                        Impayés
                      </NavLink>
                    </NavItem>
                  </Nav>
                  </Row>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">N° Facture</th>
                      <th scope="col">Période Facture</th>
                      <th scope="col">Montant initial</th>
                      <th scope="col">Solde Facture</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                  {factureSelection.map((d, index) => {
                      return (<tr key={index}>
                                <td>{d.numfacture}</td>
                                <td>{/*d.periode*/}Juin 2021</td>
                                <td>{d.montantfacture}</td>
                                <td>{d.soldefactures}</td>
                                <td>{(d.etatfacture != "S") ? <Button color="success" size="sm">Payer</Button> : <Button color="info" size="sm">Reçu</Button>}</td>
                            </tr>)
                    })}
                  </tbody>
                </Table>
              </Card>
            </Col>
            {/*<Col xl="4">
              <Card className="shadow">
                <CardHeader className="bg-transparent">
                  <Row className="align-items-center">
                    <div className="col">
                      <h6 className="text-uppercase text-muted ls-1 mb-1">
                        Performance
                      </h6>
                      <h2 className="mb-0">Consommation</h2>
                    </div>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="chart">
                    <Bar
                      data={chartExample2.data}
                      options={chartExample2.options}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>*/}
          </Row>
        </Container>
      </>
    );
}

export default Index;
