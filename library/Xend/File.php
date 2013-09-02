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
            while (!feof($fp)) {
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