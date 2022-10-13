import { LightningElement, wire, track, api } from 'lwc';
import NAME_FIELD from '@salesforce/schema/Expense__c.Name';
import CATEGORY_FIELD from '@salesforce/schema/Expense__c.Category__c';
import AMOUNT_FIELD from '@salesforce/schema/Expense__c.Amount__c';
import DATE_FIELD from '@salesforce/schema/Expense__c.Expense_Date__c';
import getExpenses from '@salesforce/apex/ExpenseController.getExpenses';
import { refreshApex } from '@salesforce/apex';

const COLUMNS = [
    {label: 'Expense Name', fieldName: NAME_FIELD.fieldApiName, type: 'text' },
    {label: 'Category', fieldName: CATEGORY_FIELD.fieldApiName, type: 'text'},
    {label: 'Amount', fieldName: AMOUNT_FIELD.fieldApiName, type: 'currency',},
    {label: 'Expense Date', fieldName: DATE_FIELD.fieldApiName, type: 'date'},
]

export default class ExpenseList extends LightningElement {    
    columns = COLUMNS;
    @track errors;
    @track refreshExpenses;
    @track expenses = [];

    @wire(getExpenses) expList(result) {
        
        this.refreshExpenses = result;
        if(result.data) {
            this.expenses = result.data;
            this.error = undefined;
        } else if (result.error) {
            this.error = result.error;
            this.expenses = [];
        }
    };

    @api refreshList() {
        refreshApex(this.refreshExpenses);
    }

}