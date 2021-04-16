using Microsoft.Extensions.Configuration;
using PredlogOdluke.ENT;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;

namespace PredlogOdluke.DAL
{
    public class Data
    {
        public static List<Zahtev> getVrstaZahteva()
        {
            var result = new List<Zahtev>();
            var connString = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build().GetSection("MyConfig")["ConnectionString"].ToString();
            var conn = new SqlConnection(connString);

            try
            {
                conn.Open();
                var cmd = new SqlCommand("mybank.get_vrstaPlasmana", conn);
                cmd.CommandType = CommandType.StoredProcedure;


                var dataReader = cmd.ExecuteReader();
                while (dataReader.Read())
                {
                    Zahtev zahtev = new Zahtev();

                    zahtev.vrstaZahteva = Convert.IsDBNull(dataReader["vrstaPlasmana"]) ? (string)null : (String)(dataReader["vrstaPlasmana"]);

                    result.Add(zahtev);
                }
            }
            catch (SqlException ex)
            {
                Serilog.Log.Error("SQL Exception - Greska u pozivu procedure getKlijent, detalji : " + ex);
            }
            catch (Exception e)
            {
                Serilog.Log.Error("Exception - Greska u pozivu procedure getKlijent, detalji : " + e);
            }
            if (conn.State == ConnectionState.Open) conn.Close();
            return result;
        }

        public static List<INFO> getPredlogIzmeneList()
        {
            var result = new List<INFO>();
            var connString = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build().GetSection("MyConfig")["ConnectionString"].ToString();
            var conn = new SqlConnection(connString);

            try
            {
                conn.Open();
                var cmd = new SqlCommand("myBank.getPredlogIzmeneList", conn);
                cmd.CommandType = CommandType.StoredProcedure;


                var dataReader = cmd.ExecuteReader();
                while (dataReader.Read())
                {
                    INFO info = new INFO();

                    info.predlogIzmenee = Convert.IsDBNull(dataReader["predlogizmene"]) ? (string)null : (String)(dataReader["predlogizmene"]);
                    result.Add(info);
                }

            }
            catch (SqlException ex)
            {
                Serilog.Log.Error("SQL Exception - Greska u pozivu procedure getFilijala, detalji : " + ex);
                throw ex;
            }
            catch (Exception e)
            {
                Serilog.Log.Error("Exception - Greska u pozivu procedure getFilijala, detalji : " + e);
                throw e;
            }
            if (conn.State == ConnectionState.Open) conn.Close();
            return result;
        }

        public static List<PredlogIzmene> getPredlogIzmene(string brojZahteva)
        {
            var result = new List<PredlogIzmene>();
            var connString = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build().GetSection("MyConfig")["ConnectionString"].ToString();
            var conn = new SqlConnection(connString);

            try
            {
                conn.Open();
                var cmd = new SqlCommand("select * from [dbo].[halk_predlogOdluke_predlogIzmene] where 1=1 and brojZahteva = '"+brojZahteva+"'", conn);
                cmd.CommandType = CommandType.Text;


                var dataReader = cmd.ExecuteReader();
                while (dataReader.Read())
                {
                    PredlogIzmene predlog = new PredlogIzmene();

                    predlog.columnID = Convert.IsDBNull(dataReader["ColumnID"]) ? 0 : (int)(dataReader["ColumnID"]);
                    predlog.predlogValue1 = Convert.IsDBNull(dataReader["value1"]) ? (string)null : (String)(dataReader["value1"]);
                    predlog.predlogValue2 = Convert.IsDBNull(dataReader["value2"]) ? (string)null : (String)(dataReader["value2"]);
                    predlog.predlogValue3 = Convert.IsDBNull(dataReader["value3"]) ? (string)null : (String)(dataReader["value3"]);

                    result.Add(predlog);
                }
            }
            catch (SqlException ex)
            {
                Serilog.Log.Error("SQL Exception - Greska u pozivu procedure getKlijent, detalji : " + ex);
            }
            catch (Exception e)
            {
                Serilog.Log.Error("Exception - Greska u pozivu procedure getKlijent, detalji : " + e);
            }
            if (conn.State == ConnectionState.Open) conn.Close();
            return result;
        }

        public static List<TipPosla> getTipPosla()
        {
            var result = new List<TipPosla>();
            var connString = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build().GetSection("MyConfig")["ConnectionString"].ToString();
            var conn = new SqlConnection(connString);

            try
            {
                conn.Open();
                var cmd = new SqlCommand("mybank.get_tipPosla", conn);
                cmd.CommandType = CommandType.StoredProcedure;


                var dataReader = cmd.ExecuteReader();
                while (dataReader.Read())
                {
                    TipPosla tip = new TipPosla();

                    tip.tip = Convert.IsDBNull(dataReader["TipPosla"]) ? (string)null : (String)(dataReader["TipPosla"]);

                    result.Add(tip);
                }
            }
            catch (SqlException ex)
            {
                Serilog.Log.Error("SQL Exception - Greska u pozivu procedure getKlijent, detalji : " + ex);
            }
            catch (Exception e)
            {
                Serilog.Log.Error("Exception - Greska u pozivu procedure getKlijent, detalji : " + e);
            }
            if (conn.State == ConnectionState.Open) conn.Close();
            return result;
        }

        public static List<INFO> getAneksData(int status, string partija)
        {
            var result = new List<INFO>();
            var connString = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build().GetSection("MyConfig")["ConnectionString"].ToString();
            var conn = new SqlConnection(connString);

            try
            {
                conn.Open();
                var cmd = new SqlCommand("myBank.getAneksData", conn);
                cmd.Parameters.AddWithValue("@status", status);
                if (partija != null)
                {
                    cmd.Parameters.AddWithValue("@partija", partija);
                }
                cmd.CommandType = CommandType.StoredProcedure;



                var dataReader = cmd.ExecuteReader();
                while (dataReader.Read())
                {
                    INFO info = new INFO();

                    info.filNaziv = Convert.IsDBNull(dataReader["filijala"]) ? (string)null : (String)(dataReader["filijala"]);
                    info.brojZahteva = Convert.IsDBNull(dataReader["brojZahteva"]) ? (string)null : (String)(dataReader["brojZahteva"]);
                    info.maticniBroj = Convert.IsDBNull(dataReader["mb"]) ? (string)null : (String)(dataReader["mb"]);
                    info.sifraK = Convert.IsDBNull(dataReader["sifraKlijenta"]) ? (string)null : (String)(dataReader["sifraKlijenta"]);
                    info.nazivKlijenta = Convert.IsDBNull(dataReader["nazivKlijenta"]) ? (string)null : (String)(dataReader["nazivKlijenta"]);
                    info.adresa = Convert.IsDBNull(dataReader["adresaImesto"]) ? (string)null : (String)(dataReader["adresaImesto"]);
                    info.krajnjiVlasnik = Convert.IsDBNull(dataReader["krajnjiVlasnici"]) ? (string)null : (String)(dataReader["krajnjiVlasnici"]);
                    info.cRM = Convert.IsDBNull(dataReader["crmAgnet"]) ? (string)null : (String)(dataReader["crmAgnet"]);
                    info.segment = Convert.IsDBNull(dataReader["segmentKlijenta"]) ? (string)null : (String)(dataReader["segmentKlijenta"]);
                    info.nazivBrojGPL = Convert.IsDBNull(dataReader["nazivBrojGPL"]) ? (string)null : (String)(dataReader["nazivBrojGPL"]);
                    info.vrstaPlasmana = Convert.IsDBNull(dataReader["vrstaPlasmana"]) ? (string)null : (String)(dataReader["vrstaPlasmana"]);
                    info.partija = Convert.IsDBNull(dataReader["partija"]) ? (string)null : (String)(dataReader["partija"]);
                    info.stanjeGDuga = Convert.IsDBNull(dataReader["stanjeGlavnogDuga"]) ? (string)null : (String)(dataReader["stanjeGlavnogDuga"]);
                    //info.valuta = Convert.IsDBNull(dataReader["valuta"]) ? (string)null : (String)(dataReader["valuta"]);
                    //info.valutnaK = Convert.IsDBNull(dataReader["valutnaKlauzula"]) ? (string)null : (String)(dataReader["valutnaKlauzula"]);
                    //info.valutnaKurs = Convert.IsDBNull(dataReader["valutnaKurs"]) ? (string)null : (String)(dataReader["valutnaKurs"]);
                    info.datumUgovora = Convert.IsDBNull(dataReader["datumUgovora"]) ? (string)null : (String)(dataReader["datumUgovora"]);
                    info.datumInicijalneOdluke = Convert.IsDBNull(dataReader["datumInicijalneOdluke"]) ? (string)null : (String)(dataReader["datumInicijalneOdluke"]);
                    info.status = Convert.IsDBNull(dataReader["statusOpis"]) ? (string)null : (String)(dataReader["statusOpis"]);
                    info.statusID = Convert.IsDBNull(dataReader["statusID"]) ? (Int16)0 : (Int16)(dataReader["statusID"]);
                    info.napomena = Convert.IsDBNull(dataReader["napomena"]) ? (string)null : (String)(dataReader["napomena"]);
                    info.poosebniUslovi = Convert.IsDBNull(dataReader["posebniUslovi"]) ? (string)null : (String)(dataReader["posebniUslovi"]);
                    info.predlagac1 = Convert.IsDBNull(dataReader["predlagac1"]) ? (string)null : (String)(dataReader["predlagac1"]);
                    info.predlagac2 = Convert.IsDBNull(dataReader["predlagac2"]) ? (string)null : (String)(dataReader["predlagac2"]);
                    info.kamStopa = Convert.IsDBNull(dataReader["kamatnaStopa"]) ? (string)null : (String)(dataReader["kamatnaStopa"]);
                    info.naknadaObrada = Convert.IsDBNull(dataReader["naknadaZaObradu"]) ? (string)null : (String)(dataReader["naknadaZaObradu"]);
                    info.naknadaRizik = Convert.IsDBNull(dataReader["naknadaZaRizik"]) ? (string)null : (String)(dataReader["naknadaZaRizik"]);
                    info.krajnjiRok = Convert.IsDBNull(dataReader["krajnjiRokOtplatePlasmana"]) ? (string)null : (String)(dataReader["krajnjiRokOtplatePlasmana"]);
                    info.obezbedjenje = Convert.IsDBNull(dataReader["obezbedjenje"]) ? (string)null : (String)(dataReader["obezbedjenje"]);



                    result.Add(info);
                }

            }
            catch (SqlException ex)
            {
                Serilog.Log.Error("SQL Exception - Greska u pozivu procedure getFilijala, detalji : " + ex);
                throw ex;
            }
            catch (Exception e)
            {
                Serilog.Log.Error("Exception - Greska u pozivu procedure getFilijala, detalji : " + e);
                throw e;
            }
            if (conn.State == ConnectionState.Open) conn.Close();
            return result;
        }

        public static List<INFO> getInfo(string brzahteva)
        {
            var result = new List<INFO>();
            var connString = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build().GetSection("MyConfig")["ConnectionString"].ToString();
            var conn = new SqlConnection(connString);

            try
            {
                conn.Open();
                var cmd = new SqlCommand("myBank.OdlukaGetInfo", conn);
                cmd.Parameters.AddWithValue("@brzahteva", brzahteva);
                cmd.CommandType = CommandType.StoredProcedure;


                var dataReader = cmd.ExecuteReader();
                while (dataReader.Read())
                {
                    INFO info = new INFO();

                    info.segment = Convert.IsDBNull(dataReader["segment"]) ? (string)null : (String)(dataReader["segment"]);
                    info.filNaziv = Convert.IsDBNull(dataReader["Filijala"]) ? (string)null : (String)(dataReader["Filijala"]);
                    info.cRM = Convert.IsDBNull(dataReader["CRM"]) ? (string)null : (String)(dataReader["CRM"]);
                    info.maticniBroj = Convert.IsDBNull(dataReader["mb"]) ? (string)null : (String)(dataReader["mb"]);
                    info.adresa = Convert.IsDBNull(dataReader["adresa"]) ? (string)null : (String)(dataReader["adresa"]);
                    info.sifraK = Convert.IsDBNull(dataReader["sifraK"]) ? (string)null : (String)(dataReader["sifraK"]);
                    info.nazivKlijenta = Convert.IsDBNull(dataReader["naziv"]) ? (string)null : (String)(dataReader["naziv"]);
                    info.krajnjiVlasnik = Convert.IsDBNull(dataReader["vlasnik"]) ? (string)null : (String)(dataReader["vlasnik"]);
                    info.procenatUdela = Convert.IsDBNull(dataReader["procenatUdela"]) ? (string)null : (String)(dataReader["procenatUdela"]);
                    info.datumInicijalneOdluke = Convert.IsDBNull(dataReader["datumOdluke"]) ? (string)null : (String)(dataReader["datumOdluke"]);
                    info.partija = Convert.IsDBNull(dataReader["partija"]) ? (string)null : (String)(dataReader["partija"]);
                    info.nazivBrojGPL = Convert.IsDBNull(dataReader["GPL"]) ? (string)null : (String)(dataReader["GPL"]);
                    info.stanjeGDuga = Convert.IsDBNull(dataReader["izlozenost"]) ? (string)null : (String)(dataReader["izlozenost"]);
                    //info.tipPosla = Convert.IsDBNull(dataReader["TipPosla"]) ? (string)null : (String)(dataReader["TipPosla"]);
                    //info.ugovoreniIznosPlasmana = Convert.IsDBNull(dataReader["IZNOSZ"]) ? 0 : (double)(dataReader["IZNOSZ"]);
                    info.valutnaK = Convert.IsDBNull(dataReader["ValutnaKlauzula"]) ? (string)null : (String)(dataReader["ValutnaKlauzula"]);
                    info.valuta = Convert.IsDBNull(dataReader["VALUTA"]) ? (string)null : (String)(dataReader["VALUTA"]);
                    info.valutnaKurs = Convert.IsDBNull(dataReader["ValKlKurs"]) ? (string)null : (String)(dataReader["ValKlKurs"]);
                    info.datumUgovora = Convert.IsDBNull(dataReader["datumUgovora"]) ? (string)null : (String)(dataReader["datumUgovora"]);
                    //info.namena = Convert.IsDBNull(dataReader["NamenaAgro"]) ? (string)null : (String)(dataReader["NamenaAgro"]);
                    //info.korisnikGarancije = Convert.IsDBNull(dataReader["KorisnikGarancije"]) ? (string)null : (String)(dataReader["KorisnikGarancije"]);
                    info.rocnost = Convert.IsDBNull(dataReader["Rocnost"]) ? (string)null : (String)dataReader["Rocnost"];
                    info.gracePeriod = Convert.IsDBNull(dataReader["GREJSM"]) ? 0 : (int)dataReader["GREJSM"];
                    info.nacinOtplate = Convert.IsDBNull(dataReader["NacinOtplate"]) ? (string)null : (String)(dataReader["NacinOtplate"]);
                    info.dinamikaOtplate = Convert.IsDBNull(dataReader["DinamikaOtplate"]) ? (string)null : (String)dataReader["DinamikaOtplate"];
                    info.kamatnaSFix = Convert.IsDBNull(dataReader["KamatnaStopaFix"]) ? 0 : (double)(dataReader["KamatnaStopaFix"]);
                    //info.kamatnaSVar = Convert.IsDBNull(dataReader["KamStopaVar"]) ? (string)null : (String)(dataReader["KamStopaVar"]);
                    //info.periodicnostNaplate = Convert.IsDBNull(dataReader["PeriodicnostNaplateKamate"]) ? (string)null : (String)(dataReader["PeriodicnostNaplateKamate"]);
                    //info.naknadaZahtev = Convert.IsDBNull(dataReader["Naknadazaobraduzahteva"]) ? (string)null : (String)(dataReader["Naknadazaobraduzahteva"]);
                    //info.naknadaPlasman = Convert.IsDBNull(dataReader["Naknadazapracenjeplasmana"]) ? (string)null : (String)(dataReader["Naknadazapracenjeplasmana"]);
                    //info.monitoring = Convert.IsDBNull(dataReader["Monitoringplasmana"]) ? (string)null : (String)(dataReader["Monitoringplasmana"]);
                    info.datumZahteva = Convert.IsDBNull(dataReader["datumZahteva"]) ? (string)null : (String)(dataReader["datumZahteva"]);
                    //info.radnik = Convert.IsDBNull(dataReader["agentID"]) ? 0 : (int)dataReader["agentID"];
                    result.Add(info);
                }

            }
            catch (SqlException ex)
            {
                Serilog.Log.Error("SQL Exception - Greska u pozivu procedure getFilijala, detalji : " + ex);
                throw ex;
            }
            catch (Exception e)
            {
                Serilog.Log.Error("Exception - Greska u pozivu procedure getFilijala, detalji : " + e);
                throw e;
            }
            if (conn.State == ConnectionState.Open) conn.Close();
            return result;
        }

        public static Entities.AppUser validateUser(string email)
        {
            var result = new Entities.AppUser
            {
                email = email
            };
            var connString = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build().GetSection("MyConfig")["ConnectionString"].ToString();
            var appID = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build().GetSection("MyConfig")["AppID"].ToString();
            var conn = new SqlConnection(connString);
            try
            {
                conn.Open();
                var cmd = new SqlCommand("myBank.validate_user_for_app", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@email", email);
                cmd.Parameters.AddWithValue("@appID", appID);
                var dataReader = cmd.ExecuteReader();
                while (dataReader.Read())
                {
                    result.code = Convert.IsDBNull(dataReader["vrabotenID"]) ? (string)null : (String)(dataReader["vrabotenID"]);
                    result.validity = Convert.ToInt32(dataReader["valid"]) == 1;
                }
            }
            catch (SqlException ex)
            {
                Serilog.Log.Error("SQL Exception - Greska u pozivu procedure validateUser, detalji : " + ex);
            }
            catch (Exception e)
            {
                Serilog.Log.Error("Exception - Greska u pozivu procedure validateUser, detalji : " + e);
            }
            if (conn.State == ConnectionState.Open) conn.Close();
            return result;
        }

        public static void validateOdluka(INFO iNFO)
        {
            var connString = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build().GetSection("MyConfig")["ConnectionString"].ToString();
            var conn = new SqlConnection(connString);
            try
            {
                conn.Open();
                var cmd = new SqlCommand("myBank.validate_predlogOdluke", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@brojZahteva", iNFO.brojZahteva);

                cmd.ExecuteNonQuery();

            }
            catch (SqlException ex)
            {
                Serilog.Log.Error("SQL Exception - Greska u pozivu procedure validateUser, detalji : " + ex);
            }
            catch (Exception e)
            {
                Serilog.Log.Error("Exception - Greska u pozivu procedure validateUser, detalji : " + e);
            }
            if (conn.State == ConnectionState.Open) conn.Close();
        }

        public static void insertData(INFO _data)
        {
            var connString = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build().GetSection("MyConfig")["ConnectionString"].ToString();
            var conn = new SqlConnection(connString);

            #region -kreiranje tabele predlogIzmene-

            DataTable _predlogIzmene = new DataTable();
            DataColumn _dc1 = new DataColumn("brojZahteva");
           // DataColumn _dc2 = new DataColumn("id");
            DataColumn _dc3 = new DataColumn("value1");
            DataColumn _dc4 = new DataColumn("value2");
            DataColumn _dc5 = new DataColumn("value3");

            _predlogIzmene = Helper.ToDataTable(_data.predlog);
            _predlogIzmene.Columns.Add(_dc1);
           // _predlogIzmene.Columns.Add(_dc2);
            _dc1.SetOrdinal(0);
            //_dc2.SetOrdinal(1);

            for (int i = 0; i < _data.predlog.Count; i++)
            {
                _predlogIzmene.Rows[i]["columnID"] = i;
            }

            #endregion

            #region -kreiranje tabele obezbedjenje Plasmana-
            DataTable dt = new DataTable();
            DataColumn dc1 = new DataColumn("brojZahteva");
            DataColumn dc2 = new DataColumn("id");
            DataColumn dc3 = new DataColumn("ischecked");
            DataColumn dc4 = new DataColumn("value1");
            DataColumn dc5 = new DataColumn("value2");
            DataColumn dc6 = new DataColumn("value3");


            dt.Columns.Add(dc1);
            dt.Columns.Add(dc2);
            dt.Columns.Add(dc3);
            dt.Columns.Add(dc4);
            dt.Columns.Add(dc5);
            dt.Columns.Add(dc6);


            DataRow r = dt.NewRow();
            r["id"] = 1;
            r["brojZahteva"] = _data.brojZahteva;

            r["ischecked"] = 0;
            r["value1"] = _data.blankoBrMenica;
            r["value2"] = "";
            r["value3"] = _data.blankoNazivMBR;
            dt.Rows.Add(r);

            r = dt.NewRow();
            r["id"] = 2;
            r["brojZahteva"] = _data.brojZahteva;

            r["ischecked"] = 0;
            r["value1"] = _data.licneBrMenica;
            r["value2"] = "";
            r["value3"] = _data.licneImePrezimeJMBG;
            dt.Rows.Add(r);

            r = dt.NewRow();
            r["id"] = 3;
            r["brojZahteva"] = _data.brojZahteva;

            r["ischecked"] = 0;
            r["value1"] = _data.akceptiraneBrMenica;

            r["value2"] = "";
            r["value1"] = _data.akceptiraneBrMenica;
            dt.Rows.Add(r);

            r = dt.NewRow();
            r["id"] = 4;
            r["brojZahteva"] = _data.brojZahteva;

            r["ischecked"] = 0;
            r["value1"] = _data.jemstvoPravnogBrMenica;

            r["value2"] = "";
            r["value3"] = _data.jemstvoPravnogNazivMBR;
            dt.Rows.Add(r);

            r = dt.NewRow();
            r["id"] = 5;
            r["brojZahteva"] = _data.brojZahteva;

            r["ischecked"] = 0;
            r["value1"] = _data.jemstvoFizBrMenica;

            r["value2"] = "";
            r["value3"] = _data.jemstvoNazivMBRFiz;
            dt.Rows.Add(r);

            r = dt.NewRow();
            r["id"] = 6;
            r["brojZahteva"] = _data.brojZahteva;

            r["ischecked"] = 0;
            r["value1"] = _data.zaloga;

            r["value2"] = "";
            r["value3"] = "";
            dt.Rows.Add(r);

            r = dt.NewRow();
            r["id"] = 7;
            r["brojZahteva"] = _data.brojZahteva;

            r["ischecked"] = 0;
            r["value1"] = _data.odlozenUpisZaloge;

            r["value2"] = "";
            r["value3"] = _data.rokUpisaZaloge;
            dt.Rows.Add(r);

            r = dt.NewRow();
            r["id"] = 8;
            r["brojZahteva"] = _data.brojZahteva;

            r["ischecked"] = 0;
            r["value1"] = _data.hipoteka;

            r["value2"] = "";
            r["value3"] = "";
            dt.Rows.Add(r);


            r = dt.NewRow();
            r["id"] = 9;
            r["brojZahteva"] = _data.brojZahteva;

            r["ischecked"] = 0;
            r["value1"] = _data.odlozenUpisHipoteke;

            r["value2"] = "";
            r["value3"] = _data.rokUpisaHipoteke;
            dt.Rows.Add(r);


            r = dt.NewRow();
            r["id"] = 10;
            r["brojZahteva"] = _data.brojZahteva;

            r["ischecked"] = 0;
            r["value1"] = _data.procenatDepozita;

            r["value2"] = _data.valutaDepozita;
            r["value3"] = _data.vlasnikDepozita;
            dt.Rows.Add(r);


            r = dt.NewRow();
            r["id"] = 11;
            r["brojZahteva"] = _data.brojZahteva;

            r["ischecked"] = 0;
            r["value1"] = _data.odlozenaZalogaUgovora;
            r["value2"] = "";
            r["value3"] = _data.odlozenaZalogaRok;
            dt.Rows.Add(r);

            r = dt.NewRow();
            r["id"] = 12;
            r["brojZahteva"] = _data.brojZahteva;

            r["ischecked"] = 0;
            r["value1"] = _data.polsaOsiguranjaVinkulirana;

            r["value2"] = "";
            r["value3"] = "";
            dt.Rows.Add(r);

            r = dt.NewRow();
            r["id"] = 13;
            r["brojZahteva"] = _data.brojZahteva;

            r["ischecked"] = 0;
            r["value1"] = _data.ostalo;

            r["value2"] = "";
            r["value3"] = "";
            dt.Rows.Add(r);

            r = dt.NewRow();
            r["id"] = 14;
            r["brojZahteva"] = _data.brojZahteva;

            r["ischecked"] = 0;
            r["value1"] = _data.monitoringKolaterala;

            r["value2"] = "";
            r["value3"] = "";
            dt.Rows.Add(r);


            #endregion

            try
            {
                conn.Open();
                var cmd = new SqlCommand("myBank.insert_odluka_aneks", conn);

                cmd.Parameters.AddWithValue("@brojZahteva", _data.brojZahteva);
                cmd.Parameters.AddWithValue("@mb", _data.maticniBroj);
                cmd.Parameters.AddWithValue("@sifraKlijenta", Convert.ToInt32(_data.sifraK));
                cmd.Parameters.AddWithValue("@nazivKlijenta", _data.nazivKlijenta);
                cmd.Parameters.AddWithValue("@adresaImesto", _data.adresa);
                cmd.Parameters.AddWithValue("@krajnjiVlasnici", _data.krajnjiVlasnik);
                cmd.Parameters.AddWithValue("@filijala", _data.filNaziv);
                cmd.Parameters.AddWithValue("@crmAgent", _data.cRM);
                cmd.Parameters.AddWithValue("@segmentKlijenta", _data.segment);
                cmd.Parameters.AddWithValue("@nazivBrojGPL", _data.nazivBrojGPL);
                cmd.Parameters.AddWithValue("@vrstaPlasmana", _data.vrstaPlasmana);
                cmd.Parameters.AddWithValue("@partija", _data.partija);
                cmd.Parameters.AddWithValue("@stanjeGlavnogDuga", _data.stanjeGDuga);
                cmd.Parameters.AddWithValue("@kamStopa", _data.kamStopa);
                cmd.Parameters.AddWithValue("@naknadaObrada", _data.naknadaObrada);
                cmd.Parameters.AddWithValue("@naknadaRizik", _data.naknadaRizik);
                cmd.Parameters.AddWithValue("@krajnjiRokOtplate", _data.krajnjiRok);
                cmd.Parameters.AddWithValue("@obezbedjenje", _data.obezbedjenje);
                cmd.Parameters.AddWithValue("@datumUgovora", _data.datumUgovora);
                cmd.Parameters.AddWithValue("@datumInicijalneOdluke", _data.datumInicijalneOdluke);
                cmd.Parameters.AddWithValue("@napomena", _data.napomena);
                cmd.Parameters.AddWithValue("@posebniUslovi", _data.poosebniUslovi);
                cmd.Parameters.AddWithValue("@predlagac1", _data.predlagac1);
                cmd.Parameters.AddWithValue("@predlagac2", _data.predlagac2);
                cmd.Parameters.AddWithValue("@tip", Convert.ToInt32(_data.tip));
                cmd.Parameters.AddWithValue("@radnik", "1406"); /*prosledjuj radnika sta god da radis ! :) */

                //if (dt.Rows.Count > 0)
                //{
                //    var custTable = new SqlParameter("@table", SqlDbType.Structured);
                //    custTable.TypeName = "dbo.ObezbedjenjePlasmana";
                //    custTable.Value = dt;
                //    cmd.Parameters.Add(custTable);
                //}

                var custTable = new SqlParameter("@table1", SqlDbType.Structured);
                custTable.TypeName = "dbo.PredlogIzmene";
                custTable.Value = _predlogIzmene;
                cmd.Parameters.Add(custTable);


                cmd.CommandType = CommandType.StoredProcedure;

                cmd.ExecuteNonQuery();
            }
            catch (SqlException ex)
            {
                Serilog.Log.Error("SQL Greska u prilikom inserta podataka u bazu : " + ex.Message.ToString() + " stack trace : " + ex.StackTrace.ToString());
            }
            catch (Exception e)
            {
                Serilog.Log.Error("Greska prilikom inserta u bazu : " + e.Message.ToString());
            }
        }

    }
}
