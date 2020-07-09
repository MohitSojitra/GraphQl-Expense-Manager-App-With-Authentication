console.log("add Expense")
const title = document.getElementById("title")
const isPaid = document.getElementById("isPaid")
const amount = document.getElementById("amount")
const date = document.getElementById("date")
const btn = document.getElementById("btn")


btn.addEventListener("click" , async (e)=>{
    e.preventDefault()
    let paidStatus = isPaid.value.trim() === "true" ? true : false;

    try {
        const url = "http://localhost:4000/";
        const query = `
        mutation {
            addExpense(data: {
              title : \"${title.value}\" , isPaid : ${paidStatus} , amount : ${parseInt(amount.value)} , date: \"${date.value}\"
            }){
              title
              amount
              isPaid
            }
          }
      `;

        const params = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Authorization" : "bearer " + localStorage.getItem("expenseToken")
              },
            body : JSON.stringify({query})
        }

        const res = await fetch(url , params);
        const data = await res.json();
        console.log(data.data.addExpense.isPaid);
        if(data.data.addExpense.isPaid === paidStatus && data.data.addExpense.title === title.value)
        {
            alert("Sucessfull added Expense!")
            title.value = ""
            isPaid.value = ""
            amount.value = ""
            date.value = ""
        }
        else{
            alert("error please add field appropriatly")
        }
        // localStorage.setItem("expenseToken" , data.data.login.token)
        // window.location = "http://127.0.0.1:5500/client/homePage.html"
    }
    catch(err)
    {
        alert("error please add field appropriatly")
        console.log(err);
    }

})

