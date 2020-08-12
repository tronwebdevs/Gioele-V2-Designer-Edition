<?php

function get_input_data($field_name) {
    $data = json_decode(file_get_contents('php://input'), true);
    if (!isset($data[$field_name]) || empty($data[$field_name])) {
        $data = $_REQUEST;
    }
    return $data[$field_name];
}

function error_response($message, $status, $conn) {
    echo json_encode(
        array(
            "code" => -1,
            "response" => $status,
            "message" => $message
        )
    );
    $conn->close();
}
