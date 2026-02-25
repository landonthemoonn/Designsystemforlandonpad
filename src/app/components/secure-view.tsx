import { motion } from "motion/react";
import { useState } from "react";
import { CheckCircle2, Circle, FileText, Upload, Shield, CreditCard, Building, User } from "lucide-react";

interface DocItem {
  id: string;
  label: string;
  description: string;
  uploaded: boolean;
  required: boolean;
}

const initialDocs: DocItem[] = [
  { id: "id", label: "Government-issued ID", description: "Passport, driver's license, or state ID", uploaded: true, required: true },
  { id: "income", label: "Proof of Income", description: "Last 3 pay stubs or offer letter", uploaded: true, required: true },
  { id: "bank", label: "Bank Statements", description: "Last 2–3 months of statements", uploaded: false, required: true },
  { id: "credit", label: "Credit Report Authorization", description: "Allow landlord to run credit check", uploaded: false, required: true },
  { id: "ref", label: "Reference Letters", description: "2 personal or professional references", uploaded: false, required: false },
  { id: "employment", label: "Employment Verification", description: "Letter from your employer on letterhead", uploaded: false, required: false },
];

const applicationSteps = [
  { icon: User, label: "Personal Info", status: "completed" as const },
  { icon: CreditCard, label: "Credit Check", status: "completed" as const },
  { icon: FileText, label: "Documents", status: "in-progress" as const },
  { icon: Building, label: "Landlord Review", status: "pending" as const },
  { icon: Shield, label: "Lease Signing", status: "pending" as const },
];

export function SecureView() {
  const [docs, setDocs] = useState(initialDocs);
  const [fileNames, setFileNames] = useState<Record<string, string>>({});

  const handleFileChange = (docId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.files?.[0]?.name;
    if (!name) return;
    setFileNames((prev) => ({ ...prev, [docId]: name }));
    setDocs((prev) =>
      prev.map((d) => (d.id === docId ? { ...d, uploaded: true } : d))
    );
  };

  const uploadedCount = docs.filter((d) => d.uploaded).length;
  const requiredCount = docs.filter((d) => d.required).length;
  const requiredUploaded = docs.filter((d) => d.required && d.uploaded).length;

  return (
    <div className="space-y-8">
      {/* Application Progress */}
      <motion.div
        className="glass-elevated rounded-[20px] p-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h3 className="text-2xl font-bold text-white/90 mb-2">Application Status</h3>
        <p className="text-white/50 mb-8">456 Park Avenue · Upper East Side</p>

        {/* Step Progress */}
        <div className="flex items-center justify-between relative">
          {/* Connecting line */}
          <div className="absolute top-5 left-5 right-5 h-0.5 bg-white/10" />
          <div
            className="absolute top-5 left-5 h-0.5 bg-[#00D4AA] transition-all duration-700"
            style={{ width: `${(applicationSteps.filter((s) => s.status === "completed").length / (applicationSteps.length - 1)) * 100}%` }}
          />

          {applicationSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative flex flex-col items-center gap-3 z-10">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step.status === "completed"
                      ? "bg-[#00D4AA] glow-teal-sm"
                      : step.status === "in-progress"
                      ? "glass border border-[#00D4AA]/50"
                      : "glass"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${step.status === "completed" ? "text-[#050d1f]" : step.status === "in-progress" ? "text-[#00D4AA]" : "text-white/35"}`} />
                </div>
                <span className={`text-xs font-medium whitespace-nowrap ${step.status === "pending" ? "text-white/35" : "text-white/75"}`}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Documents */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white/90">Required Documents</h3>
            <span className="text-sm text-white/50">{uploadedCount}/{docs.length} uploaded</span>
          </div>

          {docs.map((doc, index) => (
            <motion.div
              key={doc.id}
              className={`rounded-[16px] p-5 border transition-all ${
                doc.uploaded ? "border-[#00D4AA]/25" : "border-white/10"
              }`}
              style={{
                background: doc.uploaded ? "rgba(0,212,170,0.06)" : "rgba(255,255,255,0.04)",
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  {doc.uploaded ? (
                    <CheckCircle2 className="w-6 h-6 text-[#00D4AA]" />
                  ) : (
                    <Circle className="w-6 h-6 text-white/25" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className={`text-sm font-semibold ${doc.uploaded ? "text-white/90" : "text-white/75"}`}>
                      {doc.label}
                    </span>
                    {doc.required && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-medium flex-shrink-0" style={{ background: "rgba(255,107,107,0.15)", color: "#FF6B6B" }}>
                        Required
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-white/45 truncate">
                    {fileNames[doc.id] ? fileNames[doc.id] : doc.description}
                  </p>
                </div>

                <label className="flex-shrink-0 glass rounded-xl px-3 py-2 flex items-center gap-1.5 cursor-pointer hover:bg-white/10 transition-colors">
                  <Upload className="w-3.5 h-3.5 text-white/50" />
                  <span className="text-xs text-white/60 max-w-[72px] truncate">
                    {fileNames[doc.id] ? "Replace" : "Upload"}
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    onChange={(e) => handleFileChange(doc.id, e)}
                  />
                </label>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Progress Card */}
          <motion.div
            className="glass rounded-[20px] p-6"
            style={{ background: "rgba(0,212,170,0.06)", borderColor: "rgba(0,212,170,0.18)" }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-center">
              <div className="text-4xl font-bold text-[#00D4AA] mb-1">
                {Math.round((requiredUploaded / requiredCount) * 100)}%
              </div>
              <p className="text-white/55 text-sm">Required docs complete</p>

              <div className="mt-4 w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#00D4AA]"
                  style={{ boxShadow: "0 0 8px rgba(0,212,170,0.5)" }}
                  initial={{ width: 0 }}
                  animate={{ width: `${(requiredUploaded / requiredCount) * 100}%` }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                />
              </div>
            </div>
          </motion.div>

          {/* Tips */}
          <motion.div
            className="glass-subtle rounded-[20px] p-5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="font-semibold text-white/85 mb-3 text-sm">💡 Pro Tips</h4>
            <ul className="space-y-2 text-xs text-white/60">
              <li>• Scan documents at 300 DPI for best quality</li>
              <li>• PDF format preferred over images</li>
              <li>• Ensure all pages are visible and readable</li>
              <li>• Bank statements must show your name & account number</li>
            </ul>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            className="w-full py-4 rounded-[16px] font-semibold text-[#050d1f] bg-[#00D4AA] glow-teal-sm hover:bg-[#00c49a] transition-colors"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            Submit Application
          </motion.button>
        </div>
      </div>
    </div>
  );
}
