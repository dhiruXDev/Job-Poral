export const DaysLeftFormatter = (deadlineDate, createdAtDate) => {
    const deadline = new Date(deadlineDate);
    const createdAt = new Date(createdAtDate);
  
    const msDiff = deadline - createdAt;
    const daysLeft = Math.ceil(msDiff / (1000 * 60 * 60 * 24));
  
    if (daysLeft > 1) {
      return { text: `${daysLeft}`, status: 'active' };
    } else if (daysLeft === 1) {
      return { text: `1`, status: 'closing_soon' };
    } else {
      return { text: `0`, status: 'closed' };
    }
  };
  