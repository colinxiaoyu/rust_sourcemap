use serde::{Deserialize, Serialize};
use std::fs;

#[derive(Debug, Serialize, Deserialize)]
pub struct SourcePosition {
    pub source: Option<String>,
    pub line: Option<u32>,
    pub column: Option<u32>,
    pub name: Option<String>,
}

// Parse sourcemap and get original position
#[tauri::command]
fn parse_sourcemap(file_path: String, line: u32, column: u32) -> Result<SourcePosition, String> {
    // Read sourcemap file
    let content =
        fs::read_to_string(&file_path).map_err(|e| format!("Failed to read file: {}", e))?;

    // Parse sourcemap
    let sm = sourcemap::SourceMap::from_reader(content.as_bytes())
        .map_err(|e| format!("Failed to parse sourcemap: {}", e))?;

    // Get original position
    let token = sm.lookup_token(line - 1, column);

    match token {
        Some(token) => Ok(SourcePosition {
            source: token.get_source().map(|s| s.to_string()),
            line: Some(token.get_src_line() + 1),
            column: Some(token.get_src_col()),
            name: token.get_name().map(|n| n.to_string()),
        }),
        None => Err("Could not find token at specified position".to_string()),
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(tauri::generate_handler![parse_sourcemap])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
