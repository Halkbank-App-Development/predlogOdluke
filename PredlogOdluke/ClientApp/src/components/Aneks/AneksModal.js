import React, { Component } from 'react';
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Col from "react-bootstrap/Col"
import Table from "react-bootstrap/Table";
import _ from "lodash"


export default function AneksModal(props) {
    console.log('modal - props ! ->>', props);
    const closeModal = () => props.closeModal();
    // const setChange = (type, value) => { props.setChange(type, value) };
    const handleModalClose = (_data) => props.handleModalClose(_data);
    const validateOdluka = (data) => props.validateOdluka(data);
    const setChange = (type, value, colid) => { props.setChange(type, value, colid) };


    const setPredlogvalue2 = (e, colid) => {
        setChange(1, e.target.value, colid); e.autoFocus = true
    };
    const setPredlogvalue3 = (e, colid) => { setChange(2, e.target.value, colid); e.autoFocus = true };

    const setUslovi = (e) => { setChange(3, e.target.value, 0); e.autoFocus = true };
    const setNapomena = (e) => { setChange(4, e.target.value, 0); e.autoFocus = true };


    const GetDocumentButton = () => {
        return (
            <Button variant="info" onClick={(e) => {
                alert('test dugme za generisanje dokumenta :) ');
            }}>
                Preuzmi dokument
            </Button>
        )
    }

    const GetTableData = () => {
        if (props.predlogIzmene.length === 0) {
            return (
                <tr>
                    <td colSpan="3">Za ovaj predlog odluke nisu popunjeni podaci za predlog izmene !!</td>
                </tr>
            )
        }
        else {
            return props.predlogIzmene.map((predlogIzmene, index) => {
                const { columnID, predlogValue1, predlogValue2, predlogValue3 } = predlogIzmene;
                if (props.helpFocus === 1)
                    return (
                        <React.Fragment key={columnID}>
                            <tr>
                                <td>
                                    <input className="form-control" value={predlogValue1} readOnly />
                                </td>
                                <td >
                                    <input className="form-control" value={predlogValue2} autoFocus={true} onChange={(e) => setPredlogvalue2(e, columnID)} />
                                </td>
                                <td>
                                    <input className="form-control" value={predlogValue3} onChange={(e) => setPredlogvalue3(e, columnID)} />
                                </td>
                            </tr>
                        </React.Fragment>
                    )
                else
                    return (
                        <React.Fragment key={columnID}>
                            <tr>
                                <td>
                                    <input className="form-control" value={predlogValue1} readOnly />
                                </td>
                                <td >
                                    <input className="form-control" value={predlogValue2} onChange={(e) => setPredlogvalue2(e, columnID)} />
                                </td>
                                <td>
                                    <input className="form-control" value={predlogValue3} autoFocus={true} onChange={(e) => setPredlogvalue3(e, columnID)} />
                                </td>
                            </tr>
                        </React.Fragment>
                    )
            })
        }
    }

    const ChangeButton = () => {
        if ((props.itemData.statusID === 0) || (props.itemData.statusID === 1) || (props.itemData.statusID === 2) || (props.itemData.statusID === 3)) {
            return (
                <Button variant="primary" onClick={(e) => {
                    if (window.confirm('Da li ste sigurni da želite da izmenite podatke ? '))
                        handleModalClose(props.itemData)
                }}>
                    Izmeni
                </Button>
            )
        }
        else {
            return (<em></em>)
        }
    }

    const ValidateButton = () => {
        if ((props.itemData.statusID === 0) || (props.itemData.statusID === 1) || (props.itemData.statusID === 4)) {
            return (
                <Button variant="success" onClick={(e) => {
                    if (window.confirm('Da li ste sigurni da želite da validirate odluku ?'))
                        validateOdluka(props.itemData);
                }}>
                    Verifikuj
                </Button>
            )
        }
        else {
            return (<em></em>)
        }
    }

    const CreateButton = () => {
        if (props.itemData.statusID === 6) {
            return (
                <Button variant="success" onClick={(e) => {
                    if (window.confirm('Da li ste sigurni da želite da krairate odluku ?')) {
                        alert('Uspesno ste kreirali odluku !');
                        /*dodaj poziv metode za kreiranje odluke*/
                    }
                }}>
                    Kreiraj odluku
                </Button>
            )
        }
        else {
            return (<em></em>)
        }
    }

    const ApproveButton = () => {/*bo*/
        if (props.itemData.statusID === 5) {
            return (
                <Button variant="success" onClick={(e) => {
                    if (window.confirm('Da li ste siguri da želite da odobrite odluku ? ')) {
                        alert('Odluka odobrena !');
                    }
                }}>
                    Odobri odluku
                </Button>
            )
        }
        else {
            return (<em></em>)
        }
    }

    const RejectButton = () => {
        if (props.itemData.statusID === 5) {
            return (
                <Button variant="danger" onClick={(e) => {
                    if (window.confirm('Da li ste sigurni da želite da odbijete odluku ? ')) {
                        alert('Odluka odbijena !');
                    }
                }}>
                    Odbij odluku
                </Button>
            )
        }
        else {
            return (<em></em>)
        }
    }

    return (
        <>
            <Modal
                show={props.modal}
                onHide={closeModal}
                size="xl"
                backdrop="static"
                centered
                keyboard={false}
                aria-labelledby="example-modal-sizes-title-xl"
            >

                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-xl">
                        Pregled i izmena predloga odluke - Aneks
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <h5>Podaci o klijentu</h5>
                        <hr />
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Naziv klijenta:</Form.Label>
                                <Form.Control autoFocus value={!props.itemData.nazivKlijenta ? "" : props.itemData.nazivKlijenta} readOnly />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Maticni broj:</Form.Label>
                                <Form.Control value={!props.itemData.maticniBroj ? "" : props.itemData.maticniBroj} readOnly />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Sifra klijenta:</Form.Label>
                                <Form.Control value={!props.itemData.sifraK ? "" : props.itemData.sifraK} readOnly />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Adresa i mesto:</Form.Label>
                                <Form.Control value={!props.itemData.adresa ? "" : props.itemData.adresa} readOnly />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Krajnji vlasnik/vlasnici:</Form.Label>
                                <Form.Control value={!props.itemData.krajnjiVlasnik ? "" : props.itemData.krajnjiVlasnik} readOnly />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Filijana/ekspozitura:</Form.Label>
                                <Form.Control value={!props.itemData.filNaziv ? "" : props.itemData.filNaziv} readOnly />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>CRM:</Form.Label>
                                <Form.Control value={!props.itemData.cRM ? "" : props.itemData.cRM} readOnly />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Broj zahteva:</Form.Label>
                                <Form.Control value={!props.itemData.brojZahteva ? "" : props.itemData.brojZahteva} readOnly />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Segment klijenta:</Form.Label>
                                <Form.Control value={!props.itemData.segment ? "" : props.itemData.segment} readOnly />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Naziv i broj GPL:</Form.Label>
                                <Form.Control value={!props.itemData.nazivBrojGPL ? "" : props.itemData.nazivBrojGPL} readOnly />
                            </Form.Group>
                        </Form.Row>
                        <hr />
                        <h5>Podaci o plasmanu koji se aneksira</h5>
                        <hr />
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Vrsta plasmana:</Form.Label>
                                <Form.Control value={!props.itemData.vrstaPlasmana ? "" : props.itemData.vrstaPlasmana} readOnly />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Partija:</Form.Label>
                                <Form.Control value={!props.itemData.partija ? "" : props.itemData.partija} readOnly />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Stanje glavnog duga plasmana:</Form.Label>
                                <Form.Control value={!props.itemData.stanjeGDuga ? "" : props.itemData.stanjeGDuga} readOnly />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Kamatna stopa:</Form.Label>
                                <Form.Control value={!props.itemData.kamStopa ? "" : props.itemData.kamStopa} readOnly />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Naknada za obradu:</Form.Label>
                                <Form.Control value={!props.itemData.naknadaObrada ? "" : props.itemData.naknadaObrada} readOnly />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Naknada za rizik:</Form.Label>
                                <Form.Control value={!props.itemData.naknadaRizik ? "" : props.itemData.naknadaRizik} readOnly />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Krajnji rok otplate (važnosti) plasmana:</Form.Label>
                                <Form.Control value={!props.itemData.krajnjiRok ? "" : props.itemData.krajnjiRok} readOnly />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Obezbedjenje:</Form.Label>
                                <Form.Control value={!props.itemData.obezbedjenje ? "" : props.itemData.obezbedjenje} readOnly />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Broj zahteva:</Form.Label>
                                <Form.Control value={!props.itemData.brojZahteva ? "" : props.itemData.brojZahteva} readOnly />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Datum ugovora:</Form.Label>
                                <Form.Control value={!props.itemData.datumUgovora ? "" : props.itemData.datumUgovora} readOnly />
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Datum inicijalne odluke:</Form.Label>
                                <Form.Control value={!props.itemData.datumInicijalneOdluke ? "" : props.itemData.datumInicijalneOdluke} readOnly />
                            </Form.Group>
                        </Form.Row>
                        <hr />
                        <Form.Row>
                            <Form.Label>Posebni uslovi:</Form.Label>
                            <Form.Control value={!props.itemData.poosebniUslovi ? "" : props.itemData.poosebniUslovi} onChange={setUslovi} />
                        </Form.Row>
                        <hr />
                        <Form.Row>
                            <Form.Label>Napomena:</Form.Label>
                            <Form.Control value={!props.itemData.napomena ? "" : props.itemData.napomena} onChange={setNapomena} />
                        </Form.Row>
                        <hr />
                        <h5>Predlog izmene postojecih uslova</h5>
                        <hr />
                    </Form>

                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Uslovi plasmana koji se aneksiraju</th>
                                <th>Važeći uslovi</th>
                                <th>Predloženi uslovi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <GetTableData />
                        </tbody>
                    </Table>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Zatvori
                       </Button>
                    <ChangeButton />
                    <ValidateButton />
                    <GetDocumentButton />
                    <CreateButton />
                    <ApproveButton />
                    <RejectButton />
                </Modal.Footer>

            </Modal>
        </>
    );
}