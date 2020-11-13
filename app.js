const yargs = require('yargs');

const notes = require('./notes');

yargs.version('1.2.0');

yargs.command({
    command:"add",
    describe:"adding a note",   
    builder:{
        title:{
            describe:'Note Title',
            demandOption: true,
            type: 'string'
        },
        body:{
            describe: "Body Title",
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){   
        notes.addNote(argv.title, argv.body);
    }
})
yargs.command({
    command:"remove",
    describe:"removing a note",
    builder:{
        title:{
            describe: "Note title",
            demandOption:true,
            type: "string"
        }
    },
    handler(argv){   
        notes.removeNote(argv.title);
    }
})

yargs.command({
    command : "read",
    describe:"reading a note",
    builder:{
        title:{
            describe: "Note Title",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv){   
        notes.readNote(argv.title);
    }
})

yargs.command({
    command:"list",
    describe:"listing a note",
    handler(){   
        notes.listNotes();
    }
})



yargs.parse();
// console.log(yargs.argv);
