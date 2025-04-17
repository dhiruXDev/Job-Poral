 export const formatSalaryToINR = (salaryStr) => {
    if (!salaryStr) return "";
  
    // Handle range: "10000-50000"
    if (salaryStr.includes("-")) {
      const [min, max] = salaryStr.split("-").map(s => parseInt(s.trim(), 10));
      return `${min.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 })} - ${max.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 })}`;
    }
  
    // Handle single value: "50000"
    const val = parseInt(salaryStr.trim(), 10);
    return val.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    });
  };
  