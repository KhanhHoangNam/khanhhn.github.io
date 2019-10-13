/**
 * @author khanhhn on 13/10/2019
 * @version 1.0.0
 * @project nodejsapp
 */
$(document).ready((event) => {
    $("#btn-login").click((event) => {
        event.preventDefault() //Không cho phép xóa form sau khi bấm button
        const name = $("#name").val()
        const password = $("#password").val()
        const urlString = `http://${serverName}:${serverPort}/users/login`
        //http://127.0.0.1:8080/users/loginFailed
        const urlLoginFailed = `http://${serverName}:${serverPort}/users/loginFailed`
        //http://127.0.0.1:8080/users/loginSuccess
        const urlLoginSuccess = `http://${serverName}:${serverPort}/users/loginSuccess`
        $.ajax({
            url: urlString,
            type: 'POST',
            data: {name, password},
            success: (response) => {
                // alert(`res = ${JSON.stringify(response)}`)
                if(response.result === "success") {
                    //Sang trang Success
                    window.location.href = urlLoginSuccess
                } else {
                    //Sang trang Failed
                    window.location.href = urlLoginFailed
                }
            },
            error: (error) => {
                window.location.href = urlLoginFailed
            }
        })
    })   
})