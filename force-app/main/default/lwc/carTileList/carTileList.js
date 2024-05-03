import { LightningElement, wire } from 'lwc';
import getCars from '@salesforce/apex/carController.getCars';

// Lightning message service and message channel
import {subscribe, MessageContext} from 'lightning/messageService';
import CARS_FILTERED_MESSAGE from '@salesforce/messageChannel/CarsFiltered__c';

export default class CarTileList extends LightningElement {

    cars
    error
    filters = {}
    carFilterSubscription

    @wire(getCars, {filters : '$filters'})
    carHandler({data,error}){
        if(data){
            console.log(" data from apex",data)
            this.cars = data
            console.log("cars data from apex",this.cars)
        }
        
        if(error){
            console.error("error from apex===>" + error)
            this.error = error
        }
    }

    /*Load context for LMS*/
    @wire(MessageContext)
    messageContext

    connectedCallback(){
        console.log("connected called")
        try{
            this.subscribeHandler()
            console.log("subscribed successfully") 
        }catch(error){
            console.error("error while calling subscribeHandler===>" + error)
        }
    }

    subscribeHandler(){
       subscribe(this.messageContext, CARS_FILTERED_MESSAGE, 
            (message) => this.handleFilterMessage(message) )
    }

    handleFilterMessage(message){
        this.filters = {...message.filters}
        console.log("filters got data===>" + JSON.stringify(this.filters))
    }

}