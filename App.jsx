import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import Rightbar from "./rightbar";
import Sidebar from "./sidebar";


function App() {
  const [notes, setNotes] = useState(
    localStorage.notes ? JSON.parse(localStorage.notes) : []
  );
  const [activeNote, setActiveNote] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [selectedColor, setSelectedColor] = useState("#FF5733"); 
  const [showRightbar, setShowRightbar] = useState(window.innerWidth > 768 ? true : false);


  

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);


  const getInitials = (title) => {
    const words = title.trim().split(" ");
    return words.slice(0, 2).map(word => word.charAt(0).toUpperCase()).join("");
  };

  const handleOpenPopup = () => {
    setNewNoteTitle("");
    setSelectedColor("#FF5733"); 
    setIsPopupOpen(true);
  };

  const handleCreateNote = () => {
    if (!newNoteTitle.trim()) return;
  
    const newNote = {
      id: uuidv4(),
      title: newNoteTitle,
      body: "",
      previewContent: [], 
      lastModified: Date.now(),
      color: selectedColor,
      initials: getInitials(newNoteTitle),
    };
  
    setNotes([newNote, ...notes]);
    setActiveNote(newNote.id);
    setIsPopupOpen(false);
  };
  

  const onDeleteNote = (noteId) => {
    setNotes(notes.filter(({ id }) => id !== noteId));
  };

  const onUpdateNote = (updatedNote) => {
    const updatedNotesArr = notes.map((note) =>
      note.id === updatedNote.id ? updatedNote : note
    );
    setNotes(updatedNotesArr);
  };

  const getActiveNote = () => notes.find(({ id }) => id === activeNote);

  return (
    <div className="App">
      <Sidebar
        notes={notes}
        onAddNote={handleOpenPopup}
        onDeleteNote={onDeleteNote}
        activeNote={activeNote}
        setActiveNote={(id) => {
          setActiveNote(id);
          setShowRightbar(true);
        }}
      />
      
      <div className={`app-main ${showRightbar ? "show-rightbar" : "hide-rightbar"}`}>
        <Rightbar activeNote={getActiveNote()} onUpdateNote={onUpdateNote} setShowRightbar={setShowRightbar} />
      </div>
  
      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <h4>Create New Group</h4>
            <div className="group">
              <h4>Group Name</h4>
              <input
                type="text"
                value={newNoteTitle}
                onChange={(e) => setNewNoteTitle(e.target.value)}
                placeholder="Enter group name"
              />
            </div>
            <div className="two-part">
              <h4>Select a Color</h4>
              <div className="color-options">
                {["#FF5733", "#33FF57", "#3357FF", "#F0A500", "#A500F0"].map((color) => (
                  <div
                    key={color}
                    className="color-circle"
                    style={{
                      backgroundColor: color,
                      border: selectedColor === color ? "3px solid black" : "none",
                    }}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
            </div>
  
            <button 
              className={`popup-next-button ${newNoteTitle.trim() ? "" : "disabled"}`}
              onClick={handleCreateNote} 
              disabled={!newNoteTitle.trim()} 
            >
              Next
            </button>
            <button className="cancel-button" onClick={() => setIsPopupOpen(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
  
export default App;
