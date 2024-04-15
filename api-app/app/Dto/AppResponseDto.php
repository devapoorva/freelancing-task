<?php


namespace App\Dto;


class AppResponseDto
{
    public $message;
    public $success;
    public $data;

    public function __construct($message,$success,$data)
    {
        $this->message = $message;
        $this->success = $success;
        $this->data = $data;
    }

    public static function create($message, $success,$data)
    {
        return new self($message, $success,$data);
    }
}
