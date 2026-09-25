/**
 * RH Hospital API Service Client
 * Connects directly to the Python Flask backend (/api/*)
 * Base URL defaults to VITE_API_URL or http://localhost:5000
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export interface ApiAppointmentPayload {
  patient_name: string;
  patient_age: number | string;
  patient_gender: string;
  patient_phone: string;
  patient_email?: string;
  doctor_id: string;
  date: string;
  slot: string;
  appointment_type: string;
  symptoms?: string;
}

export interface ApiEmergencyPayload {
  address: string;
  phone: string;
  condition: string;
}

export const hospitalApi = {
  /**
   * Health check to test if Python Flask backend is running
   */
  async checkHealth(): Promise<boolean> {
    try {
      const res = await fetch(`${API_BASE_URL}/api/health`, { method: 'GET' });
      return res.ok;
    } catch {
      return false;
    }
  },

  /**
   * Fetch departments from Flask backend
   */
  async getDepartments() {
    const res = await fetch(`${API_BASE_URL}/api/departments`);
    if (!res.ok) throw new Error('Failed to fetch departments from Flask backend');
    return res.json();
  },

  /**
   * Fetch doctors with optional department filter
   */
  async getDoctors(department?: string, search?: string) {
    const params = new URLSearchParams();
    if (department && department !== 'ALL') params.append('department', department);
    if (search) params.append('q', search);

    const res = await fetch(`${API_BASE_URL}/api/doctors?${params.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch doctors from Flask backend');
    return res.json();
  },

  /**
   * Book an appointment via Python Flask
   */
  async bookAppointment(payload: ApiAppointmentPayload) {
    const res = await fetch(`${API_BASE_URL}/api/appointments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Failed to book appointment on Flask backend');
    return res.json();
  },

  /**
   * Dispatch an ambulance via Python Flask
   */
  async dispatchAmbulance(payload: ApiEmergencyPayload) {
    const res = await fetch(`${API_BASE_URL}/api/emergency/dispatch`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Emergency dispatch failed on Flask backend');
    return res.json();
  },

  /**
   * Fetch diagnostic lab report by UHID from Flask backend
   */
  async getLabReport(uhid: string) {
    const res = await fetch(`${API_BASE_URL}/api/reports/${encodeURIComponent(uhid.trim())}`);
    if (!res.ok) throw new Error('Lab report not found on Flask backend');
    return res.json();
  },

  /**
   * Fetch live bed telemetry from Flask backend
   */
  async getBedTelemetry() {
    const res = await fetch(`${API_BASE_URL}/api/beds`);
    if (!res.ok) throw new Error('Failed to fetch beds from Flask backend');
    return res.json();
  }
};
