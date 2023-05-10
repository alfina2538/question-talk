import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

function App() {
  const [file_path, setFilePath] = useState("");
  const [file_name, setFileName] = useState("");
  const [input_premit, setInputPremit] = useState(true);
  const [select_question, setSelectQuestion] = useState("");
  const [current_question, setCurrentQuestion] = useState(0);

  const [qst_1, setQst1] = useState("");
  const [qst_2, setQst2] = useState("");
  const [qst_3, setQst3] = useState("");
  const [qst_4, setQst4] = useState("");

  // 任意入力許可の変更
  function ChangeInputPremit() {
    if (!input_premit) {
      setInputPremit(true);
    } else {
      setInputPremit(false);
    }
  }

  // ファイルの選択
  async function SelectQuestionFile() {
    const path: string = await invoke("select_question_file");
    const file_name = path.split("\\").pop();
    setFilePath(path);
    if (file_name !== undefined) {
      setFileName(file_name);
    }
  }

  // お題を選出する
  async function SelectRandQuestion() {
    if (file_path === "") { alert("ファイルを選択してください。"); return; }
    setSelectQuestion("");
    const card: string[] = await invoke("select_rand_question", { filePath: file_path });
    if (card.length < 4) { alert("お題の数が足りません"); return; }
    setCurrentQuestion(0);
    setQst1(card[0]);
    setQst2(card[1]);
    setQst3(card[2]);
    setQst4(card[3]);
  }

  return (
    <div className="app-contents">
      <div className="app-name">
        <h3>TriplePeace式 お題トーク</h3>
      </div>
      <div className="app-body">
        <div className="file-select">
          <p>ファイル選択</p>
          <input className="file-name" type="text" title="question file" value={file_name} readOnly={true} />
          <input className="bt-file-select" type="button" value="file select"
            onClick={(e) => {
              e.preventDefault();
              SelectQuestionFile();
            }}/>
        </div>
        <div className="row-contents">
          <div className="content">
            <p>お題 1</p>
            <input type="text" id="qst-1" title="qst 1" value={qst_1} readOnly={input_premit}
              onChange={(e) => {
                setQst1(e.currentTarget.value);
                if (current_question === 1) {
                  setSelectQuestion(e.currentTarget.value);
                }
              }}
              onClick={(e) => {
                setCurrentQuestion(1);
                setSelectQuestion(e.currentTarget.value);
              }}/>
          </div>
          <div className="content">
            <p>お題 2</p>
            <input type="text" id="qst-2" title="qst 2" value={qst_2} readOnly={input_premit}
              onChange={(e) => {
                setQst2(e.currentTarget.value);
                if (current_question === 2) {
                  setSelectQuestion(e.currentTarget.value);
                }
              }}
              onClick={(e) => {
                setCurrentQuestion(2);
                setSelectQuestion(e.currentTarget.value);
              }}/>
          </div>
        </div>
        <div className="row-contents">
          <div className="content">
            <p>お題 3</p>
            <input type="text" id="qst-3" title="qst 3" value={qst_3} readOnly={input_premit}
              onChange={(e) => {
                setQst3(e.currentTarget.value);
                if (current_question === 3) {
                  setSelectQuestion(e.currentTarget.value);
                }
              }}
              onClick={(e) => {
                setCurrentQuestion(3);
                setSelectQuestion(e.currentTarget.value);
              }}/>
          </div>
          <div className="content">
            <p>お題 4</p>
            <input type="text" id="qst-4" title="qst 4" value={qst_4} readOnly={input_premit}
              onChange={(e) => {
                setQst4(e.currentTarget.value);
                if (current_question === 4) {
                  setSelectQuestion(e.currentTarget.value);
                }
              }}
              onClick={(e) => {
                setCurrentQuestion(4);
                setSelectQuestion(e.currentTarget.value);
              }}/>
          </div>
        </div>
        <div className="select-question">
          <h2>お題は「<span>{select_question}</span>」です</h2>
        </div>
        <div className="controlls">
          <input type="button" value="ランダム選出"
            onClick={(e) => {
              e.preventDefault();
              SelectRandQuestion();
          }} />
        </div>
        <div className="settings">
          <input type="checkbox" value="input_premit" title="premit optionaly input"
            onClick={(e) => {
              ChangeInputPremit();
            }} />
          <p>任意入力の許可</p>
        </div>
      </div>
    </div>
  );
}

export default App;
