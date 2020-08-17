(function ($) {
    "use strict";

    var folderpath = "/Users/tailordevs/Downloads/daiict-services_V2/"
    var apiUrl = "http://localhost:3000"

    ValidateToken()

    /*==================================================================
    [ Validate after type ]*/
    $('.validate-input .input100').each(function () {
        $(this).on('blur', function () {
            if (validate(this) == false) {
                showValidate(this);
            } else {
                $(this).parent().addClass('true-validate');
            }
        })
    })
    // validation  for select or DropDown   
    $('.validate-input .input10').each(function () {
        $(this).on('blur', function () {
            if (validate(this) == false) {
                showValidate(this);
            } else {
                $(this).parent().addClass('true-validate');
            }
        })
    })

    function validateSelect(input) {
        if ($(input).val().trim() == '') {
            return false;
        }

    }

    $('.validate-form .input10').each(function () {
        $(this).focus(function () {
            hideValidate(this);
            $(this).parent().removeClass('true-validate');
        });
    });

    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit', function () {

        var check = false;
        var username = '';
        var password = '';

        for (var i = 0; i < input.length; i++) {
            if (validate(input[i]) == false) {
                showValidate(input[i]);
                check = false;
            } else {
                if (input[i].name === 'username') {
                    username = input[i].value;
                } else if (input[i].name === 'pass') {
                    password = input[i].value;
                }
            }
        }

        if (username !== '' && password !== '') {
            var logindata = {
                emailId: username,
                password: password
            }
            post_data('/user/',
                logindata,
                function (data) {
                    if (data.type === 'Success') {
                        localStorage.setItem("auth", data['data']);
                        localStorage.setItem("redirect", 'N');
                        window.location = apiUrl
                    } else {
                        window.alert(data.message.user);
                        // window.alert('Username or password is incorrect');
                    }
                },
                function (error) {
                    console.log(error);
                })
        }
        // Im returning false because When you return true then form.submit load page 
        return false;
    });


    $('.validate-form .input100').each(function () {
        $(this).focus(function () {
            hideValidate(this);
            $(this).parent().removeClass('true-validate');
        });
    });

    $('#logout').click(function () {
        var r=confirm("Are You Sure You Want to LOGOUT?");
        if(r==true)
        {
        localStorage.removeItem("auth");
        window.location = apiUrl + '/login'
        }
    })


    // $('#changePasswordForm').on('submit',function(){
    //     var changePassworddata = {}
    //     console.log('Hello Devendra');
    //     var inputsignup = $('#changePasswordForm .input100');
    //     for (var i = 0; i < inputsignup.length; i++) {
    //         changePassworddata[inputsignup[i].name] = inputsignup[i].value;
    //     }

    //     changePassworddata['token'] = localStorage.getItem('auth')
    //     console.log(changePassworddata)


    //     // post_data('/signup/',
    //     //     inputsignup,
    //     //     function (data) {
    //     //         if (data.type === 'Success') {
    //     //             localStorage.setItem("redirect", 'N');
    //     //             window.location = apiUrl + '/Login'
    //     //         } else {
    //     //             console.log(data.message.user);
    //     //         }
    //     //     },
    //     //     function (error) {
    //     //         console.log(error);
    //     //     })
    //     return false;

    // })

    $('#signupForm').on('submit', function () {
        var signupdata = {}
        var inputsignup = $('#signupForm .input100');
        for (var i = 0; i < inputsignup.length; i++) {
            signupdata[inputsignup[i].name] = inputsignup[i].value;
        }

        post_data('/signup/',
            inputsignup,
            function (data) {
                if (data.type === 'Success') {
                    localStorage.setItem("redirect", 'N');
                    window.location = apiUrl + '/Login'
                } else {
                    
                    alert("The Email_ID already exists..!");
                }
            },
            function (error) {
                console.log(error);
            })
        return false;

    });



    function validate(input) {
        if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        } else {
            if ($(input).val().trim() == '') {
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');

        $(thisAlert).append('<span class="btn-hide-validate">&#xf135;</span>')
        $('.btn-hide-validate').each(function () {
            $(this).on('click', function () {
                hideValidate(this);
            });
        });
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();
        $(thisAlert).removeClass('alert-validate');
        $(thisAlert).find('.btn-hide-validate').remove();
    }

    function ValidateToken() {
        var token = localStorage.getItem('auth')
        console.log(token);
        if (token !== null) {
            var logindata = {
                token
            }
            post_data('/user/validate',
                logindata,
                function (data) {
                    if (data.type === 'Success' && data.data === true) {
                        return true;
                    } else {
                        localStorage.setItem("redirect", 'N');
                        window.location = apiUrl + '/Login'
                        localStorage.removeItem('auth');
                    }
                },
                function (error) {
                    console.log(error);
                })
        } else {
         
            var redirect = localStorage.getItem('redirect')
            // This will handle infinte login direction
            if (redirect === 'N' || redirect === null || redirect === undefined) {
                window.location = apiUrl + '/Login'
                localStorage.setItem("redirect", 'Y');
            }
        }
    }


    function get_data(url, success, failure) {
        $.ajax({
            url: apiUrl + url,
            method : 'GET',
            header: {
                "Accept": "application/json;odata:verbose"
            },
            success: function (data) {
                success(data);
            },
            error: function (error) {
                failure(error)
            }
        })
    }

    function post_data(url, data, success, failure) {
        $.ajax({
            url: apiUrl + url,
            method: 'POST',
            data: data,
            header: {
                "Accept": "application/json;odata:verbose"
            },
            success: function (data) {
                success(data);
            },
            error: function (error) {
                failure(error)
            }
        })
    }


})(jQuery);