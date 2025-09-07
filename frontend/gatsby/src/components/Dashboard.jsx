import React, { useEffect, useState } from "react";
import Header from "./Header";
import Note from "./Note";
import NoteModal from "./NoteModal";
import CreateNote from "./CreateNote";

export default function Dashboard() {
  const [notesList, setNotesList] = useState([]);

  function getNotes() {
    fetch("http://localhost:3000/notes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setNotesList(data);
      });
  }

  function updateNotesList(note) {
    // POST request to backend to save the note
    fetch("http://localhost:3000/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(note),
    })
      .then((response) => response.json())
      .then((data) => {
        setNotesList((prev) => {
          const exists = prev.some(
            (note) =>
              note.id === data.id ||
              (note.title === data.title && note.content === data.content)
          );
          return exists ? prev : [...prev, data];
        });
      })
      .catch((error) => {
        console.error("Error saving note:", error);
      });
  }

  function deleteNote(id) {
    fetch(`http://localhost:3000/notes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Note deleted:", data);
        setNotesList((prev) => {
          return prev.filter((note, index) => {
            return index !== id;
          });
        });
      })
      .catch((error) => {
        console.error("Error deleting note:", error);
      });
  }

  const [modalShow, setModalShow] = React.useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [modalId, setModalId] = useState();

  function expandNote(id, title, content) {
    setModalShow(true);
    setModalTitle(title);
    setModalContent(content);
    setModalId(id);
  }

  function saveNote(id, event) {
    const { innerText } = event.target;
    setNotesList((prev) => {
      return prev.map((note, index) => {
        if (index === id) {
          note = {
            ...note,
            [event.target.getAttribute("data-name")]: innerText,
          };
        }
        return note;
      });
    });
  }

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div className="d-flex flex-column h-100">
      <Header />
      <main className="container">
        <CreateNote handleSubmit={updateNotesList} />
        <NoteModal
          title={modalTitle}
          content={modalContent}
          id={modalId}
          show={modalShow}
          setModalShow={setModalShow}
          onHide={() => setModalShow(false)}
          saveNote={saveNote}
        />
        {notesList.map((note, index) => {
          return (
            <Note
              expandNote={expandNote}
              deleteNote={deleteNote}
              id={index}
              key={note.title + note.content}
              title={note.title}
              content={note.content}
            />
          );
        })}
      </main>
    </div>
  );
}
