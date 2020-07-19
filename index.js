const _fs = require("fs");
const readline = require('readline');
function addContact() {
  readContacts((contacts) =>{
    let item = {};
    newQuestion("What is your name? : ", (name)=>{
      item.name = name;
      newQuestion("What is your phone number? : ", (phone)=>{
        item.phone = phone;
        contacts.push(item);
        writeContacts(contacts, ()=>{
          newMenu();
        });
      });
    });
  });
}
function editContact() {
  const callback = (name) => {
    readContacts((contacts) =>{
      const contact = searchContact(contacts, name);
      if (!contact) {
        console.log("This contact cannot be found. If you would like to create a new contact, press n/N on the Phonebook Menu screen.");
        newMenu();
        return;
      }
      newQuestion("What is your new phone number? : ", (phone) => {
        contact.phone = phone;
        writeContacts(contacts, ()=>{
          newMenu();
        });
      });
    });
  };
  newQuestion("Enter the name of the contact you'd like to edit: ", callback);
}
function newQuestion(question, callback) {

  // create interface to terminal
  const rl = readline.createInterface({
    input: process.stdin, // standard input
    output: process.stdout // standard output
  });
  rl.question(question, (answer) => {
    rl.close();

    callback(answer);
  });
}
function readContacts(callback) {
  _fs.readFile('phone-book.json', function(err, data) {
    if (err) {
      console.log(err);
      return;
    }

    const coontacts = JSON.parse(data.toString());
    callback(coontacts);
  });
}
function findAContact() {
  const callback = (name) => {
    readContacts((contacts) =>{
      const contact = searchContact(contacts, name);
      if (!contact) {
        console.log("This contact cannot be found. If you would like to create a new contact, press n/N on the Phonebook Menu screen.");
        newMenu();
        return;
      }
      console.log(contact);
      newMenu();
    });
  };

  newQuestion("Who is the person you're searching for? : ", callback);
}
function writeContacts(data, callback) {
  _fs.writeFile('phone-book.json', JSON.stringify(data), function(err){
    if(err) {
      console.log(err);
    }
    callback();
  });
}
function showContacts() {
  readContacts((coontacts)=>{
    console.log("")
    for (let index = 0; index<coontacts.length; index+=1){
      console.log(coontacts[index]);
      console.log("");
    }
    newMenu();
  });
}
function searchContact(contacts, name) {
  for (let index = 0; index<contacts.length; index+=1){
    if (contacts[index].name === name) {
      return contacts[index];
    }
  }
  return null;
}
function newMenu() {
  console.log("  <-Phonebook Menu (Type Corresponding Hotkey To Start)->  ");
  console.log("c/C -- Show Contact List");
  console.log("e/E -- Edit An Existing Contact");
  console.log("n/N -- Add New Contact");
  console.log("s/S -- Search For A Contact");
  newQuestion("What would you like to do ? : ", function(answer){
    answer = answer.toLowerCase();
    if (answer === "c") {
      showContacts();
    } else if (answer === "e") {
      editContact();
    } else if (answer === "n") {
      addContact();
    } else if (answer === "s") {
      findAContact();
    } 
  });
}

newMenu();




