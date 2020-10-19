<?php

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    // Подгружаем нужные файлы
    require 'phpmailer/src/PHPMailer.php';
    require 'phpmailer/src/Exception.php';

    // Инициализация и настройка
    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';
    $mail->setLanguage('ru', 'phpmailer/language/');
    $mail->IsHTML(true);

    // От кого
    $mail->setFrom('sendmessages123456@gmail.com', 'Mailer');
    // Кому
    $mail->addAddress('ronaakul.01@gmail.com');
    // Тема письма
    $mail->Subject = 'Отправка форм письмом';

    // Рука (зачем???)
    $hand = 'Правая';
    if($_POST['hand'] == 'left'){
        $hand = 'Левая';
    }

    // Тело письма
    $body = '<h1>Привет! Тебе пришло письмо</h1>';

    // Проверки

    if(trim(!empty($_POST['name']))){
        $body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
    }
    if(trim(!empty($_POST['email']))){
        $body.='<p><strong>Почта:</strong> '.$_POST['email'].'</p>';
    }
    if(trim(!empty($_POST['hand']))){
        $body.='<p><strong>Рука:</strong> '.$hand.'</p>';
    }
    if(trim(!empty($_POST['age']))){
        $body.='<p><strong>Возраст:</strong> '.$_POST['age'].'</p>';
    }
    if(trim(!empty($_POST['message']))){
        $body.='<p><strong>Сообщение:</strong> '.$_POST['message'].'</p>';
    }

    // Прикрепить файл
    if(!empty($_FILES['image']['tmp_name'])){
        // путь загрузки файла
        $filePath = __DIR__ . "/files" . $_FILES['image']['name'];
        // грузим файл
        if(copy($_FILES['image']['tmp_name'], $filePath)){
            $fileAttach = $filePath;
            $body.='<p><strong>Фото в приложении</strong>';
            $mail->addAttachment($fileAttach);
        }
        
    }
    $mail->Body = $body;

    // ОТправляем
    if(!$mail->send()){
        $message = "Ошибка";
    } else {
        $message = "Данные отправлены";
    }

    $response = ['message' => $message];
    header('Content-type: application/json');
    echo json_encode($response);
?>