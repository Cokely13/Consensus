'use strict'

const {db, models: {User, Question} } = require('../server/db')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'Ryan', email: "ryan.cokely@gmail.com",  password: '123', admin: true }),
    User.create({ username: 'Matt', email: "mclaise@gmail.com",  password: '123'}),
    User.create({ username: 'Scott', email: "scottlcokely@gmail.com",  password: '123'}),
    User.create({ username: 'Jamal', email: "jamalcoston@gmail.com",  password: '123'}),
  ])

  // const questions = await Promise.all([
  //   Question.create({text: "Pick an Actor", optionA:"Al Pacino", optionB:"Robert Deniro" }),
  //   Question.create({text: "Pick an Actor", optionA:"Ben Affleck", optionB:"Matt Damon" }),
  //   Question.create({text: "Pick a Food", optionA:"Cheez Itz", optionB:"Goldfish" }),
  //   Question.create({text: "Pick a Food", optionA:"Hot Dog", optionB:"Burger" }),
  //   Question.create({text: "Pick a Food", optionA:"PeanutButter", optionB:"Jelly" }),
  //   Question.create({text: "Pick a Singer", optionA:"Billy Joel", optionB:"Bruce Springsteen" }),
  //   Question.create({text: "Pick a Singer", optionA:"Whitney Houston", optionB:"Mariah Carey" }),

  // ])

  const today = new Date();

  // Helper function to add days to a date
  const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  // Creating Questions with dates
  const questions = await Promise.all([
    Question.create({ text: "Pick an Actor", optionA: "Al Pacino", optionB: "Robert Deniro", dateAsked: today }),
    Question.create({ text: "Pick an Actor", optionA: "Ben Affleck", optionB: "Matt Damon", dateAsked: addDays(today, 1) }),
    Question.create({ text: "Pick a Food", optionA: "Cheez Itz", optionB: "Goldfish", dateAsked: addDays(today, 2) }),
    Question.create({ text: "Pick a Food", optionA: "Hot Dog", optionB: "Burger", dateAsked: addDays(today, 3) }),
    Question.create({ text: "Pick a Food", optionA: "PeanutButter", optionB: "Jelly", dateAsked: addDays(today, 4) }),
    Question.create({ text: "Pick a Singer", optionA: "Billy Joel", optionB: "Bruce Springsteen", dateAsked: addDays(today, 5) }),
    Question.create({ text: "Pick a Singer", optionA: "Whitney Houston", optionB: "Mariah Carey", dateAsked: addDays(today, 6) }),
  ]);

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
  return {
    users: {
      cody: users[0],
      murphy: users[1]
    }
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
