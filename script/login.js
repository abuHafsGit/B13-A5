console.log("loging js")

document.getElementById('login').addEventListener('click', () => {
    //get number
    const getUserName = document.getElementById('userName')
    const userName = getUserName.value;

    //get pss 
    const getUserPassword = document.getElementById('userPassword')
    const userPassword = getUserPassword.value;

    console.log(userName, userPassword)

    if (userName == 'admin' && userPassword == 'admin123') {
        // window.location.replace('/home.html')
        window.location.assign('./pages/home.html')
    } else {
        alert('invaild pass and number')
    }

})