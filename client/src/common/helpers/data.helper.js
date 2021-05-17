export const getWeek = (date) => {
    let onejan = new Date(date.getFullYear(), 0,1);
    return Math.floor((((date - onejan) / 86400000) + onejan.getDay()-1) / 7);
  };
