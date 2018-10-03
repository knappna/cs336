/**
* This is the second lab for Web Design, cs 336
* First work with javascript
* Natalie Knapp
*/

function Person(name, birthdate, friends){
	this.Name = name;
	this.Birthday = birthdate;
	this.Friendlist = friends;
}

//changes currentName to newName
function changeName(newName){
	this.currentName = newName;
}

//calculates age based on birthday
function getAge(dateString){
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}

//adds a new friend
function addFriend(newFriend){
	this.Friendlist = this.Friendlist + ", " + newFriend;
}

//greeting
function greet(name){
	console.log("Hello, my name is " + name);
}

//create instances of people
var p1 = new Person("Natalie", "08-06-1996", "Katie, Sara, David");
greet(p1.Name);
var p2 = new Person("Katie", "08-06-1996", "Natalie, Sara, David");
greet(p2.Name);
var p3 = new Person("Sara", "01-01-1997", "Katie, Natalie, Jack");
greet(p3.Name);

//compare ages (that are ==)
console.log("Natalie's age is " + getAge(p1.Birthday));
console.log("Katie's age is " + getAge(p2.Birthday));

if (getAge(p1.Birthday) == getAge(p2.Birthday)){
	console.log("Success! These two are twins!");
}else{
	console.log("Something went wrong in age comparison");
}

//compare ages (that are !=)
console.log("Natalie's age is " + getAge(p1.Birthday));
console.log("Sara's age is " + getAge(p3.Birthday));

if (getAge(p1.Birthday) != getAge(p3.Birthday)){
	console.log("Success! These ages are different");
}else{
	console.log("Something went wrong in age comparison");
}


//add a friend
console.log("Natalie's friends are " + p1.Friendlist);
addFriend.call(p1, "Jack");
console.log("Friend added.");
console.log("Natalie's friends are " + p1.Friendlist);


//change a name
changeName.call(p1, "Anne");
greet(p1.Name);

function Student(name, birthdate, friends, subject){
	Person.call(this, name, birthdate, friends);
	this.Subject = subject;
}

Student.prototype = Object.create(Person.prototype);
Student.prototype.greet = function(){
	return "I'm a student";	
}


var s1 = new Student("Carolyn", "06-13-2000", "Natalie, Jack, David", "Computer Science");
var s2 = new Student("Ted", "04-09-2002", "Carolyn, Jack, David", "Engineering");

//check sub-classing
console.log(s1 instanceof Student);
console.log(s2 instanceof Person); 
