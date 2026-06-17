// Configuration for Google Sheets & Apps Script Backend Integration
// For full functionality (Create, Read, Update, Delete), deploy the Google Apps Script.

// 1. Paste your deployed Google Apps Script Web App URL here (ends in /exec):
export const GOOGLE_SCRIPT_API_URL = "https://script.google.com/macros/s/AKfycbwAbkgb1PQR1iN3g19DYBHxasTtDfyuspUCSgXvkthAJ3uwagTJblUBpe3Xy_fQUqSm/exec";

// 2. Your published Google Sheet CSV URL (used as a read-only fallback or backup):
export const GOOGLE_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQHN-kZXS_azoCZpPSbbvt04tU0PF2giJBdqSaQmgdq--biBeNt4AE7rZ-1io6QYh999L-BTviRMEwp/pub?output=csv";

// Enable localStorage fallback if Google Sheet endpoints are unavailable or not configured
export const ENABLE_LOCAL_FALLBACK = true;
