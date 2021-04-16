import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MyTable from "./DataTable"
import AneksModal from './Aneks/AneksModal';
import CustomeAlert from './Alert';
import _ from "lodash"

export class DataPreview extends Component {
    static displayName = DataPreview.name;


    constructor(props) {
        super(props);
        this.state = {
            predlogIzmene: {},
            testKlijent: '',
            podaci: [],
            userisvalid: true,
            userChecked: false,
            vrabotenID: 0,
            show: false,
            modal: false,
            refresh: false,
            id: 0,
            respData: {},
            respDataDB: {},
            showAlert: false,
            alertText: "",
            alertVariant: "",
            helpFocus: 0
        };
    }

    setChange = (type, value, colid) => {
        debugger;
        let p = this.state.predlogIzmene;
        let podaci = this.state.podaci;

        if (type == 1) p[colid].predlogValue2 = value;
        if (type == 2) p[colid].predlogValue3 = value;
        if (type == 3) podaci.poosebniUslovi = value;
        if (type == 4) podaci.napomena = value;

        this.setState({ predlogIzmene: p, helpFocus: type, podaci: podaci })
        console.log('test ->', value);
    }

    validateUser = async () => {
        //debugger;
        if (!this.state.userChecked) {
            const response = await fetch('home/ValidateUser/');
            const data = await response.json();
            console.log(data);
            this.setState({ userisvalid: data.validity, userChecked: true, vrabotenID: data.code });
        };
    }

    setAlertClose = () => { this.setState({ showAlert: false }) };

    showAlert() {
        return (
            <CustomeAlert alertHeading={this.state.alertVariant === "danger" ? "GRESKA" : "INFO"} alertBody={this.state.alertText} show={true} setAlertClose={this.setAlertClose} alertVariant={this.state.alertVariant} />
        );
    }

    getPredlogIzmene = async (brZahteva) => {
        debugger;
        const response = await fetch('home/GetPredlogIzmene?brojZahteva=' + brZahteva);
        const data = await response.json();
        this.setState({ predlogIzmene: data });
    }


    getInfo = removeAlert => async () => {
        debugger;
        this.getPredlogIzmene();
        if (this.refs["status"].value !== "" || this.refs["brZahteva"].value !== "") {
            const response = await fetch('home/GetAneksData?status=' + this.refs["status"].value);
            const data = await response.json();
            data.predlog = this.state.predlogIzmene;
            this.setState({ podaci: data, show: true, refresh: true, showAlert: removeAlert ? false : this.showAlert });
        }
        else {
            this.setState({ showAlert: true, alertText: "Niste popunili status / broj zahteva!", alertVariant: "danger" })
        }

    };

    callValidation = async (_dat) => {
        //  debugger;
        const response =
            await
                fetch('home/ValidateOdluka/', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(_dat)
                })
        const data = await response.json();
        this.setState({ refresh: false, showAlert: true, alertText: data.statusMessage, alertVariant: data.status ? "success" : "danger" });
    }

    validateOdluka = (_dat) => {
        this.callValidation(_dat);
        this.setState({ modal: false, refresh: true });
    }

    callAction = async (_data) => {
        //  debugger;
        _data.tip = 1;
        _data.radnik = this.state.vrabotenID;
        const response =
            await
                fetch('home/PostData/', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(_data)
                })
        const dataP = await response.json();
        this.setState({ refresh: false, showAlert: true, alertText: dataP.statusMessage, alertVariant: dataP.status ? "success" : "danger" });
    }

    handleModalClose = (_data) => {
        debugger;
        this.callAction(_data);
        this.setState({ modal: false, refresh: true });
    }

    passValue = (id) => {
        debugger;
        let res;
        for (let i = 0; i < this.state.podaci.length; i++) {
            if (this.state.podaci[i].brojZahtreva === id) {
                res = this.state.podaci[i];
            }
        }
        let res2 = _.cloneDeep(res);

        this.getPredlogIzmene(res.brojZahteva)
        debugger;

        this.setState({ respData: res, respDataDB: res2, modal: true, id: id });

    };

    handleClose = () => {
        this.setState({ modal: false, refresh: true, helpFocus: 0 });
    }

    setAlertClose = () => { this.setState({ showAlert: false }) };

    showModal() {
        return (
            <AneksModal id={this.state.id} predlogIzmene={this.state.predlogIzmene} helpFocus={this.state.helpFocus} closeModal={this.handleClose} itemData={this.state.respData} modal={this.state.modal} modalData={this.getModalData} setChange={this.setChange} handleModalClose={this.handleModalClose} validateOdluka={this.validateOdluka} />
        );
    }

    showTable(podaci) {
        return (
            <MyTable data={podaci} passValue={this.passValue} />
        );
    }

    render() {
        let text = "";
        this.validateUser();

        let uservalidText = this.state.userChecked ? "Nemate prava na korišćenje ove aplikacije! Obratite se Aplication Support timu!" : "";
        if (this.state.show) {
            text = this.state.podaci.length === 0 ? "Za navedene uslove pretrage ne postoje rezultati" : "";
        }
        console.log('text ->>', text);
        let contents = this.state.podaci.length === 0
            ? <p><em>{text}</em></p>
            : this.showTable(this.state.podaci);

        let contentsModal = this.state.modal
            ? this.showModal() : <p><em></em ></p>

        let alert = !this.state.showAlert ? <></> : this.showAlert();

        let fullConent = !this.state.userChecked
            ? <h3>{uservalidText}</h3>
            :
            <>
                {alert}
                <br />
                <h3 id="pageLabel" >Pregled unetih predloga odluke</h3>
                <br />

                <div>
                    <table>
                        <tbody>
                            <tr>
                                <td>Status</td>
                                <th>

                                    <select className="form-control" ref="status">
                                        <option value="-1">...svi statusi...</option>
                                        <option value="0">Unet</option>
                                        <option value="1">Vraćen na doradu</option>
                                        <option value="2">Kreditna analiza</option>
                                        <option value="3">Kreditni risk</option>
                                        <option value="4">Čeka na verifikaciju</option>
                                        <option value="5">KO - Poslat</option>
                                        <option value="6">KO - Odobren</option>
                                        <option value="7">KO - Odbijen</option>
                                    </select>
                                </th>
                            </tr>
                            <tr>
                                <td>Broj Zahteva</td>
                                <th><input type="text" className="form-control" ref="brZahteva" placeholder="Unesite broj zahteva" /></th>
                            </tr>
                            <tr>
                                <th>
                                    <Link to={'/Aneks/Aneks'}>
                                        <button className="btn btn-primary"  >Unesi novi Aneks </button>
                                    </Link>
                                </th>
                                <th>
                                    <Link to={'/Home'}>
                                        <button className="btn btn-primary" title="Ova opcija trneutno nije dostupna" disabled>Unesi novi ovkirni predlog </button>
                                    </Link>
                                </th>
                            </tr>
                            <br />
                            <tr>
                                <td> <button className="btn btn-primary" onClick={this.getInfo(true)} >Pretraži</button></td>
                            </tr>
                        </tbody>
                    </table>
                    <br />
                </div>
                {contents}
                {contentsModal}
            </>
        if (this.state.refresh) this.getInfo(false);

        return (
            <div>
                {fullConent}
            </div>
        );
    }
}
