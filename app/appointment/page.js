import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'Book an Appointment | St Mary Rideau Family Clinic',
  description:
    'Choose the right appointment at St Mary Rideau Family Clinic: new-patient appointments, ongoing care and same-day visits in downtown Ottawa.',
};

/* ── Ocean booking URLs ──────────────────────────────────────── */
const URLS = {
  newPatientReginald:
    'https://ocean.cognisantmd.com/online-booking/f8636adb-8784-413e-bd3c-61400e190dfd',
  existingFagbolagun:
    'https://ocean.cognisantmd.com/online-booking/7b15e604-ee55-4d68-909f-a6b8d6039554',
  existingReginald:
    'https://ocean.cognisantmd.com/online-booking/2dc1ef2c-1b4d-4e8d-bd93-152648852dbd',
  continuingCare:
    'https://ocean.cognisantmd.com/online-booking/ad2f73f2-beb4-43ed-857a-e08ac46042a4',
  meetReginald:
    'https://ocean.cognisantmd.com/online-booking/f8636adb-8784-413e-bd3c-61400e190dfd',
  sameDayWalkIn: '/book-appointment',
};

/* ── shared styles ───────────────────────────────────────────── */
const font =
  "Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif";

const btnPrimary =
  'inline-flex items-center justify-center gap-3 rounded-[10px] text-[13.5px] font-bold px-3 py-3 text-white w-full text-center leading-snug';
const btnPrimaryBg =
  'linear-gradient(110deg,#0579c4,#0064ac)';
const btnPrimaryShadow =
  '0 4px 12px rgba(0,102,169,0.10)';

const btnSecondary =
  'inline-flex items-center justify-center gap-3 rounded-[10px] text-[13.5px] font-bold px-3 py-3 w-full text-center leading-snug';
const btnSecondaryStyle = {
  color: '#0068ad',
  background: '#fff',
  border: '1.5px solid #259cf0',
  boxShadow: '0 2px 8px rgba(0,113,196,0.06)',
};

const btnPale =
  'inline-flex items-center justify-center gap-3 rounded-[10px] text-[13.5px] font-bold px-3 py-3 w-full text-center leading-snug';
const btnPaleStyle = {
  color: '#0068ad',
  background: '#e7f7ff',
  border: '1.5px solid #b6e5ff',
};

const Arrow = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className="shrink-0">
    <path d="M4 12h16M13 5l7 7-7 7" />
  </svg>
);

/* ── Page ─────────────────────────────────────────────────────── */
export default function BookAppointmentPage() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: font, color: '#111f3c', fontSize: 15 }}>

      {/* ── Hero ───────────────────────────────────────────────── */}
      <section className="relative overflow-hidden" id="booking">
        {/* decorative blobs */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div
            className="absolute hidden md:block"
            style={{
              background: 'linear-gradient(125deg,rgba(232,247,255,0.8),rgba(219,242,253,0.28))',
              height: 220, top: 28, width: '48%', left: '-5%',
              borderRadius: '43% 60% 40% 55%',
              transform: 'rotate(8deg) skewY(-7deg)',
            }}
          />
          <div
            className="absolute hidden md:block"
            style={{
              background: 'linear-gradient(125deg,rgba(232,247,255,0.8),rgba(219,242,253,0.28))',
              height: 220, top: 28, width: '48%', right: '-8%',
              borderRadius: '43% 60% 40% 55%',
              transform: 'rotate(-6deg) skewY(9deg)',
            }}
          />
        </div>

        <div className="relative z-[1] max-w-[1370px] mx-auto px-5 md:px-12 text-center pt-8 pb-6">
          <h1
            className="font-bold leading-[1.18] m-0"
            style={{ fontSize: 'clamp(32px,3.2vw,43px)', letterSpacing: '-1.7px', color: '#081b40' }}
          >
            Book an Appointment
          </h1>
          <div className="w-[92px] h-[2px] mx-auto my-3.5" style={{ background: '#006fb8' }} />
          <p className="text-[18px] leading-[1.55] m-0" style={{ color: '#3f516e' }}>
            Choose the option that best fits your needs.
          </p>
        </div>
      </section>

      {/* ── 4 Cards ────────────────────────────────────────────── */}
      <section
        className="relative z-[1] max-w-[1370px] mx-auto px-5 md:px-12 pb-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        aria-label="Choose an appointment type"
      >
        {/* ─ Card 1 — New Patient ─ */}
        <article
          className="relative flex flex-col rounded-2xl overflow-hidden p-5 md:p-6"
          style={{
            background: 'linear-gradient(150deg,#f1faff 0,#fff 82%)',
            border: '2px solid #60bdff',
            boxShadow: '0 7px 20px rgba(16,72,111,0.07)',
            minHeight: 435,
          }}
        >
          <span
            className="absolute right-0 top-0 text-xs font-bold px-3 py-2 text-white"
            style={{
              background: 'linear-gradient(110deg,#0085db,#006caf)',
              borderRadius: '0 13px 0 13px',
            }}
          >
            Now Accepting
          </span>

          {/* illustration */}
          <div className="flex justify-center items-center h-[131px] -mt-0.5 mb-1 w-full">
            <Image
              src="/appt-card-1.png"
              alt="Illustration of a male family physician"
              width={230}
              height={126}
              className="object-contain"
              style={{ maxHeight: 126 }}
            />
          </div>

          <h2
            className="text-[20px] lg:text-[22px] font-extrabold leading-[1.29] mt-1.5 mb-2.5"
            style={{ letterSpacing: '-0.62px', color: '#091b3a' }}
          >
            New Patient – Find a Family Doctor
          </h2>
          <p className="text-base font-bold mb-1.5" style={{ color: '#0076be' }}>
            Dr.&nbsp;Reginald Agukwendu
          </p>
          <p className="text-[15px] leading-[1.58] m-0" style={{ color: '#50617d', letterSpacing: '-0.05px' }}>
            Dr.&nbsp;Reginald is accepting new patients. Book a new-patient appointment to meet Dr.&nbsp;Reginald and discuss establishing care at St&nbsp;Mary.
          </p>

          <div className="mt-auto pt-4 grid gap-2">
            <a
              href={URLS.newPatientReginald}
              target="_blank"
              rel="noopener noreferrer"
              className={btnPrimary}
              style={{ background: btnPrimaryBg, boxShadow: btnPrimaryShadow, border: '1px solid #057bc9' }}
            >
              Book with Dr.&nbsp;Reginald <Arrow />
            </a>
          </div>
        </article>

        {/* ─ Card 2 — Existing Patients ─ */}
        <article
          className="relative flex flex-col rounded-2xl overflow-hidden p-5 md:p-6"
          style={{
            background: '#fff',
            border: '1px solid #d4e9f7',
            boxShadow: '0 7px 20px rgba(16,72,111,0.07)',
            minHeight: 435,
          }}
        >
          {/* mini icon */}
          <div
            className="absolute top-6 left-5 w-[42px] h-[42px] rounded-[11px] flex items-center justify-center"
            style={{ background: '#eaf7fe', color: '#005f9d' }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="6" r="3.4" />
              <path d="M5 21v-3a7 7 0 0 1 14 0v3z" />
            </svg>
          </div>

          {/* illustration */}
          <div className="flex justify-center items-center h-[131px] -mt-0.5 mb-1 w-full">
            <Image
              src="/appt-card-2.png"
              alt="Illustration of two physicians"
              width={230}
              height={108}
              className="object-contain"
              style={{ maxHeight: 108, width: 230 }}
            />
          </div>

          <h2
            className="text-[20px] lg:text-[22px] font-extrabold leading-[1.29] mt-1.5 mb-2.5"
            style={{ letterSpacing: '-0.62px', color: '#091b3a' }}
          >
            Existing Patients
          </h2>
          <p className="text-[15px] leading-[1.58] m-0" style={{ color: '#50617d', letterSpacing: '-0.05px' }}>
            Already a patient of St&nbsp;Mary Rideau Family Clinic? Book directly with your family doctor.
          </p>

          <div className="mt-auto pt-4 grid gap-2">
            <a
              href={URLS.existingFagbolagun}
              target="_blank"
              rel="noopener noreferrer"
              className={btnSecondary}
              style={btnSecondaryStyle}
            >
              Book with Dr.&nbsp;Fagbolagun <Arrow />
            </a>
            <a
              href={URLS.existingReginald}
              target="_blank"
              rel="noopener noreferrer"
              className={btnPale}
              style={btnPaleStyle}
            >
              Book with Dr.&nbsp;Reginald <Arrow />
            </a>
          </div>
          <p className="text-[11px] mt-2 leading-snug" style={{ color: '#71849b' }}>
            Dr.&nbsp;Fagbolagun is not accepting new patients. This option is for existing patients only.
          </p>
        </article>

        {/* ─ Card 3 — Previously with Dr. Okwechime ─ */}
        <article
          className="relative flex flex-col rounded-2xl overflow-hidden p-5 md:p-6"
          style={{
            background: '#fff',
            border: '1px solid #d4e9f7',
            boxShadow: '0 7px 20px rgba(16,72,111,0.07)',
            minHeight: 435,
          }}
        >
          {/* mini icon */}
          <div
            className="absolute top-6 left-5 w-[42px] h-[42px] rounded-[11px] flex items-center justify-center"
            style={{ background: '#eaf7fe', color: '#005f9d' }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
              <rect x="9" y="2" width="6" height="4" rx="1" />
              <path d="M9 14h1M9 18h1M14 14h1M14 18h1" />
            </svg>
          </div>

          {/* illustration */}
          <div className="flex justify-center items-center h-[131px] -mt-0.5 mb-1 w-full">
            <Image
              src="/appt-card-3.png"
              alt="Illustration of a physician with a clipboard"
              width={230}
              height={126}
              className="object-contain"
              style={{ maxHeight: 126 }}
            />
          </div>

          <h2
            className="text-[20px] lg:text-[22px] font-extrabold leading-[1.29] mt-1.5 mb-2.5"
            style={{ letterSpacing: '-0.62px', color: '#091b3a' }}
          >
            Previously with Dr.&nbsp;Okwechime?
          </h2>
          <p className="text-[15px] leading-[1.58] m-0" style={{ color: '#50617d', letterSpacing: '-0.05px' }}>
            You can continue to request care at St&nbsp;Mary during this transition. If you&rsquo;re interested in having Dr.&nbsp;Reginald as your family doctor, you can book a meet-and-greet appointment. The choice is yours.
          </p>

          <div className="mt-auto pt-4 grid gap-2">
            <a
              href={URLS.continuingCare}
              target="_blank"
              rel="noopener noreferrer"
              className={btnSecondary}
              style={btnSecondaryStyle}
            >
              Book Continuing Care <Arrow />
            </a>
            <a
              href={URLS.meetReginald}
              target="_blank"
              rel="noopener noreferrer"
              className={btnPale}
              style={btnPaleStyle}
            >
              Meet Dr.&nbsp;Reginald <Arrow />
            </a>
          </div>
        </article>

        {/* ─ Card 4 — Urgent / Same-Day ─ */}
        <article
          className="relative flex flex-col rounded-2xl overflow-hidden p-5 md:p-6"
          style={{
            background: '#fff',
            border: '1px solid #d4e9f7',
            boxShadow: '0 7px 20px rgba(16,72,111,0.07)',
            minHeight: 435,
          }}
        >
          {/* mini icon */}
          <div
            className="absolute top-6 left-5 w-[42px] h-[42px] rounded-[11px] flex items-center justify-center"
            style={{ background: '#eaf7fe', color: '#005f9d' }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 3" />
            </svg>
          </div>

          {/* illustration */}
          <div className="flex justify-center items-center h-[131px] -mt-0.5 mb-1 w-full">
            <Image
              src="/appt-card-4.png"
              alt="Illustration of urgent care"
              width={230}
              height={126}
              className="object-contain"
              style={{ maxHeight: 126 }}
            />
          </div>

          <h2
            className="text-[20px] lg:text-[22px] font-extrabold leading-[1.29] mt-1.5 mb-2.5"
            style={{ letterSpacing: '-0.62px', color: '#091b3a' }}
          >
            Urgent / Same-Day Care
          </h2>
          <p className="text-[15px] leading-[1.58] m-0" style={{ color: '#50617d', letterSpacing: '-0.05px' }}>
            Need to see a doctor today? Book a same-day appointment or walk-in visit for urgent, non-emergency concerns. Availability may vary.
          </p>

          <div className="mt-auto pt-4 grid gap-2">
            <Link
              href={URLS.sameDayWalkIn}
              className={btnPrimary}
              style={{ background: btnPrimaryBg, boxShadow: btnPrimaryShadow, border: '1px solid #057bc9' }}
            >
              Book Same-Day / Walk-In <Arrow />
            </Link>
          </div>
        </article>
      </section>

      {/* ── Info Strip – Same-Day Care ─────────────────────────── */}
      <section
        className="relative z-[1] max-w-[1274px] mx-auto px-5 md:px-12 mt-1"
      >
        <div
          className="rounded-[15px] p-5 md:p-6"
          style={{
            background: 'linear-gradient(100deg,#eef9ff,#f4fbff,#edf9ff)',
            border: '1px solid #d0eaff',
          }}
        >
          {/* header */}
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-[49px] h-[49px] shrink-0 rounded-full grid place-items-center"
              style={{ background: '#c9ecff', color: '#0070b9' }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4M12 16h.01" />
              </svg>
            </div>
            <h2 className="text-[19px] font-bold m-0" style={{ color: '#101d3a', letterSpacing: '-0.45px' }}>
              Important Information – Same-Day Care
            </h2>
          </div>

          {/* 4-col info grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-3">
            {[
              {
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                ),
                danger: true,
                title: 'Not for medical emergencies',
                desc: 'Please call 911 or go to the nearest emergency department.',
              },
              {
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 12h6M12 9v6M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
                  </svg>
                ),
                title: 'Controlled substances',
                desc: 'Prescriptions or renewals are not guaranteed during same-day appointments.',
              },
              {
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                    <rect x="9" y="2" width="6" height="4" rx="1" />
                  </svg>
                ),
                title: 'Forms and paperwork',
                desc: 'Medical forms or benefit paperwork may require a separate appointment and records.',
              },
              {
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                ),
                title: 'Complex or ongoing issues',
                desc: 'Ongoing care or detailed assessments may require a planned follow-up appointment.',
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3 min-w-0">
                <div
                  className="w-[34px] h-[34px] shrink-0 rounded-[11px] grid place-items-center"
                  style={{
                    background: item.danger ? '#fff0f0' : '#dff2ff',
                    color: item.danger ? '#df2331' : '#0073b8',
                  }}
                >
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-[12.5px] font-bold leading-snug mt-0.5 mb-1" style={{ color: '#101c35' }}>
                    {item.title}
                  </h3>
                  <p className="text-[12.5px] leading-[1.5] m-0" style={{ color: '#5e6c86' }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Help Strip ─────────────────────────────────────────── */}
      <section className="relative z-[1] max-w-[1370px] mx-auto px-5 md:px-12 py-6">
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-6">
          <div className="text-center sm:mr-4">
            <h2 className="text-[17px] font-bold m-0 mb-1" style={{ letterSpacing: '-0.35px' }}>
              Need help choosing an appointment type?
            </h2>
            <p className="text-[12.5px] m-0" style={{ color: '#63708b' }}>
              Our team can help you find the right option.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2.5 rounded-full min-w-[220px] px-5 py-3 text-sm font-bold whitespace-nowrap"
            style={{
              color: '#0069b4',
              border: '1px solid #72c8ff',
              background: '#fff',
              boxShadow: '0 4px 16px rgba(0,83,144,0.06)',
            }}
          >
            Need help choosing?
          </Link>

          <a
            href="tel:+13438873470"
            className="inline-flex items-center justify-center gap-2.5 rounded-full min-w-[220px] px-5 py-3 text-sm font-bold text-white whitespace-nowrap"
            style={{
              background: 'linear-gradient(110deg,#006ab8,#0288da)',
              boxShadow: '0 7px 14px rgba(0,91,160,0.13)',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M6.6 10.8a15 15 0 006.6 6.6l2.2-2.2a1 1 0 011.05-.24 11 11 0 003.47.56 1 1 0 011.08 1v3.48a1 1 0 01-1.1 1A18.9 18.9 0 013 4.08 1 1 0 014.07 3h3.5a1 1 0 011 1.1c0 1.18.2 2.35.57 3.47a1 1 0 01-.25 1.04z" />
            </svg>
            Call (343) 887-3470
          </a>
        </div>
      </section>

      {/* ── FAQ section ────────────────────────────────────────── */}
      <section className="relative z-[1] max-w-[1370px] mx-auto px-5 md:px-12 pt-7 pb-12">
        <div className="text-center mb-6">
          <p className="text-[11px] font-bold uppercase tracking-[2px] m-0" style={{ color: '#007cbf' }}>
            Before you book
          </p>
          <h2 className="text-[25px] font-bold mt-2 mb-1.5" style={{ letterSpacing: '-0.6px' }}>
            Your questions, answered
          </h2>
          <p className="text-sm m-0" style={{ color: '#60718a' }}>
            A few helpful things to know so you can choose the right appointment.
          </p>
        </div>

        <div className="max-w-[1030px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            {
              q: 'Is Dr.\u00a0Fagbolagun accepting new patients?',
              a: 'No, Dr. Fagbolagun is not accepting new patients. New patients can use Dr. Reginald’s new appointment option.',
            },
            {
              q: 'What happens at a new-patient appointment?',
              a: 'You\u2019ll have an opportunity to meet Dr.\u00a0Reginald, discuss your health needs and learn about next steps for ongoing care. Booking this appointment does not automatically establish a family-physician relationship or guarantee enrolment.',
            },
            {
              q: 'I was a patient of Dr.\u00a0Okwechime. What should I book?',
              a: 'You can book a continuing-care appointment for a current medical need. You may also choose to meet Dr.\u00a0Reginald if you\u2019d like to explore having him as your family doctor. This is your choice; there is no automatic reassignment.',
            },
            {
              q: 'Are same-day appointments guaranteed?',
              a: 'No. Same-day appointments depend on available clinicians and clinic capacity. Walk-in visits are intended for time-sensitive, non-emergency concerns. If you\u2019re unsure, call reception for guidance.',
            },
            {
              q: 'Can walk-in physicians complete forms or renew controlled medications?',
              a: 'These services cannot be guaranteed. Complex forms may require your records, a full assessment and an ongoing physician-patient relationship. All prescription decisions are made by the physician following an appropriate assessment.',
            },
            {
              q: 'What if I need emergency medical care?',
              a: 'For a medical emergency, call 911 or go to the nearest emergency department. Online bookings and clinic telephone messages are not monitored for emergencies.',
            },
          ].map((faq) => (
            <details
              key={faq.q}
              className="rounded-xl overflow-hidden"
              style={{ border: '1px solid #e0edf4', background: '#fff' }}
            >
              <summary className="cursor-pointer flex items-center justify-between gap-3 list-none px-4 py-4 text-sm font-bold" style={{ color: '#111f3c' }}>
                {faq.q}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 transition-transform duration-200">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </summary>
              <p className="text-[13px] leading-[1.7] m-0 px-4 pb-4" style={{ color: '#536782' }}>
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}