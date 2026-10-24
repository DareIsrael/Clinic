import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: 'About Us | St Mary Rideau Family Clinic',
  description:
    'Meet the physicians, support team and approach behind St Mary Rideau Family Clinic — compassionate, evidence-informed family medicine in downtown Ottawa.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Segoe UI', Arial, sans-serif", color: '#122447' }}>

      {/* ─── Hero ──────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ background: 'linear-gradient(122deg,#f2faff 0%,white 59%,#e9f7ff 100%)' }}
      >
        {/* decorative ellipse */}
        <div
          className="hidden md:block absolute"
          style={{
            width: 670, height: 450, border: '50px solid rgba(210,239,255,0.4)',
            borderRadius: '50%', right: -310, top: -190, transform: 'rotate(20deg)',
          }}
        />
        <div className="relative z-[1] max-w-[1260px] mx-auto px-5 grid grid-cols-1 md:grid-cols-[1.17fr_0.83fr] items-center gap-10 md:gap-[70px] py-12 md:py-16">
          {/* copy */}
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[2.7px]" style={{ color: '#0074bc' }}>
              About St Mary Rideau Family Clinic
            </p>
            <h1
              className="mt-3.5 mb-5 leading-[1.09] font-bold"
              style={{ fontSize: 'clamp(38px,4.5vw,62px)', letterSpacing: '-2.1px', color: '#071d46', maxWidth: 665 }}
            >
              Thoughtful care.<br />Modern family medicine.
            </h1>
            <p className="mb-7 leading-[1.76]" style={{ color: '#566b86', fontSize: 17, maxWidth: 570 }}>
              We&rsquo;re a family medicine clinic in the heart of downtown Ottawa, bringing together experienced physicians, a dedicated support team and a patient-centred approach to everyday healthcare.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#physicians"
                className="inline-flex items-center justify-center gap-3 rounded-[10px] text-sm font-bold px-5 py-3 text-white"
                style={{ background: 'linear-gradient(120deg,#027ac2,#0066a8)', boxShadow: '0 6px 18px rgba(0,109,184,0.16)' }}
              >
                Meet Our Physicians &nbsp; →
              </a>
              <Link
                href="/appointment"
                className="inline-flex items-center justify-center gap-3 rounded-[10px] text-sm font-bold px-5 py-3 border"
                style={{ background: '#fff', color: '#006cad', borderColor: '#85cdf4' }}
              >
                Book an Appointment
              </Link>
            </div>
          </div>

          {/* decorative graphic */}
          <div className="hidden md:grid h-[290px] place-items-center">
            <div
              className="relative w-[94%] h-full overflow-hidden rounded-[26px]"
              style={{
                background: 'linear-gradient(160deg,#fafdff,#dbf2ff)',
                border: '1px solid #c7e8fb',
                boxShadow: '0 11px 36px rgba(8,45,81,0.075)',
              }}
            >
              {/* orbs */}
              <div className="absolute rounded-full" style={{ left: -33, bottom: -73, width: 260, height: 260, background: 'rgba(172,223,255,0.57)' }} />
              <div className="absolute rounded-full" style={{ right: -45, top: -76, width: 220, height: 220, background: '#c8ecff' }} />
              {/* tag */}
              <p className="absolute text-xs font-extrabold uppercase tracking-[1.6px]" style={{ left: 26, top: 30, color: '#0063a4' }}>
                Care for you &amp; your family
              </p>
              {/* facility */}
              <div
                className="absolute left-[60px] right-[60px] bottom-[25px] h-[145px] rounded-[18px] bg-white"
                style={{ boxShadow: '0 15px 30px rgba(7,92,156,0.12)', border: '1px solid #ddf0fa' }}
              >
                <span className="absolute font-extrabold leading-none" style={{ left: 28, top: 31, color: '#0077be', fontSize: 55 }}>✚</span>
                <div
                  className="absolute rounded-[10px]"
                  style={{
                    right: 34, top: 24, width: 110, height: 80, border: '7px solid #bde3f7',
                    background: 'linear-gradient(90deg,#effaff 49%,#bde3f7 49%,#bde3f7 54%,#effaff 54%)',
                  }}
                />
              </div>
              {/* quote */}
              <div
                className="absolute rounded-[10px] text-white text-[13px]"
                style={{
                  right: 25, bottom: 28, transform: 'translateY(23px)',
                  background: '#0676bb', padding: '13px 15px',
                  boxShadow: '0 11px 36px rgba(8,45,81,0.075)', maxWidth: 240,
                }}
              >
                Welcoming care, close to home.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Physicians ────────────────────────────────────────── */}
      <section id="physicians" className="max-w-[1260px] mx-auto px-5 pt-16 md:pt-20 pb-6">
        {/* heading row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-7">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[2.7px]" style={{ color: '#0074bc' }}>
              The people behind your care
            </p>
            <h2 className="text-[28px] md:text-[35px] font-bold leading-[1.2] mt-1.5 mb-1.5" style={{ color: '#071d46', letterSpacing: '-1px' }}>
              Meet our physicians
            </h2>
            <p className="leading-[1.65] max-w-[710px]" style={{ color: '#60718b', fontSize: 15 }}>
              Get to know the family doctors providing thoughtful, evidence-informed care to patients at St&nbsp;Mary Rideau.
            </p>
          </div>
          <Link href="/appointment" className="text-[13px] font-bold whitespace-nowrap" style={{ color: '#0075ba' }}>
            View appointment options →
          </Link>
        </div>

        {/* physician cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Dr Fagbolagun */}
          <article
            className="relative rounded-[18px] overflow-hidden p-6 md:p-7"
            style={{ background: '#fff', border: '1px solid #d5e8f5', boxShadow: '0 11px 36px rgba(8,45,81,0.075)' }}
          >
            <div className="flex items-center gap-5 md:gap-6 min-h-[150px]">
              <div
                className="shrink-0 w-[122px] h-[122px] md:w-[145px] md:h-[145px] rounded-full grid place-items-center overflow-hidden"
                style={{ background: '#e7f6ff' }}
              >
                <Image src="/dr-avatar-1.png" alt="Dr. Oluwaseun Fagbolagun" width={146} height={130} className="object-cover object-center" style={{ width: 146, height: 130 }} />
              </div>
              <div>
                <div className="text-[18px] md:text-[21px] font-extrabold leading-[1.27]" style={{ color: '#081f45' }}>
                  Dr.&nbsp;Oluwaseun Fagbolagun
                </div>
                <div className="text-[13px] font-bold mt-1" style={{ color: '#0077bc' }}>Family Physician</div>
                <span
                  className="inline-block mt-3 text-xs rounded-full px-2.5 py-1"
                  style={{ background: '#f0f8ff', border: '1px solid #d7ecfb', color: '#28618b' }}
                >
                  For existing patients
                </span>
              </div>
            </div>

            <p className="my-5 leading-[1.8]" style={{ color: '#536680', fontSize: 14 }}>
              With over a decade of medical practice and family medicine certification in Canada and the United Kingdom, Dr.&nbsp;Fagbolagun provides comprehensive care across all ages. His approach emphasises continuity, compassion and personalised care.
            </p>

            {/* meta pills */}
            <div className="flex flex-wrap gap-2 min-h-[31px]">
              {['CCFP', 'MRCGP', 'Comprehensive Family Medicine'].map((t) => (
                <span
                  key={t}
                  className="text-[11px] font-bold rounded-full px-3 py-1.5"
                  style={{ color: '#4c6c86', background: '#f4f9fc', border: '1px solid #e3eff6' }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 mt-5 pt-4 border-t" style={{ borderColor: '#e8eef4' }}>
              <Link
                href="/appointment"
                className="flex-1 inline-flex items-center justify-center gap-3 rounded-[10px] text-sm font-bold px-5 py-3 text-white min-w-[205px]"
                style={{ background: 'linear-gradient(120deg,#027ac2,#0066a8)', boxShadow: '0 6px 18px rgba(0,109,184,0.16)' }}
              >
                Existing Patients: Book Appointment →
              </Link>
              <span className="text-[11px] flex-1" style={{ color: '#71849b' }}>
                Dr.&nbsp;Fagbolagun is currently seeing existing patients only and is not accepting new patients at this time.
              </span>
            </div>
          </article>

          {/* Dr Agukwendu */}
          <article
            className="relative rounded-[18px] overflow-hidden p-6 md:p-7"
            style={{ background: '#fff', border: '1px solid #d5e8f5', boxShadow: '0 11px 36px rgba(8,45,81,0.075)' }}
          >
            <div className="flex items-center gap-5 md:gap-6 min-h-[150px]">
              <div
                className="shrink-0 w-[122px] h-[122px] md:w-[145px] md:h-[145px] rounded-full grid place-items-center overflow-hidden"
                style={{ background: '#e7f6ff' }}
              >
                <Image src="/dr-avatar-2.png" alt="Dr. Reginald Chinna Agukwendu" width={146} height={130} className="object-cover object-center" style={{ width: 146, height: 130 }} />
              </div>
              <div>
                <div className="text-[18px] md:text-[21px] font-extrabold leading-[1.27]" style={{ color: '#081f45' }}>
                  Dr.&nbsp;Reginald Chinna Agukwendu
                </div>
                <div className="text-[13px] font-bold mt-1" style={{ color: '#0077bc' }}>Family Physician</div>
                <span
                  className="inline-block mt-3 text-xs rounded-full px-2.5 py-1"
                  style={{ background: '#f0f8ff', border: '1px solid #d7ecfb', color: '#28618b' }}
                >
                  Welcoming new patients
                </span>
              </div>
            </div>

            <p className="my-5 leading-[1.8]" style={{ color: '#536680', fontSize: 14 }}>
              Dr.&nbsp;Agukwendu trained in general practice in the West Midlands, UK, and has cared for patients in several countries. He values preventive medicine, health education and helping patients make informed choices about their care.
            </p>

            {/* meta pills */}
            <div className="flex flex-wrap gap-2 min-h-[31px]">
              {['UK GP Training (CCT)', 'Preventive Care', 'Family Medicine'].map((t) => (
                <span
                  key={t}
                  className="text-[11px] font-bold rounded-full px-3 py-1.5"
                  style={{ color: '#4c6c86', background: '#f4f9fc', border: '1px solid #e3eff6' }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 mt-5 pt-4 border-t" style={{ borderColor: '#e8eef4' }}>
              <Link
                href="/appointment"
                className="flex-1 inline-flex items-center justify-center gap-3 rounded-[10px] text-sm font-bold px-5 py-3 text-white min-w-[205px]"
                style={{ background: 'linear-gradient(120deg,#027ac2,#0066a8)', boxShadow: '0 6px 18px rgba(0,109,184,0.16)' }}
              >
                Book a New-Patient Appointment →
              </Link>
            </div>
          </article>
        </div>

        {/* ─── Our Team Is Growing ─────────────────────────────── */}
        <div
          className="mt-6 rounded-[17px] flex flex-wrap items-center justify-between gap-4 md:gap-6 p-5 md:px-8 md:py-6"
          style={{ background: 'linear-gradient(110deg,#f0faff,#e2f4ff)', border: '1px solid #c8e7f9' }}
        >
          <div
            className="shrink-0 w-[54px] h-[54px] grid place-items-center rounded-[15px] text-[22px] bg-white"
            style={{ boxShadow: '0 6px 15px rgba(12,104,154,0.07)' }}
          >
            ✦
          </div>
          <div className="flex-1 min-w-[200px]">
            <h3 className="text-[19px] font-bold mb-1" style={{ color: '#071d46' }}>Our team is growing</h3>
            <p className="text-[13px] leading-[1.65]" style={{ color: '#4f6a83' }}>
              We look forward to welcoming another family physician in spring 2027. More information about the new physician and appointment availability will be shared closer to their start date.
            </p>
          </div>
          <span
            className="text-[11px] font-bold tracking-[0.7px] rounded-full px-3.5 py-2 whitespace-nowrap"
            style={{ color: '#006cae', background: '#fff', border: '1px solid #c7e9fa' }}
          >
            Looking Ahead · 2027
          </span>
        </div>
      </section>

      {/* ─── Our Approach to Care ──────────────────────────────── */}
      <section className="mt-14 md:mt-16 pb-16" style={{ background: '#f7fbfe', borderTop: '1px solid #e3f2fa', borderBottom: '1px solid #e3f2fa' }}>
        <div className="max-w-[1260px] mx-auto px-5 pt-16 md:pt-20">
          {/* heading */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-7">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[2.7px]" style={{ color: '#0074bc' }}>Our Approach</p>
              <h2 className="text-[28px] md:text-[35px] font-bold leading-[1.2] mt-1.5 mb-1.5" style={{ color: '#071d46', letterSpacing: '-1px' }}>
                Care designed around you
              </h2>
              <p className="leading-[1.65] max-w-[710px]" style={{ color: '#60718b', fontSize: 15 }}>
                A thoughtful blend of modern tools, clinical experience and the personal connection that matters in family medicine.
              </p>
            </div>
          </div>

          {/* 4-col grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: '♡', title: 'Personalised care', desc: 'We listen to your concerns and work with you on care that reflects your individual needs.' },
              { icon: '⌁', title: 'Continuity that matters', desc: 'Building lasting relationships and supporting your health through different stages of life.' },
              { icon: '✚', title: 'Evidence-informed medicine', desc: 'Care guided by clinical evidence, sound judgement and shared decision-making.' },
              { icon: '▣', title: 'Convenient access', desc: 'Online appointment booking and same-day options, subject to physician availability.' },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl p-6" style={{ background: '#fff', border: '1px solid #e0edf6' }}>
                <div
                  className="w-[46px] h-[46px] rounded-[13px] grid place-items-center text-[22px] mb-5"
                  style={{ background: '#eaf7ff', color: '#006eb3' }}
                >
                  {f.icon}
                </div>
                <h3 className="text-[15px] font-bold mb-2" style={{ color: '#071d46' }}>{f.title}</h3>
                <p className="text-xs leading-[1.8]" style={{ color: '#63758c' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Support Team + Opportunities ──────────────────────── */}
      <section className="max-w-[1260px] mx-auto px-5 pt-16 md:pt-20 pb-6">
        {/* heading */}
        <div className="mb-7">
          <p className="text-xs font-extrabold uppercase tracking-[2.7px]" style={{ color: '#0074bc' }}>Working Together</p>
          <h2 className="text-[28px] md:text-[35px] font-bold leading-[1.2] mt-1.5 mb-1.5" style={{ color: '#071d46', letterSpacing: '-1px' }}>
            More than your appointment
          </h2>
          <p className="leading-[1.65] max-w-[710px]" style={{ color: '#60718b', fontSize: 15 }}>
            Great care depends on the people and processes supporting every visit.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-7">
          {/* Support Team card */}
          <div className="rounded-[17px] p-7" style={{ background: '#fff', border: '1px solid #dfedf6', boxShadow: '0 11px 36px rgba(8,45,81,0.075)' }}>
            <p className="text-[11px] font-extrabold uppercase tracking-[1.6px]" style={{ color: '#0080c5' }}>Our Support Team</p>
            <h3 className="text-[21px] font-bold leading-[1.27] mt-2 mb-3" style={{ color: '#0b2448' }}>
              The people helping your visit run smoothly
            </h3>
            <p className="text-[13px] leading-[1.8] mb-5" style={{ color: '#627289' }}>
              Our medical office and clinical support team assists with appointments, patient communication, clinic coordination and physician-supported clinical workflows. Together, we help keep care organised and accessible.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Patient Services', 'Medical Office Administration', 'Clinical Support'].map((r) => (
                <span
                  key={r}
                  className="text-xs font-bold rounded-[9px] px-3 py-2"
                  style={{ background: '#ecf8ff', border: '1px solid #cfe8f8', color: '#286187' }}
                >
                  {r}
                </span>
              ))}
            </div>
          </div>

          {/* Learning & Opportunities card */}
          <div
            className="relative rounded-[17px] p-7 text-white overflow-hidden"
            style={{ background: 'linear-gradient(150deg,#0d3c65,#075a93)' }}
          >
            {/* sparkle watermark */}
            <span className="absolute text-[170px] leading-none pointer-events-none select-none" style={{ right: -11, bottom: -75, color: 'rgba(255,255,255,0.08)' }}>✦</span>
            <p className="text-[11px] font-extrabold uppercase tracking-[1.5px]" style={{ color: '#b7eaff' }}>Learning &amp; Community</p>
            <h3 className="text-[21px] font-bold leading-[1.3] mt-2 mb-3">
              Helping future healthcare professionals grow
            </h3>
            <p className="text-[13px] leading-[1.8] mb-6" style={{ color: '#d8eaf7' }}>
              We value learning and community involvement. Opportunities for supervised clinical learning, internships or volunteering may be considered as clinic needs and appropriate arrangements allow.
            </p>
            <a
              href="mailto:contact@stmaryrideauclinic.com"
              className="text-[13px] font-bold pb-1"
              style={{ color: '#fff', borderBottom: '1px solid #a3d8f9' }}
            >
              Enquire about opportunities ↗
            </a>
          </div>
        </div>

        {/* ─── Mission / Vision ──────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-9">
          <article className="pl-5" style={{ borderLeft: '3px solid #1587c9', padding: '3px 0 3px 21px' }}>
            <h3 className="text-[18px] font-bold mb-2" style={{ color: '#071d46' }}>Our mission</h3>
            <p className="text-[13px] leading-[1.85]" style={{ color: '#667890' }}>
              To serve our patients, team and community with excellence, integrity and patient-centred innovation, while providing accessible, comprehensive family medicine.
            </p>
          </article>
          <article className="pl-5" style={{ borderLeft: '3px solid #1587c9', padding: '3px 0 3px 21px' }}>
            <h3 className="text-[18px] font-bold mb-2" style={{ color: '#071d46' }}>Our vision</h3>
            <p className="text-[13px] leading-[1.85]" style={{ color: '#667890' }}>
              To combine compassionate care, efficient systems and modern technology in a clinic where families feel respected, supported and confident in their care.
            </p>
          </article>
        </div>

        {/* ─── CTA ──────────────────────────────────────────────── */}
        <div
          className="mt-16 md:mt-20 rounded-[18px] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-7 md:px-10 md:py-9"
          style={{ background: '#eff9ff', border: '1px solid #d7ebf9' }}
        >
          <div>
            <h2 className="text-[22px] md:text-[26px] font-bold mb-1" style={{ color: '#071d46' }}>
              Care begins with a conversation.
            </h2>
            <p className="text-[13px]" style={{ color: '#60728c' }}>
              Explore your appointment options or contact our team to find the right next step.
            </p>
          </div>
          <Link
            href="/appointment"
            className="inline-flex items-center justify-center gap-3 rounded-[10px] text-sm font-bold px-5 py-3 text-white whitespace-nowrap"
            style={{ background: 'linear-gradient(120deg,#027ac2,#0066a8)', boxShadow: '0 6px 18px rgba(0,109,184,0.16)' }}
          >
            Book an Appointment →
          </Link>
        </div>
      </section>
    </div>
  );
}