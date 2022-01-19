window.addEventListener("DOMContentLoaded", () => {
    // Register an event listener to each status selection element
    // that will trigger an AJAX request on change
    document.querySelectorAll("td>select").forEach((node) => {
        node.addEventListener("change", statusListener);
    })
});

// Event listener for result status <select> elements
const statusListener = (event) => {
    const newStatus = event.target.value;
    console.log(newStatus);
    const result = event.target.getAttribute("data-result-id");
    updateResultStatus(result, newStatus);
}

// Update the result's status using an AJAX request
const updateResultStatus = async (result, status) => {
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
        const response = await fetch(`/results/${result}/update_status`, options);
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