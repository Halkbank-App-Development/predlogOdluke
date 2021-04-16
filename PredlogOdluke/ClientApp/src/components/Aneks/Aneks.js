import React, { Component, useState } from 'react';
import uuid from 'react-uuid';
import Button from "react-bootstrap/Button"

export class Aneks extends Component {
    static displayName = Aneks.name;

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            today: new Date().toLocaleDateString(),
            userisvalid: true,
            userChecked: false,
            vrstaPlasmana: [],
            selectedItems: [],
            predlogIzmene: [],
            predlogIzmeneList: [],
            vrabotenID: 0,
            items: [{ id: uuid(), predlogValue2: "", predlogValue3: "", predlogValue1: "" }]
        };
    }

    validateUser = async () => {
        //debugger;
        if (!this.state.userChecked) {
            const response = await fetch('home/ValidateUser/');
            const data = await response.json();
            console.log(data);
            this.setState({vrabotenID: data.code });
        };
    }

    addListItem = () => {
        const newItem = { id: uuid(), predlogValue1: "", predlogValue2: "", predlogValue3: "" };
        this.setState({
            items: [...this.state.items, newItem]
        });
    };

    onInputChange = e => {
        let req = this.state.items;
        console.log("items->", this.state.items);
        for (let i = 0; i < req.length; i++) {
            if (req[i].id === e.target.id) {
                req[i].predlogValue2 = e.target.name === "predlogValue2" ? e.target.value : req[i].predlogValue2;
                req[i].predlogValue3 = e.target.name === "predlogValue3" ? e.target.value : req[i].predlogValue3;
                req[i].predlogValue1 = e.target.name === "predlogValue1" ? e.target.value : req[i].predlogValue1;
            }
        }
        this.setState({ items: req })
    };

    createList = (list) => {
        const { items } = this.state;
        return items.map(item => {
            return (
                <div className="form-row">
                    <div className="form-group col-md-4">
                        Uslovi plasmana koji se aneksiraju:
                                 <select id={item.id} className="form-control" name="predlogValue1" defaultValue="Vrsta kreditnog zahteva:" onChange={this.onInputChange}>
                            {list}
                        </select>
                    </div>
                    <div className="form-group col-md-4">
                        Važeći uslovi
                                    <input id={item.id} onChange={this.onInputChange} value={item.predlogValue2} type="text" className="form-control" name="predlogValue2" />
                    </div>
                    <div className="form-group col-md-4">
                        Predloženi uslovi
                                    <input id={item.id} onChange={this.onInputChange} value={item.predlogValue3} type="text" className="form-control" name="predlogValue3" />
                    </div>
                </div>
            );
        });
    };

    clearFields() {
        this.refs['filijala'].value = "";
        this.refs['crm'].value = "";
        this.refs['segment'].value = "";
        this.refs['brzahteva'].value = "";
        this.refs['adresa'].value = "";
        this.refs['krajnjivlasnik'].value = "";
        this.refs['maticnibroj'].value = "";
        this.refs['nazivklijenta'].value = "";
        this.refs['sifraK'].value = "";
    }

    getInfo = async () => {
        debugger;
        if (this.refs['brzahteva'].value !== "") {
            const response = await fetch('home/GetInfo?brzahteva=' + this.refs['brzahteva'].value);
            const data = await response.json();

            console.log(data);

            if (Object.keys(data).length !== 0) {
                this.refs['filNaziv'].value = data[0].filNaziv;
                this.refs['cRM'].value = data[0].cRM;
                this.refs['segment'].value = data[0].segment;
                this.refs['sifraK'].value = data[0].sifraK;
                this.refs['adresa'].value = data[0].adresa;
                this.refs['krajnjiVlasnik'].value = data[0].krajnjiVlasnik + '-' + data[0].procenatUdela + '/' + data[1].krajnjiVlasnik + '-' + data[1].procenatUdela + '/' + data[2].krajnjiVlasnik + '-' + data[2].procenatUdela + '/' + data[3].krajnjiVlasnik + '-' + data[3].procenatUdela;
                this.refs['maticniBroj'].value = data[0].maticniBroj;
                this.refs['nazivKlijenta'].value = data[0].nazivKlijenta;
                this.refs['datumInicijalneOdluke'].value = data[0].datumInicijalneOdluke;
                /*
                 this.refs['kamStopa'].value = data[0].kamStopa;
                 this.refs['nakadaObrada'].value = data[0].nakadaObrada;
                 this.refs['naknadaRizik'].value = data[0].naknadaRizik;
                 this.refs['krajnjiRok'].value = data[0].krajnjiRok;
                 this.refs['obezbedjenje'].value = data[0].obezbedjenje;
                 */
                this.refs['nazivBrojGPL'].value = data[0].nazivBrojGPL;
                this.refs['predlagac1'].value = data[0].cRM;
                this.refs['partija'].value = data[0].partija;
                this.refs['brojZahteva'].value = this.refs['brzahteva'].value;
                this.refs["stanjeGDuga"].value = data[0].stanjeGDuga;
                this.refs["datumUgovora"].value = data[0].datumUgovora;
            }
            else {
                alert("Za unet broj zahteva ne postoje podaci u bazi !!");
                this.clearFields();

            }
        }
        else {
            alert("Morate uneti broj zahteva !!")
        }
    };

    getvrstaPlasmana = async () => {
        //   debugger;
        const response = await fetch('home/GetVrstaZahteva/');
        const data = await response.json();

        if (Object.keys(data).length !== 0) {
            this.setState({ vrstaPlasmana: data });
        }
        else {
            alert("Nije uspelo povlacenje podataka za Vrstu Zahteva !!");
        }
        console.log(this.state.vrstaPlasmana);
    }

    getPredlogIzmeneList = async () => {
        // debugger;
        const response = await fetch('home/GetPredlogIzmeneList/');
        const data = await response.json();

        if (Object.keys(data).length !== 0) {
            this.setState({ predlogIzmeneList: data });
        }
        else {
            alert("Nije uspelo povlacenje podataka za Vrstu Zahteva !!");
        }
        console.log('predlogIzmeneList', this.state.predlogIzmeneList);
    }

    getPredlogIzmene = async () => {
        // debugger;
        const response = await fetch('home/GetPredlogIzmene/');
        const data = await response.json();

        if (Object.keys(data).length !== 0) {
            this.setState({ predlogIzmene: data });
        }
        else {
            alert("Nije uspelo povlacenje podataka za Vrstu Zahteva !!");
        }
        console.log('predlogIzmene', this.state.predlogIzmene);
    }

    handleSubmit = async (event) => { /* it wrks !!*/
        const formData = new FormData(event.target);
        event.preventDefault();

        let data = {};

        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }

        data.tip = 0;

        data.predlog = this.state.items;

        console.log('data ->> ', data);
        debugger;

        const response =
            await
                fetch('home/PostData/', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                })

        const _data = await response.json();
        console.log(_data);
    }

    componentDidMount() {
        this.getvrstaPlasmana();
        this.getPredlogIzmeneList();
    }

    render() {
        const { vrstaPlasmana, predlogIzmeneList } = this.state;
        let listZahtev = vrstaPlasmana.length > 0
            && vrstaPlasmana.map((item, i) => {
                return (
                    <option key={i} value={item.vrstaZahteva}>{item.vrstaZahteva}</option>
                )
            })
        debugger;
        let predlog = predlogIzmeneList.length > 0
            && predlogIzmeneList.map((item, i) => {
                return (
                    <option key={i} value={item.predlogIzmenee}>{item.predlogIzmenee}</option>
                )
            })


        console.log('test predlog ->>', predlog);
        console.log('test - listZahtev -->>', listZahtev);

        return (

            <form onSubmit={this.handleSubmit}>
                <fieldset>
                    <h3 style={{ "textAlign": "center" }}>
                        Odluka o odobrenju plasmana - Aneks
                        </h3>
                    <div>
                        <label style={{ "float": "right", "paddingTop": "0px", "display": "block", }}> Datum predloga odluke:<input type="text" value={this.state.today} className="form-control" readOnly /> </label>
                    </div>
                </fieldset>
                <br />
                <br />
                <fieldset>
                    <div className="card col-12 col-lg-4 login-card mt-2 hv-center" style={{ "float": "left", "paddingLeft": "5px", "paddingRight": "5px", "paddingTop": "0px", "display": "block" }}>
                        <div>
                            Broj zahteva <input type="number"
                                className="form-control"
                                ref="brzahteva"
                                ref="brzahteva"
                                onBlur={event => {
                                    this.getInfo();
                                }} />
                        </div>
                        <br />
                        <div>
                            Naziv klijenta <input type="text" className="form-control" ref="nazivKlijenta" name="nazivKlijenta" readOnly />
                        </div>
                        <br />
                        <div>
                            Maticni broj <input type="text" className="form-control" ref="maticniBroj" name="maticniBroj" readOnly />
                        </div>
                        <br />
                        <div>
                            Sifra klijenta <input type="number" name="sifraK" name="sifraK" ref="sifraK" className="form-control" readOnly />
                        </div>
                        <br />
                        <div>
                            Segment klijenta <input type="text" className="form-control" name="segment" ref="segment" readOnly />
                        </div>
                        <br />
                    </div>

                    <div className="card col-12 col-lg-4 login-card mt-2 hv-center" style={{ "float": "right", "paddingLeft": "5px", "paddingRight": "5px", "paddingTop": "0px", "display": "block" }}>

                        <div>
                            Naziv i broj GPL <input type="text" className="form-control" ref="nazivBrojGPL" name="nazivBrojGPL" readOnly />
                        </div>
                        <br />
                        <div>
                            Adresa i mesto <input type="text" className="form-control" ref="adresa" name="adresa" readOnly />
                        </div>
                        <br />
                        <div>
                            Krajnji vlaskik/vlasnici <input type="text" className="form-control" ref="krajnjiVlasnik" name="krajnjiVlasnik" readOnly />
                        </div>
                        <br />
                        <div>
                            Filijala / ekspozitura <input type="text" className="form-control" ref="filNaziv" name="filNaziv" readOnly />
                        </div>
                        <br />
                        <div>
                            CRM <input type="text" className="form-control" ref="cRM" name="cRM" readOnly />
                        </div>
                        <br />
                    </div>

                </fieldset>
                <br />
                <br />
                <fieldset>
                    <div>
                        <br />
                        <h4>Podaci o plasmanu koji se aneksira</h4>
                        <br />
                        <div >
                            Vrsta plasmana:
                                  <select className="form-control" name="vrstaPlasmana">
                                {listZahtev}
                            </select>
                        </div>
                        <br />
                        <div className="form-row">
                            <div className="form-group col-md-12">
                                Partija: <input type="text" className="form-control" ref="partija" name="partija" />
                            </div>
                        </div>
                        <br />
                        <div className="form-row">
                            <div className="form-group col-md-12">
                                Stanje glavnog duga plasmana: <input type="text" className="form-control" ref="stanjeGDuga" name="stanjeGDuga" />
                            </div>
                        </div>
                        <br />
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                Kamatna stopa: <input type="text" className="form-control" ref="kamStopa" name="kamStopa" />
                            </div>
                            <div className="form-group col-md-4">
                                Naknada za obradu: <input type="text" className="form-control" ref="naknadaObrada" name="naknadaObrada" />
                            </div>
                            <div className="form-group col-md-4">
                                Naknada za rizik: <input type="text" className="form-control" ref="naknadaRizik" name="naknadaRizik" />
                            </div>
                        </div>
                        <br />
                        <div className="form-row">
                            <div className="form-group col-md-12">
                                Krajnji rok otplate (važnosti) plasmana: <input type="text" className="form-control" ref="krajnjiRok" name="krajnjiRok" />
                            </div>                          
                        </div>
                        <br />
                        <div className="form-row">
                            <div className="form-group col-md-12">
                                Obezbeđenje: <input type="text" className="form-control" ref="obezbedjenje" name="obezbedjenje" />
                            </div>
                        </div>
                        <br />
                        <div className="form-row">
                            <div className="form-group col-md-4">
                                Broj zahteva: <input type="text" className="form-control" ref="brojZahteva" name="brojZahteva" />
                            </div>
                            <div className="form-group col-md-4">
                                Datum ugovora: <input type="text" className="form-control" ref="datumUgovora" name="datumUgovora" />
                            </div>
                            <div className="form-group col-md-4">
                                Datum inicijalne odluke: <input type="text" className="form-control" ref="datumInicijalneOdluke" name="datumInicijalneOdluke" />
                            </div>
                        </div>
                    </div>
                </fieldset>
                <br />
                <br />
                <fieldset>
                    <h4>Predlog izmene ugovorenih uslova</h4>
                    <br />
                    <div>
                        {this.createList(predlog)}
                        <Button type="button" variant="secondary" style={{ "font-style": "bold" }} onClick={this.addListItem}>+</Button>
                    </div>
                </fieldset>
                <br />
                <br />
                <fieldset>
                    <div style={{ "float": "left", "display": "inline-block" }}>
                        <label > Posebni uslovi: <textarea className="form-control" type="text" rows="5" cols="200" name="poosebniUslovi" placeholder="Unesite posebne uslove" /> </label>
                        <br />
                    </div>
                </fieldset>
                <br />
                <br />
                <fieldset>
                    <div className="form-row">
                        <div className="form-group col-md-12">
                            <textarea className="form-control" ref="napomena" name="napomena" placeholder="Unesite napomenu" />
                        </div>
                    </div>
                </fieldset>
                <br />
                <br />
                <fieldset>
                    <h4>Predlagaci:</h4>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <input type="text" className="form-control" ref="predlagac1" name="predlagac1" readOnly />
                        </div>
                        <div className="form-group col-md-6">
                            <input type="text" className="form-control" ref="predlagac2" name="predlagac2" value="Predrag Dzunic" readOnly />
                        </div>
                    </div>
                </fieldset>
                <br />
                <br />
                <fieldset>
                    <div>
                        <Button type="submit" varian="primary"> Unesi podatke </Button>
                    </div>
                </fieldset>
                <br />
                <br />
                <div >
                    <label > Datum donosenja odluke : <input className="form-control" type="text" value={this.state.today} readOnly /> </label>
                    <br />
                    <label >Rok vaznosti odluke : <input className="form-control" type="text" value="90 dana" readOnly /> </label>
                </div>

            </form>


        );
    }
}
