import { uploadFile as xhrUpload, USE_MOCK, mockDelay } from "./api";
import { uploadHistory } from "../data/notifications";

export const PIPELINE_STAGES = [
  "File Uploaded", "OCR Extraction", "Data Parsing", "Validation",
  "Normalization", "Embedding Generation", "Stored Successfully",
];

export function getUploadHistory() {
  return mockDelay(uploadHistory, 350);
}

export function uploadDocument(file, onProgress) {
  if (USE_MOCK) {
    // Simulate an XHR-style progress ramp for the UI while no backend is connected.
    return new Promise((resolve) => {
      let pct = 0;
      const timer = setInterval(() => {
        pct += 20;
        onProgress?.(Math.min(pct, 100));
        if (pct >= 100) {
          clearInterval(timer);
          resolve({ id: `DOC-${Date.now()}`, name: file.name, status: "Stored" });
        }
      }, 250);
    });
  }
  return xhrUpload("/api/upload", file, onProgress);
}
