<?php

	require 'phpmailer/PHPMailer.php';
	require 'phpmailer/SMTP.php';
	require 'phpmailer/Exception.php';

	$mail = new PHPMailer\PHPMailer\PHPMailer();

    $mail->isSMTP();                                            		//Send using SMTP
	$mail->CharSet = 'UTF-8';
    $mail->SMTPAuth   = true;                                   		//Enable SMTP authentication


    $mail->Host       = 'smtp.strato.com';                    			//Set the SMTP server to send through
    $mail->Username   = 'nl@kyivjobs.info';                    //SMTP username
    $mail->Password   = '123Kyivjobs!';                             //SMTP password
    $mail->SMTPSecure = 'ssl';            								//Enable implicit TLS encryption
    $mail->Port       = 465;     

	$mail->IsHTML(true);

	//От кого письмо
	$mail->setFrom('nl@kyivjobs.info', 'Feedback from Kyiv Jobs website');  
	//Кому отправить
	$mail->addAddress('nl@kyivjobs.info'); //info.kyiv.jobs@gmail.com
	//Тема письма
	$mail->Subject = 'Feedback from Kyiv Jobs website';


	//Тело письма
	$body = '<h1>Feedback from Kyiv Jobs website</h1>';
	
	if(trim(!empty($_POST['name']))){
		$body.='<p><strong>Name:</strong> '.$_POST['name'].'</p>';
	}
	if(trim(!empty($_POST['email']))){
		$body.='<p><strong>E-mail:</strong> '.$_POST['email'].'</p>';
	}

	if(trim(!empty($_POST['phone']))){
		$body.='<p><strong>Phone:</strong> '.$_POST['phone'].'</p>';
	}
	
	if(trim(!empty($_POST['text']))){
		$body.='<p><strong>Text:</strong> '.$_POST['text'].'</p>';
	}
	

	$mail->Body = $body;

	//Отправляем
	if (!$mail->send()) {
		$message = 'Ошибка';
	} else {
		$message = 'Данные отправлены!';
	}

	$response = ['message' => $message];

	header('Content-type: application/json');
	echo json_encode($response);
?>