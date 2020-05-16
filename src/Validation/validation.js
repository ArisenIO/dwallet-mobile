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