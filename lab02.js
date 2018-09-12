/**
* This is the second lab for Web Design, cs 336
* First work with javascript
* Natalie Knapp
*/

function Person(name, birthdate, friends){
	this.Name = name;
	this.Birthday = birthdate;
	this.Friendlist = friends;
{

//changes currentName to newName
function name(newName){
	this.currentName = newName;
}

//calculates age based on birthday
function getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}
console.log('age: ' + getAge("1980/08/10"));

//adds a new friend
function addFriend(newFriend){
	this.Friendlist = Friendlist + newFriend;
}

//greeting
function greet(){
	console.log("Hello, my name is " + this.Name);
}



function Student(name, birthdate, friends, subject){
	Person.call(this, name, birthdate, friends);
	this.Subject = subject;
}

Student.prototype = Object.create(Person.prototype);
Student.prototype.greet = function(){
	return "I'm a student";	
}


