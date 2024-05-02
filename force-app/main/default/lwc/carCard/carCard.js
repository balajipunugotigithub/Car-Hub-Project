import { LightningElement } from 'lwc';

//car schema

import NAME_FIELD from '@salesforce/schema/Car__c.Name';
import PICTURE_URL_FIELD from '@salesforce/schema/Car__c.Picture_URL__c';
import CATEGORY_FIELD from '@salesforce/schema/Car__c.Category__c';
import MAKE_FIELD from '@salesforce/schema/Car__c.Make__c';
import MSRP_FIELD from '@salesforce/schema/Car__c.MSRP__c';
import FUEL_FIELD from '@salesforce/schema/Car__c.Fuel_Type__c';
import SEATS_FIELD from '@salesforce/schema/Car__c.Number_of_Seats__c';
import CONTROL_FIELD from '@salesforce/schema/Car__c.Control__c';
//getFeildValue fuction is used to extract field value
import { getFieldValue } from 'lightning/uiRecordApi';

export default class CarCard extends LightningElement {
  // exposing this fields to the template
  nameField = NAME_FIELD;
  pictureUrlField = PICTURE_URL_FIELD;
  categoryField = CATEGORY_FIELD;
  makeField = MAKE_FIELD;
  msrpField = MSRP_FIELD;
  fuelField = FUEL_FIELD;
  seatsField = SEATS_FIELD;
  controlField = CONTROL_FIELD;

  // recordId of car
  recordId = "a005g00003OAJfkAAH"
  carName
  carPictureUrl

  handleRecordLoaded(event){
    const {records} = event.detail

    const recordData = records[this.recordId]
    this.carName = getFieldValue(recordData, NAME_FIELD)
    console.log("this.carName===>" + this.carName)
    this.carPictureUrl = getFieldValue(recordData, PICTURE_URL_FIELD)
  }





   

    

}