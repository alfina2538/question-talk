// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use rand::Rng;
use std::fs::File;
use std::io::{BufRead, BufReader};
use tauri::api::dialog::blocking::FileDialogBuilder;

struct RandNum {
    qst1: i32,
    qst2: i32,
    qst3: i32,
    qst4: i32,
}

impl RandNum {
    fn new() -> Self {
        Self {
            qst1: 0,
            qst2: 0,
            qst3: 0,
            qst4: 0,
        }
    }

    fn check_num(&self, qst_num: &i32) -> bool {
        if &self.qst1 == qst_num {
            return false;
        }
        if &self.qst2 == qst_num {
            return false;
        }
        if &self.qst3 == qst_num {
            return false;
        }
        if &self.qst4 == qst_num {
            return false;
        }

        true
    }

    fn set_qst(&mut self, count: &i32, qst_num: i32) -> bool {
        if !self.check_num(&qst_num) {
            return false;
        }

        match count {
            1 => {
                self.qst1 = qst_num;
            }
            2 => {
                self.qst2 = qst_num;
            }
            3 => {
                self.qst3 = qst_num;
            }
            4 => {
                self.qst4 = qst_num;
            }
            _ => (),
        }

        true
    }
}

#[tauri::command]
fn select_question_file() -> String {
    let path = FileDialogBuilder::new()
        .add_filter("text file", &["txt"])
        .pick_file();

    if path.is_none() {
        return String::from("");
    }

    path.unwrap().to_string_lossy().into_owned().to_string()
}

#[tauri::command]
fn select_rand_question(file_path: String) -> Vec<String> {
    let file = File::open(&file_path).unwrap();
    let bf_file = BufReader::new(file);
    let mut count = 1;

    let qst_num = get_question_num(&file_path);

    let mut rnd_nums = RandNum::new();

    loop {
        let mut rng = rand::thread_rng();
        let i: i32 = rng.gen_range(1..qst_num + 1);

        if rnd_nums.set_qst(&count, i) {
            count += 1;
        }

        if count == 4 {
            break;
        }
    }

    let mut qsts = Vec::new();
    let mut index = 1;

    for line in bf_file.lines() {
        let l = line.unwrap();

        if rnd_nums.qst1 == index {
            qsts.push(l);
            continue;
        }
        if rnd_nums.qst2 == index {
            qsts.push(l);
            continue;
        }
        if rnd_nums.qst3 == index {
            qsts.push(l);
            continue;
        }
        if rnd_nums.qst4 == index {
            qsts.push(l);
            continue;
        }

        index += 1;
    }

    qsts
}

#[tauri::command]
fn get_question_num_v(file_path: String) -> i32 {
    let file = File::open(file_path).unwrap();
    let bf_file = BufReader::new(file);
    let mut num = 0;
    bf_file.lines().into_iter().for_each(|_| {
        num += 1;
    });
    num
}

fn get_question_num(file_path: &String) -> i32 {
    let file = File::open(file_path).unwrap();
    let bf_file = BufReader::new(file);
    let mut num = 0;
    bf_file.lines().into_iter().for_each(|_| {
        num += 1;
    });
    num
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            select_question_file,
            select_rand_question,
            get_question_num_v
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
