export function validation_reg(email) {
    var emailRegex = /^([a-z1-5]{12})$/;
   email = email.trim();
   if (email == "" || email == undefined || email == null) {
       return { status: false, error: "*please enter the account name." };
   }
//    else if (!emailRegex.test(email)) {
//        return { status: false, error: "*please enter valid account name." };
//    }
   else {
       return { status: true, error: '' };
   }
}
//Name validation
export function validateName(name) {
    // var nameRegex = /^[a-zA-Z ]+$/;
    var name = name.trim();
    if (name == "" || name == undefined || name == null) {
        return { status: false, error: "*please enter your name."};
    }
    // else if (!nameRegex.test(name)) {
    //     return { status: false, error: "*please enter valid name." };
    // }
    else if (name.length < 2) {
        return { status: false, error: "*please enter atleast 2 characters." }
    }
    else {
        return { status: true, error: '' };
    }
}
//quantity validation
export function validation_quantity(email) {
    // var emailRegex =/^\d+(\.\d{1,4})?$/;
   email = email.trim();
   if (email == "" || email == undefined || email == null) {
       return { status: false, error: "*please enter the private key." };
   }
//    else if (!emailRegex.test(email)) {
//        return { status: false, error: "*quantity takes only numeric value & upto 4 digit after decimal." };
//    }
   else {
       return { status: true, error: '' };
   }
}