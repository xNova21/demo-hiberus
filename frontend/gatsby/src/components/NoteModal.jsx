import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import * as styles from "../css/notes.module.css";


function NoteModal(props) {
  const [isEditable, setIsEditable] = useState(false);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={props.show}
      onHide={props.onHide}
      scrollable={true}
    >
      <Modal.Header className={styles.noBorder} closeButton>
        <Modal.Title
          style={{ width: "100%" }}
          id="contained-modal-title-vcenter"
        >
          <button
            className={styles.titleColor}
            onClick={() => setIsEditable(true)}
            onBlur={(event) => {
              props.saveNote(props.id, event);
            }}
          >
            <h2 contentEditable={isEditable} data-name="title">
              {props.title} &nbsp;
            </h2>
          </button>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body
        style={{
          outline: "1px solid #cac2c0",
          height: "100%",
          padding: "0.5rem",
        }}
      >
        <button
          style={{ display: "none" }}
          onClick={() => {
            setIsEditable(true);
          }}
          onBlur={(event) => {
            props.saveNote(props.id, event);
          }}
        >
          <p
            style={{
              height: "100%",
              padding: "0.5rem",
            }}
            className={styles.descriptionColor}
            contentEditable={isEditable}
            data-name="content"
            value={props.content}
          >
            {props.content} &nbsp;
          </p>
        </button>
      </Modal.Body>

      <Modal.Footer className={styles.noBorder}>
        <Button
          style={{ background: "#4d686e", border: "none" }}
          onClick={() => {
            setIsEditable(false);
            props.setModalShow(false);
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
export default NoteModal;
