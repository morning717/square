import React from 'react';
import Axios from 'axios'
class TextExport extends React.Component<any,any>{
    componentDidMount(){
        Axios.get('https://b.test.leconginfo.com/api/pharmacy/paviliondrug/drugsExport?clinicId=272&pyCodeName=&drugType=&status=&pharmacyId=', {
            responseType:'blob'
        }).then(function (response) {
            var eleLink = document.createElement('a');
            eleLink.download = decodeURI('20200710.xlsx');
            eleLink.style.display = 'none';
            var blob = new Blob([response.data]);
            eleLink.href = URL.createObjectURL(blob);
            document.body.appendChild(eleLink);
            eleLink.click();
            document.body.removeChild(eleLink);
        }).catch(function (error) {
            alert(error);
        });
    }
    // https://b.test.leconginfo.com/api/pharmacy/paviliondrug/drugsExport?clinicId=272&pyCodeName=&drugType=&status=&pharmacyId=
    render() {
        return(
            <div></div>
        )
    }

}
export default TextExport
