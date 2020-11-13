const fs = require('fs');
const chalk = require('chalk');

const log = console.log;
const error = chalk.red;
const success = chalk.green;

const getNotes = () =>{
    return "This is the notes file";
}

const addNote = (title, body) =>{
     const notes = loadNotes()
     const duplicateNotes = notes.filter((note) => note.title === title)

     if(duplicateNotes.length === 0 ){
        notes.push({
            title: title,
            body: body
        })
   
        saveNotes(notes);
        log(success('note created'))
     }
     else{
         log(error('title already taken'));
     }
   
}

const removeNote = (title) => {
    const notes = loadNotes();
    const originalNote = notes.length;
    const notesToKeep = notes.filter((note) => note.title !== title );
    
    if(notesToKeep.length < originalNote){
        log(success('Note Removed'));
        saveNotes(notesToKeep)
    }else{
       log(error('No Note Found'));
    
    }
       
}

const listNotes = () =>{
    const notes = loadNotes();
    log(chalk.rgb(123, 45, 67).bold('Your Notes'))
    notes.forEach(note => {
        if(!note) log(error('no notes found'))
        else{
            log(chalk.blue(note.title))
        }
    });

}  

const readNote = (title) =>{
    const notes = loadNotes();
    const noteToBeRead = notes.find((note) => note.title === title);
    if(noteToBeRead){
        log(chalk.blue("title: "+ noteToBeRead.title));
        log(chalk.cyan("note: "+ noteToBeRead.body));
    }
    else{
        log(error("No Note Found"));
    }
    
}

const saveNotes = (notes) =>{
    const dataJSON = JSON.stringify(notes)
    return fs.writeFileSync("notes.json",dataJSON);
}

const loadNotes = () =>{
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    }
    catch(e){
        return []
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};