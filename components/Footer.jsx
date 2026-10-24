import Link from "next/link";
import { Phone, Mail, MapPin, Printer } from "lucide-react";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/appointment", label: "Book Appointment" },
  { href: "/contact", label: "Contact Us" },
  { href: "/uninsured-services", label: "Uninsured Services & Fees" },
  { href: "/policies", label: "Patient Information & Policies" },
];

const hours = [
  { day: "Mon – Thu", time: "9:00 AM – 7:00 PM" },
  { day: "Friday", time: "9:00 AM – 5:00 PM" },
  { day: "Saturday", time: "9:00 AM – 3:00 PM" },
  { day: "Sunday", time: "Closed" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0c2340] text-slate-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h2 className="text-lg font-semibold text-white">St Mary Rideau Clinic</h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              Compassionate, comprehensive family medicine for the Ottawa community.
            </p>
            <Link
              href="/appointment"
              className="mt-5 inline-block rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-sky-700"
            >
              Book Appointment
            </Link>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Quick Links</h3>
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-slate-400 transition-colors hover:text-sky-400">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Contact</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <Phone className="h-4 w-4 flex-shrink-0 text-sky-400" />
                <a href="tel:+13438873470" className="text-slate-400 hover:text-sky-400">(343) 887-3470</a>
              </li>
              <li className="flex items-center gap-3">
                <Printer className="h-4 w-4 flex-shrink-0 text-sky-400" />
                <span className="text-slate-400">Fax: (343) 362-3021</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 flex-shrink-0 text-sky-400" />
                <a href="mailto:contact@stmaryrideauclinic.com" className="break-all text-slate-400 hover:text-sky-400">
                  contact@stmaryrideauclinic.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 flex-shrink-0 text-sky-400" />
                <span className="text-slate-400">Ottawa, Ontario, Canada</span>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Clinic Hours</h3>
            <ul className="mt-4 space-y-2 text-sm">
              {hours.map((h) => (
                <li key={h.day} className="flex justify-between gap-4">
                  <span className="text-slate-400">{h.day}</span>
                  <span className={h.time === "Closed" ? "text-red-400" : "text-slate-300"}>{h.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-slate-800 pt-6 text-xs text-slate-500 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} St Mary Rideau Family Clinic. All rights reserved.</p>
          <p>
            For medical emergencies, call <span className="font-semibold text-red-400">911</span>.
          </p>
        </div>
      </div>
    </footer>
  );
}



// import Link from "next/link";

// const quickLinks = [
//   { href: "/", label: "Home" },
//   { href: "/about", label: "About us" },
//   { href: "/appointment", label: "Appointments" },
//   { href: "/contact", label: "Contact us" },
// ];

// const hours = [
//   { day: "Mon – Thu", time: "10 AM – 7 PM" },
//   { day: "Friday", time: "10 AM – 5 PM" },
//   { day: "Saturday", time: "10 AM – 3 PM" },
//   { day: "Sunday", time: "Closed" },
// ];

// export default function Footer() {
//   return (
//     <footer className="bg-[#0c2340] text-slate-300">
//       <div className="max-w-7xl mx-auto px-6 py-14">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          
//           {/* Brand */}
//           <div className="pr-4">
//             <h2 className="text-[22px] font-bold text-white tracking-wide">
//               St Mary Rideau
//             </h2>
//             <h3 className="text-[13px] font-bold text-sky-400 mt-1 mb-4">
//               Family Clinic
//             </h3>
//             <p className="text-[15px] leading-relaxed text-slate-300 mb-6">
//               Compassionate, comprehensive family medicine for the Ottawa community.
//             </p>
//             <Link
//               href="/appointment"
//               className="inline-flex items-center text-[15px] font-medium text-white hover:text-sky-300 transition-colors"
//             >
//               Book an appointment <span className="ml-1.5 text-lg leading-none">&rarr;</span>
//             </Link>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h3 className="text-[17px] font-semibold text-white mb-5">Quick links</h3>
//             <ul className="space-y-3.5">
//               {quickLinks.map((l) => (
//                 <li key={l.href}>
//                   <Link
//                     href={l.href}
//                     className="text-[15px] text-slate-300 transition-colors hover:text-white"
//                   >
//                     {l.label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Contact */}
//           <div>
//             <h3 className="text-[17px] font-semibold text-white mb-5">Contact</h3>
//             <ul className="space-y-3.5 text-[15px] text-slate-300">
//               <li>158 Rideau Street</li>
//               <li>Ottawa, ON K1N 5X6</li>
//               <li>
//                 <a href="tel:+13438873470" className="transition-colors hover:text-white">
//                   (343) 887-3470
//                 </a>
//               </li>
//               <li>
//                 <a
//                   href="mailto:contact@stmaryrideauclinic.com"
//                   className="transition-colors hover:text-white"
//                 >
//                   contact@stmaryrideauclinic.com
//                 </a>
//               </li>
//             </ul>
//           </div>

//           {/* Clinic Hours */}
//           <div>
//             <h3 className="text-[17px] font-semibold text-white mb-5">Clinic hours</h3>
//             <ul className="space-y-3.5 text-[15px] text-slate-300">
//               {hours.map((h) => (
//                 <li key={h.day}>
//                   {h.day}: {h.time}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         {/* Bottom bar */}
//         <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-slate-700/60 pt-6 text-[13px] text-slate-400 sm:flex-row sm:items-center">
//           <p>&copy; 2026 St Mary Rideau Family Clinic. All rights reserved.</p>
//           <p>
//             For medical emergencies, call 911.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// }