import { LightningElement } from 'lwc';
import { ShowToastEvent} from 'lightning/platformShowToastEvent';
import  EXPENSE_OBJECT from '@salesforce/schema/Expense__c';
import NAME_FIELD from '@salesforce/schema/Expense__c.Name';
import CATEGORY_FIELD from '@salesforce/schema/Expense__c.Category__c';
import AMOUNT_FIELD from '@salesforce/schema/Expense__c.Amount__c';
import DATE_FIELD from '@salesforce/schema/Expense__c.Expense_Date__c';

export default class ExpenseCreator extends LightningElement {    
    expenseObject = EXPENSE_OBJECT;
    nameField = NAME_FIELD;
    categoryField = CATEGORY_FIELD;
    amountField = AMOUNT_FIELD;
    dateField = DATE_FIELD;
    expenseId;

    handleSubmit(event) {        
        event.preventDefault();
        const fields = event.detail.fields;        
        if(fields) {                    
            const fieldsTransformed = JSON.parse(JSON.stringify(fields));
            let expenseDate = new Date(fieldsTransformed.Expense_Date__c);
            console.log('expenseDate',expenseDate);                                   
            if(expenseDate.getDay() === 5) {
                fields['Weekly_Recurring_Expense__c'] = true;
            }
            if(expenseDate.getDate() === 15) {
                fields['Monthly_Recurring_Expense__c'] = true;
            }
            console.log('fielfs after statments', JSON.stringify(fields))
            this.template.querySelector('lightning-record-edit-form').submit(fields);
        }                                
    }

    handleSucces(event) {
        const evt = new ShowToastEvent({
            title: 'Success',
            message: 'Expense created succesfully',
            variant: 'success',
        });
        this.dispatchEvent(evt);
        this.expenseId = event.detail.id;
        console.log('this.expenseId',this.expenseId);
        this.template.querySelector('c-expense-list').refreshList();
        this.handleReset(event);
    }

    handleReset(event) {
        console.log('handleReset executed');
        const inputFields = this.template.querySelectorAll(
            'lightning-input-field'
        );
        if (inputFields) {
            inputFields.forEach(field => {
                field.reset();
            });
        }
     }

}