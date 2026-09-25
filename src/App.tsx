import React, { useState } from 'react';
import { EmergencyBanner } from './components/EmergencyBanner';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SpecialtiesSection } from './components/SpecialtiesSection';
import { DoctorsDirectory } from './components/DoctorsDirectory';
import { LiveCapacityTracker } from './components/LiveCapacityTracker';
import { HealthPackages } from './components/HealthPackages';
import { PatientStories } from './components/PatientStories';
import { CampusGuide } from './components/CampusGuide';
import { Footer } from './components/Footer';
import { AppointmentModal } from './components/AppointmentModal';
import { EmergencyModal } from './components/EmergencyModal';
import { PatientPortalModal } from './components/PatientPortalModal';
import { Doctor, HealthPackage } from './data/hospitalData';

export default function App() {
  // Modal states
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isReportsModalOpen, setIsReportsModalOpen] = useState(false);

  // Preselected states for booking
  const [preselectedDoctor, setPreselectedDoctor] = useState<Doctor | null>(null);
  const [preselectedDept, setPreselectedDept] = useState<string>('');
  const [preselectedPackageName, setPreselectedPackageName] = useState<string>('');

  // Department filter for Doctor Directory
  const [selectedDeptFilter, setSelectedDeptFilter] = useState<string>('ALL');

  // Handlers
  const handleOpenGeneralBooking = () => {
    setPreselectedDoctor(null);
    setPreselectedDept('');
    setPreselectedPackageName('');
    setIsAppointmentModalOpen(true);
  };

  const handleSelectDoctorForBooking = (doc: Doctor) => {
    setPreselectedDoctor(doc);
    setPreselectedDept(doc.department);
    setPreselectedPackageName('');
    setIsAppointmentModalOpen(true);
  };

  const handleSelectDepartmentForBooking = (deptName: string) => {
    setPreselectedDoctor(null);
    setPreselectedDept(deptName);
    setPreselectedPackageName('');
    setIsAppointmentModalOpen(true);
  };

  const handleBookPackage = (pkg: HealthPackage) => {
    setPreselectedDoctor(null);
    setPreselectedDept('');
    setPreselectedPackageName(pkg.name);
    setIsAppointmentModalOpen(true);
  };

  const handleFilterDoctorsByDept = (deptName: string) => {
    setSelectedDeptFilter(deptName);
    const docSection = document.getElementById('doctors');
    if (docSection) {
      docSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSearchDoctorOrCondition = (query: string) => {
    const docSection = document.getElementById('doctors');
    if (docSection) {
      docSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenEmergency = () => {
    setIsEmergencyModalOpen(true);
  };

  const handleOpenReports = () => {
    setIsReportsModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-blue-600 selection:text-white">
      {/* 24/7 Emergency Notification Header Strip */}
      <EmergencyBanner
        onOpenEmergency={handleOpenEmergency}
        onOpenBloodBank={() => {
          const el = document.getElementById('live-capacity');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Main Sticky Header */}
      <Header
        onOpenBooking={handleOpenGeneralBooking}
        onOpenEmergency={handleOpenEmergency}
        onOpenReports={handleOpenReports}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onOpenBooking={handleOpenGeneralBooking}
          onOpenEmergency={handleOpenEmergency}
          onSearchDoctorOrCondition={handleSearchDoctorOrCondition}
        />

        {/* Centers of Clinical Excellence */}
        <SpecialtiesSection
          onSelectDepartmentForBooking={handleSelectDepartmentForBooking}
          onFilterDoctorsByDept={handleFilterDoctorsByDept}
        />

        {/* Distinguished Medical Consultants & OPD Schedules */}
        <DoctorsDirectory
          onSelectDoctorForBooking={handleSelectDoctorForBooking}
          selectedDeptFilter={selectedDeptFilter}
          onClearDeptFilter={() => setSelectedDeptFilter('ALL')}
          onSelectDeptFilter={(dept) => setSelectedDeptFilter(dept)}
        />

        {/* Public Bed & Blood Bank Telemetry */}
        <LiveCapacityTracker
          onEmergencyBedRequest={handleOpenEmergency}
          onOpenBloodDonation={handleOpenEmergency}
        />

        {/* Preventive Health Check Packages */}
        <HealthPackages
          onBookPackage={handleBookPackage}
        />

        {/* Patient Recovery Stories & Hybrid Surgical Suites */}
        <PatientStories />

        {/* Floor-by-Floor Wayfinder & Patient Guide */}
        <CampusGuide />
      </main>

      {/* Comprehensive Footer */}
      <Footer
        onOpenBooking={handleOpenGeneralBooking}
        onOpenEmergency={handleOpenEmergency}
        onOpenReports={handleOpenReports}
      />

      {/* Interactive Modals */}
      <AppointmentModal
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
        preselectedDoctor={preselectedDoctor}
        preselectedDepartment={preselectedDept}
        preselectedPackageName={preselectedPackageName}
      />

      <EmergencyModal
        isOpen={isEmergencyModalOpen}
        onClose={() => setIsEmergencyModalOpen(false)}
      />

      <PatientPortalModal
        isOpen={isReportsModalOpen}
        onClose={() => setIsReportsModalOpen(false)}
      />
    </div>
  );
}
