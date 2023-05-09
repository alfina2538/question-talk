import { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

function App() {
  const [file_path, setFilePath] = useState("");
  const [input_premit, setInputPremit] = useState(true);
  const [select_question, setSelectQuestion] = useState("");
  const [current_question, setCurrentQuestion] = useState(0);
  const [card_num, setCardNum] = useState(0);
  const [disabled_select_card_num, setDisabledSelectCardNum] = useState(true);
  const [select_card_num, setSelectCardNum] = useState(0);

  const [qst_1, setQst1] = useState("");
  const [qst_2, setQst2] = useState("");
  const [qst_3, setQst3] = useState("");
  const [qst_4, setQst4] = useState("");
  const [qst_5, setQst5] = useState("");
  const [qst_6, setQst6] = useState("");

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
    setFilePath(path);
    if (path !== "") {
      setCardNum(await invoke("get_card_num", { filePath: path }));
      setDisabledSelectCardNum(false);
    }
  }

  // cardを引く
  async function DrawCard() {
    if (file_path === "") { alert("ファイルを選択してください。"); return; }
    setSelectQuestion("");
    const card: string[] = await invoke("draw_card", { filePath: file_path, selectCardNum: select_card_num });
    if (card.length < 6) { alert("お題の数が足りません"); return; }
    setCurrentQuestion(0);
    setQst1(card[0]);
    setQst2(card[1]);
    setQst3(card[2]);
    setQst4(card[3]);
    setQst5(card[4]);
    setQst6(card[5]);
  }

  // cardの選択
  async function SelectCard() {
    if (qst_1 === "" || qst_2 === "" || qst_3 === "" || qst_4 === "" || qst_5 === "" || qst_6 === "") {
      alert("カードを引いていないか\n未入力の項目があります。");
      return;
    }
    const rand_num: number = await invoke("get_rand_num");
    switch (rand_num) {
      case 1:
        setSelectQuestion(qst_1);
        setCurrentQuestion(1);
        break;
      case 2:
        setSelectQuestion(qst_2);
        setCurrentQuestion(2);
        break;
      case 3:
        setSelectQuestion(qst_3);
        setCurrentQuestion(3);
        break;
      case 4:
        setSelectQuestion(qst_4);
        setCurrentQuestion(4);
        break;
      case 5:
        setSelectQuestion(qst_5);
        setCurrentQuestion(5);
        break;
      case 6:
        setSelectQuestion(qst_6);
        setCurrentQuestion(6);
        break;
    }
  }

  return (
    <div className="app-contents">
      <div className="app-name">
        <h3>TriplePeace式 ガムトーク</h3>
      </div>
      <div className="app-body">
        <div className="file-select">
          <p>ファイル選択</p>
          <input className="file-name" type="text" title="question file" value={file_path} readOnly={true} />
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
              }}/>
          </div>
          <div className="content">
            <p>お題 3</p>
            <input type="text" id="qst-3" title="qst 3" value={qst_3} readOnly={input_premit}
              onChange={(e) => {
                setQst3(e.currentTarget.value);
                if (current_question === 3) {
                  setSelectQuestion(e.currentTarget.value);
                }
              }}/>
          </div>
        </div>
        <div className="row-contents">
          <div className="content">
            <p>お題 4</p>
            <input type="text" id="qst-4" title="qst 4" value={qst_4} readOnly={input_premit}
              onChange={(e) => {
                setQst4(e.currentTarget.value);
                if (current_question === 4) {
                  setSelectQuestion(e.currentTarget.value);
                }
              }}/>
          </div>
          <div className="content">
            <p>お題 5</p>
            <input type="text" id="qst-5" title="qst 5" value={qst_5} readOnly={input_premit}
              onChange={(e) => {
                setQst5(e.currentTarget.value);
                if (current_question === 5) {
                  setSelectQuestion(e.currentTarget.value);
                }
              }}/>
          </div>
          <div className="content">
            <p>お題 6</p>
            <input type="text" id="qst-6" title="qst 6" value={qst_6} readOnly={input_premit}
              onChange={(e) => {
                setQst6(e.currentTarget.value);
                if (current_question === 6) {
                  setSelectQuestion(e.currentTarget.value);
                }
              }}/>
          </div>
        </div>
        <div className="select-question">
          <h2>お題は「<span>{select_question}</span>」です</h2>
        </div>
        <div className="controlls">
          <input type="button" value="draw card"
            onClick={(e) => {
              e.preventDefault();
              DrawCard();
          }} />
          <input type="button" value="select question"
            onClick={(e) => {
              e.preventDefault();
              SelectCard();
          }} />
        </div>
        <div className="card-select">
          <input className="select-num" type="number" placeholder="カード番号" min={1} max={card_num} disabled={disabled_select_card_num}
            onChange={(e) => {
              const current_num = e.currentTarget.value;
              let num: number = +current_num;
              if (num < 0) {
                num = 0;
              }
              if (num > card_num) {
                num = card_num;
              }
              setSelectCardNum(num);
              e.currentTarget.value = num.toString();
            }
          }/>
        </div>
        <div className="settings">
          <input type="checkbox" value="input_premit" title="premit optionaly input"
            onClick={(e) => {
              ChangeInputPremit();
            }}/>
        </div>
      </div>
    </div>
  );
}

export default App;
