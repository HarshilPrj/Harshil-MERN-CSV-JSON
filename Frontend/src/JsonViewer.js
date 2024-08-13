import React, { useState } from "react";

function JsonViewer({ data }) {
  const [collapsed, setCollapsed] = useState({});

  const toggleCollapse = (key) => {
    setCollapsed((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const isObject = (val) =>
    val && typeof val === "object" && !Array.isArray(val);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    alert("Copied to clipboard!");
  };

  const renderJson = (value, key = "", level = 0) => {
    const uniqueKey = `${level}-${key}`;
    if (isObject(value)) {
      return (
        <div key={uniqueKey} style={{ paddingLeft: `${level * 20}px` }}>
          <span>
            {"{"}
            <span
              style={{
                cursor: "pointer",
                color: "blue",
              }}
              onClick={() => toggleCollapse(uniqueKey)}
            >
              {collapsed[uniqueKey] ? "[+]" : "[-]"}
            </span>
          </span>
          {!collapsed[uniqueKey] && (
            <div style={{ paddingLeft: "20px" }}>
              {Object.keys(value).map((subKey) =>
                renderJson(value[subKey], subKey, level + 1)
              )}
            </div>
          )}
          <span>{"}"}</span>
        </div>
      );
    } else if (Array.isArray(value)) {
      return (
        <div key={uniqueKey} style={{ paddingLeft: `${level * 20}px` }}>
          <span>
            {"["}
            <span
              style={{
                cursor: "pointer",
                color: "blue",
              }}
              onClick={() => toggleCollapse(uniqueKey)}
            >
              {collapsed[uniqueKey] ? "[+]" : "[-]"}
            </span>
          </span>
          {!collapsed[uniqueKey] && (
            <div style={{ paddingLeft: "20px" }}>
              {value.map((item, index) => (
                <div key={`${uniqueKey}-${index}`}>
                  {renderJson(item, `${index}`, level + 1)}
                  {index < value.length - 1 && <span>,</span>}
                </div>
              ))}
            </div>
          )}
          <span>{"]"}</span>
        </div>
      );
    } else {
      return (
        <div key={uniqueKey} style={{ paddingLeft: `${level * 20}px` }}>
          <span>
            {key && `"${key}" : `}
            {JSON.stringify(value)}
          </span>
        </div>
      );
    }
  };

  return (
    <div
      style={{
        padding: "10px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        maxWidth: "600px",
        margin: "auto",
      }}
    >
      <div style={{ marginBottom: "10px" }}>
        <button onClick={copyToClipboard} style={{ marginRight: "10px" }}>
          Copy
        </button>
      </div>
      <div style={{ whiteSpace: "pre-wrap", fontFamily: "monospace" }}>
        {renderJson(data)}
      </div>
    </div>
  );
}

export default JsonViewer;
