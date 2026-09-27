import { useEffect, useRef, useState } from "react";
import { UploadCloud, FileText, CheckCircle2, Loader2 } from "lucide-react";
import PageContainer from "../components/layout/PageContainer";
import Card from "../components/common/Card";
import Badge from "../components/common/Badge";
import { getUploadHistory, uploadDocument, PIPELINE_STAGES } from "../services/uploadService";
import { useToast } from "../context/ToastContext";

export default function Upload() {
  const [dragOver, setDragOver] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [history, setHistory] = useState([]);
  const inputRef = useRef(null);
  const { showToast } = useToast();

  useEffect(() => { getUploadHistory().then(setHistory); }, []);

  function handleFiles(fileList) {
    Array.from(fileList).forEach((file) => processFile(file));
  }

  function processFile(file) {
    const jobId = `${file.name}-${Date.now()}`;
    setJobs((prev) => [{ id: jobId, name: file.name, progress: 0, stageIndex: 0, done: false }, ...prev]);

    uploadDocument(file, (pct) => {
      setJobs((prev) => prev.map((j) => j.id === jobId ? { ...j, progress: pct, stageIndex: Math.min(PIPELINE_STAGES.length - 1, Math.floor((pct / 100) * PIPELINE_STAGES.length)) } : j));
    }).then(() => {
      setJobs((prev) => prev.map((j) => j.id === jobId ? { ...j, progress: 100, stageIndex: PIPELINE_STAGES.length - 1, done: true } : j));
      showToast(`${file.name} processed and stored successfully`, "success");
      setHistory((prev) => [{ file: file.name, type: file.name.split(".").pop().toUpperCase(), uploadedBy: "You", date: new Date().toISOString().slice(0, 10), status: "Stored" }, ...prev]);
    });
  }

  return (
    <PageContainer title="Data Upload">
      <Card>
        <h3 className="font-semibold text-slate-800 mb-1">Upload Supply Chain Data</h3>
        <p className="text-sm text-slate-400 mb-4">Supported formats: PDF, PNG, JPG, CSV</p>

        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
          onClick={() => inputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl py-14 flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors ${
            dragOver ? "border-accent-500 bg-accent-100/30" : "border-slate-200 hover:border-accent-300"
          }`}
        >
          <div className="w-12 h-12 rounded-full bg-accent-100 flex items-center justify-center">
            <UploadCloud size={22} className="text-accent-600" />
          </div>
          <p className="text-sm font-medium text-slate-700">Drag and drop files here, or click to browse</p>
          <p className="text-xs text-slate-400">PDF, PNG, JPG, CSV — up to 25MB per file</p>
          <input ref={inputRef} type="file" multiple accept=".pdf,.png,.jpg,.jpeg,.csv" className="hidden" onChange={(e) => handleFiles(e.target.files)} />
        </div>
      </Card>

      {jobs.length > 0 && (
        <Card>
          <h3 className="font-semibold text-slate-800 text-sm mb-4">Processing Pipeline</h3>
          <div className="space-y-5">
            {jobs.map((job) => (
              <div key={job.id}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700 flex items-center gap-2">
                    <FileText size={15} className="text-slate-400" /> {job.name}
                  </span>
                  <span className="text-xs text-slate-400">{job.done ? "Complete" : `${job.progress}%`}</span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden mb-3">
                  <div className="h-full bg-accent-600 rounded-full transition-all" style={{ width: `${job.progress}%` }} />
                </div>
                <div className="flex flex-wrap gap-2">
                  {PIPELINE_STAGES.map((stage, i) => {
                    const state = i < job.stageIndex || job.done ? "done" : i === job.stageIndex ? "active" : "pending";
                    return (
                      <span
                        key={stage}
                        className={`inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md border ${
                          state === "done" ? "border-risk-low bg-risk-low-bg text-risk-low" :
                          state === "active" ? "border-accent-500 bg-accent-100 text-accent-600" :
                          "border-slate-200 text-slate-400"
                        }`}
                      >
                        {state === "done" ? <CheckCircle2 size={12} /> : state === "active" ? <Loader2 size={12} className="animate-spin" /> : null}
                        {stage}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      <Card padded={false}>
        <h3 className="font-semibold text-slate-800 text-sm p-4 pb-2">Upload History</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-slate-400 text-xs border-b border-slate-100 text-left">
                <th className="pl-4 pb-2 font-medium">File Name</th>
                <th className="pb-2 font-medium">Type</th>
                <th className="pb-2 font-medium">Uploaded By</th>
                <th className="pb-2 font-medium">Date</th>
                <th className="pb-2 pr-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h, i) => (
                <tr key={i} className="border-b border-slate-50 last:border-0">
                  <td className="pl-4 py-3 font-medium text-slate-700">{h.file}</td>
                  <td className="py-3 text-slate-500">{h.type}</td>
                  <td className="py-3 text-slate-500">{h.uploadedBy}</td>
                  <td className="py-3 text-slate-500">{h.date}</td>
                  <td className="py-3 pr-4"><Badge label={h.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </PageContainer>
  );
}
