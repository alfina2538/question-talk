// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use rand::Rng;
use std::fs::File;
use std::io::{BufRead, BufReader};
use tauri::api::dialog::blocking::FileDialogBuilder;

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
    let mut index = 1;
    let mut qst = String::new();

    let mut rng = rand::thread_rng();
    let qst_num = get_question_num(&file_path);
    let i: i32 = rng.gen_range(1..qst_num + 1);

    for line in bf_file.lines() {
        let l = line.unwrap();
        if index == i {
            qst = l;
            break;
        }
        index += 1
    }

    let qsts = qst.split(",");
    let mut result = Vec::new();
    for q in qsts {
        let qs = String::from(q);
        result.push(qs);
    }
    result
}

#[tauri::command]
fn get_rand_num() -> i32 {
    let mut rng = rand::thread_rng();
    rng.gen_range(1..4 + 1)
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
            get_rand_num,
            get_question_num_v
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
