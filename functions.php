<?php

function get_input_data($field_name) {
    $data = json_decode(file_get_contents('php://input'), true);
    if (!isset($data[$field_name]) || empty($data[$field_name])) {
        $data = $_REQUEST;
    }
    if (array_key_exists($field_name, $data) == false) {
      $data[$field_name] = null;
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

function code_response($code, $message, $status, $conn) {
    echo json_encode(
        array(
            "code" => $code,
            "response" => $status,
            "message" => $message
        )
    );
    $conn->close();
}
