import { LightningElement, wire } from 'lwc';
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';
import CAR_OBJECT from '@salesforce/schema/Car__c';
import CATEGORY_FIELD from '@salesforce/schema/Car__c.Category__c';
import MAKE_FIELD from '@salesforce/schema/Car__c.Make__c';
// Lightning message service and message channel
import {publish, MessageContext} from 'lightning/messageService';
import CARS_FILTERED_MESSAGE from '@salesforce/messageChannel/CarsFiltered__c';

const CATEGORY_ERROR = ' Error in loading Category picklist values';
const MAKE_ERROR = ' Error in loading MakeType picklist values';

export default class CarFilter extends LightningElement {

    filters = {
        searchKey: '',
        maxPrice:999999
    }

    categoryError = CATEGORY_ERROR
    makeTypeError = MAKE_ERROR
    timer

    /*Load context for LMS*/
    @wire(MessageContext)
    messageContext
    

    /**fetching category picklist values */
    @wire(getObjectInfo, { objectApiName: CAR_OBJECT })
    carObjectInfo

    @wire(getPicklistValues,
    {recordTypeId : '$carObjectInfo.data.defaultRecordTypeId', fieldApiName: CATEGORY_FIELD})
    categories

    /**fetching make picklist values */

    @wire(getPicklistValues,
    {recordTypeId : '$carObjectInfo.data.defaultRecordTypeId', fieldApiName: MAKE_FIELD})
    makeType

    handleSearchKeyChange(event){
        console.log(event.target.value);
        this.filters = {...this.filters, "searchKey": event.target.value}
        console.log('checking filters after input===>'+JSON.stringify(this.filters))
        this.sendDataToCarList();

    }

    handleMaxPriceChange(event){
        console.log(event.target.value);
        this.filters = {...this.filters, "maxPrice": event.target.value}
        this.sendDataToCarList();
        
    }
    
    handleCheckbox(event){
        const { name, value } = event.target.dataset;
        console.log("name", name);
        console.log("value", value);

        if(!this.filters.categories){
            const categories = this.categories.data.values.map(item => item.value)
            const makeType = this.makeType.data.values.map(item => item.value)
            this.filters = {...this.filters, categories, makeType}
        }

        if(event.target.checked){
            if(!this.filters[name].includes[value]){
                this.filters[name] = [...this.filters[name], value]
            }else{
                this.filters[name] = this.filter[name].filter(item=>item !==value)
            }
        }

        this.sendDataToCarList();
        
    }

    sendDataToCarList(){
        window.clearTimeout(this.timer);
        console.log('calling sendDataToCarList-->'+JSON.stringify(this.filters))
        this.timer = window.setTimeout(() => {
            publish( this.messageContext, CARS_FILTERED_MESSAGE, {
                filters: this.filters
            })
        }, 4000)
        
    }

}