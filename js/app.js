//fetching data from api
const loadElement = async(search) =>{
    const url = `https://periodic-table-elements-info.herokuapp.com/elements`;
    const res = await fetch(url);
    const data = await res.json();
    displayElement(data);
}

// diasplaying elements in dom

const displayElement = (data) =>{
    const elementContainer = getElementId('elmentCantainer');
    data.forEach(element => {
        const div = document.createElement('div');
        div.classList.add('mx-2');
        div.innerHTML = `
        <button class="btn-color d-block mx-auto element-btn mb-3 shadow-lg " onclick="getElementInfo('${element.atomicNumber}')">${element.symbol}</button>
        `;
        elementContainer.appendChild(div);
    });
}
loadElement('');
// looooooding data of the clicked element
const getElementInfo = (aNumber) => {
    const url = `https://periodic-table-elements-info.herokuapp.com/element/atomicNumber/${aNumber}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayInfo(data[0]))
}

const displayInfo = data =>{
    console.log(data.cpkHexColor)
    const symbol = getElementId('symbol');
    symbol.setAttribute('style', `background-color: #${data.cpkHexColor};`)
    symbol.innerHTML= `<h2>${data.symbol} </h2>`;

    const formalInfoContainer = getElementId('fInfoContainer');
    formalInfoContainer.innerHTML = 
    `
        <h6>Name : ${data.name}</h6>
        <h6>Atomic Number: ${data.atomicNumber}</h6>
        <h6>Atomic Mass: ${parseFloat(data.atomicMass).toFixed(1)}</h6>
        <h6>Block: ${data.block}</h6>
    `;

    //config section
    const configSection = getElementId('configSec');
    configSection.innerHTML = 
    `
    <h6 id="eConfig">E. Configuration: ${data.electronicConfiguration}</h6>
    <div class="d-flex justify-content-between pe-5">
        <h6>Group: ${data.group}</h6>
        <h6 >Period: ${data.period}</h6>
    </div>
    <div class="mt-3">
        <h6>Boiling Point: ${data.boilingPoint}<sup>0</sup> C</h6>
        <h6>Electrone gativity: ${data.electronegativity}</h6>
        <h6>Oxidation States: ${data.oxidationStates}</h6>
        <h6>Year Discovered: ${data.yearDiscovered}</h6>
    </div>
    `;

    return data;
}

// const showRestInfo = () =>{
//     const data = displayInfo();
//     console.log('xlfd')
// }


//creating search function
 const search = () =>{
    const searchfield = getElementId('search');
    const searchValue = searchfield.value;
    loadElement(searchValue);
    const elementContainer = getElementId('elmentCantainer');
    elementContainer.innerHTML= ``;
    let url = `https://periodic-table-elements-info.herokuapp.com/element/atomicName/${searchValue}`;
    // if(searchValue.length <= 2){
    //     url = `https://periodic-table-elements-info.herokuapp.com/element/symbol/${searchValue}`;
    //     console.log(url)
    // }
    // else{
    //     url =  `https://periodic-table-elements-info.herokuapp.com/element/atomicName/${searchValue}`;
    //     console.log(url);
    // }
    fetch(url)
    .then(res => res.json())
    .then(data => displayElement(data));
     
 }
