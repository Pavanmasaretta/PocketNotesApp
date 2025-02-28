const Sidebar = ({ notes, onAddNote, onDeleteNote, activeNote, setActiveNote }) => {
const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified);

return (
    <div className="app-sidebar">
        <div className="app-sidebar-header">
            <h1>Pocket Notes</h1>
            <button className="butt" onClick={() => onAddNote("New Note", "#FF5733")}>+</button>
        </div>
        <div className="app-sidebar-notes">
            {sortedNotes.map(({ id, title, color, initials }) => (
            <div
                key={id}
                className={`app-sidebar-note ${id === activeNote ? "active" : ""}`}
                onClick={() => setActiveNote(id)}
            >
                <div className="sidebar-note-title">
                <div
                    className="dp-circle"
                    style={{ backgroundColor: color || "#ccc" }}
                >
                    {initials || "N"}
                </div>
                <strong>{title}</strong>
                <button onClick={(e) => { e.stopPropagation(); onDeleteNote(id); }}>Delete</button>
                </div>
            </div>
            ))}
        </div>
    </div>
);
};

export default Sidebar;
