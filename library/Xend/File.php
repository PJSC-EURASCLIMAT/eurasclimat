<?php

class Xend_File
{
    public static function download($name, $path)
    {
        if (file_exists($path)) {
            // сбрасываем буфер вывода PHP, чтобы избежать переполнения памяти выделенной под скрипт
            // если этого не сделать файл будет читаться в память полностью!
            if (ob_get_level()) {
                ob_end_clean();
            }
            // заставляем браузер показать окно сохранения файла
            header('Content-Description: File Transfer');
            header('Content-Type: application/octet-stream');
            header('Content-Disposition: attachment; filename=' . $name);
            header('Content-Transfer-Encoding: binary');
            header('Expires: 0');
            header('Cache-Control: must-revalidate');
            header('Pragma: public');
            header('Content-Length: ' . filesize($path));
            // читаем файл и отправляем его пользователю
            readfile($path);
            exit;
        } else {
            return false;
        }
    }

    public function uploadFile ($dir = FILES_DIR, $uniqueName = true)
    {

        $response = new Xend_Response();

//        $mimeType = $_SERVER['HTTP_X_FILE_TYPE'];
//        $size = $_SERVER['HTTP_X_FILE_SIZE'];

        $fileName = uniqid();

        if (!$uniqueName) {
            $fileName = $_SERVER['HTTP_X_FILE_NAME'];
        }

        $filePath = $dir . DIRECTORY_SEPARATOR . $fileName;

        if (!file_exists($dir)) {
            mkdir($dir, 0755, true);
        };
        if (file_exists($filePath)) {

            $trigger = false;

            while (!$trigger) {
                $filePath = $this->get_unique_filename($filePath);
                if (!file_exists($filePath)) {
                    $trigger = true;
                }
            }

        };

        $target = fopen($filePath, 'w');
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
            while (!feof($fp)) {
                $data = fread($fp, 1024);
                $realSize += strlen($data);
                fwrite($target, $data);
            }
        } else {
            return $response->addStatus(new Xend_Status(Xend_Status::FAILURE));
        }

        fclose($target);
        $response->addData('fileName', $_SERVER['HTTP_X_FILE_NAME']);
        $response->addData('uniqueName', $fileName);
        return $response->addStatus(new Xend_Status(Xend_Status::OK));
    }

    protected function get_unique_filename($name) {
        $name = $this->upcount_name($name);
        return $name;
    }


    protected function upcount_name_callback($matches) {
        $index = isset($matches[1]) ? intval($matches[1]) + 1 : 1;
        $ext = isset($matches[2]) ? $matches[2] : '';
        return ' ('.$index.')'.$ext;
    }

    protected function upcount_name($name) {
        return preg_replace_callback(
            '/(?:(?: \(([\d]+)\))?(\.[^.]+))?$/',
            array($this, 'upcount_name_callback'),
            $name,
            1
        );
    }

    public function uploadThumbnail($dirName = '', $fileName = '', $formFileName = 'photo')
    {
        $thumbFormat = "jpg";
        $replaceIfExist = true;
        $thumbWidth = 100;

        $response = new Xend_Response();

        $tmpFileName = uniqid() . '_' . $_FILES[$formFileName]['name'];
//        $extension = pathinfo($_FILES[$formFileName]['name'], PATHINFO_EXTENSION);

        $imageDir = empty($dirName) ? ''
            : IMAGES_DIR . DIRECTORY_SEPARATOR . $dirName . DIRECTORY_SEPARATOR;

        $tmpFilePath = $imageDir . $tmpFileName;
        $imagePath = $imageDir . $fileName . "." . $thumbFormat;

        $target = move_uploaded_file($_FILES[$formFileName]['tmp_name'], $tmpFilePath);
        if (!$target) {
            return $response->addStatus(new Xend_Status(Xend_Status::ADD_FAILED));
        }

        /*
         * - Создаем thumbnail
         * - конвертим его в нужный формат
         * - заменяем им загруженную картинку
         * */

        $im = $this->_thumbnail($tmpFilePath, $thumbWidth);
        if (!$im) {
            return $response->addStatus(new Xend_Status(Xend_Status::ADD_FAILED));
        }

        $imToFile = $this->_imageToFile($im, $imagePath, $replaceIfExist, 90);
        if (!$imToFile) {
            return $response->addStatus(new Xend_Status(Xend_Status::ADD_FAILED));
        }
        // удаляем tmp файл
        unlink($tmpFilePath);

//        $response->fileName = $fileName;
        return $response->addStatus(new Xend_Status(Xend_Status::OK));

    }

    private function _thumbnail($inputFileName, $maxSize = 100)
    {
        $info = getimagesize($inputFileName);

        $type = isset($info['type']) ? $info['type'] : $info[2];

        // Check support of file type
        if (!(imagetypes() & $type)) {
            // Server does not support file type
            return false;
        }

        $width = isset($info['width']) ? $info['width'] : $info[0];
        $height = isset($info['height']) ? $info['height'] : $info[1];

        // Calculate aspect ratio
        $wRatio = $maxSize / $width;
        $hRatio = $maxSize / $height;

        // Using imagecreatefromstring will automatically detect the file type
        $sourceImage = imagecreatefromstring(file_get_contents($inputFileName));

        // Calculate a proportional width and height no larger than the max size.
        if (($width <= $maxSize) && ($height <= $maxSize)) {
            // Input is smaller than thumbnail, do nothing
            return $sourceImage;
        } elseif (($wRatio * $height) < $maxSize) {
            // Image is horizontal
            $tHeight = ceil($wRatio * $height);
            $tWidth = $maxSize;
        } else {
            // Image is vertical
            $tWidth = ceil($hRatio * $width);
            $tHeight = $maxSize;
        }

        $thumb = imagecreatetruecolor($tWidth, $tHeight);

        if ($sourceImage === false) {
            // Could not load image
            return false;
        }

        // Copy resampled makes a smooth thumbnail
        imagecopyresampled($thumb, $sourceImage, 0, 0, 0, 0, $tWidth, $tHeight, $width, $height);
        imagedestroy($sourceImage);

        return $thumb;
    }

    /**
     * Save the image to a file. Type is determined from the extension.
     * $quality is only used for jpegs.
     * Author: mthorn.net
     */
    private function _imageToFile($im, $fileName, $autoReplace = true, $quality = 80)
    {
        if (!$autoReplace) {
            if (!$im || file_exists($fileName)) {
                return false;
            }
        }


        $ext = strtolower(substr($fileName, strrpos($fileName, '.')));

        switch ($ext) {
            case '.gif':
                imagegif($im, $fileName);
                break;
            case '.jpg':
            case '.jpeg':
                imagejpeg($im, $fileName, $quality);
                break;
            case '.png':
                imagepng($im, $fileName);
                break;
            case '.bmp':
                imagewbmp($im, $fileName);
                break;
            default:
                return false;
        }

        return true;
    }
}