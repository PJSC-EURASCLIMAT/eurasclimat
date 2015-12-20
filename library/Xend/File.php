<?php

class Xend_File
{
    protected $_table;

    public $default_dir;

    public function __construct()
    {
        $this->_table = new Xend_File_Table();
        $this->default_dir = FILES_DIR. DIRECTORY_SEPARATOR;
    }

    public function download($id, $name = '')
    {
        $response = new Xend_Response();

        $id = intval($id);
        if ($id == 0) {
            return $response->addStatus(new Xend_Status(
                Xend_Status::INPUT_PARAMS_INCORRECT, 'id'));
        }

        try {
            $row = $this->_table->findOne($id);
            $status = Xend_Accounts_Status::OK;
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            $status = Xend_Accounts_Status::DATABASE_ERROR;
            return $response->addStatus(new Xend_Accounts_Status($status));
        }

        $data = $row->toArray();
        $path = $this->default_dir . $data['path'];

        $fileNameInfo = pathinfo($path);
        $extension = $fileNameInfo['extension'];

        if ($name == '') {
            $name = $data['name'];
        }

        $name = $name . '.' . $extension;

        if (file_exists($path)) {
            if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest')
            {
                return $response->addStatus(new Xend_Status(Xend_Status::OK));
            }
            // сбрасываем буфер вывода PHP, чтобы избежать переполнения памяти выделенной под скрипт
            // если этого не сделать файл будет читаться в память полностью!
            if (ob_get_level()) {
                ob_end_clean();
            }
            // заставляем браузер показать окно сохранения файла
            header('Content-Description: File Transfer');
            header('Content-Type: application/octet-stream');
            header('Content-Disposition: attachment; filename="' . $name . '"');
            header('Content-Transfer-Encoding: binary');
            header('Expires: 0');
            header('Cache-Control: must-revalidate');
            header('Pragma: public');
            header('Content-Length: ' . filesize($path));
            // читаем файл и отправляем его пользователю
            readfile($path);

            exit;
        } else {
            return $response->addStatus(new Xend_Status(Xend_Status::FAILURE));
        }
    }

    public function uploadFile($dir = FILES_DIR, $uniqueName = true)
    {

//        die(print_r($_SERVER));

        if ($dir == null) {
            $dir = FILES_DIR;
        }

        $FILENAME = isset($_SERVER['HTTP_X_FILE_NAME'])
                  ? $_SERVER['HTTP_X_FILE_NAME']
                  : isset($_GET['X-File-Name']) ? $_GET['X-File-Name'] : '';

        $response = new Xend_Response();

        if (empty($FILENAME)) {
            return $response->addStatus(new Xend_Status(Xend_Status::INPUT_PARAMS_INCORRECT));
        }

        $fileNameInfo = $this->_pathinfo_utf($FILENAME);

        $fileName = $fileNameInfo['filename'];

        $uniqFileName = uniqid() . '.' . $fileNameInfo['extension'];

        if (!$uniqueName) {
            $uniqFileName = $FILENAME;
        }

        $filePath = $dir . DIRECTORY_SEPARATOR . $uniqFileName;

        if (!file_exists($dir)) {
            mkdir($dir, 0755, true);
        }

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

        $file_id = $this->_save($uniqFileName, $fileName);

        if (!$file_id) {
            $this->_removeFile($filePath);
            return $response->addStatus(new Xend_Status(Xend_Status::FAILURE));
        }


        $response->addData('file_id', $file_id);
        $response->addData('fileName', $fileName);
        $response->addData('uniqueName', $uniqFileName);
        return $response->addStatus(new Xend_Status(Xend_Status::OK));
    }

    private function _removeFile($filePath) {
        if (is_file($filePath)) {
            unlink($filePath);
        }
    }

    public function deleteFile($id) {

        $response = new Xend_Response();

        $id = intval($id);
        if ($id == 0) {
            return $response->addStatus(new Xend_Status(
                Xend_Status::INPUT_PARAMS_INCORRECT, 'id'));
        }

        try {
            $rowset = $this->_table->findOne($id);
            $status = Xend_Status::OK;
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            $status = Xend_Accounts_Status::DATABASE_ERROR;
            return $response->addStatus(new Xend_Status($status));
        }

        $data = $rowset->toArray();
        $path = $this->default_dir . $data['path'];

        $res = $this->_table->deleteByPk($id);
        if (false === $res) {
            return $response->addStatus(new Xend_Status(Xend_Status::DATABASE_ERROR));
        }

        $this->_removeFile($path);

        return $response->addStatus(new Xend_Status(Xend_Status::OK));

    }

    /**
     * Save info about file to database table
     * */
    private function _save($path, $name) {

        $data = array(
            'path' => $path,
            'name' => $name,
            'account_id' => Xend_Accounts_Prototype::getId(),
            'date' => date('Y-m-d H:i:s'),
        );

        try {
            $id = $this->_table->insert($data);
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            return false;
        }
        return $id;
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
    
    public function fetchAbsentFiles()
    {
        $response = new Xend_Response();
        
        try {
            $rows = $this->_table->fetchAll();
            $status = Xend_Accounts_Status::OK;
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            $status = Xend_Accounts_Status::DATABASE_ERROR;
            return $response->addStatus(new Xend_Accounts_Status($status));
        }
        
        $absentFiles = array();
        foreach ($rows as $row) {
            if (file_exists($this->default_dir . $row['path'])) continue;
            $absentFiles[] = $row->toArray();
        }
        
        $response->setRowset($absentFiles);
        return $response->addStatus(new Xend_Accounts_Status($status));
    }
    
    public function fetchLostFiles()
    {
        $response = new Xend_Response();
        
        try {
            $records = $this->_table->fetchAllColumn(null, null, 'path');
            $status = Xend_Accounts_Status::OK;
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            $status = Xend_Accounts_Status::DATABASE_ERROR;
            return $response->addStatus(new Xend_Accounts_Status($status));
        }
        
        $files = array_diff(scandir($this->default_dir), array('..', '.'));
        
        $response->setRowset(array_diff($files, $records));
        return $response->addStatus(new Xend_Accounts_Status($status));
    }

    public function fetchAbsentProjectsDocsVersionsFiles()
    {
        $response = new Xend_Response();
    
        $select = $this->_table->getAdapter()->select()
        ->from(
                array('v' => 'crm_projects_docs_versions'),
                array('v.id', 'v.file_id')
        )
        ->join(
                array('f' => 'files'),
                'f.id=v.file_id'
        )->join(
                array('a' => 'accounts'),
                'a.id=f.account_id',
                array('creator' => 'a.name')
        );
    
        try {
            $rows = $select->query()->fetchAll();
            $status = Xend_Accounts_Status::OK;
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            $status = Xend_Accounts_Status::DATABASE_ERROR;
            return $response->addStatus(new Xend_Accounts_Status($status));
        }
    
        $absentFiles = array();
        foreach ($rows as $row) {
            if (file_exists($this->default_dir . $row['path'])) continue;
            $absentFiles[] = $row;
        }
    
        $response->setRowset($absentFiles);
        return $response->addStatus(new Xend_Accounts_Status($status));
    }

    public function fetchAbsentProjectsDocsFiles()
    {
        $response = new Xend_Response();
    
        $select = $this->_table->getAdapter()->select()
        ->from(
                array('d' => 'crm_projects_docs'),
                array('d.name', 'd.project_id', 'd.type_id')
        )->joinLeft(
                array('v' => 'crm_projects_docs_versions'),
                'd.id=v.doc_id',
                array('v.doc_id')
        )->joinLeft(
                array('t' => 'doc_types'),
                't.id=d.type_id',
                array('doc_type' => 't.name')
        )->joinLeft(
                array('p' => 'crm_projects'),
                'p.id=d.project_id',
                array('project_name' => 'p.name')
        )->joinLeft(
                array('g' => 'crm_projects_groups'),
                'g.id=p.group_id',
                array('project_group' => 'g.name')
        )->where('v.doc_id IS NULL'
        )->order('project_id');
    
        try {
            $rows = $select->query()->fetchAll();
            $status = Xend_Accounts_Status::OK;
        } catch (Exception $e) {
            if (DEBUG) {
                throw $e;
            }
            $status = Xend_Accounts_Status::DATABASE_ERROR;
            return $response->addStatus(new Xend_Accounts_Status($status));
        }

        $response->setRowset($rows);
        return $response->addStatus(new Xend_Accounts_Status($status));
    }
    
    public function file_exists($name)
    {
        return file_exists($this->default_dir . $name);
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

    protected function _pathinfo_utf($path)
    {
        if (strpos($path, DIRECTORY_SEPARATOR) !== false) {
            $basename = explode(DIRECTORY_SEPARATOR, $path);
            $basename = end($basename);
        } else {
            $basename = $path;
        }
        if (empty($basename)) return false;

        $dirname = substr($path, 0, strlen($path) - strlen($basename) - 1);

        if (strpos($basename, '.') !== false) {
            $extension = explode('.', $path);
            $extension = end($extension);
            $filename = substr($basename, 0, strlen($basename) - strlen($extension) - 1);
        } else {
            $extension = '';
            $filename = $basename;
        }

        return array(
            'dirname' => $dirname,
            'basename' => $basename,
            'extension' => $extension,
            'filename' => $filename
        );
    }

}