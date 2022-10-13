public with sharing class ExpenseController {
    @AuraEnabled(cacheable=true)
    public static List<Expense__c> getExpenses(){
        try {
            return [
                SELECT Id, Name, Category__c, Amount__c, Expense_Date__c
                FROM Expense__c ORDER BY Expense_Date__c
            ];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
