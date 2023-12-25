// app.js
const db = require('./db');
const Person = require('./models/person');
const dotenv = require('dotenv');
dotenv.config();

// Create a person and save it
const newPerson = new Person({
    name: 'John',
    age: 25,
    favoriteFoods: ['Pizza', 'Burger'],
});

newPerson.save()
    .then(data => {
        console.log('Person saved:', data);
    })
    .catch(err => {
        console.error(err);
    });

// Create many records
const arrayOfPeople = [
    { name: 'Alice', age: 30, favoriteFoods: ['Pasta', 'Salad'] },
    { name: 'Bob', age: 28, favoriteFoods: ['Steak', 'Chicken'] },
];

Person.create(arrayOfPeople)
    .then(data => {
        console.log('People created:', data);
    })
    .catch(err => {
        console.error(err);
    });

// Find all people with a given name
Person.find({ name: 'John' })
    .then(data => {
        console.log('People with name John:', data);
    })
    .catch(err => {
        console.error(err);
    });

// Find one person with a certain food in favorites
Person.findOne({ favoriteFoods: 'Pizza' })
    .then(data => {
        console.log('Person with favorite food Pizza:', data);
    })
    .catch(err => {
        console.error(err);
    });

// Find person by _id and add "hamburger" to favoriteFoods
const personId = '6589c15f58cbf1e759d9dbba';
Person.findById(personId)
    .then(data => {
        console.log('Person with ID', personId, ':', data);
    })
    .catch(err => {
        console.error(err);
    });

// Find and update person's age to 20
const personName = 'Alice';
Person.findOneAndUpdate({ name: personName }, { age: 20 }, { new: true })
    .then(updatedPerson => {
        console.log('Updated person by name', personName, ':', updatedPerson);
    })
    .catch(err => console.error(err));

// Delete one person by _id
const personDeleteId = '6589c15f58cbf1e759d9dbba';
Person.findOneAndDelete({ _id: personDeleteId })
    .then(removedPerson => {
        console.log('Removed person:', removedPerson);
    })
    .catch(err => console.error(err));

// Delete all people whose name is "Mary"
Person.deleteMany({ name: 'Mary' })
    .then(result => {
        console.log('Deleted documents:', result);
    })
    .catch(err => console.error(err));

// Chain search query helpers
Person.find({ favoriteFoods: 'Burritos' })
    .sort('name')
    .limit(2)
    .select('-age')
    .then(data => {
        console.log('Filtered and sorted people:', data);
    })
    .catch(err => {
        console.error(err);
    });
