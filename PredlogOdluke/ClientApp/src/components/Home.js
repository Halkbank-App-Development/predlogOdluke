import React, { Component } from 'react';

export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            today: new Date().toLocaleDateString(),
            userisvalid: true,
            userChecked: false,
            vrstaZahteva: [],
            tipPosla: []

        };
    }

    clearKlijentFields() {
        this.refs['adresa'].value ="";
        this.refs['krajnjivlasnik'].value = "";
        this.refs['maticnibroj'].value = "";
        this.refs['nazivklijenta'].value = "";
        this.refs['sifraK'].value = "";
    }

    clearFilijalaFields() {
        this.refs['filijala'].value ="";
        this.refs['crm'].value = "";
        this.refs['segment'].value = "";
        this.refs['brzahteva'].value = "";
    }

    validateUser = async () => {
       // debugger;
        if (!this.state.userChecked) {
            const response = await fetch('home/ValidateUser');
            const data = await response.json();
            this.setState({
                userisvalid: data.validity,
                userChecked: true,
                vrabotenID: data.code
            });
        };
    }

    getKlijent = async () => {
        //debugger;
        if (this.refs['sifraK'].value !== "") {
            const response = await fetch('home/GetKlijent?sifraK=' + this.refs['sifraK'].value);
            const data = await response.json();

            console.log(data[0]);
            console.log(data[1]);

            if (Object.keys(data).length !== 0) {
                this.refs['adresa'].value = data[0].adresa;
                this.refs['krajnjivlasnik'].value = data[0].krajnjiVlasnik + '-' + data[0].procenatUdela +'/'+ data[1].krajnjiVlasnik + '-' + data[1].procenatUdela;
                this.refs['maticnibroj'].value = data[0].maticniBroj;
                this.refs['nazivklijenta'].value = data[0].nazivKlijenta;
            }
            else {
                alert("Za unetu sifru klijenta ne postoje podaci u bazi !!");
                this.refs['sifraK'].value = "";
            }
        }
        else {
            alert("Morate uneti siftu klijenta !!")
        }
    };

    getFilijala = async () => {
        //debugger;
        if (this.refs['brzahteva'].value !== "") {
            const response = await fetch('home/GetFilijala?brzahteva=' + this.refs['brzahteva'].value);
            const data = await response.json();

            console.log(data[0]);

            if (Object.keys(data).length !== 0) {
                this.refs['filijala'].value = data[0].filNaziv;
                this.refs['crm'].value = data[0].crm;
                this.refs['segment'].value = data[0].segment;
            }
            else {
                alert("Za unet broj zahteva ne postoje podaci u bazi !!");
                this.clearFilijalaFields();
            }
        }
        else {
            alert("Morate uneti broj zahteva !!")
        }
    };

    //async handleSubmit(e) {
    //    debugger;
    //    const data = new FormData(e.target); /* ?? */
    //    e.preventDefault();
    //    console.log(JSON.stringify(data));
    //    if (Object.keys(data).length !== 0) {

    //        fetch('home/PutData', {
    //            method: 'POST',
    //            body: data,
    //        });
    //    }
    //    else {
    //        alert("Nisu popunjeni podaci!");
    //    }
    //}

    handleSubmit = async (event) => { /* it wrks !!*/
      // debugger;
       // console.log(event.target[0].value)
        const formData  = new FormData(event.target);
        event.preventDefault();

        let data = {};

        for (let [key, value] of formData.entries()) {
            //console.log(key, value);
            data[key] = value;
       }
       let newData = JSON.stringify({
           adresa: data.adresa,
           crm: data.crm,
           dinamikaNaplate: data.dinamikaNaplate,
           dinaminaOtplate: data.dinaminaOtplate,
           filijala: data.filijala,
           grecePeriod: data.grecePeriod,
           izlosenostPre: data.izlosenostPre,
           izlozenostPosle: data.izlozenostPosle,
           iznos: data.iznos,
           kamantnaSFix: data.kamantnaSFix,
           korisnikGarancije: data.korisnikGarancije,
           krajnjivlasnik: data.krajnjivlasnik,
           kurs: data.kurs,
           maticnibroj: data.maticnibroj,
           minimum: data.minimum,
           monitoringPlasmana: data.monitoringPlasmana,
           nacinOtplate: data.nacinOtplate,
           naknadaPlasman: data.naknadaPlasman,
           naknadaPrevremena: data.naknadaPrevremena,
           naknadaRizik: data.naknadaRizik,
           naknadaZaObradu: data.naknadaZaObradu,
           namena: data.namena,
           naziviBrojGPL: data.naziviBrojGPL,
           nazivklijenta: data.nazivklijenta,
           obavezaUApsIzn: data.obavezaUApsIzn,
           periodicnostNaplate: data.periodicnostNaplate,
           plasmanDimanika: data.plasmanDimanika,
           plasmanMin: data.plasmanMin,
           ppDinamika: data.ppDinamika,
           ppMIn: data.ppMIn,
           ppPenali: data.ppPenali,
           ppPosebniUslovi: data.ppPosebniUslovi,
           prevremenaDinamika: data.prevremenaDinamika,
           prevremenaMin: data.prevremenaMin,
           rizikDimanika: data.rizikDimanika,
           rizikMin: data.rizikMin,
           rocnost: data.rocnost,
           segment: data.segment,
           sifraK: data.sifraK,
           tipPosla: data.tipPosla,
           ugoboreniPlatniPromet: data.ugoboreniPlatniPromet,
           valuta: data.valuta,
           valutnaK: data.valutnaK,
           variabilniDeo: data.variabilniDeo,
           vrstaZahteva: data.vrstaZahteva
       });
       console.log(newData);

       const response =
           await
               fetch('home/PostData/', {
                   method: 'POST',
                   headers: {
                       'Accept': 'application/json',
                       'Content-Type': 'application/json',
                   },
                   body: newData
               })

        const _data = await response.json();
        alert("Podaci uspesno uneti u bazu ! ");

      // console.log(newData);
       console.log(_data);
    }

    handleChange(event) {
        const output = parseFloat(event.target.value) * 0.1
        event.target.value = output;
    }

    getVrstaZahteva = async () => {
        //debugger;
        const response = await fetch('home/GetVrstaZahteva');
        const data = await response.json();

        if (Object.keys(data).length !== 0) {
            this.setState({ vrstaZahteva: data });
        }
        else {
            alert("Nije uspelo povlacenje podataka za Vrstu Zahteva !!");
        }
        console.log(this.state.vrstaZahteva);
    }

    getTipPosla = async () => {
        //debugger;
        const response = await fetch('home/GetTipPosla');
        const data = await response.json();

        console.log(data);

        if (Object.keys(data).length !== 0) {
            this.setState({ tipPosla: data });
        }
        else {
            alert("Nije uspelo povlacenje pdoataka za Tip Posla !!");
        }
    }

    componentDidMount() {
        this.getVrstaZahteva();
        this.getTipPosla();
    }

    //handleDropDown = event => {
    //    this.setState(
    //        {
    //            [event.target.name]: event.target.value,
    //            result: null
    //        },
    //        this.vrstaZahteva
    //    );
    //};

    render() {

        const { vrstaZahteva, tipPosla } = this.state;
        let listZahtev = vrstaZahteva.length > 0
            && vrstaZahteva.map((item, i) => {
                return (
                    <option key={i} value={item.vrstaZahteva}>{item.vrstaZahteva}</option>
                    )
            })
        console.log('test - listZahtev -->>', listZahtev);
        let listTipPosla = tipPosla.length > 0
            && tipPosla.map((item, i) => {
                return (
                    <option key={i} value={item.tip}>{item.tip}</option>
                    )
            })

        this.validateUser();
        let userValidText = this.state.userChecked ? "Nemate prava na koriscenje ove aplikacije! Obratite se Aplication Support timu!" : "";

        let fullContent = !this.state.userisvalid || !this.state.userChecked
            ? <h3>{userValidText}</h3>
            :
            <>
               <form onSubmit={this.handleSubmit} name="form1">
                 <fieldset>
                    <h3 style={{"textAlign":"center"}}>
                      Predlog odluke o odobrenju okvira plasmana
                    </h3>
                     <div>
                      <label style={{ "float": "right", "paddingTop": "0px", "display": "block",}}> Datum predloga odluke:<input  type="text" value={this.state.today} className="form-control" readOnly  /> </label>
                     </div>
                 </fieldset>
                 <br />
                 <br />

                 <fieldset>

                   <div className="card col-12 col-lg-4 login-card mt-2 hv-center" style={{ "float": "left", "paddingLeft": "5px", "paddingRight": "5px", "paddingTop": "0px", "display": "block" }}>

                      <div>
                                Naziv klijenta <input type="text" className="form-control" ref="nazivklijenta" name="nazivklijenta" readOnly />
                        </div>
                        <br />
                      <div>
                                Maticni broj <input type="text" className="form-control" ref="maticnibroj" name="maticnibroj"readOnly />
                      </div>
                        <br />
                        <div>
                                Sifra klijenta <input type="number" name="sifraK" name="sifraK" ref="sifraK" className="form-control"
                                    onBlur={event => {
                                            this.getKlijent();
                                    }}
                                     onChange={e => this.var1 = e.target.value} />
                        </div>
                        <br />
                      <div>
                                Adresa i mesto <input type="text" className="form-control" ref="adresa" name="adresa" readOnly />
                        </div>
                        <br />
                      <div>
                                Krajnji vlaskik/vlasnici <input type="text" className="form-control" ref="krajnjivlasnik" name="krajnjivlasnik" readOnly />
                            </div>
                            <div>
                                <label>izlozenost nakon odobrenja <input type="text" className="form-control" value="150.000" name="izlozenostPosle" readOnly className="form-control" /> </label>
                            </div>
                      <br />

                  </div>

                   <div className="card col-12 col-lg-4 login-card mt-2 hv-center" style={{ "float": "right", "paddingLeft": "5px", "paddingRight": "5px", "paddingTop": "0px", "display": "block" }}>

                        <div>
                           Filijala / ekspozitura <input type="text" className="form-control" ref="filijala" name="filijala" readOnly/>
                        </div>
                        <br />
                        <div>
                                CRM <input type="text" className="form-control" ref="crm" name="crm" readOnly/>
                        </div>
                        <br />
                        <div>
                                Broj zahteva <input type="text" className="form-control" ref="brzahteva" ref="brzahteva"
                              onBlur ={event => {
                                      this.getFilijala();
                              }} />
                        </div>
                        <br />
                        <div>
                                Segment klijenta <input type="text" className="form-control" name="segment" ref="segment" readOnly/>
                        </div>
                        <br />
                        <div>
                                Naziv i broj GPL <input type="text" className="form-control" ref="naziviBrojGPL" name="naziviBrojGPL"/>
                            </div>
                            <div>
                                <label>Izlozenost pre odobrenja <input type="text" className="form-control" value="100.000" name="izlosenostPre" readOnly className="form-control" /> </label>
                            </div>
                      <br />

                  </div>
                  
                 </fieldset>
                 <br />
                 <br />
                 <fieldset>
                    <div  >
                      <br />
                      <h3>Podaci o plasmanu</h3>
                      <br />
                        <div>
                                Vrsta kreditnog zahteva:
                          <select className="form-control" name="vrstaZahteva">
                                    {listZahtev}
                          </select>
                          </div>
                        <br />
                        <div>
                          Tip posla:
                          <select className="form-control" name="tipPosla">
                                    {listTipPosla}
                          </select>
                        </div>
                        <br />
                        <div>
                                Iznos : <input type="text" className="form-control" step='0.01' name="iznos" placeholder='0.00' />
                        </div>
                        <br />
                        <div>
                          Valuta: 
                          <select className="form-control" name="valuta">
                              <option>RSD</option>
                              <option>EUR</option>
                              <option>CHF</option>
                              <option>USD</option>
                          </select>
                        </div>
                        <br />
                      <div className="form-row">
                          <div className="form-group col-md-6">
                              <label >Valutna klauzula</label>
                              <select className="form-control" name="valutnaK">
                                  <option>DA</option>
                                  <option>NE</option>
                              </select>
                          </div>
                          <div className="form-group col-md-6">
                              <label >Kurs: </label>
                              <select className="form-control" name="kurs">
                                  <option>Kupovni kurs NBS</option>
                                  <option>Srednji kurs NBS</option>
                                  <option>Prodajni kurs NBS</option>
                                  <option>Kupovni kurs Halkbank AD</option>
                                  <option>Srednji kurs Halkbank AD</option>
                                  <option>Prodajni kurs Halkbank AD</option>
                              </select>
                          </div>
                      </div>
                        <br />
                        <div>
                            Namena:  <input type="text" className="form-control" name="namena" />
                        </div>
                        <br />
                        <div>
                            Koristnik garancije:  <input type="text" className="form-control"  name="korisnikGarancije"/>
                        </div>
                        <br />
                        <div>
                            Rocnost:  <input type="text" className="form-control" name="rocnost"/>
                        </div>
                        <br />
                        <div>
                            Grace period:  <input type="text" className="form-control" name="grecePeriod"/>
                        </div>
                        <br />
                        <div>
                          Nacin otplate:  
                          <select className="form-control" name="nacinOtplate">
                              <option>Jednokratno</option>
                              <option>Jednake rate (kamata na ostatak)</option>
                              <option>Sukcesivno</option>
                              <option>Anuiteti</option>
                              <option>Okvirni kredit</option>
                              <option>Overdraft</option>
                          </select>
                        </div>
                        <br />
                        <div>
                          Dinamika otplate:   <input type="text" className="form-control" name="dinaminaOtplate"/>
                        </div>
                        <br />
                      <div className="form-row">
                          <div className="form-group col-md-6">
                              <label >Kamatna stopa - Fiksni deo</label>
                              <input type="text" className="form-control" name="kamantnaSFix"/>
                          </div>
                              <div className="form-group col-md-6">
                                  <label >Variabilni deo:</label>
                                  <select  className="form-control" name="variabilniDeo">
                                  <option>mesecni EURIBOR</option>
                                  <option>tromesecni EURIBOR</option>
                                  <option>setomesecni EURIBOR</option>
                                  <option>Referentna stopa NBS</option>
                                  <option>tromesecni BELIBOR</option>
                                  <option>sestomesecni BELIBOR</option>
                                  </select>
                              </div>
                      </div>
                      <div>
                          Periodicnost naplate kamate:  
                           <select className="form-control" name="periodicnostNaplate">
                              <option>Mesecno</option>
                              <option>Tromesecno</option>
                              <option>sestomesecno</option>
                              <option>Godisnje</option>
                          </select>
                      </div>
                      <br />
                      <div className="form-row">
                          <div className="form-group col-md-4">
                              <label >Naknada za obradu zahteva</label>
                              <input type="text" className="form-control" name="naknadaZaObradu" />
                          </div>
                          <div className="form-group col-md-4">
                              <label >Minumum</label>
                              <input type="text" className="form-control"  name="minimum"/>
                          </div>

                          <div className="form-group col-md-4">
                              <label >Dinamika naplate:</label>
                              <select  className="form-control" name="dinamikaNaplate">
                                  <option>Mesecno</option>
                                  <option>Tromesecno</option>
                                  <option>sestomesecno</option>
                                  <option>Godisnje</option>
                                  <option>Jednokratno</option>
                              </select>
                          </div>
                      </div>
                        <br />
                      <div className="form-row">
                          <div className="form-group col-md-4">
                              <label >Naknada za obradu plasmana</label>
                                    <input type="text" className="form-control" step='0.01'  placeholder='0.00' name="naknadaPlasman"/>
                          </div>
                          <div className="form-group col-md-4">
                              <label >Minumum</label>
                                    <input type="text" className="form-control" step='0.01'  placeholder='0.00' name="plasmanMin"/>
                          </div>

                          <div className="form-group col-md-4">
                              <label >Dinamika naplate:</label>
                              <select  className="form-control" name="plasmanDimanika">
                                  <option>Mesecno</option>
                                  <option>Tromesecno</option>
                                  <option>sestomesecno</option>
                                  <option>Godisnje</option>
                                  <option>Jednokratno</option>
                              </select>
                          </div>
                      </div>
                        <br />
                        <div>
                            Monitoring plasmana:   <input type="text" className="form-control" name="monitoringPlasmana"/>
                        </div>
                        <br />
                      <div className="form-row">
                          <div className="form-group col-md-4">
                              <label >Naknada za rizik:</label>
                              <input type="text" className="form-control" name="naknadaRizik" />
                          </div>
                          <div className="form-group col-md-4">
                              <label >Minumum</label>
                              <input type="text" className="form-control"  name="rizikMin"/>
                          </div>

                          <div className="form-group col-md-4">
                              <label >Dinamika naplate:</label>
                              <select  className="form-control" name="rizikDimanika">
                                  <option>Kvartalno</option>
                                  <option>Jednokratno</option>
                              </select>
                          </div>
                      </div>
                        <br />
                      <div className="form-row">
                          <div className="form-group col-md-4">
                              <label >Naknada za prevremenu otplatu:</label>
                                    <input type="text" className="form-control" step='0.01'  placeholder='0.00' name="naknadaPrevremena"/>
                          </div>
                          <div className="form-group col-md-4">
                              <label >Minumum</label>
                                    <input type="text" className="form-control" step='0.01'  placeholder='0.00' name="prevremenaMin"/>
                          </div>

                          <div className="form-group col-md-4">
                              <label >Dinamika naplate:</label>
                              <select  className="form-control" name="prevremenaDinamika">
                                  <option>Mesecno</option>
                                  <option>Tromesecno</option>
                                  <option>sestomesecno</option>
                                  <option>Godisnje</option>
                                  <option>Jednokratno</option>
                              </select>
                          </div>
                      </div>
                        <br />
                      <div className="form-row">
                          <div className="form-group col-md-6">
                              <label >Ugovoreni platni promet DIN/DEV:</label>
                              <input type="text" className="form-control"  name="ugoboreniPlatniPromet"/>
                          </div>
                          <div className="form-group col-md-6">
                              <label >Obaveza u apsolutnom iznosu:</label>
                              <input type="text" className="form-control"  name="obavezaUApsIzn"/>
                          </div>
                      </div>
                        <br />
                      <div className="form-row">
                          <div className="form-group col-md-4">
                              <label >Penali za neobavljanje obima PP:</label>
                                    <input type="number" className="form-control"  name="ppPenali"/>
                          </div>
                          <div className="form-group col-md-4">
                              <label >Minumum</label>
                                    <input type="text" className="form-control" step='0.01'  placeholder='0.00' name="ppMIn"/>
                          </div>

                          <div className="form-group col-md-4">
                              <label >Dinamika naplate:</label>
                              <select  className="form-control" name="ppDinamika">
                                  <option>Mesecno</option>
                                  <option>Tromesecno</option>
                                  <option>sestomesecno</option>
                                  <option>Godisnje</option>
                                  <option>Jednokratno</option>
                              </select>
                          </div>
                      </div>
                        <br />
                        <div>
                            Posebni uslovi:  <input type="text" className="form-control" name="ppPosebniUslovi"/>
                        </div>

                    </div>              
                 </fieldset>
                 <br />
                 <br />
                 <fieldset>
                        <div className="form-group col-md-6">
                            <button type="submit" className="form-control" style={{ "backgroundColor": "#0096c7", "color": "#ffffff", "fontStyle": "bold" }}> Insert </button>
                     </div>
                 </fieldset>

                 <fieldset>
                    <div  >
                      <br />
                      <h3>Obezbedjenje plasmana</h3>
                      <br />
                      <input type="checkbox" />
                      <label >Blanko solo menice korisnika kredita</label> 
                      <div className="form-row">
                          <br />
                          <div className="form-group col-md-6">
                                    <label> Broj menica: </label>
                                    <input type="text" className="form-control" disabled />
                          </div>
                          <div className="form-group col-md-6">
                              <label>Naziv i MBR:</label>
                                    <input type="text" className="form-control" disabled/>
                          </div>
                      </div>
                      <br />
                      <input type="checkbox" />
                      <label >Licne menice vlasnika</label>
                      <div className="form-row">
                          <br />
                          <div className="form-group col-md-6">
                              <label> Broj menica: </label>
                              <input type="text" className="form-control" />
                          </div>
                          <div className="form-group col-md-6">
                              <label>Ime, prezime i JMBG:</label>
                              <input type="text" className="form-control" />
                          </div>
                      </div>
                      <br />
                      <input type="checkbox" />
                      <label >Akceptirane menice</label>
                      <div className="form-row">
                          <br />
                          <div className="form-group col-md-6">
                              <label> Broj menica: </label>
                              <input type="text" className="form-control" />
                          </div>
                          <div className="form-group col-md-6">
                              <label>Ime, prezime i JMBG:</label>
                              <input type="text" className="form-control" />
                          </div>
                      </div>
                      <br />
                      <input type="checkbox" />
                      <label >Jemstvo pravnog lica</label>
                      <div className="form-row">
                          <br />
                          <div className="form-group col-md-6">
                              <label> Broj menica: </label>
                              <input type="text" className="form-control" />
                          </div>
                          <div className="form-group col-md-6">
                              <label>Naziv i MBR:</label>
                              <input type="text" className="form-control" />
                          </div>
                      </div>
                      <br />
                      <input type="checkbox" />
                      <label >Jemstvo fizickog lica</label>
                      <div className="form-row">
                          <br />
                          <div className="form-group col-md-6">
                              <label> Broj menica: </label>
                              <input type="text" className="form-control" />
                          </div>
                          <div className="form-group col-md-6">
                              <label>Ime, prezime i JMBG:</label>
                              <input type="text" className="form-control" />
                          </div>
                      </div>
                      <br />
                      <div>
                          <input type="checkbox" /> Zaloga <input type="text" className="form-control" />
                      </div>
                      <br />
                      <input type="checkbox" />
                      <div className="form-row">
                          <br />
                          <div className="form-group col-md-6">
                              <label >Odlozen upis zaloge</label>
                              <select className="form-control">
                                  <option>DA</option>
                                  <option>NE</option>
                              </select>
                          </div>
                          <div className="form-group col-md-6">
                              <label>Rok upisa zaloge:</label>
                              <input type="text" className="form-control" />
                          </div>
                      </div>
                      <br />
                      <div>
                          <input type="checkbox" /> Hipoteka <input type="text" className="form-control" />
                      </div>
                      <br />
                      <input type="checkbox" />
                      <div className="form-row">
                          <br />
                          <div className="form-group col-md-6">
                              <label >Odlozen upis hipoteke</label>
                              <select className="form-control">
                                  <option>DA</option>
                                  <option>NE</option>
                              </select>
                          </div>
                          <div className="form-group col-md-6">
                              <label>Rok upisa hipoteke:</label>
                              <input type="text" className="form-control" />
                          </div>
                      </div>
                      <br />
                      <input type="checkbox" />
                      <label >Depozit</label>
                      <div className="form-row">
                          <br />
                          <div className="form-group col-md-4">
                              <label>% depozita: </label>
                              <input type="text" className="form-control" />
                          </div>
                          <div className="form-group col-md-2">
                              <label>valuta:</label>
                              <select className="form-control">
                                  <option>RSD</option>
                                  <option>EUR</option>
                                  <option>CHF</option>
                                  <option>USD</option>
                              </select>
                          </div>
                          <div className="form-group col-md-6">
                              <label>Vlasnik depozita:</label>
                              <input type="text" className="form-control" />
                          </div>
                      </div>
                      <br />
                      <input type="checkbox" />
                      <div className="form-row">
                          <div className="form-group col-md-6">
                              <label >Odlozena zaloga Ugovora o depozitu</label>
                              <select className="form-control">
                                  <option>DA</option>
                                  <option>NE</option>
                              </select>
                          </div>
                          <div className="form-group col-md-6">
                              <label>Rok upisa zaloge:</label>
                              <input type="text" className="form-control" />
                          </div>
                      </div>
                      <br />
                      <input type="checkbox" />
                      <label >Polisa osiguranja vinkulirana na Banku</label>
                      <div className="form-row">
                          <div className="form-group col-md-12">
                              <select className="form-control" >
                                  <option>DA</option>
                                  <option>NE</option>
                              </select>
                          </div>
                      </div>
                      <br />
                      <div>
                          <input type="checkbox" /> Ostalo:  <input type="text" className="form-control" />
                      </div>
                      <br />
                      <div>
                          <input type="checkbox" /> Monitoring kolaterala:  <input type="text" className="form-control" />
                      </div>
                      <br />

                  </div>
                 </fieldset>

                 <div style={{ "float": "left", "display": "inline-block" }}>
                     <label > Datum donosenja odluke : <input className="form-control" type="text" value={this.state.today} readOnly/> </label>
                     <br />
                     <label >Rok vaznosti odlike : <input className="form-control" type="text" value="90 dana" readOnly/> </label>
                 </div>
               </form>
            </>

        return (
            <div>
                {fullContent}
            </div>
      );
  }
}
