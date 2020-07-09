console.log("edit expense:)");
const id = window.location.href.split("?id=")[1];

const title = document.getElementById("title")
const amount = document.getElementById("amount")
const isPaid = document.getElementById("isPaid")
const date = document.getElementById("date")
const btn = document.getElementById("btn")


const getExpenseDataById = async (id)=>{
    try {
        const url = "http://localhost:4000/";
        const query = `
        query {
            getExpenseById(id : \"${id}\")
            {
               title
              isPaid
              amount
              date
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
        // console.log("res")
        // console.log(res)
        const data = await res.json();
        console.log(data);

        title.value = data.data.getExpenseById.title
        amount.value = data.data.getExpenseById.amount
        isPaid.value = data.data.getExpenseById.isPaid
        date.value = data.data.getExpenseById.date


    }
    catch(err)
    {
        
        console.log(err);
    }
}
getExpenseDataById(id);


btn.addEventListener("click" , async (e)=>{
    try {
        const url = "http://localhost:4000/";
        const query = `
        mutation {
            updateExpense (id : \"${id}\" , data : {
              title : \"${title.value}\",
              isPaid : ${isPaid.value.trim() === "true" ? true : false},
              amount : ${parseFloat(amount.value)},
              date : \"${date.value}\"
            })
            {
              title,
              isPaid
              amount
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
        // console.log("res")
        // console.log(res)
        const data = await res.json();
        alert("update successfully")
        window.location = "http://127.0.0.1:5500/client/homePage.html";
        // monthlyExpense.innerText = data.data.getMonthExpense
    }
    catch(err)
    {
        alert("something Wrong in error!");
        console.log(err);
    }
})