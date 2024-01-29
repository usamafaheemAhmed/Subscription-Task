let start = 0;
document.getElementById('Monthly').style.fontWeight = "600";
let obj = {};

function Step() {
    let error = false;
    if (start == 0) {
        let name = document.getElementById('Name');
        var nameRegex = /^[A-Za-z ]+$/;
        if (!nameRegex.test(name.value)) {
            document.getElementById("helpId").innerHTML = "Please enter valid Name"
            document.getElementById("helpId").classList.add('text-danger');
            document.getElementById("helpId").classList.remove('d-none');
            name.classList.add("is-invalid")
            name.focus();
            error = true;
            // document.getElementById("emailHelpId")
            // document.getElementById("PhoneHelpId")
        }
        else {
            document.getElementById("helpId").innerHTML = "Please Enter Your Full-Name here"
            document.getElementById("helpId").classList.remove('text-danger');
            document.getElementById("helpId").classList.add('d-none');
            name.classList.remove("is-invalid");
            error = false;
        }

        // console.log("object")
        let emailInput = document.getElementById('email');
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(emailInput.value)) {
            document.getElementById("emailHelpId").innerHTML = "Please enter valid email"
            document.getElementById("emailHelpId").classList.add('text-danger');
            document.getElementById("emailHelpId").classList.remove('d-none');
            emailInput.classList.add("is-invalid")
            emailInput.focus();
            error = true;
        }
        else {
            document.getElementById("emailHelpId").innerHTML = "Enter Valid Email"
            document.getElementById("emailHelpId").classList.remove('text-danger');
            document.getElementById("emailHelpId").classList.add('d-none');
            emailInput.classList.remove("is-invalid");
            error = false;
        }

        let PhoneInput = document.getElementById('Phone');
        var phoneRegex = /^(\+\d{2} \d{3} \d{7}|\d{11})$/;

        if (!phoneRegex.test(PhoneInput.value)) {
            document.getElementById("PhoneHelpId").innerHTML = "Please enter valid Phone Number"
            document.getElementById("PhoneHelpId").classList.add('text-danger');
            document.getElementById("PhoneHelpId").classList.remove('d-none');
            PhoneInput.classList.add("is-invalid")
            PhoneInput.focus();
            error = true;
        }
        else {
            document.getElementById("PhoneHelpId").innerHTML = "Enter Valid Phone"
            document.getElementById("PhoneHelpId").classList.remove('text-danger');
            document.getElementById("PhoneHelpId").classList.add('d-none');
            PhoneInput.classList.remove("is-invalid");
            error = false;
        }

        if (error) {
            return false;
        }

        obj = {
            name: name.value,
            email: emailInput.value,
            Phone: PhoneInput.value
        }
        // console.log(obj);

        document.getElementById("Step1").classList.add('d-none');
        document.getElementById("Step2").classList.remove('d-none');
        document.getElementById("leftStep1").classList.remove('active');
        document.getElementById("leftStep2").classList.add('active');
        document.getElementById("BackBtn").classList.remove('d-none');
        document.getElementById("BackBtn2").classList.remove('d-none');
        start++;
    }
    else if (start == 1) {
        var checkedRadio = document.querySelector('input[type="radio"]:checked');
        // console.log(checkedRadio);
        obj.plan = {
            name: checkedRadio.id.replace(/-.*/, ''),
            price: checkedRadio.value
        }
        // console.log(obj)

        document.getElementById("Step2").classList.add('d-none');
        document.getElementById("Step3").classList.remove('d-none');
        document.getElementById("leftStep2").classList.remove('active');
        document.getElementById("leftStep3").classList.add('active');
        start++;
    }
    else if (start == 2) {
        var checkedAddOns = document.querySelectorAll('input[name="add_Ons"]:checked');
        // console.log(checkedAddOns)

        checkedAddOns = [...checkedAddOns];

        let allAddons = []
        checkedAddOns.map((elem, index) => {
            let data = {
                name: elem.id,
                price: elem.value
            }
            allAddons.push(data);
        })
        // console.log(allAddons)
        obj.AddOns = allAddons;

        console.log(obj)

        PrintingSummary();

        document.getElementById("Step3").classList.add('d-none');
        document.getElementById("Step4").classList.remove('d-none');
        document.getElementById("leftStep3").classList.remove('active');
        document.getElementById("leftStep4").classList.add('active');
        document.getElementById("NextBtn").innerHTML="Submit";
        document.getElementById("NextBtn2").innerHTML="Submit";
        start++;
    }
    else if (start == 3){
        document.getElementById("Step4").classList.add('d-none');
        document.getElementById("Step5").classList.remove('d-none');
        document.getElementById("NextBtn").classList.add('d-none');
        document.getElementById("NextBtn2").classList.add('d-none');
        document.getElementById("BackBtn").classList.add('d-none');
        document.getElementById("BackBtn2").classList.add('d-none');
        start++;
    }
}

function PrintingSummary() {


    let MOrY = document.getElementById('YearlyInput').checked ? "yr" : 'mo'; //for short of plan Yearly or monthly
    
    let totalPrice = 0;//for calculating total price of all things

    // Printing Plan  

    // Get the parent container
    var parentContainer = document.getElementById('PS_Plan');
    parentContainer.innerHTML = "";

    // Create the first div with class "w-75"
    var div1 = document.createElement('div');
    div1.className = 'w-50';

    // Create the h6 element with text "Arcade"
    var h6 = document.createElement('h6');
    h6.className = 'm-0';
    h6.textContent = obj.plan.name;

    // Create the "Change" link
    var a = document.createElement('a');
    a.href = '#';
    a.className = 'card-text';
    a.textContent = 'Change';

    // Append the h6 and a elements to the first div
    div1.appendChild(h6);
    div1.appendChild(a);

    // Create the second div with class "w-25 pt-2"
    var div2 = document.createElement('div');
    div2.className = 'w-50 pt-2 text-end';

    // Create the strong element
    var strong = document.createElement('strong');

    // Create the span element with text "+$1/mo"
    var span = document.createElement('span');
    span.textContent = `+$${obj.plan.price}/${MOrY}`;

    totalPrice += parseFloat(obj.plan.price);

    // Append the span to the strong element
    strong.appendChild(span);

    // Append the strong element to the second div
    div2.appendChild(strong);

    // Append the first and second divs to the parent container
    parentContainer.appendChild(div1);
    parentContainer.appendChild(div2);

    //* printing Addons

    // Get the parent container
    parentContainer = document.getElementById('PS_AddOns');
    parentContainer.innerHTML = "";

    obj.AddOns.map((elem, index) => {
        // Create the outer div with class "col-md-12"
        var outerDiv = document.createElement('div');
        outerDiv.className = 'col-md-12';

        // Create the inner div with class "d-flex"
        var innerDiv = document.createElement('div');
        innerDiv.className = 'd-flex';

        // Create the first div with class "w-75"
        var div1 = document.createElement('div');
        div1.className = 'w-75';

        // Create the p element with text "Online service"
        var p1 = document.createElement('p');
        p1.className = 'card-text';
        p1.textContent = elem.name; //.replace(/-/, ' ')

        // Append the p element to the first div
        div1.appendChild(p1);

        // Create the second div with class "w-25"
        var div2 = document.createElement('div');
        div2.className = 'w-25';

        // Create the p element with text "+$1/mo"
        var p2 = document.createElement('p');
        p2.textContent = `+$${elem.price}/${MOrY}`;

        totalPrice += parseFloat(elem.price);


        // Append the p element to the second div
        div2.appendChild(p2);

        // Append the first and second divs to the inner div
        innerDiv.appendChild(div1);
        innerDiv.appendChild(div2);

        // Append the inner div to the outer div
        outerDiv.appendChild(innerDiv);

        // Append the outer div to the parent container
        parentContainer.appendChild(outerDiv);
    })


    document.getElementById('TYearly_Monthly').innerHTML = document.getElementById('YearlyInput').checked ? "(per Year)" : "(per Month)";
    document.getElementById('Total_Amount').innerHTML = `+$${totalPrice}/${MOrY}`;

    obj.totalCost = totalPrice;
    obj.Package = document.getElementById('YearlyInput').checked ? "(per Year)" : "(per Month)";

}

function switchToYear(check) {
    // alert(check);
    let mF2 = document.getElementsByClassName('2mF');
    mF2 = [...mF2];

    let addOnCost = document.getElementsByClassName('addOnCost');
    addOnCost = [...addOnCost];

    // console.log(addOnCost)

    let RadioInputs = document.getElementsByName('Plan');
    RadioInputs = [...RadioInputs];

    let add_Ons = document.getElementsByName('add_Ons');
    add_Ons = [...add_Ons];

    if (check) {
        document.getElementById('Monthly').style.fontWeight = "300";
        document.getElementById('Yearly').style.fontWeight = "600";
        document.getElementById('plan-Price1').innerHTML = "$90/yr";
        document.getElementById('plan-Price2').innerHTML = '$120/yr';
        document.getElementById('plan-Price3').innerHTML = '$150/yr';
        mF2.forEach(elem => {
            elem.classList.remove('d-none');
        });
        RadioInputs[0].value = "90";
        RadioInputs[1].value = "120";
        RadioInputs[2].value = "150";
        // changing price of next step

        add_Ons[0].value = "10";
        add_Ons[1].value = "20";
        add_Ons[2].value = "20";

        addOnCost[0].innerHTML = "+$10/yr";
        addOnCost[1].innerHTML = "+$20/yr";
        addOnCost[2].innerHTML = "+$20/yr";

    }
    else {
        document.getElementById('Monthly').style.fontWeight = "600";
        document.getElementById('Yearly').style.fontWeight = "300";
        document.getElementById('plan-Price1').innerHTML = "$9/mo";
        document.getElementById('plan-Price2').innerHTML = '$12/mo';
        document.getElementById('plan-Price3').innerHTML = '$15/mo';
        mF2.forEach(elem => {
            elem.classList.add('d-none');
        });
        RadioInputs[0].value = "9";
        RadioInputs[1].value = "12";
        RadioInputs[2].value = "15";
        // changing price of next step
        add_Ons[0].value = "1";
        add_Ons[1].value = "2";
        add_Ons[2].value = "2";

        addOnCost[0].innerHTML = "+$1/mo";
        addOnCost[1].innerHTML = "+$2/mo";
        addOnCost[2].innerHTML = "+$2/mo";
    }

    // console.log(add_Ons)
}


function BackStep() {
    if (start == 3) {
        document.getElementById("Step3").classList.remove('d-none');
        document.getElementById("leftStep4").classList.remove('active');
        document.getElementById("Step4").classList.add('d-none');
        document.getElementById("leftStep3").classList.add('active');
        document.getElementById("NextBtn").innerHTML="Next step";
        document.getElementById("NextBtn2").innerHTML="Next step";
        start--;
    }
    else if (start == 2) {
        document.getElementById("Step2").classList.remove('d-none');
        document.getElementById("Step3").classList.add('d-none');
        document.getElementById("leftStep2").classList.add('active');
        document.getElementById("leftStep3").classList.remove('active');
        start--;
    }
    else if (start == 1) {
        document.getElementById("Step1").classList.remove('d-none');
        document.getElementById("Step2").classList.add('d-none');
        document.getElementById("leftStep1").classList.add('active');
        document.getElementById("leftStep2").classList.remove('active');
        
        document.getElementById("BackBtn").classList.add('d-none');
        document.getElementById("BackBtn2").classList.add('d-none');
        start--;
    }
}


function addonSelect(id) {
    document.querySelector(`label[for="${id}"]`).classList.toggle('active2');
}