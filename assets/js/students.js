// Set the maximum value for the month field to the current month
window.addEventListener("DOMContentLoaded", () => {
    const monthField = document.getElementById("interview-date-field");
    const currentDate = new Date(Date.now());
    const year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }
    const maxMonth = `${year}-${month}`;
    monthField.setAttribute("max", maxMonth);
});