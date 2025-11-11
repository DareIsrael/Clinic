// export default function InputField({ 
//   label, 
//   type, 
//   name, 
//   value, 
//   onChange, 
//   error, 
//   required, 
//   options, 
//   placeholder,
//   min,
//   max 
// }) {
//   return (
//     <div className="mb-4">
//       <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor={name}>
//         {label} {required && <span className="text-red-500">*</span>}
//       </label>
      
//       {type === 'select' ? (
//         <select
//           id={name}
//           name={name}
//           value={value}
//           onChange={onChange}
//           className={`w-full px-3 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ${
//             error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500'
//           }`}
//         >
//           <option value="">Select {label}</option>
//           {options?.map(option => (
//             <option key={option.value} value={option.value}>
//               {option.label}
//             </option>
//           ))}
//         </select>
//       ) : (
//         <input
//           id={name}
//           type={type}
//           name={name}
//           value={value}
//           onChange={onChange}
//           min={min}
//           max={max}
//           placeholder={placeholder}
//           className={`w-full px-3 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ${
//             error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500'
//           }`}
//         />
//       )}
      
//       {error && <p className="text-red-500 text-xs italic mt-1">{error}</p>}
//     </div>
//   );
// }


export default function InputField({ 
  label, 
  type, 
  name, 
  value, 
  onChange, 
  error, 
  required, 
  options, 
  placeholder,
  min,
  max,
  compact = false
}) {
  const inputClasses = `w-full border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ${
    error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500'
  } ${compact ? 'px-3 py-2 text-sm' : 'px-3 py-3'}`;

  const labelClasses = `block text-gray-700 font-medium mb-2 ${
    compact ? 'text-sm' : 'text-sm'
  }`;

  return (
    <div className={compact ? 'mb-3' : 'mb-4'}>
      <label className={labelClasses} htmlFor={name}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      {type === 'select' ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className={inputClasses}
        >
          <option value="">Select {label}</option>
          {options?.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          placeholder={placeholder}
          className={inputClasses}
        />
      )}
      
      {error && (
        <p className={`text-red-500 italic mt-1 ${compact ? 'text-xs' : 'text-xs'}`}>
          {error}
        </p>
      )}
    </div>
  );
}