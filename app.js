const chalk=require('chalk');
const yargs=require('yargs');
const notes=require('./notes.js');
yargs.version('1.1.0')

// Create add command
yargs.command({
    command:'add',
    describe:'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        notes.addNote(argv.title, argv.body);
    }
})

// Create remove command
yargs.command({
    command:'remove',
    describe:'Remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        notes.removeNote(argv.title);
    }
})

// Create list command
yargs.command({
    command:'list',
    describe:'List all notes',
    handler: function () {
        const list=(notes.loadNotes());
        console.log(chalk.inverse('Your notes:'));
        list.forEach(function(note) {
            console.log(note.title);
            console.log(note.body);
        });

    }
})

// Create read command
yargs.command({
    command:'read',
    describe:'Reading a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        const notesList = notes.loadNotes();
        const note = notesList.find(function(note){  return note.title === argv.title});
        if (note===undefined) {
            console.log(chalk.red.inverse('Note not found!'));
        } else {
            console.log(chalk.green.inverse('Note found!'));
            console.log(chalk.inverse(note.title));
            console.log(note.body);
        }
    }
})
console.log(yargs.argv);

