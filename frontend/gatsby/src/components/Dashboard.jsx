import React, { useState } from "react";
import Header from "./Header";
import Note from "./Note";
import NoteModal from "./NoteModal";
import CreateNote from "./CreateNote";


export default function Dashboard() {
  const [notesList, setNotesList] = useState([
    {
      title: "I can expand to show more text",
      content:
        "Click me to see more!  Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,",
    },
    { title: "Example note", content: "I can be deleted by ↘️" },
  ]);

  function updateNotesList(note) {
    setNotesList((prev) => {
      return [note, ...prev].filter(
        (element, index, array) => array.indexOf(element) === index
      );
    });
  }

  function deleteNote(id) {
    setNotesList((prev) => {
      return prev.filter((note, index) => {
        return index !== id;
      });
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
