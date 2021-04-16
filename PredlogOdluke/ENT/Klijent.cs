using System;
using System.Collections.Generic;

namespace PredlogOdluke.ENT
{
    public class INFO
    {
        public string brojZahteva { get; set; }
        public string nazivKlijenta { get; set; }
        public string maticniBroj { get; set; }
        public string adresa { get; set; }
        public string krajnjiVlasnik { get; set; }
        public string procenatUdela { get; set; }
        public string sifraK { get; set; }
        public string cRM { get; set; }
        public string segment { get; set; }
        public string filNaziv { get; set; }
        public string nazivBrojGPL { get; set; }
        public string izlozenostPre { get; set; }
        public string izlozenostPosle { get; set; }
        public string datumZahteva { get; set; }
        public string datumInicijalneOdluke { get; set; }
        public string vrstaZahteva { get; set; }
        public string tipPosla { get; set; }
        public double ugovoreniIznosPlasmana { get; set; }
        public string valuta { get; set; }
        public string valutnaK { get; set; }
        public string valutnaKurs { get; set; }
        public string namena { get; set; }
        public string korisnikGarancije { get; set; }
        public string rocnost { get; set; }
        public int gracePeriod { get; set; }
        public string nacinOtplate { get; set; }
        public string dinamikaOtplate { get; set; }
        public double kamatnaSFix { get; set; }
        public string kamatnaSVar { get; set; }
        public string periodicnostNaplate { get; set; }
        public string naknadaZahtev { get; set; }
        public string naknadaMin { get; set; }
        public string naknadaDinamika { get; set; }
        public string naknadaPlasman { get; set; }
        public string plasmanMin { get; set; }
        public string plasmanDinamika { get; set; }
        public string monitoring { get; set; }
        public string naknadaRizik { get; set; }
        public string rizikMin { get; set; }
        public string rizikDinamika { get; set; }
        public string naknadaPrevremena { get; set; }
        public string prevremenaMin { get; set; }
        public string prevremenaDinamika { get; set; }
        public string ugPlatniPromet { get; set; }
        public string obavezaUApsIzn { get; set; }
        public string penaliPP { get; set; }
        public string penaliMin { get; set; }
        public string penaliDinamika { get; set; }
        // public string posebniUslovi { get; set; }
        public string partija { get; set; }
        public string vrstaPlasmana { get; set; }
        public string stanjeGDuga { get; set; }
        public string datumUgovora { get; set; }
        /*test plasman model*/
        public string blankoBrMenica { get; set; }
        public string blankoNazivMBR { get; set; }
        public string licneBrMenica { get; set; }
        public string licneImePrezimeJMBG { get; set; }
        public string akceptiraneBrMenica { get; set; }
        public string akceptiraneImePrezimeJMBG { get; set; }
        public string jemstvoPravnogBrMenica { get; set; }
        public string jemstvoPravnogNazivMBR { get; set; }
        public string jemstvoFizBrMenica { get; set; }
        public string jemstvoNazivMBRFiz { get; set; }
        public string zaloga { get; set; }
        public string odlozenUpisZaloge { get; set; }
        public string rokUpisaZaloge { get; set; }
        public string hipoteka { get; set; }
        public string odlozenUpisHipoteke { get; set; }
        public string rokUpisaHipoteke { get; set; }
        public string procenatDepozita { get; set; }
        public string valutaDepozita { get; set; }
        public string vlasnikDepozita { get; set; }
        public string odlozenaZalogaUgovora { get; set; }
        public string odlozenaZalogaRok { get; set; }
        public string polsaOsiguranjaVinkulirana { get; set; }
        public string ostalo { get; set; }
        public string monitoringKolaterala { get; set; }
        public string napomena { get; set; }

        ///*aneks*/
        public List<PredlogIzmene> predlog { get; set; }
        public string vazeciRocnost { get; set; }
        public string vazeciKamata { get; set; }
        public string vazeciNacinDinamika { get; set; }
        public string vazeciGrace { get; set; }
        public string predlozeniRocnost { get; set; }
        public string predlozeniKamata { get; set; }
        public string predlozeniNacinDinamika { get; set; }
        public string predlozeniGrace { get; set; }
        public string poosebniUslovi { get; set; }
        public string predlagac1 { get; set; }
        public string predlagac2 { get; set; }
        public string status { get; set; }
        public Int16 statusID { get; set; }
        public int radnik { get; set; }
        public string predlogIzmenee { get; set; }

        /*dorada aneks*/
        public string kamStopa { get; set; }
        public string naknadaObrada { get; set; }
        public string krajnjiRok { get; set; }
        public string obezbedjenje { get; set; }

        /* -END- dorada aneks*/



        /*0 - insert; 1- update*/
        public int tip { get; set; }
    }

    public class PredlogIzmene
    {
        public int columnID { get; set; }
        public string predlogValue1 { get; set; }
        public string predlogValue2 { get; set; }
        public string predlogValue3 { get; set; }
    }
    public class AneksData
    {
        public string filijala {get;set;}
        public string sifraKorisnika {get;set;}
        public string nazivKlijenta{ get; set; }
        public string partija{ get; set; }
        public string brojZahtreva { get; set; }
        public string stanjeGlavnogDuga { get; set; }
    }
    public class Plasman
    {
        public string blankoBrMenica { get; set; }
        public string blankoNazivMBR { get; set; }
        public string licneBrMenica { get; set; }
        public string licneImePrezimeJMBG { get; set; }
        public string akceptiraneBrMenica { get; set; }
        public string akceptiraneImePrezimeJMBG { get; set; }
        public string jemstvoPravnogBrMenica { get; set; }
        public string jemstvoPravnogNazivMBR { get; set; }
        public string jemstvoFizBrMenica { get; set; }
        public string jemstvoNazivMBRFiz { get; set; }
        public string zaloga { get; set; }
        public string odlozenUpisZaloge { get; set; }
        public string rokUpisaZaloge { get; set; }
        public string hipoteka { get; set; }
        public string odlozenUpisHipoteke { get; set; }
        public string rokUpisaHipoteke { get; set; }
        public string procenatDepozita { get; set; }
        public string valutaDepozita { get; set; }
        public string vlasnikDepozita { get; set; }
        public string odlozenaZalogaUgovora { get; set; }
        public string odlozenaZalogaRok { get; set; }
        public string polsaOsiguranjaVinkulirana { get; set; }
        public string ostalo { get; set; }
        public string monitoringKolaterala { get; set; }
    }
    public class Zahtev
    {
        public string vrstaZahteva{ get; set; }
    }
    public class TipPosla
    { 
        public string tip { get; set; }
    }
    public class Aneks
    {
        public string nazivKlijenta { get; set; }
        public string maticniBroj { get; set; }
        public string adresa { get; set; }
        public string krajnjiVlasnik { get; set; }
        public string procenatUdela { get; set; }
        public string sifraK { get; set; }
        public string cRM { get; set; }
        public string segment { get; set; }
        public string filNaziv { get; set; }
        public string nazivBrojGPL { get; set; }
        public string izlozenostPre { get; set; }
        public string izlozenostPosle { get; set; }
        public string datumZahteva { get; set; }
        public string vrstaPlasmana { get; set; }
        public string partija { get; set; }
        public string stanjeGDuga { get; set; }
        public string valuta { get; set; }
        public string valutnaK { get; set; }
        public string valutnaKurs { get; set; }
        public string brojZahteva { get; set; }
        public string datumUgovora { get; set; }
        public string datumInicijalneOdluke { get; set; }
        public string vazeciRocnost { get; set; }
        public string vazeciKamata { get; set; }
        public string vazeciNacinDinamika { get; set; }
        public string vazeciGrace { get; set; }
        public string predlozeniRocnost { get; set; }
        public string predlozeniKamata { get; set; }
        public string predlozeniNacinDinamika { get; set; }
        public string predlozeniGrace { get; set; }
        public string poosebniUslovi { get; set; }
        public int predlagac1 { get; set; }
        public int predlagac2 { get; set; }
    }
}
