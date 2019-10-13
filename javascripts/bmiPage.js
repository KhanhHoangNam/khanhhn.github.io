/**
 * @author khanhhn on 13/10/2019
 * @version 1.0.0
 * @project nodejsapp
 * "JavaScript-jquery phía client"
 */
 $(document).ready((event) => {
     $("#btn-calculate-bmi").click((event) => {
        event.preventDefault() //Không cho phép xóa form sau khi bấm button
        const name = $("#name").val()
        const weight = parseFloat($("#weight").val())
        const height = parseFloat($("#height").val())/100 //meters
        const urlString = `http://${serverName}:${serverPort}/users/bmi?name=${name}&weight=${weight}&height=${height}`
        //Gửi request tới server
        $.ajax({
            url: urlString,
            type: 'GET', //Giống như gửi từ FireFox, Chrome, ...
            success: (response) => {
                // alert(`response = ${JSON.stringify(response)}`)
                $("#bmi-value").val(response.data)
            },
            error: (error) => {
                alert(error);
            }
        })
    })
 })