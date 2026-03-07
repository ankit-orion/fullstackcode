import { useState } from "react";
import { useParams } from "react-router-dom";
import Editor from "@monaco-editor/react";
import { useTheme } from "../context/ThemeContext";
import { Play } from "lucide-react";
import styles from "./Workspace.module.css";

export function Workspace() {
  const { id } = useParams();
  const { theme } = useTheme();
  const [code, setCode] = useState(
    '// Write your code here\nconsole.log("Hello, FullStack Developer!");',
  );
  const [output, setOutput] = useState("");

  const handleRunCode = () => {
    setOutput(
      "> Running code...\n> Hello, FullStack Developer!\n> Execution time: 42ms\n> Process exited with code 0",
    );
  };

  return (
    <div className={styles.workspace}>
      <div className={styles.problemPanel}>
        <div className={styles.panelHeader}>
          <h2>Challenge Description</h2>
        </div>
        <div className={styles.panelContent}>
          <h3>Problem {id}</h3>
          <p>
            This is a placeholder for the problem description. The goal is to
            build a high-quality component or service that matches the
            requirements below.
          </p>
          <div className={styles.requirements}>
            <h4>Requirements:</h4>
            <ul>
              <li>Implement the core logic without syntax errors.</li>
              <li>Handle edge cases appropriately.</li>
              <li>Ensure the code passes all hidden tests.</li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.editorPanel}>
        <div className={styles.panelHeader}>
          <div className={styles.tabs}>
            <button className={`${styles.tab} ${styles.active}`}>
              solution.ts
            </button>
            <button className={styles.tab}>package.json</button>
          </div>
          <button className={styles.runButton} onClick={handleRunCode}>
            <Play size={16} /> Run Code
          </button>
        </div>
        <div className={styles.editorContainer}>
          <Editor
            height="100%"
            defaultLanguage="typescript"
            theme={theme === "dark" ? "vs-dark" : "light"}
            value={code}
            onChange={(value) => setCode(value || "")}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              fontFamily: "JetBrains Mono, Menlo, monospace",
              padding: { top: 16 },
            }}
          />
        </div>
      </div>

      <div className={styles.previewPanel}>
        <div className={styles.panelHeader}>
          <h2>Test Results / Console</h2>
        </div>
        <div className={styles.panelContent}>
          <pre className={styles.consoleOutput}>
            {output || "> Ready to run..."}
          </pre>
        </div>
      </div>
    </div>
  );
}
