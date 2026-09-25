import React, { useState } from 'react';
import { X, Search, FileText, CheckCircle2, Download, Printer, AlertTriangle, ShieldCheck, User } from 'lucide-react';
import { SAMPLE_LAB_REPORTS, LabReport } from '../data/hospitalData';

interface PatientPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PatientPortalModal: React.FC<PatientPortalModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [inputUhid, setInputUhid] = useState('UHID-88204');
  const [report, setReport] = useState<LabReport | null>(SAMPLE_LAB_REPORTS['UHID-88204']);
  const [hasSearched, setHasSearched] = useState(true);

  const handleSearch = (uhidToFind: string) => {
    const clean = uhidToFind.trim().toUpperCase();
    const found = SAMPLE_LAB_REPORTS[clean];
    setReport(found || null);
    setHasSearched(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400">
              RH Hospital Laboratory & Imaging Services
            </span>
            <h2 className="text-xl font-bold font-serif">
              Online Diagnostic & Lab Report Portal
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar & Demo Quick Links */}
        <div className="p-5 bg-slate-50 border-b border-slate-200 space-y-3">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={inputUhid}
                onChange={(e) => setInputUhid(e.target.value)}
                placeholder="Enter Patient UHID (e.g. UHID-88204, UHID-99412)..."
                className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 uppercase font-mono tracking-wider focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={() => handleSearch(inputUhid)}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Fetch Report
            </button>
          </div>

          {/* Quick Demo Pill Buttons */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500">Sample Records:</span>
            <button
              type="button"
              onClick={() => { setInputUhid('UHID-88204'); handleSearch('UHID-88204'); }}
              className="px-2.5 py-1 bg-white border border-slate-200 hover:border-blue-400 rounded-lg text-[11px] font-mono text-blue-600 transition-colors cursor-pointer"
            >
              UHID-88204 (Lipid & Cardiac)
            </button>
            <button
              type="button"
              onClick={() => { setInputUhid('UHID-99412'); handleSearch('UHID-99412'); }}
              className="px-2.5 py-1 bg-white border border-slate-200 hover:border-blue-400 rounded-lg text-[11px] font-mono text-blue-600 transition-colors cursor-pointer"
            >
              UHID-99412 (3T MRI Brain)
            </button>
            <button
              type="button"
              onClick={() => { setInputUhid('UHID-77105'); handleSearch('UHID-77105'); }}
              className="px-2.5 py-1 bg-white border border-slate-200 hover:border-blue-400 rounded-lg text-[11px] font-mono text-blue-600 transition-colors cursor-pointer"
            >
              UHID-77105 (Renal & Hemogram)
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 max-h-[65vh] overflow-y-auto">
          {report ? (
            <div className="space-y-6">
              
              {/* Patient and Test Meta Banner */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block text-[11px]">Patient Name</span>
                  <span className="font-bold text-slate-900 text-sm">{report.patientName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">UHID / Age / Gender</span>
                  <span className="font-mono font-semibold text-slate-800">{report.uhid} · {report.age}Y · {report.gender}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Collection Date</span>
                  <span className="text-slate-800">{report.collectionDate}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Authorization Status</span>
                  <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px] border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    {report.status}
                  </span>
                </div>
              </div>

              {/* Test Name & Department */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-2">
                <div>
                  <h3 className="text-lg font-bold text-slate-950 font-serif">
                    {report.testName}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {report.department}
                  </p>
                </div>
                <div className="text-xs text-slate-500">
                  Authorizing Consultant: <strong className="text-slate-800">{report.consultant}</strong>
                </div>
              </div>

              {/* Parameters Table */}
              <div className="border border-slate-200 rounded-xl overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-600 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-4">Test Parameter</th>
                      <th className="py-2.5 px-4">Observed Value</th>
                      <th className="py-2.5 px-4">Standard Reference Range</th>
                      <th className="py-2.5 px-4 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {report.parameters.map((param, index) => {
                      const isHigh = param.flag === 'High';
                      const isLow = param.flag === 'Low';

                      return (
                        <tr key={index} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-2.5 px-4 font-medium text-slate-900">
                            {param.name}
                          </td>
                          <td className="py-2.5 px-4 font-mono font-bold text-slate-900">
                            {param.value} <span className="text-[11px] font-normal text-slate-500 font-sans">{param.unit}</span>
                          </td>
                          <td className="py-2.5 px-4 text-slate-500">
                            {param.referenceRange}
                          </td>
                          <td className="py-2.5 px-4 text-center">
                            {isHigh && (
                              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-700">
                                High
                              </span>
                            )}
                            {isLow && (
                              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-700">
                                Low
                              </span>
                            )}
                            {!isHigh && !isLow && (
                              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-700">
                                Normal
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Doctor Clinical Remarks */}
              <div className="bg-blue-50/70 border border-blue-100 rounded-xl p-4 text-xs text-slate-700 space-y-1">
                <span className="font-bold text-blue-950 block">Clinical Interpretation & Recommendation:</span>
                <p className="leading-relaxed text-slate-700">
                  {report.clinicalNotes}
                </p>
                <div className="pt-2 text-[11px] text-slate-500 flex justify-between">
                  <span>Digitally verified with cryptographic laboratory hash</span>
                  <span className="font-semibold text-blue-800">{report.consultant}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>NABL Lab Accreditation No. M-8402/2026</span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handlePrint}
                    className="px-4 py-2 border border-slate-300 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Formal Report</span>
                  </button>
                  <button
                    onClick={handlePrint}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>

            </div>
          ) : (
            <div className="text-center py-12 space-y-3">
              <FileText className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">
                No Record Found for &quot;{inputUhid}&quot;
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Please verify your UHID number from your admission card or consultation invoice. Try clicking one of the sample records above.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
