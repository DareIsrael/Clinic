import { createAppointment, getUserAppointments } from '@/controllers/bookingController';

export async function POST(req) {
  return createAppointment(req);
}

export async function GET(req) {
  return getUserAppointments(req);
}