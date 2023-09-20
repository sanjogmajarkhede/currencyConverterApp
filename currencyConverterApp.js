import { LightningElement } from 'lwc';
import { currencyCodeList } from 'c/currencyCodeList';
import currencyConverterAssets from '@salesforce/resourceUrl/currencyConverterAssets';

export default class CurrencyConverterApp extends LightningElement {
    currencyImage = currencyConverterAssets + '/currencyConverterAssets/currency.svg';
    currencyCodeList = currencyCodeList;
    countryFrom = 'USD';
    countryTo = 'INR';
    amount='';
    result;
    error;

    handleChange(event){
        const {name, value} = event.target;
        this[name] = value;
        this.result = '';
        this.error = '';
    }

    submitHandler(event){
        event.preventDefault();
        this.convertCurrency();
        
    }

    async convertCurrency(){
        const apiURL = `https://api.exchangerate.host/convert?from=${this.countryFrom}&to=${this.countryTo}`;
        try{
            const data = await fetch(apiURL);
            const jsonData = await data.json();
            this.result = (Number(this.amount) * jsonData.result).toFixed(2);
        }catch(error){
            console.log(error);
        }
    }
}