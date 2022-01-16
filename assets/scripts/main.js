const fullName = document.getElementById('nameInput');
const email = document.getElementById('emailInput');
const password = document.getElementById('passInput');
const passwordConfirm = document.getElementById('comfirmInput');
const address = document.getElementById('addresss');
const modal = document.getElementById('modal');
const btnSubmit = document.getElementById('disableBtn');
const btnLoading = document.getElementById('loadingBtn');
const regFullName = /^(?=.*\D)(?=.*[^@$!%*?&])[\D]*[^@$!%`1*?&]*[\D]*[^~!@##$%^&*()0-9]+$/;
const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const regPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
let listInputs = [
    {
        id: 'name',
        input: fullName,
        rule: [
            { regex: regFullName, message: 'Tên chứa ký tự đặc biệt hoặc số' },
        ],
        ruleNotGuess: [
            {regex: () => {
                if(fullName.value[0].trim() == fullName.value[0].trim().toUpperCase()){
                    return true
                }else{
                    return false
                }
            }, message: "Viết hoa chữ cái đầu"} 
            
        ],
        required: 'Tên không được để trống',
        check: false
    },
    {
        id: 'email',
        input: email,
        rule: [
            { regex: regEmail, message: 'Email không hợp lệ' },
        ],
        required: 'Email không được để trống',
        check: false
    },
    {
        id: 'pass',
        input: password,
        rule: [
            { regex: regPassword, message: 'Pass không hợp lệ' },
        ],
        required: 'Password không được để trống',
        check: false
    },
    {
        id: 'comfirm',
        input: passwordConfirm,
        message: 'Mật khẩu chưa đúng',
        required: 'Comfirm không được để trống',
        check: false
    },
    {
        id: 'address',
        input: address,
        check: true
    },


];
resetForm();
function resetForm() {
    const closeResult = document.getElementsByName('closeResult');
    closeResult.forEach(element => {
        element.addEventListener('click', (e) => {
            resetForm();
        })
    });
    btnSubmit.addEventListener('click', (e) => {
        submitForm();
    })
    btnLoading.style.display = "none";
    btnSubmit.style.display = "block";
    for (let i = 0; i < listInputs.length; i++) {
        validateOnchange(i);
    }
    btnSubmit.disabled = true;
    btnSubmit.classList.remove("form__btn--enb");
    modal.style.display = 'none';
    fullName.value = "";
    email.value = "";
    password.value = "";
    passwordConfirm.value = "";
    listInputs.forEach(element => {
        if(element.rule){
        element.check = false;
    }
        else{
        element.check = true;
    }
    });
}

function validateOnchange(i) {
    const inputBox = document.getElementsByClassName('input-item__input');
    const messageError = document.getElementsByClassName("input-item__error")
    listInputs[i].input.addEventListener('input', function (event) {
        const value = listInputs[i].input.value.trim();
        if (value.length == 0 && listInputs[i].check == false) {
            inputBox[i].classList.add('input-item__input--error');
            messageError[i].innerText = listInputs[i].required;
        } else {
            if (listInputs[i].rule) {
                for (let j = 0; j < listInputs[i].rule.length; j++) {
                    let checked = listInputs[i].rule[j].regex.test(value);
                    if (!checked) {
                        inputBox[i].classList.add('input-item__input--error');
                        messageError[i].innerText = listInputs[i].rule[j].message;
                        listInputs[i].check = false;
                    } else {
                        if(listInputs[i].ruleNotGuess){
                            listInputs[i].ruleNotGuess.forEach(ele => {
                                if(!ele.regex()){
                                    inputBox[i].classList.add('input-item__input--error');
                                    messageError[i].innerText = ele.message;
                                    listInputs[i].check = false;
                                }
                                else
                                {
                                    inputBox[i].classList.remove('input-item__input--error');
                                    messageError[i].innerText = '';
                                    listInputs[i].check = true;
                                }
                            })
                        }else
                        {
                        inputBox[i].classList.remove('input-item__input--error');
                        messageError[i].innerText = '';
                        listInputs[i].check = true;
                        }
                    }
                }
            }
            if (listInputs[i].id === 'comfirm') {
                checkPasswordConfirm(i);
            }
            if (listInputs[i].id === 'pass') {
                checkPasswordConfirm(i + 1);
            }
        }
        validate();
    });

}

function checkPasswordConfirm(i) {
    const inputBox = document.getElementsByClassName('input-item__input');
    const messageError = document.getElementsByClassName("input-item__error")
    if(listInputs[i-1].check == true){
    if (passwordConfirm.value.trim() !== password.value.trim() ) {
        inputBox[i].classList.add('input-item__input--error');
        messageError[i].innerText = listInputs[i].message;
        listInputs[i].check = false;
    } else {
        inputBox[i].classList.remove('input-item__input--error');
        messageError[i].innerText = "";
        listInputs[i].check = true;
    }
    }else{
        inputBox[i].classList.add('input-item__input--error');
        messageError[i].innerText = listInputs[i].message;
    }
}
function submitForm() {
    btnSubmit.style.display = "none";
    btnLoading.style.display = 'block';
    const namecf = document.getElementById('nameResult');
    const emailcf = document.getElementById('emailResult');
    const passcf = document.getElementById('passResult');
    emailcf.innerHTML = email.value;
    passcf.innerHTML = password.value;
    namecf.innerHTML = fullName.value;
    setTimeout(() => { modal.style.display = 'block'; }, 2000);
}
function validate() {
    let check = true;
    listInputs.forEach(element => {
        if (element.check == false) {
            check = false;
        }
    });
  loadBtn(check)
}
function loadBtn(bools){
    if (bools) {
        btnSubmit.disabled = false;
        btnSubmit.classList.add("form__btn--enb");

    }
    if (!bools) {
        btnSubmit.disabled = true;
        btnSubmit.classList.remove("form__btn--enb");
    }
}