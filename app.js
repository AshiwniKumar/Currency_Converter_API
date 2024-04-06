let BASE_URL="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"

const dropdowns = document.querySelectorAll('.dropdown select')
const btn = document.querySelector('form button')
const fromCurr = document.querySelector('.form select')
const toCurr = document.querySelector('.to select')
const msg = document.querySelector('.msg')


for (let select of dropdowns){
    for (currCode in countryList){

        let newOption = document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;

        if(select.name==='from' && currCode==='USD'){
            newOption.selected='selected';
        }else if(select.name==='to' && currCode==='INR'){
            newOption.selected='selected';
        }
        select.append(newOption);
    }

    select.addEventListener('change', (evt)=>{
        updateFlag(evt.target);
    })
};

function updateFlag(option){
    let currCode = option.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`

    let img=option.parentElement.querySelector('img');
    img.src = newSrc;
}

btn.addEventListener('click', async (evt)=>{
    evt.preventDefault();

    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;

    if(amtVal==='' || amtVal<1){

        amtVal=1;
        amount.value="1";
    }

    console.log(fromCurr, toCurr)
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`

    let response = await fetch(URL);

    console.log(response)

    let data = await response.json();
    let exRate = data[toCurr.value.toLowerCase()];

    let finalRate = (amtVal * exRate);


    msg.innerText=`${amtVal} ${fromCurr.value} = ${finalRate} ${toCurr.value}`
})

