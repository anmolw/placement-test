// Set the maximum value for the month field to the current month
window.addEventListener("DOMContentLoaded", () => {
    const monthField = document.getElementById("student-batch-field");
    const currentDate = new Date(Date.now());
    const year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }
    const maxMonth = `${year}-${month}`;
    monthField.setAttribute("max", maxMonth);

    // Register an event listener to each status selection element
    // that will trigger an AJAX request on change
    document.querySelectorAll("select").forEach((node) => {
        node.addEventListener("change", statusListener);
    })
});

// Event listener for student status <select> elements
const statusListener = (event) => {
    const newStatus = event.target.value;
    console.log(newStatus);
    const student = event.target.getAttribute("data-student-id");
    updateStudentStatus(student, newStatus);
}

// Update the student's placement status using an AJAX request
const updateStudentStatus = async (student, status) => {
    const options = {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
            status: status
        })
    }
    try {
        const response = await fetch(`/students/${student}/update_status`, options);
        const json = await response.json();
        // If the response status is 200, the operation succeeded
        if (response.status == 200) {
            notyf.success(json.message);
        }
        else {
            notyf.error(json.message);
        }
    } catch (error) {
        console.error(error);
        notyf.error("Failed to update status");
    }

}