import { motion } from 'motion/react';
import { useState } from 'react';
import {
  CheckCircle2,
  Circle,
  Upload,
  FileText,
  Clock,
  AlertCircle,
  ChevronRight,
} from 'lucide-react';
import { StageHeader } from '../components/shared/StageHeader';
import { mockApplications } from '../utils/mockData';
import type { ApplicationStatus, Document } from '../types';

const statusLabels: Record<ApplicationStatus, { label: string; color: string }> = {
  'not-started': { label: 'Not Started', color: '#8A8A85' },
  'in-progress': { label: 'In Progress', color: '#FFC107' },
  submitted: { label: 'Submitted', color: '#00D4AA' },
  approved: { label: 'Approved', color: '#00D4AA' },
  denied: { label: 'Denied', color: '#FF6B6B' },
};

export function Secure() {
  const [applications, setApplications] = useState(mockApplications);

  const toggleDocument = (appId: string, docId: string) => {
    setApplications(prev =>
      prev.map(app =>
        app.id === appId
          ? {
              ...app,
              documents: app.documents.map(doc =>
                doc.id === docId ? { ...doc, uploaded: !doc.uploaded } : doc
              ),
            }
          : app
      )
    );
  };

  const app = applications[0];
  const uploadedCount = app.documents.filter(d => d.uploaded).length;
  const requiredCount = app.documents.filter(d => d.required).length;
  const requiredUploaded = app.documents.filter(d => d.required && d.uploaded).length;
  const progressPct = Math.round((uploadedCount / app.documents.length) * 100);

  return (
    <>
      <StageHeader
        title="Secure"
        subtitle="Applications, documents & lease review"
      />

      <div className="space-y-8">
        {/* Application Status Card */}
        <motion.div
          className="bg-white rounded-[20px] p-6 shadow-[0_2px_12px_rgba(26,26,26,0.06)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-[17px] font-semibold text-[#1A1A1A]">{app.address}</h3>
              <div className="flex items-center gap-2 mt-1">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: statusLabels[app.status].color }}
                />
                <span className="text-[13px] font-medium" style={{ color: statusLabels[app.status].color }}>
                  {statusLabels[app.status].label}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[30px] font-bold text-[#00D4AA]">{progressPct}%</div>
              <div className="text-[11px] text-[#8A8A85]">Complete</div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-2.5 bg-[#E8E6DD] rounded-full overflow-hidden mb-2">
            <motion.div
              className="h-full bg-[#00D4AA] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
          <p className="text-[13px] text-[#8A8A85]">
            {requiredUploaded} of {requiredCount} required documents uploaded
          </p>
        </motion.div>

        {/* Documents Checklist */}
        <motion.div
          className="bg-white rounded-[20px] p-6 shadow-[0_2px_12px_rgba(26,26,26,0.06)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-[17px] font-semibold text-[#1A1A1A] mb-4">
            <FileText className="w-5 h-5 inline mr-2 text-[#8A8A85]" />
            Required Documents
          </h3>

          <div className="space-y-3">
            {app.documents.map((doc, i) => (
              <motion.button
                key={doc.id}
                onClick={() => toggleDocument(app.id, doc.id)}
                className={`
                  w-full flex items-center gap-4 p-4 rounded-[16px] text-left transition-all
                  ${doc.uploaded
                    ? 'bg-[#00D4AA]/5 border border-[#00D4AA]/20'
                    : 'bg-[#F2F0E8] border border-transparent hover:border-[#D0CEC5]'
                  }
                `}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                {doc.uploaded ? (
                  <CheckCircle2 className="w-5 h-5 text-[#00D4AA] flex-shrink-0" />
                ) : (
                  <Circle className="w-5 h-5 text-[#D0CEC5] flex-shrink-0" />
                )}
                <div className="flex-1">
                  <div
                    className={`text-[15px] font-medium ${
                      doc.uploaded ? 'text-[#8A8A85] line-through' : 'text-[#1A1A1A]'
                    }`}
                  >
                    {doc.name}
                  </div>
                  {doc.required && !doc.uploaded && (
                    <span className="text-[11px] text-[#FF6B6B] font-medium">Required</span>
                  )}
                </div>
                {!doc.uploaded && (
                  <Upload className="w-4 h-4 text-[#8A8A85]" />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Lease Review with AI */}
        <motion.div
          className="bg-white rounded-[20px] p-6 shadow-[0_2px_12px_rgba(26,26,26,0.06)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-[17px] font-semibold text-[#1A1A1A] mb-4">
            AI Lease Review
          </h3>
          <div className="space-y-4">
            <div className="p-4 bg-[#00D4AA]/5 rounded-[12px] border border-[#00D4AA]/20">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#00D4AA] mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-[13px] font-semibold text-[#1A1A1A]">Standard rent terms</div>
                  <p className="text-[13px] text-[#8A8A85] mt-0.5">
                    12-month lease with standard 30-day notice for renewal. Rent increase capped at SF rent control rates.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-[#FFC107]/5 rounded-[12px] border border-[#FFC107]/20">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-[#FFC107] mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-[13px] font-semibold text-[#1A1A1A]">Pet deposit clause</div>
                  <p className="text-[13px] text-[#8A8A85] mt-0.5">
                    $500 refundable pet deposit required. Note: California law limits security deposits. Ask landlord to confirm this is within legal limits.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-[#F2F0E8] rounded-[12px]">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#8A8A85] mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-[13px] font-semibold text-[#1A1A1A]">Move-in costs</div>
                  <p className="text-[13px] text-[#8A8A85] mt-0.5">
                    First month ($2,450) + security deposit ($2,450) + pet deposit ($500) = $5,400 due at signing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Notes */}
        {app.notes && (
          <motion.div
            className="bg-[#F2F0E8] rounded-[20px] p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl">📝</div>
              <div>
                <h4 className="font-semibold text-[#1A1A1A] mb-1">Notes</h4>
                <p className="text-[15px] text-[#1A1A1A]">{app.notes}</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
}
