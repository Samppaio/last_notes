import React, { useEffect } from "react";
import { FaBan, FaCheck } from "react-icons/fa";
import { useHighlight } from "../../context/HighlightContext";
import { useNoteForm } from "../../context/NoteFormContext";
import { useNoteList } from "../../context/NoteListContext";
import "./styles.css";

export default function NoteForm() {
  const { noteList, setNoteList } = useNoteList();
  const { title, 
          setTitle, 
          description, 
          setDescription, 
          setVisibleForm 
        } = useNoteForm();

  const { highlight } = useHighlight();

  useEffect(() => {
    saveLocalNotes();
  }, [noteList]);

  function HandleTitle(e) {
    setTitle(e.target.value);
  }

  function HandleDescription(e) {
    setDescription(e.target.value);
  }

  function HandleSubmit(e) {
    e.preventDefault();
    if(title === "" && description === "") {
      alert("Necessário definir título e descrição!")

      return
    } if(highlight) {
      noteList.map((note) => {
        note.title = title;
        note.description = description;
      });

      setNoteList([...noteList]);
    
    } else {
      setNoteList([
        ...noteList,
        {
          id: String(Math.floor(Math.random() * 1000)),
          title,
          description,
        }
      ]);
    }
    
    setTitle("");
    setDescription("");
  }

  function HandleCancel(e) {
    e.preventDefault();
    setVisibleForm(false);
  }

  function saveLocalNotes() {
    localStorage.setItem("notes", JSON.stringify(noteList));
  }

  return(
    <form className="note-menu">
      <div>
        <label htmlFor="title">Título</label>
        <input 
          id="title" 
          type="text" 
          placeholder="Informe um título"
          value={title}
          onChange={HandleTitle}
        />
      </div>
      <div>
        <label htmlFor="note">Nota</label>
        <textarea 
          id="note" 
          type="text" 
          rows="10" 
          placeholder="Escreva a sua nota" 
          value={description}
          onChange={HandleDescription}
        />
      </div>
      <div className="buttons">
        <button 
          className="cancel"
          onClick={HandleCancel}
        >
          <FaBan className="icon" />
        </button>
        <button 
          type="submit" 
          className="confirm"
          onClick={HandleSubmit}
        >
          <FaCheck className="icon" />
        </button>
      </div>
    </form>
  );
}