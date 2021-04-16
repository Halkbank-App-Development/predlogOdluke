import React from 'react'
import ReactTable from 'react-table-6';
import "react-table-6/react-table.css" 

export default function MyTable(props) {
    console.log('table status -> ',props);
    let rowData = [];
    for (var index = 0; index < props.data.length; index++) {
        let rowItem = {};
        rowItem["brojZahteva"] = props.data[index].brojZahteva;
        rowItem["sifraK"] = props.data[index].sifraK;
        rowItem["status"] = props.data[index].status;
        rowItem["nazivKlijenta"] = props.data[index].nazivKlijenta;
        rowItem["filNaziv"] = props.data[index].filNaziv;
        rowItem["partija"] = props.data[index].partija;
        rowItem["stanjeGDuga"] = props.data[index].stanjeGDuga;
        let i = props.data[index].brojZahtreva;
        rowItem["btt"] = <button className="btn btn-primary" onClick={() => props.passValue(i)}>Detalji</button>
        rowData.push(rowItem);
    }
    let columns = [
        {
            Header: 'Broj zahteva',
            accessor: 'brojZahteva',
        },
        {
            Header: 'Sifra klijenta',
            accessor: 'sifraK',
        },
        {
            Header: 'Status',
            accessor: 'status',
        },
        {
            Header: 'Naziv klijenta',
            accessor: 'nazivKlijenta',
        },
        {
            Header: 'Filijala',
            accessor: 'filNaziv',
        },
        {
            Header: 'Partija',
            accessor: 'partija',
        },
        {
            Header: 'Stanje glavnog duga',
            accessor: 'stanjeGDuga',
        },
        {
            Header: '',
            accessor: 'btt',
        },
    ];

    return (
        <ReactTable
            data={rowData}
            columns={columns}
            defaultPageSize={5}
            className="-striped -highlight"
            showPagination={true}
            showPaginationTop={false}
            showPaginationBottom={true}
            pageSizeOptions={[5, 10]}
            minRows={0}
            //manual
            previousText="Nazad"
            nextText="Napred"
            rowsText="Redova"
            pageText="Strana"
            ofText="od"
        />
    );
}