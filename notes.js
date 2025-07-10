const fs=require('fs');
const chalk=require('chalk');
const addNote=function(title,body){
    const notes=loadNotes();
    const duplicateNotes=notes.filter(function(note){
        return note.title === title;   
    });
    if(duplicateNotes.length > 0){
        console.log(chalk.red.inverse('Note title taken!'));
        return;
    }
    else{
    notes.push({
        title: title,
        body: body
    });
    saveNotes(notes);
    console.log(chalk.green.inverse('New note added!'));
    }
}
const removeNote=function(title){
    const notes=loadNotes();
    const notesToKeep=notes.filter(function(note){
        return note.title!==title;
    });
    if(notes.length > notesToKeep.length){
        saveNotes(notesToKeep);
        console.log(chalk.green.inverse('Note removed!'));
    }else{
        console.log(chalk.red.inverse('No note found!'));
    }
}

const loadNotes=function(){
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
}
const saveNotes=function(notes){
    const dataJSON = JSON.stringify(notes); 
    fs.writeFileSync('notes.json', dataJSON);
}
module.exports={
    addNote: addNote,
    removeNote: removeNote,
    loadNotes: loadNotes,
};