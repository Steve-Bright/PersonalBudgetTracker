import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";


// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
// import { getDatabase, ref, onValue} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

const firebaseConfig = {
    databaseURL: "https://personal-budget-tracker-63862-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(firebaseConfig);
const database = getDatabase(app)
const budgetList = ref(database, "BudgetList");

const budget = document.getElementById("budgetValue");
const transactions = document.getElementById("recentTransactions");
//budget[0] is history transactions
//budget[1] is total budget.


onValue(budgetList, function(snapshot){
    if(snapshot.exists()){
        let itemsArray = Object.entries(snapshot.val());
        let itemHistory = itemsArray[0];
        let itemBudget = itemsArray[1];

        appendValue(itemBudget);
        console.log(itemHistory);
        appendTransactions(itemHistory);
    }else{
        console.log("not working!")
    }
})

function appendValue(money){
    console.log("This is money object" + typeof money);
    budget.textContent = money[1];
}

function appendTransactions(history){
    for(let i = 0; i < history[1].length; i++){
        // console.log(history[1]);
        if(history[1][i].saving === true){
            transactions.innerHTML+= `
            <div class="recentBox">
                <div class="label labelGreen"></div>
                <div class="value">+ ${history[1][i].value}</div>
            </div>
            `;
        }else{
            transactions.innerHTML+= `
            <div class="recentBox">
                <div class="label labelRed"></div>
                <div class="value">- ${history[1][i].value}</div>
            </div>
            `;
        }
    }
}
