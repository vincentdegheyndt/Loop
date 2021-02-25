const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const validateEmails = (emails)=>{
    const invalidEmails = emails
        //removes trailing comma if any
        .replace(/(^,)|(,$)/g, "")
        //removes every comma from the string
        //and return an array of strings
        //determined by where the commas used to be
        .split(',')
        //reminder .map return a new array. not the original
        .map(email=>email.trim())
        //will return any invalid email
        //email is tested against the regex
        .filter(email=>re.test(email)===false)

    if(invalidEmails.length){
        return `These emails are invalid: ${invalidEmails}`
    }
    // else return null
    return;
}

export default validateEmails
