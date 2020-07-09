console.log("it run signup :)")

const username = document.getElementById("username")
const password = document.getElementById("password")
const name = document.getElementById("name")
const email = document.getElementById("email")
const btn = document.getElementById("btn")


btn.addEventListener("click" , async (e)=>{
    e.preventDefault();
    console.log(username.value)
    try {
        const url = "http://localhost:4000/";
        const query = `
        mutation {
            register(data: {
              username : \"${username.value}\",
              password : \"${password.value}\",
              email: \"${email.value}\",
              name: \"${name.value}\"
            }){
              token
            }
          }
      `;

        const params = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
              },
            body : JSON.stringify({query})
        }

        const res = await fetch(url , params);
        // console.log("res")
        // console.log(res)
        const data = await res.json();
        console.log(data.data.register.token);
        localStorage.setItem("expenseToken" , data.data.register.token)
        window.location = "http://127.0.0.1:5500/client/homePage.html"
    }
    catch(err)
    {
        console.log(err);
    }

})


