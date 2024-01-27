function calculateExpiryDate(dateOfExpiry) {
    const today = new Date();
    const expiryDate = new Date(dateOfExpiry);
    let timeDiff = expiryDate.getTime() - today.getTime();
    let days = Math.ceil(timeDiff / (1000 * 3600 * 24));
    let years = Math.floor(days / 365);
    days -= years * 365;
    let months = Math.floor(days / 30);
    days -= months * 30;
  
    if (timeDiff < 0) {
      return "expired";
    } else {
      return { years, months, days };
    }
  }

  export default calculateExpiryDate;