import React, { useState } from "react";

const DraggableImage = ({ src, alt, id, onEdit, onDelete }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleDragStart = (e) => {
    e.dataTransfer.setData("imageId", id);
    alert("drag");
  };

  return (
    <div
      style={{ position: "relative", display: "inline-block", margin: "10px" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        className="border border-dark p-1 m-2"
        src={src}
        alt={alt}
        id={id}
        draggable="true"
        onDragStart={handleDragStart}
        style={{ cursor: "move" }}
        width={150}
        height={150}
      />
      {isHovered && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            gap: "10px",
          }}
        >
          <button
            onClick={() => onEdit(id)}
            style={{ background: "none", border: "none", color: "white" }}
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(id)}
            style={{ background: "none", border: "none", color: "white" }}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default DraggableImage;
