import React, { useState } from "react";
import * as styles from "../css/notes.module.css";

export default function CreateNote(props) {
  const [note, setNote] = useState({});

  function handleInput(event) {
    const { name, value } = event.target;
    setNote((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

return (
    <div>
        <form
            className={styles.createNote}
            onSubmit={(event) => {
                props.handleSubmit(note);
                setNote({
                    title: "",
                    content: "",
                });
                event.preventDefault();
            }}
        >
            <input
                className={styles.titleColor}
                onChange={handleInput}
                name="title"
                placeholder="Title"
                value={note.title}
                maxLength="50"
                aria-label="Title"
            />

            <textarea
                onChange={handleInput}
                name="content"
                placeholder="Take a note... (optional)"
                rows="3"
                value={note.content}
                className={styles.descriptionColor}
                aria-label="Content"
            />
            <button disabled={note.title ? false : true} type="submit" aria-label="Add">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                      width={24}
                    height={24}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                    />
                </svg>
            </button>
        </form>
    </div>
);
}

