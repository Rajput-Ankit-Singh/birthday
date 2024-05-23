<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $feedback = htmlspecialchars($_POST["feedback"]);
    $file = 'feedback.txt';
    file_put_contents($file, $feedback . PHP_EOL, FILE_APPEND | LOCK_EX);
    echo "Feedback saved!";
} else {
    echo "Invalid request.";
}
?>
