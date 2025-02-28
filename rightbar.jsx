import ReactMarkdown from "react-markdown";
import image from "./assets/image-removebg-preview 1.png";
import end from "./assets/Vector.png";
import arrow from "./assets/right-arrow.png";
import { useState, useEffect } from "react";

const Rightbar = ({ activeNote, onUpdateNote, setShowRightbar }) => {
const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

useEffect(() => {
const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
};

window.addEventListener("resize", handleResize);
return () => window.removeEventListener("resize", handleResize);
}, []);

if (!activeNote)
return (
    <div className="no-active-note">
    <img src={image} className="image" alt="Pocket Notes Logo" />
    <h1>Pocket Notes</h1>
    <p className="para">
        Send and receive messages without keeping your phone online.<br />
        Use Pocket Notes on up to 4 linked devices and 1 mobile phone.
    </p>
    <div className="end-to-end">
        <img src={end} alt="End-to-end encryption" />
        <p>end-to-end encrypted</p>
    </div>
    </div>
);

const onEditField = (field, value) => {
onUpdateNote({
    ...activeNote,
    [field]: value,
    lastModified: Date.now(),
});
};

const handleNextClick = () => {
if (!activeNote.body.trim()) return;

const newEntry = {
    id: Date.now(),
    content: activeNote.body,
    timestamp: new Date().toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    }),
};

onUpdateNote({
    ...activeNote,
    previewContent: activeNote.previewContent
    ? [newEntry, ...activeNote.previewContent]
    : [newEntry],
    body: "", 
});
};

return (
<div className={`app-main ${activeNote ? "show-rightbar" : "hide-rightbar"}`}>
    {isMobile && activeNote && (
    <button className="close-button" onClick={() => setShowRightbar(false)}>
        X
    </button>
    )}

    
    {!activeNote ? (
    <div className="no-active-note">
        <img src={image} className="image" alt="Pocket Notes Logo" />
        <h1>Pocket Notes</h1>
        <p className="para">
        Send and receive messages without keeping your phone online.<br />
        Use Pocket Notes on up to 4 linked devices and 1 mobile phone.
        </p>
        <div className="end-to-end">
        <img src={end} alt="End-to-end encryption" />
        <p>end-to-end encrypted</p>
        </div>
    </div>
    ) : (
    <div className="note-content">
        
        <div className="note-header">
        <div
            className="dp-circle"
            style={{ backgroundColor: activeNote.color || "#ccc" }}
        >
            {activeNote.initials || "N"}
        </div>
        <h2 className="note-title">{activeNote.title}</h2>
        </div>

        {activeNote.previewContent && activeNote.previewContent.length > 0 && (
        <div className="app-main-note-preview">
            {activeNote.previewContent.map((entry) => (
            <div key={entry.id} className="preview-box">
                <ReactMarkdown>{entry.content}</ReactMarkdown>
                <small className="timestamp">{entry.timestamp}</small>
            </div>
            ))}
        </div>
        )}

        <div className="textarea-container">
        <textarea
            id="body"
            placeholder="Enter your text here..."
            value={activeNote.body}
            onChange={(e) => onEditField("body", e.target.value)}
        />
        <button className="next-button" onClick={handleNextClick}>
            <img src={arrow} alt="Next" />
        </button>
        </div>
    </div>
    )}
</div>
);


};

export default Rightbar;
