console.log("it is home Page:)")
const monthlyIncome = document.getElementById("monthlyIncome");
const monthlyExpense = document.getElementById("monthlyExpense");
const userName = document.getElementById("userName");
const expenseBody = document.getElementById("expenseBody");
const logout = document.getElementById("logout");

const date = new Date();
const finalDate = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
console.log(finalDate);

const getMonthlyIncome = async ()=>{
    try {
        const url = "http://localhost:4000/";
        const query = `
        query {
            getMonthIncome(date: \"${finalDate}\")
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
        // console.log(data);
        monthlyIncome.innerText = data.data.getMonthIncome
    }
    catch(err)
    {
        console.log(err);
    }
}

getMonthlyIncome();

const getMonthlyExpense = async ()=>{
    try {
        const url = "http://localhost:4000/";
        const query = `
        query {
            getMonthExpense(date: \"${finalDate}\")
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
        // console.log(data);
        monthlyExpense.innerText = data.data.getMonthExpense
    }
    catch(err)
    {
        console.log(err);
    }
}

getMonthlyExpense();


const getExpenseData = async ()=>{
    try {
        const url = "http://localhost:4000/";
        const query = `
        query {
            getMonthExpenseData(date:\"${finalDate}\"){
              title
              isPaid
              amount
              date
              user {
                name
              }
              _id
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
        console.log(data);



        


         //table boiler code  no data found
        //  <tr>
        //         <td colspan="7"><h4 class="text-center text-danger bg-warning p-3">No data Found</h4></td>
        // </tr>


        // table if data found boiler plate

        
        // <tr>
        //         <th scope="row">1</th>
        //         <td>Mark</td>
        //         <td>Otto</td>
        //         <td>@mdo</td>
        //         <td>@mdo</td>
        //         <td><a class="btn-outline-warning btn">edit</a></td>
        //         <td><a class="btn-outline-danger btn">delete</a></td>

        //       </tr>
        //       <tr class="bg-success">
        //         <th scope="row">2</th>
        //         <td>Jacob</td>
        //         <td>Thornton</td>
        //         <td>@fat</td>
        //         <td>@fat</td>
        //         <td><a class="btn-outline-warning btn">edit</a></td>
        //         <td><a class="btn-outline-danger btn">delete</a></td>
        //       </tr>

        // <tr>
        //         <th scope="col">#</th>
        //         <th scope="col">Title</th>
        //         <th scope="col">Status</th>
        //         <th scope="col">Amount</th>
        //         <th scope="col">Date</th>
        //         <th scope="col">edit</th>
        //         <th scope="col">delete</th>
        //       </tr>


        if(data.data.getMonthExpenseData.length === 0)
        {
            expenseBody.innerHTML = ` 
                                    <tr>
                                            <td colspan="7"><h4 class="text-center text-danger bg-warning p-3">No data Found</h4></td>
                                    </tr>
                                `;
        }

        else{

            html = ""
            data.data.getMonthExpenseData.forEach(( ele, i) => {
                html += `<tr ${ele.isPaid === true ? "" : "class=\"bg-success\" "}>
                            <th scope="col">${i+1}</th>
                            <th scope="col">${ele.title}</th>
                            <th scope="col">${ele.isPaid === true ? "Paid" : "Recive"}</th>
                            <th scope="col">${ele.amount}</th>
                            <th scope="col">${ele.date}</th>
                            <td><a class="btn-outline-warning btn" href="./editExpense.html?id=${ele._id}">edit</a></td>
                            <td><a class="btn-outline-danger btn" id=${ele._id} onClick=deleteExpense(this.id)>Delete</a></td>
                        </tr>`
            });
            expenseBody.innerHTML = html

        }


    }
    catch(err)
    {
        console.log(err);
    }
}

getExpenseData()



const deleteExpense = async (id)=>{
    console.log(id);
    try {
        const url = "http://localhost:4000/";
        const query = `
        mutation {
            deleteExpense(id : \"${id}\"){
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
        console.log(data);
        if(typeof data.data.deleteExpense.isPaid === "boolean" && typeof data.data.deleteExpense.amount === "number")
        {
            window.location = "http://127.0.0.1:5500/client/homePage.html"
        }
        else {
            alert("something wrong!");
        }
        // monthlyExpense.innerText = data.data.getMonthExpense
    }
    catch(err)
    {
        alert("something Wrong in error!");
        console.log(err);
    }
}


const getName = async ()=>{
    try {
        const url = "http://localhost:4000/";
        const query = `
        query {
            me {
              name
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
        // console.log(data);
        
         name = data.data.me.name;
         userName.innerText = name[0].toUpperCase() + name.slice(1);
    }
    catch(err)
    {
        console.log(err);
    }
}
getName();


logout.addEventListener("click" , (e)=>{
    localStorage.setItem("expenseToken" , "");
    window.location = "http://127.0.0.1:5500/client/index.html";
})