import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { open } from "@tauri-apps/plugin-dialog";
import "./App.css";

function App() {
  const [sourcemapPath, setSourcemapPath] = useState("");
  const [line, setLine] = useState("");
  const [column, setColumn] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function selectFile() {
    try {
      const selected = await open({
        multiple: false,
        filters: [
          {
            name: "SourceMap",
            extensions: ["map"],
          },
        ],
      });

      if (selected) {
        setSourcemapPath(selected);
        setError("");
      }
    } catch (err) {
      setError("Failed to select file: " + err);
    }
  }

  async function parseSourcemap() {
    if (!sourcemapPath) {
      setError("Please select a sourcemap file");
      return;
    }

    if (!line || !column) {
      setError("Please enter line and column numbers");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const position = await invoke("parse_sourcemap", {
        filePath: sourcemapPath,
        line: parseInt(line),
        column: parseInt(column),
      });

      setResult(position);
    } catch (err) {
      setError("Parse error: " + err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container">
      <h1>SourceMap Bug Locator</h1>
      <p className="subtitle">定位生产环境 Bug 的原始位置</p>

      <div className="form-section">
        <div className="form-group">
          <label>SourceMap 文件:</label>
          <div className="file-input-group">
            <input
              type="text"
              value={sourcemapPath}
              readOnly
              placeholder="选择 .map 文件"
              className="file-input"
            />
            <button onClick={selectFile} className="select-btn">
              选择文件
            </button>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>行号 (Line):</label>
            <input
              type="number"
              value={line}
              onChange={(e) => setLine(e.target.value)}
              placeholder="例如: 2"
              min="1"
            />
          </div>

          <div className="form-group">
            <label>列号 (Column):</label>
            <input
              type="number"
              value={column}
              onChange={(e) => setColumn(e.target.value)}
              placeholder="例如: 567888"
              min="0"
            />
          </div>
        </div>

        <button
          onClick={parseSourcemap}
          disabled={loading || !sourcemapPath || !line || !column}
          className="parse-btn"
        >
          {loading ? "解析中..." : "解析 Bug 位置"}
        </button>
      </div>

      {error && (
        <div className="error-message">
          <strong>错误:</strong> {error}
        </div>
      )}

      {result && (
        <div className="result-section">
          <h2>原始位置信息</h2>
          <div className="result-item">
            <span className="result-label">源文件:</span>
            <span className="result-value">{result.source || "N/A"}</span>
          </div>
          <div className="result-item">
            <span className="result-label">行号:</span>
            <span className="result-value">{result.line || "N/A"}</span>
          </div>
          <div className="result-item">
            <span className="result-label">列号:</span>
            <span className="result-value">{result.column || "N/A"}</span>
          </div>
          {result.name && (
            <div className="result-item">
              <span className="result-label">函数/变量名:</span>
              <span className="result-value">{result.name}</span>
            </div>
          )}
        </div>
      )}
    </main>
  );
}

export default App;
