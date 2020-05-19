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

export function validation_quantity(email) {
    var emailRegex =/^\d+(\.\d{1,4})?$/;
   email = email.trim();
   if (email == "" || email == undefined || email == null) {
       return { status: false, error: "*please enter the quantity." };
   }
   else if (!emailRegex.test(email)) {
       return { status: false, error: "*quantity takes only numeric value & upto 4 digit after decimal." };
   }
   else {
       return { status: true, error: '' };
   }
}