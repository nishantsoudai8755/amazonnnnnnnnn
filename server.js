const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

// Serve static frontend files
app.use(express.static(path.join(__dirname, "../frontend")));

// Function to generate a 7-character alphanumeric random code
function generateRandomCode() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 7; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

// Route to serve main1.html as the default page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "main1.html"));
});

// Route to serve main2.html
app.get("/checkout", (req, res) => {
    res.sendFile(path.join(__dirname, "checkout.html"));
});

// Paytm redirect with custom message
app.get("/pay/paytm", (req, res) => {
    console.log("Paytm request received");
    const amount = req.query.amount || "500";
    const randomCode = generateRandomCode();
    const message = `Payment ID: ${randomCode}`;
    const paytmDeepLink = `paytmmp://pay?pa=7983660135@ptyes&pn=Amazon&am=${amount}&cu=INR&tn=${encodeURIComponent(message)}`;
    console.log("Paytm Deep Link:", paytmDeepLink);
    res.redirect(paytmDeepLink);
});

// PhonePe redirect with custom message
app.get("/pay/phonepe", (req, res) => {
    console.log("PhonePe request received");
    const amount = req.query.amount || "500";
    const randomCode = generateRandomCode();
    const message = `Payment ID: ${randomCode}`;
    const phonePeDeepLink = `phonepe://pay?pa=7983660135@ptyes&pn=Amazon&am=${amount}&cu=INR&tn=${encodeURIComponent(message)}`;
    console.log("PhonePe Deep Link:", phonePeDeepLink);
    res.redirect(phonePeDeepLink);
});

// GPay redirect with custom message
app.get("/pay/gpay", (req, res) => {
    console.log("GPay request received");
    const amount = req.query.amount || "500";
    const randomCode = generateRandomCode();
    const message = `Payment ID: ${randomCode}`;
    const gpayDeepLink = `upi://pay?pa=7983660135@ptyes&pn=Amazon&am=${amount}&cu=INR&tn=${encodeURIComponent(message)}`;
    console.log("GPay Deep Link:", gpayDeepLink);
    res.redirect(gpayDeepLink);
});

// Start the server
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
