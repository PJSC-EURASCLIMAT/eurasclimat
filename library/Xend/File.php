<?php

class Xend_File
{
    public static function upload($dirName = '')
    {
        $response = new Xend_Response();

        $mimeType = $_SERVER['HTTP_X_FILE_TYPE'];
        $size = $_SERVER['HTTP_X_FILE_SIZE'];
        $fileName = uniqid() . '_' . $_SERVER['HTTP_X_FILE_NAME'];
        $dir = empty($dirName) ? ''
            : IMAGES_DIR . DIRECTORY_SEPARATOR . $dirName;

        /*
         * Open the file you want to save the uploaded data to.
         * In real environment make sure, that:
         * - the directory exists
         * - the directory is writeable
         * - a file with the same name does not exist
         */
        $target = fopen($dir . DIRECTORY_SEPARATOR . $fileName, 'w');
        if (!$target) {
            return $response->addStatus(new Xend_Status(Xend_Status::ADD_FAILED));
        }

        /*
         * Open the input stream.
         */
        $fp = fopen('php://input', 'r');
        $realSize = 0;
        $data = '';

        /*
         * Read data from the input stream and write them into the file.
         */
        if ($fp) {
            while (! feof($fp)) {
                $data = fread($fp, 1024);
                $realSize += strlen($data);
                fwrite($target, $data);
            }
        } else {
            return $response->addStatus(new Xend_Status(Xend_Status::FAILURE));
        }

        fclose($target);
        $response->fileName = $fileName;
        return $response->addStatus(new Xend_Status(Xend_Status::OK));
    }
}